const rr = require('../utils/reactionRoles');
module.exports = {
    name: 'messageReactionRemove',
    async execute(client, reaction, user) {
        if (user.bot) return;
        const { message, emoji } = reaction;
        const roleId = rr.get(message.guild.id, message.id, emoji.toString());
        if (roleId) {
            const member = await message.guild.members.fetch(user.id);
            if (member) member.roles.remove(roleId).catch(console.error);
        }
    }
};