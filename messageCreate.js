const levels = require('../utils/levels');

// simple anti-spam tracker
const spamTracker = new Map();

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (message.author.bot || !message.guild) return;
        const prefix = process.env.PREFIX || '!';

        // simple automod
        const automod = require('../utils/automod');
        if (automod.check(message)) {
            await message.delete().catch(() => { });
            return;
        }

        // anti-spam: 5 messages in 10 seconds
        const now = Date.now();
        const data = spamTracker.get(message.author.id) || { count: 0, last: now };
        if (now - data.last < 10000) {
            data.count += 1;
        } else {
            data.count = 1;
            data.last = now;
        }
        spamTracker.set(message.author.id, data);
        if (data.count > 5) {
            try {
                await message.member.timeout(10 * 1000, 'Spamming');
                message.channel.send(`${message.author}, you are spamming.`);
            } catch { }
            return;
        }

        // give xp for message
        const xp = Math.floor(Math.random() * 10) + 1;
        await levels.addXP(message.guild.id, message.author.id, xp);

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if (!command) return;
        try {
            await command.execute(message, args);
        } catch (err) {
            console.error(err);
            message.reply('There was an error executing that command.');
        }
    }
};