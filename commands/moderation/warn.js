const Database = require('../../db/config');

module.exports = async (client, msg, args) => {
    if (!msg.guild.member(msg.author.id).hasPermission("ADMINISTRATOR")) return;

    const db = await Database();
    
    const guild = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);

    if (guild[0].warns2ban !== 'none') {
        const user = msg.mentions.users.first();

        if (!msg.guild.member(user.id)) return msg.channel.send('Não tem ninguem com este nick no servidor');
        if (msg.guild.member(user.id).hasPermission("ADMINISTRATOR") && msg.guild.ownerID !== msg.author.id) return msg.channel.send('Somente o dono do servidor pode aplicar warns em administradores!');
        const warnsUser = await db.all('SELECT * FROM warns WHERE userId = ? AND guildId = ?', [user.id, msg.guild.id]);
        
        if (warnsUser[0].warns < guild[0].warns2ban) {
            const warnsFinal = warnsUser[0].warns + 1;

            if (warnsFinal < guild[0].warns2ban) {
                await db.run('UPDATE warns SET warns = ? WHERE userId = ? AND guildId = ?', [warnsFinal, user.id, msg.guild.id]);

                const warnsBan = guild[0].warns2ban - warnsFinal;
                
                return msg.channel.send(`O ${user} tem ${warnsFinal} warns, e falta ${warnsBan === 1 ? '1 warn' : `${warnsBan} warns`} para ser banido`);
            } else {
                try {
                    await msg.guild.member(user.id).ban();
                    await db.run('DELETE FROM warns WHERE userId = ? AND guildId = ?', [user.id, msg.guild.id]);
                    await msg.channel.send(`${user} alcançou ${guild[0].warns2ban} warns e tomou ban`);
                    return;
                } catch (e) {
                    console.log(e);
                    return msg.channel.send('Erro interno');
                }
            }
        }
    } else return msg.channel.send('Use o comando .set-warns para setar em quantos warns o usuario tomara ban! ex: .set-warns 3');
}