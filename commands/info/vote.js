const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "vote",
    aliases: ["rate"],
    category: "info",
    description: "Votes for Musicium",
    usage: `${config.prefix}vote`,
    run: async (client, message, args) => {
        return message.reply(
            new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle("Vote for Musicium")
            .setURL("https://top.gg/bot/769642999227351070/vote")
            .setDescription(`[Every Vote is appreciated THANKS! <3](https://top.gg/bot/769642999227351070/vote)`)
        )
    }
}


