const db = require('quick.db');

const items = [
    { name: 'VIP', price: 1000 },
    { name: 'Role', price: 500 }
];

module.exports = {
    name: 'shop',
    description: 'View items in the shop',
    slash: true,
    async execute(message, args) {
        let text = 'Shop items:\n';
        items.forEach(i => text += `${i.name} - ${i.price} coins\n`);
        message.channel.send(text);
    },
    async executeSlash(interaction) {
        let text = 'Shop items:\n';
        items.forEach(i => text += `${i.name} - ${i.price} coins\n`);
        await interaction.reply(text);
    }
};