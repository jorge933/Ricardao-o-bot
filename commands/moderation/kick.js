module.exports = (client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;
    if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send('Não tenho permissão de kickar membros');

    let membro2kick = msg.mentions.users.first();

    if (!membro2kick) return msg.channel.send("Usuario não encontrado");
    try {
        msg.guild.member(membro2kick).kick();
        return msg.channel.send(`Usuario kickado, user: ${membro2kick}`);
    } catch (e) {
        console.log(e);
        return msg.channel.send(`Erro`);
    }
}