const Database = require('../db/config');

module.exports = client => {
    client.on('roleDelete', async role => {
        const db = await Database();

        const roles = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [role.guild.id]);

        console.log(role.guild.member(role.guild.ownerId));
        
        if (roles[0].roleInit === role.id) {
            await db.run('UPDATE guildManager SET roleInit = ? WHERE guildId = ?', ['none', role.guild.id]);
            return await role.guild.member(role.guild.ownerID).send(`O cargo de quando entra um novo membro no servidor ${role.guild.name} foi apagado, assim o comando de mute estará indisponivel`);
        } else if (roles[0].roleMute === role.id) {
            await db.run('UPDATE guildManager SET roleMute = ? WHERE guildId = ?', ['none', role.guild.id]);
            return await role.guild.member(role.guild.ownerID).send(`O cargo de mute do servidor ${role.guild.name} foi apagado, assim o comando de mute estará indisponivel`);
        }
    })
}