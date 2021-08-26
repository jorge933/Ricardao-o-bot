const Database = require('../db/config');

module.exports = client => {
    client.on('channelDelete', async channel => {
        const db = await Database();
        
        const guild = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [channel.guild.id]);
        console.log(guild[0].welcome, channel.id);
        if (guild[0].welcome === channel.id) {
            try {
                await db.run('UPDATE guildManager SET welcome = ? WHERE guildId = ?', ['none', channel.guild.id]);
                return await channel.guild.member(channel.guild.ownerID).send('O canal de boas vindas foi apagado, assim não terá mais mensagens de boas vindas');
            } catch (e) {
                console.log(e);
            }
        } else return;
    })
}