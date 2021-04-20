// Imports
const slash = require('./resources/modules/slash.js');
const discord = require('discord.js');
const fs = require('fs');
//

// Variables
const client = new discord.Client();

// Setup
require('dotenv').config();
client.login(process.env.TOKEN);
slash.authenticate(process.env.TOKEN);
//

// Start
    
//