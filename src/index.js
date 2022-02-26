const { Client, Intents, Collection } = require("discord.js");
const config = require('./config.js')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.commands = new Collection()

require('./run.js')(client)

client.login(config.auth.token)