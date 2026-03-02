module.exports = {
    name: 'poll',
    description: 'Create a poll (comma-separated options)',
    slash: true,
    options: [
        { name: 'question', type: 3, description: 'Poll question', required: true },
        { name: 'options', type: 3, description: 'Comma-separated options', required: true }
    ],
    async execute(message, args) {
        const input = args.join(' ');
        const parts = input.split('|');
        const question = parts[0];
        const opts = parts[1] ? parts[1].split(',').map(o => o.trim()).slice(0, 10) : [];
        if (!question || opts.length === 0) return message.reply('Usage: !poll question | option1, option2, ...');
        let text = `**${question}**\n`;
        for (let i = 0; i < opts.length; i++) text += `${i + 1}. ${opts[i]}\n`;
        const pollMsg = await message.channel.send(text);
        for (let i = 0; i < opts.length; i++) await pollMsg.react(`${i + 1}️⃣`);
    },
    async executeSlash(interaction) {
        const question = interaction.options.getString('question');
        const opts = interaction.options.getString('options').split(',').map(o => o.trim()).slice(0, 10);
        let text = `**${question}**\n`;
        for (let i = 0; i < opts.length; i++) text += `${i + 1}. ${opts[i]}\n`;
        const pollMsg = await interaction.reply({ content: text, fetchReply: true });
        for (let i = 0; i < opts.length; i++) await pollMsg.react(`${i + 1}️⃣`);
    }
};