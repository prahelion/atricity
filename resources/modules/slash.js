// Imports
const axios = require('axios').default;
const discord = require('discord.js');
//

// Variables
const client = null;
const config = {
    "guild": 0,
    "app": 0,
    "token": 0
}
//

// Exports

module.exports.authenticate = (token, info) => {
    if(token) {
        if(info && typeof info == 'object') {
            client = new discord.Client().login(token).then(function(res) {
                config.guild = info.guild;
                config.app = info.app;
                config.token = token;
            }).catch(function() {
                return new Error("Token specified was invalid");
            })
        } else {return new Error("Invalid configuration")};
    } else {return new Error("No token was specified")};
};

module.exports.register = (info) => {
    if(!client==null) {
        if(info) {
            if (typeof info == 'object') {
                if(info.name && info.description) {
                    axios({
                        url: `https://discord.com/api/v8/applications/${config.app}/guilds/${config.guild}/commands`,
                        method: 'POST',
                        headers: {
                            Authorization: `Bot ${config.token}`
                        },
                        data: info
                    }).then(function() {
                        return true;
                    }).catch(function(err) {
                        return err;
                    })
                } else {return new Error("The required command information was not submitted")}
            } else {return new Error("Invalid information type")}
        } else {return new Error("No command information has been specified")};
    } else {return new Error("No client has been authenticated")}
};

module.exports.reply = (interaction, message) => {
    if(interaction) {
        if(message) {
            if(!client == null) {
                if(typeof message == "string") {
                    try {
                        client.api.interactions(interaction.id, interaction.token).callback.post({
                            data: {
                                type:4,
                                data: {
                                    content:message
                                }
                            }
                        });
                     } catch {
                        return new Error("Error while replying to interaction");
                     }
                } else if (typeof message == "object") {
                    try {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type:4,
                            data: {
                                embeds: [message]
                            }
                        }
                    });
                } catch {
                    return new Error("Error while replying to interaction");
                 }
                }
            } else {return new Error("No client has been authenticated")};
        } else {return new Error("No message was specified")};
    } else {return new Error("No interaction was specified")};
}

//