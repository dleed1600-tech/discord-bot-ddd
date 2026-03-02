module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    slash: true,
    async execute(message, args) {
        message.channel.send('Pong!');
    },
    async executeSlash(interaction) {
        await interaction.reply('Pong!');
    }
};