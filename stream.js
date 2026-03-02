module.exports = {
    name: 'stream',
    description: 'Link your Twitch/YouTube (placeholder)',
    slash: true,
    options: [
        { name: 'service', type: 3, description: 'twitch/youtube', required: true },
        { name: 'link', type: 3, description: 'Your channel link', required: true }
    ],
    async execute(message, args) {
        message.channel.send('Integration stored (not really).');
    },
    async executeSlash(interaction) {
        await interaction.reply('Integration stored (not really).');
    }
};