const { CommandInteraction } = require('discord.js');
const vocie = require('@discordjs/voice');
module.exports = leave_voice
/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function leave_voice(client, interaction) {
	try {
		temp = vocie.getVoiceConnection(interaction.guild.id)
		if (temp) {
			temp.destroy()

			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `I have leaved current voice channel`,
						value: `Voice channel: <#${temp.joinConfig.channelId}>`,
					})
			]
		}
		else {
			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `I can't leave current voice channel`,
						value: `Error: I'm not in any voice channel`,
					})
			]
		}
	}
	catch (error) {
		return [
			new EmbedBuilder()
				.setColor(client.get_color())
				.addFields({
					name: `I can't leave current voice channel`,
					value: `Error: ${lea.message}`,
				})
		]
	}
}
