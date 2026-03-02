module.exports = {
    name: 'mute',
    description: 'Mute a member by giving a "Muted" role',
    slash: true,
    options: [
        { name: 'user', type: 6, description: 'Member to mute', required: true },
        { name: 'reason', type: 3, description: 'Reason', required: false }
    ],
    async execute(message, args) {
        if (!message.member.permissions.has('ModerateMembers')) return message.reply('No permission');
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!member) return message.reply('Mention a member');
        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({ name: 'Muted', permissions: [] });
                message.guild.channels.cache.forEach(ch => ch.permissionOverwrites.edit(muteRole, { SendMessages: false, AddReactions: false }));
            } catch (err) {
                console.error(err);
            }
        }
        await member.roles.add(muteRole);
        message.channel.send(`${member.user.tag} has been muted. Reason: ${reason}`);
    },
    async executeSlash(interaction) {
        if (!interaction.member.permissions.has('ModerateMembers')) return interaction.reply({ content: 'No permission', ephemeral: true });
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        let muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!muteRole) {
            muteRole = await interaction.guild.roles.create({ name: 'Muted', permissions: [] });
            interaction.guild.channels.cache.forEach(ch => ch.permissionOverwrites.edit(muteRole, { SendMessages: false, AddReactions: false }));
        }
        await member.roles.add(muteRole);
        await interaction.reply(`${member.user.tag} has been muted. Reason: ${reason}`);
    }
};