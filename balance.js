const db = require('quick.db');

module.exports = {
    name: 'balance',
    description: 'Check your balance',
    slash: true,
    async execute(message, args) {
        let bal = db.get(`balance_${message.author.id}`) || 0;
        message.channel.send(`${message.author}, you have ${bal} coins.`);
    },
    async executeSlash(interaction) {
        let bal = db.get(`balance_${interaction.user.id}`) || 0;
        await interaction.reply(`${interaction.user}, you have ${bal} coins.`);
    }
};