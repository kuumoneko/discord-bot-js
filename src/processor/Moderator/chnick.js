const { PermissionFlagsBits, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = chnick_member

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function chnick_member(client, interaction, user, target, nick) {


	var Target = interaction.guild.members.cache.find(member => member.id === target.id);
	var user = interaction.guild.members.cache.find(member => member.id === user.id);

	try {
		if ((user == Target) || (user.roles.highest.position > Target.roles.highest.position && user.permissions.has(PermissionFlagsBits.ManageNicknames) == true)) {
			Target.edit({
				nick: nick,
			});
			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields(
						{
							name: `You have changed nickname of ${Target.displayName} to ${(nick === "") ? "default" : nick}`,
							value: 'Successfully changed',
						}
					)
			]
		}
		else {
			return [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields(
						{
							name: `You can't do this action`,
							value: `Error: Missing permission`,
						}
					)
			]
		}
	}
	catch (e) {
		return [
			new EmbedBuilder()
				.setColor(client.get_color())
				.addFields({
					name: `You can't do this action`,
					value: `Error: ${e}`
				})
		]
	}

}