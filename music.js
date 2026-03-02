const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const queue = new Map();

module.exports = {
    queue,
    async execute(guild, song) {
        let serverQueue = queue.get(guild.id);
        if (!song) return;
        if (!serverQueue) {
            const voiceChannel = guild.me.voice.channel;
            const player = createAudioPlayer();
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator
            });
            serverQueue = { voiceChannel, connection, songs: [], player };
            queue.set(guild.id, serverQueue);
            serverQueue.songs.push(song);
            this.play(guild, serverQueue.songs[0]);
        } else {
            serverQueue.songs.push(song);
        }
    },
    play(guild, song) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
            serverQueue.connection.destroy();
            queue.delete(guild.id);
            return;
        }
        const stream = ytdl(song.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        serverQueue.player.play(resource);
        serverQueue.connection.subscribe(serverQueue.player);
        serverQueue.player.on(AudioPlayerStatus.Idle, () => {
            serverQueue.songs.shift();
            this.play(guild, serverQueue.songs[0]);
        });
    }
};