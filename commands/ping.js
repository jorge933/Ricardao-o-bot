module.exports = async (client,msg) => {
  const m = await msg.channel.send('Ping?');
  return m.edit(`Pong! meu ping é ${m.createdTimestamp - msg.createdTimestamp}ms e o ping da API é ${client.ws.ping}ms`);
}