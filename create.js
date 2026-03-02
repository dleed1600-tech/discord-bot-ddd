module.exports = {
    name: 'ticket',
    description: 'Open a support ticket (creates a private channel)',
    slash: true,
    options: [
        { name: 'reason', type: 3, description: 'Reason or description', required: false }
    ],
    async execute(message, args) {
        const reason = args.join(' ') || 'No reason provided';
        const channel = await message.guild.channels.create({
            name: `ticket-${message.author.username}`,
            type: 0, // GUILD_TEXT
            permissionOverwrites: [
                { id: message.guild.roles.everyone, deny: ['ViewChannel'] },
                { id: message.author.id, allow: ['ViewChannel', 'SendMessages'] }
            ]
        });
        channel.send(`Ticket created by ${message.author}. Reason: ${reason}`);
        message.reply(`Your ticket has been created: ${channel}`);
    },
    async executeSlash(interaction) {
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: 0,
            permissionOverwrites: [
                { id: interaction.guild.roles.everyone, deny: ['ViewChannel'] },
                { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages'] }
            ]
        });
        await channel.send(`Ticket created by ${interaction.user}. Reason: ${reason}`);
        await interaction.reply({ content: `Your ticket: ${channel}`, ephemeral: true });
    }
};