const path = require('path')
const fs = require('fs')

module.exports = async client => {

    for (const file of fs.readdirSync(path.join(__dirname, "./events"))) {
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    }

    for (const file of fs.readdirSync(path.join(__dirname, "./commands"))) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

}