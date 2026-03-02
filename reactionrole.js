const rr = require('../utils/reactionRoles');

module.exports = {
    name: 'reactionrole',
    description: 'Create a reaction role (messageId emoji role)',
    slash: true,
    options: [
        { name: 'messageid', type: 3, description: 'Message ID', required: true },
        { name: 'emoji', type: 3, description: 'Emoji', required: true },
        { name: 'role', type: 8, description: 'Role', required: true }
    ],
    async execute(message, args) {
        const [messageId, emoji, roleMention] = args;
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(roleMention);
        if (!messageId || !emoji || !role) return message.reply('Usage: !reactionrole <messageId> <emoji> <@role>');
        rr.add(message.guild.id, messageId, emoji, role.id);
        message.channel.send('Reaction role added.');
    },
    async executeSlash(interaction) {
        const messageId = interaction.options.getString('messageid');
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');
        rr.add(interaction.guild.id, messageId, emoji, role.id);
        await interaction.reply('Reaction role added.');
    }
};