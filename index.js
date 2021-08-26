const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'] });
require('dotenv').config();

const prefix   = ".";
const commands = require("./commandsReader")(prefix);

client.commands = new Discord.Collection();
client.queues = new Map();

client.on('ready', () => {
    let number = 1;
    let bios = [
        {
            bio: 'https://github.com/jorge933',
            type: 'PLAYING'
        },
        {
            bio: 'A lindeza da Rafa <3',
            type: 'WATCHING'
        }
    ]

    client.user.setActivity(bios[1].bio, {
        type: bios[1].type
    });

    setInterval(() => {
        if (number === 1) {
            client.user.setActivity(bios[0].bio, {
                type: bios[0].type
            });
            return number += 1;
        } else {
            client.user.setActivity(bios[1].bio, {
                type: bios[1].type
            });
            return number -= 1;
        }
    }, 5000);
    console.log(`bot iniciado com ${client.user.tag}`);
})

client.on("message", async msg => {
    if(!msg.author.bot){
        const args = msg.content.split(" ");
        if (!msg.content.startsWith(prefix)) return;

        const argumentos = msg.content.toLowerCase().slice(prefix.length).trim().split(/ /g);
        argumentos.shift();
        if (commands[args[0]]) commands[args[0]](client, msg, argumentos);
        // msg.guild.channels.create('1', {position: 1, type: 'text'});
    }
});

client.on('channelDelete', channell => {
    channell.guild
})

// events
require('./events/memberEvents')(client);
require('./events/newGuild')(client);
require('./events/roleDelete')(client);
require('./events/channelDelete')(client);

client.login(process.env.token);