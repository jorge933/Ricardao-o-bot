module.export = (client, msg, args) => {
    const queue = client.queues.get(msg.guild.id);
    if (msg.member.voice.channel.id === queue.idconn) {
        if (!queue) {
            return msg.reply("não existe nenhuma música sendo reproduzida");
        }
        queue.dispatcher.resume();
        msg.channel.send('Música tocando');
    } else {
        msg.reply('Você não pode executar este comando')
    }
}