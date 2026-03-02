module.exports = {
    name: 'guildMemberRemove',
    async execute(client, member) {
        const channel = member.guild.systemChannel;
        if (channel) channel.send(`${member.user.tag} has left the server.`);
    }
};