const Database = require('../db/config');

module.exports = async (client, msg, args) => {
    if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;
    const db = await Database();

    const config = await db.all('SELECT * FROM guildManager WHERE guildId = ?', [msg.guild.id]);

    let message = ``;
    const line = `

`;
    if (config[0].welcome === 'none') message += `Canal de mensagem de boas vindas(onde será enviada as mensagens de boas vindas para os novos membros, caso ja tenha use o comando .welcome junto do id do canal, ex: .welcome 12345), **OBS: DEIXE QUE SÓ O BOT ENVIE MENSAGENS NESSE CANAL** ${line}`;

    if (config[0].warns2ban === 'none') message += `Número de warns até o ban(caso seja 5, quando o membro chegar em 5 warns ele leva ban, pode ser setado com o comandos .warn-ban 5) ${line}`;

    if (config[0].roleInit === 'none') message += `Crie um cargo e de permissões do everyone para ele, e o everyone não deixe enviar mensagens, caso ja tenha use o comando .welcome junto do id do canal, ex: .role-init 12345`;

    if (config[0].roleMute === 'none') message += `Crie um cargo e não de permissões dele enviar mensagens em todos canais de texto, depois use o comando .mute-role junto do id do cargo, ex: .mute-role 123456`;

    if (message === '') message = `Configuração completa, só tenho 2 palavras para você para bens`;


    return msg.channel.send(message)
}