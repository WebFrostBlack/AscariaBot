const Discord = require('discord.js')

module.exports = {
    name: 'info',
    description: 'Affiche les infos du serveur',
    permission:'Aucune',
    category: 'Information',

    async run(bot, message) {
        await message.reply(`** ip :** :construction: En contruction   | **site :** ascaria.fr`)
    }
}