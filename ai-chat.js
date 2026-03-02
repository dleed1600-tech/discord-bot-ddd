const axios = require('axios');

module.exports = {
    name: 'aichat',
    description: 'Chat with AI (placeholder uses OpenAI API)',
    slash: true,
    options: [
        { name: 'prompt', type: 3, description: 'Your message', required: true }
    ],
    async execute(message, args) {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('Provide a prompt');
        // placeholder call
        message.channel.send('AI response: (not implemented)');
    },
    async executeSlash(interaction) {
        const prompt = interaction.options.getString('prompt');
        // call openai if configured
        await interaction.reply('AI response: (not implemented)');
    }
};