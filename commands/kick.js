module.exports = (client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;

    let membro2kick = msg.mentions.users.first();

    if (!membro2kick) return msg.channel.send("Usuario não encontrado");
    try {
        msg.guild.member(membro2kick).kick();
        return msg.channel.send(`Usuario kickado, user: ${membro2kick}`);
    } catch (err) {
        return msg.channel.send(`Erro: ${err}`);
    }
}