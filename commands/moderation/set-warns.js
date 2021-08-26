const Database = require('../../db/config');

module.exports = async (client, msg, args) => {
    if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;

    const db = await Database();

    const warn = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);

    if (warn[0].warns2ban !== 'none') {
        if (parseInt(args[0]) >= 1 && parseInt(args[0]) <= 20) {
            await db.run('UPDATE guildManager SET warns2ban = ? WHERE guildId = ?', [args[0], msg.guild.id]);
            return msg.channel.send(`Todo usuário que tomar ${args[0]} warns será banido`);
        } else return msg.channel.send('Insira um valor valido de 0 a 20')
    } else {
        if (msg.guild.ownerID !== msg.author.id) return msg.channel.send('Somente o dono do servidor pode atulizar o número de warns!!');

        if (parseInt(args[0]) >= 1 && parseInt(args[0]) <= 20) {
            await db.run('UPDATE guildManager SET warns2ban = ? WHERE guildId = ?', [args[0], msg.guild.id]);
            return msg.channel.send(`Todo usuário que tomar ${args[0]} warns será banido`);
        } else return msg.channel.send('Insira um valor valido de 0 a 20')
    }
}