module.exports = {
    name: 'aiimage',
    description: 'Generate an image with AI (placeholder)',
    slash: true,
    options: [
        { name: 'prompt', type: 3, description: 'Image prompt', required: true }
    ],
    async execute(message, args) {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('Provide a prompt');
        message.channel.send('Generated image: (not implemented)');
    },
    async executeSlash(interaction) {
        const prompt = interaction.options.getString('prompt');
        await interaction.reply('Generated image: (not implemented)');
    }
};