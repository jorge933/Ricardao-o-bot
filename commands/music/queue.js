const Discord = require('discord.js');

module.exports = (client, msg, args) => {
    const queue = client.queues.get(msg.guild.id);

    if (!queue) {
        return msg.reply('Nenhuma música tocando');
    }

    let message = ''

    let i = 1;
    
    queue.songs.forEach(video => {
        message += `${i} - ${video.title}, duração: ${video.timestamp}

`
        i++
    });

    const embed = new Discord.MessageEmbed()
        .setColor('#2b5dac')
        .setTitle('Música tocando agora')
        .setDescription(message);

    return msg.channel.send(embed)
}