module.exports = {
    name: 'kick',
    description: 'Kick a user',
    slash: true,
    options: [
        { name: 'user', type: 6, description: 'User to kick', required: true },
        { name: 'reason', type: 3, description: 'Reason', required: false }
    ],
    async execute(message, args) {
        if (!message.member.permissions.has('KickMembers')) return message.reply('No permission');
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.reply('Mention a member');
        await user.kick(reason);
        message.channel.send(`${user.user.tag} was kicked. Reason: ${reason}`);
    },
    async executeSlash(interaction) {
        if (!interaction.member.permissions.has('KickMembers')) return interaction.reply({ content: 'No permission', ephemeral: true });
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        await member.kick(reason);
        await interaction.reply(`${member.user.tag} was kicked. Reason: ${reason}`);
    }
};