const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    permission:'Aucune',
    category:'Information',

    async run(bot, message) {
        await message.reply(`Ping : \`${bot.ws.ping}\` ms`)
    }
}