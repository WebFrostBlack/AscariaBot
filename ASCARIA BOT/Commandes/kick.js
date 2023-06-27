const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un Membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Moderation',
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false,
            autocomplete: false,
        }
    ],
    async run(bot, message, args) {

            let user = args.getUser('membre')
            if(!user) return message.reply("Pas de membre à kick !")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply('Pas de membre à kick !')

            const reason = args.getString('raison') ?? "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Essaie pas de te kick")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le propriétaire du serveur !")
            if(member && !member.kickable) return message.reply("Je ne peux pas kick cette personne !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick cette personne !")

            try {await user.send(`:hammer: **=>** Tu as été kick du serveur **${message.guild.name}** par __${message.user.tag}__ pour la raison : **__\`${reason}\`__**`)} catch(err) {}

            await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)
    }
}