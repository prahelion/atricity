const slash = require('../modules/slash.js');

module.exports.info = {
    "name": "test",
    "description": "Test Command",
    "callback": function(interaction) {
        slash.reply(interaction, "Test Complete.");
    }
}