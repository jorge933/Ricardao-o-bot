const Database = require('../../db/config')

module.exports = async (client, msg, args) => {
    if (!msg.guild.member(msg.author.id).hasPermission("ADMINISTRATOR")) return;

    const db = await Database();

    const ExistRole = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);
    await db.close();
    
    if (ExistRole[0].roleInit, ExistRole[0].roleMute !== 'none') {
        let user = msg.mentions.users.first();
        
        if (user) {
            if (!msg.guild.member(user).roles.cache.has(ExistRole[0].roleMute)) return msg.channel.send('O usuario não esta mutado!');

            try {
                await msg.guild.member(user.id).roles.remove(ExistRole[0].roleMute);
                return msg.channel.send(`O usuario ${user} foi desmutado`);
            } catch (e) {
                console.log(e);
            }
        } else return msg.channel.send('Mencione o usuario que você quer mutar');
    } else return msg.channel.send('A configuração para este cargo não está completa, para saber oque falta use o comando .complete-config');
}