const ytdl = require("ytdl-core-discord");

const playSong = async (client, msg, song) => {
    let queue = client.queues.get(msg.member.guild.id);
    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            return client.queues.delete(msg.guild.id);
        }
    }
    if (!msg.member.voice.channel) {
        return msg.reply("você precisa estar em um canal de voz para reproduzir uma música!");
    }
    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            idconn: conn.channel.id,
            dispatcher: null,
            songs: [song],
        };
    }
    queue.dispatcher = await queue.connection.play(
        
        await ytdl(song.url, { highWaterMark: 1 << 75, filter: "audioonly" }),
        {
            type: "opus",
        }
    );
    queue.dispatcher.setVolume(1 / 10);
    msg.channel.send({ content: '``' + queue.songs[0].title + '``' + ' esta sendo reproduzido', files: [queue.songs[0].thumbnail]});
    queue.dispatcher.on("finish", () => {
        queue.songs.shift();
        playSong(client, msg, queue.songs[0]);
    });
    client.queues.set(msg.member.guild.id, queue);
}

module.exports = playSong