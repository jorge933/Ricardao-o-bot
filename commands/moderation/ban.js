module.exports = (client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;
    if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send('Não tenho permissão de banir membros');

    let member2ban = msg.mentions.users.first();

    if (!msg.guild.member(member2ban)) return msg.channel.send("Usuario não encontrado");

    try {
        msg.guild.member(member2ban).ban();
        return msg.channel.send(`Usuario banido, user: ${member2ban}`);
    } catch (e) {
        console.log(e);
        return msg.channel.send(`Erro interno`);
    }
}