const db = require('quick.db');

module.exports = {
    name: 'daily',
    description: 'Claim your daily coins',
    slash: true,
    async execute(message, args) {
        const last = db.get(`daily_${message.author.id}`) || 0;
        if (Date.now() - last < 86400000) return message.reply('You already claimed your daily.');
        db.set(`daily_${message.author.id}`, Date.now());
        const amt = 100;
        db.add(`balance_${message.author.id}`, amt);
        message.channel.send(`You got ${amt} coins!`);
    },
    async executeSlash(interaction) {
        const last = db.get(`daily_${interaction.user.id}`) || 0;
        if (Date.now() - last < 86400000) return interaction.reply({ content: 'Already claimed.', ephemeral: true });
        db.set(`daily_${interaction.user.id}`, Date.now());
        const amt = 100;
        db.add(`balance_${interaction.user.id}`, amt);
        await interaction.reply(`You got ${amt} coins!`);
    }
};