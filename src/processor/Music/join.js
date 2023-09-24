const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = join_voice

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function join_voice(client, interaction) {

	const voiceChannel = interaction.member.voice.channel;

	if (voiceChannel) {
		try {
			joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `I have joined a voice channel`,
						value: `Voice channel: ${interaction.member.voice.channel}`,
					})
			]
		}
		catch (e) {
			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `I can't join a voice channel`,
						value: `Error: ${e}`,
					})
			]
		}
	}
	else {
		return [
			new EmbedBuilder()
				.setColor(client.get_color())
				.addFields({
					name: `I can't join a voice channel`,
					value: `Error: Can't find your voice channel`,
				})
		]
	}
}