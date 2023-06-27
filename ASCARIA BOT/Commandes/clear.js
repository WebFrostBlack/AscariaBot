const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Clear des messages",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category:'Moderation',
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages a supprimer",
            required: true,
            autocomplete: false,
        },{
            type: "channel",
            name: "salon",
            description: "Le salon où effacer les messages",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args){
        let channel = args.getChannel('salon')
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon !")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il faut un nombre compris entre `0` et `100` inclus !")

        await message.deferReply({ ephemeral: true })

        try{

            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `\`${messages.size}\` messages ont bien été supprimés dans le salon ${channel}!`, ephemeral: true})



        }catch (err){

            let messages = [...(await channel.messages.fetch()).filter(msg => !message.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.followUp("Aucun message supprimé car ils datent tous de plus de 14 jours !")
            await channel.bulkDelete(messages)
            return message.followUp({content:`J'ai pu supprimer uniquement ${messages.length} messages dans le salon ${channel} car les autres dataient de plus de 14 jours !`,ephemeral : true})
        }
        
    }
}

