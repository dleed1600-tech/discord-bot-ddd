const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'warn',
    description: 'Warn a user',
    slash: true,
    options: [
        { name: 'user', type: 6, description: 'User to warn', required: true },
        { name: 'reason', type: 3, description: 'Reason for warning', required: false }
    ],
    async execute(message, args) {
        if (!message.member.permissions.has('ModerateMembers')) return message.reply('No permission');
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.reply('Mention a user');
        // store warn in DB or quick.db
        message.channel.send(`${user} has been warned. Reason: ${reason}`);
    },
    async executeSlash(interaction) {
        if (!interaction.member.permissions.has('ModerateMembers')) return interaction.reply({ content: 'No permission', ephemeral: true });
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        await interaction.reply(`${user} has been warned. Reason: ${reason}`);
    }
};