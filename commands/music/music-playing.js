const Discord = require('discord.js')

module.exports = (client, msg, args) => {
    const queue = client.queues.get(msg.member.guild.id);
    if (!queue) {
        return msg.reply("não existe nenhuma música sendo reproduzida");
    }
    let ago = queue.songs[0].ago;

    ago = ago.replace('ago', 'atrás');
    ago = ago.replace('day', 'dia')
    ago = ago.replace('days', 'dias');
    ago = ago.replace('week', 'semana');
    ago = ago.replace('weeks', 'semanas');
    ago = ago.replace('month', 'mês');
    ago = ago.replace('months', 'meses');
    ago = ago.replace('year', 'ano');
    ago = ago.replace('years', 'anos');
    const embed = new Discord.MessageEmbed()
        .setColor('#2b5dac')
        .setTitle('Música tocando agora')
        .setDescription(`
Titulo: ${queue.songs[0].title}
Url: ${queue.songs[0].url}
Duração ${queue.songs[0].timestamp}
Postado a ${ago}
Views ${queue.songs[0].views.toLocaleString()}
`)
        .setThumbnail(queue.songs[0].thumbnail);
    msg.channel.send(embed);
}