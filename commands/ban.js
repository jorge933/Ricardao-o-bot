module.exports = (client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;

    let member2ban = msg.mentions.users.first();

    if (!msg.guild.member(member2ban)) return msg.channel.send("Usuario não encontrado");

    try {
        msg.guild.member(member2ban).ban();
        return msg.channel.send(`Usuario banido, user: ${member2ban}`);
    } catch (err) {
        return msg.channel.send(`Erro: ${err}`);
    }
}