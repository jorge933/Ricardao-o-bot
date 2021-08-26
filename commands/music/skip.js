const playSong = require('../playSong');

module.exports = async (client, msg, args) => {
    const queue = client.queues.get(msg.guild.id);
    if (msg.member.voice.channel.id === queue.idconn) {
        if (!queue) {
            return msg.reply("não existe nenhuma música sendo reproduzida");
        }

        queue.songs.shift();

        await client.queues.set(msg.guild.id, queue);
        playSong(client, msg, queue.songs[0]);
        return msg.channel.send('Música pulada');
    } else {
        msg.channel.send('Você não pode pular essa música')
    }
}