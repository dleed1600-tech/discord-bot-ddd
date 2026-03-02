const levels = require('../../utils/levels');

module.exports = {
    name: 'level',
    description: 'Check your level and XP',
    slash: true,
    async execute(message, args) {
        const xp = await levels.getXP(message.guild.id, message.author.id);
        const lvl = levels.calcLevel(xp);
        message.channel.send(`${message.author}, you are level ${lvl} with ${xp} XP.`);
    },
    async executeSlash(interaction) {
        const xp = await levels.getXP(interaction.guild.id, interaction.user.id);
        const lvl = levels.calcLevel(xp);
        await interaction.reply(`${interaction.user}, you are level ${lvl} with ${xp} XP.`);
    }
};