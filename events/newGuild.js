const Database = require('../db/config');

module.exports = client => {
    client.on('guildCreate', async guild => {
        try {
            const db = await Database();
            await db.run('INSERT INTO guildManager(guild, guildId, welcome, warns2ban, roleMute, roleInit) VALUES(?, ?, ?, ?, ?, ?)', [guild.name, guild.id, 'none', 'none', 'none', 'none']);
            return guild.member(guild.ownerID).send(`Complete a minha configuração no servidor ${guild.name} usando o comando .complete-config`);
        } catch (e) {
            console.log(e);
        }
    })
}