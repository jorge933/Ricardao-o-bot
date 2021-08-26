const Database = require('../../db/config');

module.exports = async (client, msg, argumentos) => {
    if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;

    const roleId = argumentos[0];
    (argumentos);
    if (isNaN(parseInt(roleId))) return msg.reply('Você precisa informar o id do cargo');

    const db = await Database();

    const ExistRole = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);

    if (ExistRole[0].roleMute === 'none') {
        const ExistRole = msg.guild.roles.cache.get(roleId);

        if (ExistRole) {
            await db.run('UPDATE guildManager SET roleMute = ? WHERE guildId = ?', [roleId, msg.guild.id]);
            await db.close()
            return msg.channel.send('Cargo de mute adicionado!');
        } else return msg.channel.send('Este cargo não existe')
    } else {
        if (msg.guild.ownerID !== msg.author.id) return msg.channel.send('Somente o dono do servidor pode atulizar o cargo de mute!!');

        const ExistRole = msg.guild.roles.cache.get(roleId);

        if (ExistRole) {
            await db.run('UPDATE guildManager SET roleMute = ? WHERE guildId = ?', [roleId, msg.guild.id]);
            await db.close()
            return msg.channel.send('Cargo de mute atualizado!');
        } else return msg.channel.send('Este cargo não existe')
    }
}