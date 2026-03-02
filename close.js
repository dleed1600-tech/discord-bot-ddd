module.exports = {
    name: 'close',
    description: 'Close a ticket channel',
    slash: true,
    async execute(message, args) {
        if (!message.channel.name.startsWith('ticket-')) return message.reply('This is not a ticket channel.');
        await message.channel.delete('Ticket closed');
    },
    async executeSlash(interaction) {
        const channel = interaction.channel;
        if (!channel.name.startsWith('ticket-')) return interaction.reply({ content: 'Not a ticket channel.', ephemeral: true });
        await channel.delete('Ticket closed');
        // can't reply after deletion, so just do nothing
    }
};