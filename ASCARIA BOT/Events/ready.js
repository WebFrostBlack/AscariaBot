const Discord = require('discord.js')
const loadSlashCommands = require('../Loader/loadSlashCommands')
const loadDatabase = require('../Loader/loadDatabase')


module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function (){
        console.log('Base de données connectée au bot !')
    })

    await loadSlashCommands(bot)
    console.log(`${bot.user.tag} est bien en ligne`)
}