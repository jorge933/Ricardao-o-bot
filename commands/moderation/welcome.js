const Database = require('../../db/config');

module.exports = async (client, msg, args) => {
    if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;
    const db = await Database();

    const Channel = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);

    if (Channel[0].welcome === 'none') {
        const ExistChannel = msg.guild.channels.resolve(args[0]);

        if (ExistChannel) {
            await db.run('UPDATE guildManager SET welcome = ? WHERE guildId = ?', [args[0], msg.guild.id]);
            await db.close()
            return msg.channel.send('Canal de boas vindas adicionado!');
        } else return msg.channel.send('Este canal não existe');
    } else {
        if (msg.guild.ownerID !== msg.author.id) return msg.channel.send('Somente o dono do servidor pode atualizar o canal de boas vindas');

        const ExistChannel = msg.guild.channels.resolve(args[0]);

        if (ExistChannel) {
            await db.run('UPDATE guildManager SET welcome = ? WHERE guildId = ?', [args[0], msg.guild.id]);
            await db.close()
            return msg.channel.send('Canal de boas vindas atualizado!');
        } else return msg.channel.send('Este canal não existe');
    }
}