const {
    Interaction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions,
  } = require("discord.js");
  const config = require('../config.js')

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        if (!interaction.isButton()) return

        const cases = {
            click: async () => {
                const { member, guild, channel } = interaction;
                const roleC = guild.roles.cache.get(config.captcha.role)

                try {
                    await member.roles.add(roleC)
                    interaction.reply({
                        content: 'Captcha concluido.',
                        ephemeral: true
                    })
                } catch (err) {
                    if (err) {

                        let titleEr = 'ERRO'

                        if (err.code === 50013) titleEr = 'Missing Permissions'

                        const embedErro = new MessageEmbed()
                        .setTitle(titleEr)
                        .addFields(
                            {
                                name: 'Method',
                                value: `${err.method}`
                            },
                            {
                                name: 'Path',
                                value: `${err.path}`
                            },
                            {
                                name: 'Code',
                                value: `${err.code}`
                            }
                        )
                            if (member.permissions.has('ADMINISTRATOR')) {
                                interaction.reply({
                                    embeds: [embedErro],
                                    ephemeral: true
                                })
                            } else {
                                interaction.reply({
                                    content: 'Ocorreu um erro, informe a Staff.',
                                    ephemeral: true
                                })
                            }
                    }
                }

            }
        }

        const handler = cases[interaction.customId];
        if (handler) await handler();

    },
}