const search = require("yt-search");
const playSong = require('../playSong');

module.exports = (client, msg, args) => {

    const s = args.join(" ");

    msg.channel.send('🔎 **Buscando por:** ' + '``' + s + '``');

    try {
        search(s, (err, result) => {
            if (err) {
                throw err;
            } else if (result && result.videos.length > 0) {
                const song = result.videos[0];
                const queue = client.queues.get(msg.guild.id);
                if (queue) {
                    if (msg.member.voice.channel.id !== queue.idconn) return msg.channel.send('Para adicionar uma música na fila você precisa estar no mesmo canal que o bot está!')
                    queue.songs.push(song);
                    const musics = queue.songs.length - 1
                    msg.channel.send('``' + song.title + '``' + ` **foi adicionado na fila e tem ${musics === 1 ? '1 música' : `${musics} músicas`}  na frente**`, {files: [queue.songs[queue.songs.length - 1].thumbnail]});
                    client.queues.set(msg.guild.id, queue);
                } else playSong(client, msg, song);
            } else {
                return msg.reply("desculpe, não encontrei o que você desejava!");
            }
        });
    } catch (e) {
        console.error(e);
    }
}