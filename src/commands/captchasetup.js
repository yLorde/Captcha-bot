const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const config = require('../config.js')

module.exports = {
    name: 'captchasetup',
    async execute(message) {

        if (!message.member.permissions.has('ADMINISTRATOR')) return

        const embed = new MessageEmbed()
        .setTitle(config.captcha.title)
        .setDescription(config.captcha.message)

        const button = new MessageButton()
        .setStyle('DANGER')
        .setCustomId('click')
        .setEmoji('🤖')


        await message.channel.bulkDelete(1).then().catch(console.error)
        await message.channel.send({
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        })

    },
}