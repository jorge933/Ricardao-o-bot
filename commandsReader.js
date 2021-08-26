const fs = require("fs");
const dir = "./commands/moderation/";
const dirMusic = "./commands/music/"

module.exports = prefix => {
    var commands = {};

    const scriptsMod = fs.readdirSync(dir);
    scriptsMod.forEach(script => {
        commands[prefix + script.split(".")[0]] = require(dir + script);
    });
    
    const scriptsMus = fs.readdirSync(dirMusic);
    scriptsMus.forEach(script => {
        commands[prefix + script.split(".")[0]] = require(dirMusic + script);
    });

    return commands;
}