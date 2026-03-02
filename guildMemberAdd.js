module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        // welcome message
        const channel = member.guild.systemChannel;
        if (channel) channel.send(`Welcome <@${member.id}> to the server!`);
        // auto-role
        const role = member.guild.roles.cache.find(r => r.name === 'Member');
        if (role) member.roles.add(role).catch(console.error);
    }
};