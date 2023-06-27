const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Affiche le detail des commandes disponible sur le serveur.',
    permission:'Aucune',
    dm: true,
    category:'Information',

    options:[{
        type: 'string',
        name: 'commande',
        description: 'La commande à afficher.',
        required: false,
        autocomplete: true
    }],

    async run(bot, message, args) {
        let command;
        if (args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if (!command) return message.reply("Cette commande n'existe pas!");
        }
        if (!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category)
            })


            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes de ${bot.user.username}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Commandes disponibles: \`${bot.commands.size}\` \n Catégories disponibles: \`${categories.length}\``)
                .setTimestamp()
                .setFooter({ text: "commande du bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) });


            await categories.sort().forEach(async cat => {
                let commands = bot.commands.filter(cmd => cmd.category === cat)

                Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
            })

            await message.reply({ embeds: [Embed] })
        } else {
            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes ${command.name}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Nom: \`${command.name}\`\nDescription: \`${command.description}\`\nPermission requise: \` ${typeof command.permissions !== "bigint" ? command.permissions : new Discord.PermissionsBitField(command.permissions).toArray(false)} \` \nCommande en DM : \` ${command.dm ? "Oui" : "Non"} \` \nCatégorie: \`${command.category}\``)
                .setTimestamp()
                .setFooter({ text: "commande du bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) });


            await message.reply({ embeds: [Embed], ephemeral: true })
        }
    }
}