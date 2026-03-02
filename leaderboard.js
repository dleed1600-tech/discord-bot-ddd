const levels = require('../../utils/levels');

module.exports = {
    name: 'leaderboard',
    description: 'Show XP leaderboard',
    slash: true,
    async execute(message, args) {
        const data = await levels.getLeaderboard(message.guild.id, 10);
        if (data.length === 0) return message.channel.send('No data yet.');
        let text = 'XP Leaderboard:\n';
        for (let i = 0; i < data.length; i++) {
            text += `${i + 1}. <@${data[i].user_id}> – ${data[i].xp} XP\n`;
        }
        message.channel.send(text);
    },
    async executeSlash(interaction) {
        const data = await levels.getLeaderboard(interaction.guild.id, 10);
        if (data.length === 0) return interaction.reply('No data yet.');
        let text = 'XP Leaderboard:\n';
        for (let i = 0; i < data.length; i++) {
            text += `${i + 1}. <@${data[i].user_id}> – ${data[i].xp} XP\n`;
        }
        await interaction.reply(text);
    }
};