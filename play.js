const ytdl = require('ytdl-core');
const music = require('../../utils/music');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube',
    slash: true,
    options: [
        { name: 'url', type: 3, description: 'YouTube URL', required: true }
    ],
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Join a voice channel first.');
        const url = args[0];
        if (!ytdl.validateURL(url)) return message.reply('Invalid URL');
        const songInfo = await ytdl.getInfo(url);
        const song = { title: songInfo.videoDetails.title, url };
        music.execute(message.guild, song);
        message.channel.send(`Queued: ${song.title}`);
    },
    async executeSlash(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: 'Join voice channel first.', ephemeral: true });
        const url = interaction.options.getString('url');
        if (!ytdl.validateURL(url)) return interaction.reply({ content: 'Invalid URL', ephemeral: true });
        const songInfo = await ytdl.getInfo(url);
        const song = { title: songInfo.videoDetails.title, url };
        music.execute(interaction.guild, song);
        await interaction.reply(`Queued: ${song.title}`);
    }
};