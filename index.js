// Imports
const slash = require('./resources/modules/slash.js');
const discord = require('discord.js');
const fs = require('fs');
//

// Variables
const client = new discord.Client();
const commands = fs.readdirSync('./resources/commands/', { withFileTypes: false});
//

// Setup
require('dotenv').config();
client.login(process.env.TOKEN, {});
slash.authenticate(process.env.TOKEN, {
    "guild":1234,
    "app": client.user.id,
    "token": process.env.TOKEN
});
//

// Start
    client.on('ready', () => {
        commands.forEach(command => {
            const cmd = require(`./resources/commands/${command}.js`);
            slash.register(cmd.info);
        })
    })

    client.ws.on("INTERACTION_CREATE", async(interaction) => {
        const cmd = interaction.data.name.toLowerCase();
        if (commands.includes(cmd)) {
            require(`./resources/commands/${cmd}.js`).callback(interaction);
        };
    });
//