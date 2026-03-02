module.exports = {
    name: 'remind',
    description: 'Set a reminder: !remind <seconds> <message>',
    slash: true,
    options: [
        { name: 'seconds', type: 4, description: 'Time in seconds', required: true },
        { name: 'text', type: 3, description: 'Reminder text', required: true }
    ],
    async execute(message, args) {
        const seconds = parseInt(args[0]);
        const text = args.slice(1).join(' ');
        if (isNaN(seconds) || !text) return message.reply('Usage: !remind <seconds> <message>');
        message.reply(`I'll remind you in ${seconds} seconds.`);
        setTimeout(() => {
            message.author.send(`Reminder: ${text}`);
        }, seconds * 1000);
    },
    async executeSlash(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        const text = interaction.options.getString('text');
        await interaction.reply(`I'll remind you in ${seconds} seconds.`);
        setTimeout(() => {
            interaction.user.send(`Reminder: ${text}`);
        }, seconds * 1000);
    }
};