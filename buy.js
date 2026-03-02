const db = require('quick.db');
const items = [
    { name: 'VIP', price: 1000 },
    { name: 'Role', price: 500 }
];

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    slash: true,
    options: [
        { name: 'item', type: 3, description: 'Item name', required: true }
    ],
    async execute(message, args) {
        const itemName = args.join(' ');
        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
        if (!item) return message.reply('Item not found');
        const bal = db.get(`balance_${message.author.id}`) || 0;
        if (bal < item.price) return message.reply('Not enough coins');
        db.subtract(`balance_${message.author.id}`, item.price);
        message.channel.send(`You bought ${item.name}!`);
    },
    async executeSlash(interaction) {
        const itemName = interaction.options.getString('item');
        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
        if (!item) return interaction.reply({ content: 'Item not found', ephemeral: true });
        const bal = db.get(`balance_${interaction.user.id}`) || 0;
        if (bal < item.price) return interaction.reply({ content: 'Not enough coins', ephemeral: true });
        db.subtract(`balance_${interaction.user.id}`, item.price);
        await interaction.reply(`You bought ${item.name}!`);
    }
};