module.exports = {
    name: 'stats',
    description: 'Show basic server statistics',
    slash: true,
    async execute(message, args) {
        const { guild } = message;
        message.channel.send(`Server has ${guild.memberCount} members and ${guild.channels.cache.size} channels.`);
    },
    async executeSlash(interaction) {
        const { guild } = interaction;
        await interaction.reply(`Server has ${guild.memberCount} members and ${guild.channels.cache.size} channels.`);
    }
};