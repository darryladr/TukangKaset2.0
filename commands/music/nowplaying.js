const functions = require("../../functions");
const config = require("../../config.json");
const Discord = require("discord.js");

var progressBar = function(
		totalTime,
		currentTime,
		barSize = 20,
		line = "▬",
		slider = "🔘"
	) {
		if (!totalTime) {
			throw new Error(
				this.interErrorMsg +
					"The total time is required on the progressBar function."
			);
		}

		if (!currentTime) {
			throw new Error(
				this.interErrorMsg +
					"The current time is required on the progressBar function."
			);
		}

		if (currentTime > totalTime) {
			const bar = line.repeat(barSize + 2);
			const percentage = (currentTime / totalTime) * 100;
			return [bar, percentage];
		} else {
			const percentage = currentTime / totalTime;
			const progress = Math.round(barSize * percentage);
			const emptyProgress = barSize - progress;
			const progressText = line.repeat(progress).replace(/.$/, slider);
			const emptyProgressText = line.repeat(emptyProgress);
			const bar = progressText + emptyProgressText;
			const calculated = percentage * 100;
			return [bar, calculated];
		}
	}

module.exports = {
	name: "nowplaying",
	category: "music",
	aliases: ["np", "current", "currentsong", "cursong"],
	usage: `${config.prefix}nowplaying`,
	description: "Shows current song",
	run: async (client, message, args) => {
		//if not a dj, return error - DISABLED CAUSE NOT NEEDED
		//if (functions.check_if_dj(message))
		//    return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

		//If Bot not connected, return error
		if (!message.guild.me.voice.channel)
			return functions.embedbuilder(client, 5000, message, config.colors.no, "Nothing playing!");

		//if member not connected return error
		if (!message.member.voice.channel)
			return functions.embedbuilder(
				client,
				5000,
				message,
				config.colors.no,
				"`" + message.author.tag + "`" + " You must join a Voice Channel"
			);

		//if they are not in the same channel, return error
		if (message.member.voice.channel.id != message.guild.me.voice.channel.id)
			return functions.embedbuilder(
				client,
				5000,
				message,
				config.colors.no,
				"`" +
					message.author.tag +
					"`" +
					" You must join my Voice Channel: " +
					` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``
			);

		//get the queue
		let queue = client.distube.getQueue(message);

		//if no queue return error
		if (!queue)
			return functions.embedbuilder("null", message, config.colors.no, "There is nothing playing!");

		let queuesong = queue.formattedCurrentTime;
		let song = queue.songs[0];
		const seek =
			(queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
		const left = song.duration - seek;

		let nowPlaying = new Discord.MessageEmbed()
			.setAuthor(`${message.client.user.username}'s Now Playing`, "https://i.imgur.com/joyh0Ti.gif")
			.setTitle(`${song.name}`)
			.setDescription(`[Video URL](${song.url})`)
			.setColor(config.colors.yes)
			.setThumbnail(song.thumbnail)
			.addField(
				"`▶ " +
					new Date(seek * 1000).toISOString().substr(11, 8) +
					" [" +
					progressBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
					"] " +
					(song.duration == 0
						? "◉ LIVE"
						: new Date(song.duration * 1000).toISOString().substr(11, 8)) +
					"`"
			);

		if (song.duration > 0) {
			nowPlaying.setFooter(
				"Time remaining: " + new Date(left * 1000).toISOString().substr(11, 8)
			);
		}

		return message.channel.send(nowPlaying);
	},
};

