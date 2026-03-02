require('dotenv').config();

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

// create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();
client.slashCommands = new Collection();

// load command files (supports both files and subfolders)
const commandsPath = path.join(__dirname, 'commands');
const commandEntries = fs.readdirSync(commandsPath);
for (const entry of commandEntries) {
    const fullPath = path.join(commandsPath, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
        const commandFiles = fs.readdirSync(fullPath).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(fullPath, file));
            if (command.name) client.commands.set(command.name, command);
            if (command.slash) client.slashCommands.set(command.name, command);
        }
    } else if (stat.isFile() && entry.endsWith('.js')) {
        const command = require(fullPath);
        if (command.name) client.commands.set(command.name, command);
        if (command.slash) client.slashCommands.set(command.name, command);
    }
}

// load event files
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(path.join(__dirname, 'events', file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// start web dashboard (if needed)
require('./web/dashboard');

// login
client.login(process.env.TOKEN).catch(console.error);

module.exports = client;