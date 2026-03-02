const music = require('../../utils/music');

module.exports = {
    name: 'skip',
    description: 'Skip current song',
    slash: true,
    async execute(message, args) {
        const serverQueue = music.queue.get(message.guild.id);
        if (!serverQueue) return message.reply('Nothing playing');
        serverQueue.player.stop();
        message.channel.send('Skipped.');
    },
    async executeSlash(interaction) {
        const serverQueue = music.queue.get(interaction.guild.id);
        if (!serverQueue) return interaction.reply({ content: 'Nothing playing', ephemeral: true });
        serverQueue.player.stop();
        await interaction.reply('Skipped.');
    }
};