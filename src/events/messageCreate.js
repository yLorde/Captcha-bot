const config = require('../config.js')

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {

        if ( 
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(config.bot.prefix)
        ) return;

        const args = message.content.slice(config.bot.prefix.length).trim().split(/\s+/g)
        const commandName = args.shift().toLowerCase()

        const command = 
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            )

        if (!command) {
            console.log('Nenhum comando carregado!')
            return
        }

        try {
            await command.execute(message, args)
        } catch (err) {
            console.log(err)
            message.reply(`Erro ao executar comando.`)
        }

    },
}