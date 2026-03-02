module.exports = {
    name: 'ban',
    description: 'Ban a user',
    slash: true,
    options: [
        { name: 'user', type: 6, description: 'User to ban', required: true },
        { name: 'reason', type: 3, description: 'Reason', required: false }
    ],
    async execute(message, args) {
        if (!message.member.permissions.has('BanMembers')) return message.reply('No permission');
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.reply('Mention a member');
        await user.ban({ reason });
        message.channel.send(`${user.user.tag} was banned. Reason: ${reason}`);
    },
    async executeSlash(interaction) {
        if (!interaction.member.permissions.has('BanMembers')) return interaction.reply({ content: 'No permission', ephemeral: true });
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        await member.ban({ reason });
        await interaction.reply(`${member.user.tag} was banned. Reason: ${reason}`);
    }
};