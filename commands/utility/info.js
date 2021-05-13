const Discord = require("discord.js");
const config = require("../../config.json");
const { version } = require("discord.js");
module.exports = {
	name: "info",
	category: "utility",
	description: "Sends detailed info about the client",
	usage: `${config.prefix}info`,
	run: async (client, message, args) => {
		let prefix = client.settings.get(message.guild.id, `prefix`);
		if (prefix === null) prefix = config.prefix; //if not prefix set it to standard prefix in the config.json file
		let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		let boch = "";
		if (client.settings.get(message.guild.id, `botchannel`).join("") === "") boch = "not setup";
		else
			for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
				boch += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | ";
			}
		let djs = "";
		if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup";
		else
			for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
				djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | ";
			}
		const embed = new Discord.MessageEmbed()
			.setAuthor(`Information about the ${client.user.username} Bot`, client.user.displayAvatarURL())
			.setColor(config.colors.yes)
			.addFields(
				{
					name: "🤖 Bot Tag",
					value: `**\`${client.user.tag}\`**`,
					inline: true,
				},
				{
					name: "🤖 Bot Version",
					value: `**\`7.0.0\`**`,
					inline: true,
				},
				{
					name: "🤖 Discord.js Version",
					value: `**\`${version}\`**`,
					inline: true,
				},
				{
					name: "⌚️ Uptime",
					value: `**\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\`**`,
					inline: true,
				},
				{
					name: "📶 Ping",
					value: `**\`${client.ws.ping} ms\`**`,
					inline: true,
				},
				{
					name: "\u200b",
					value: `\u200b`,
					inline: true,
				},
				{
					name: "📁 Server count",
					value: `**\`${client.guilds.cache.size}\`**`,
					inline: true,
				},
				{
					name: "📁 Total members",
					value: `**\`${totalMembers}\`**`,
					inline: true,
				},
				{
					name: "📁 Commands Amount",
					value: `**\`${client.commands.map((cmd) => cmd.name).length}\`**`,
					inline: true,
				},
				{
					name: "__**Custom Settings:**__",
					value: `\u200b`,
					inline: false,
				},
				{
					name: "📌 Server Prefix",
					value: `**\`${prefix}\`**`,
					inline: true,
				},
				{
					name: "⏳ Bot Channels",
					value: `**${boch}**`,
					inline: true,
				},
				{
					name: "🎧 DJ-Roles",
					value: `**${djs}**`,
					inline: true,
				},
				{
					name: "⚙️ Amount of Commands used",
					value: `**\`${client.infos.get("global", "cmds")}\`**`,
					inline: true,
				},
				{
					name: "🎧 Amount of Songs played",
					value: `**\`${client.infos.get("global", "songs")}\`**`,
					inline: true,
				},
				{
					name: "🔉 Amount of Filter added",
					value: `**\`${client.infos.get("global", "filters")}\`**`,
					inline: true,
				}
			)
			.addField("\u200b", `\u200b`);
		message.channel.send(embed);
	},
};