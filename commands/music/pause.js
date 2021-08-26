module.exports = (client, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (msg.member.voice.channel.id === queue.idconn) {
        if (!queue) {
            return msg.reply("não existe nenhuma música sendo reproduzida");
        }
        queue.dispatcher.pause();
        msg.channel.send('Música pausada');
    } else {
        return msg.reply('Você não pode pausar a música');
    }
}