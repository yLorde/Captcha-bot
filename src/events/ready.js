module.exports = {
    name: 'ready',
    async execute(client) {

        console.log('BOT INICIADO')
        client.user.setStatus('dnd')

    },
}