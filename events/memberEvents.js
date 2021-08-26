const Database = require('../db/config');

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const db = await Database();
        const ExistChannel = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [member.guild.id]);

        if (ExistChannel[0].welcome !== 'none') {
            let image = Math.floor(Math.random() * 7);
            for (let i = 0; image !==  ExistChannel[0].lastImg && image !==  0; i++) {
                if (image === ExistChannel[0].lastImg) image = Math.floor(Math.random() * 7);

                if (image !== ExistChannel[0].lastImg) break;
            }
            await db.run('UPDATE guildManager SET lastImg = ? WHERE guildId = ?', [image, member.guild.id])
            await member.guild.channels.cache.get(ExistChannel[0].welcome.toString()).send(`${member.user} Bem vindo ao inferno aqui só tem louco retardado da cebça`, {files: [`./img/${image}.png`]});
        }

        if (ExistChannel[0].roleInit !== 'none') {
            await member.roles.add(ExistChannel[0].roleInit); 
        }

        const user = await db.all('SELECT * FROM users WHERE userId = ?', [member.user.id]);
        const userWarns = await db.all('SELECT * FROM warns WHERE userId = ? AND guildId = ?', [parseInt(member.user.id), parseInt(member.guild.id)]);

        if (user.length === 0) await db.run('INSERT INTO users(user, userId) VALUES(?, ?)', [member.user.username, member.user.id]);
        if (userWarns.length === 0) await db.run('INSERT INTO warns(user, userId, warns, guild, guildId) VALUES(?, ?, ?, ?, ?)', [member.user.username, member.user.id, 0, member.guild.name, member.guild.id]);
        return;
    })
}