module.exports = (client, msg, args) => {
    if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.reply('Não tenho autoridade!!');

    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

    if (!args[0]) return msg.channel.send('Informe a quantidade de msgs para apagar!!!');

    if (isNaN(args[0]) && args[0] <= 0) return msg.channel.send('Me informe a quantidade de msgs para apagar corremetamente!!!');

    if (args[0] >= 100) {
        msg.delete()
        return msg.channel.bulkDelete(99, true)
    } else {
        msg.delete()
        return msg.channel.bulkDelete(args[0], true)
    }
}