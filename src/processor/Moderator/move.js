const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = move_member;
/**
 * @param { CommandInteraction } interaction
 */

async function move_member(client, interaction, user, target, channel, reason) {
  try {
    const AuthorMember = interaction.guild.members.cache.find(
      (member) => member.id === user.id
    );
    const targetMember = interaction.guild.members.cache.find(
      (member) => member.id === target.id
    );

    const a = interaction.guild.channels.cache[0];

    const Channel = interaction.guild.channels.cache.find(
      (channell) => channell.name.search(channel) != -1
    );

    if (
      AuthorMember.roles.highest.position > targetMember.roles.highest.position
    ) {
      await targetMember.voice.setChannel(Channel);

      return [
        new EmbedBuilder().setColor(client.get_color()).addFields({
          name: `You have moved ${targetMember.displayName} to ${Channel}`,
          value: `Reason: ${reason}`,
        }),
      ];
    } else {
      return [
        new EmbedBuilder()
          .setDescription(`Remove timeout a member in this server`)
          .setColor(client.get_color())
          .addFields({
            name: `You can't move ${targetMember.displayName} to ${Channel}`,
            value: `Error: Missing permission`,
          }),
      ];
    }
  } catch (e) {
    return [
      new EmbedBuilder().setColor(client.get_color()).addFields({
        name: `You can't do this action`,
        value: `Error: ${e}`,
      }),
    ];
  }
}
