const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
module.exports = {
	name: "developer",
    category: "info",
	aliases: ["dev", "darryl"],
	description: "Shows Information about the Developer",
	usage: `${config.prefix}developer`,
	run: async (client, message, args) => {
			message.channel.send(
				new MessageEmbed()
					.setColor(config.colors.yes)
					.setFooter(`${client.user.username} | @darryladr`, client.user.displayAvatarURL())
					.setTimestamp()
					.setThumbnail("https://avatars.githubusercontent.com/u/73455541?v=4")
					.setTitle("Darryl#1376 | Computer Science Student at BINUS University")
					.setURL("https://github.com/darryladr")
					.setDescription(
						"Hi 👋 My name is Darryl Surya Adriansyah\nI am a 18 yo Developer from Indonesia\nI am a Computer Science Student at BINUS University\nHope you like this bot!"
					)
			);
	}
}