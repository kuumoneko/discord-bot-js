const { CommandInteraction } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player");
const _ = require("lodash");
/**
 *
 * @param {*} client
 * @param {CommandInteraction} interaction
 */
async function playing(client, interaction) {
  const check = useQueue(interaction.guildId);

  var user;
  if (interaction.deferred) {
    user = interaction.user;
  } else {
    user = interaction.author;
  }

  if (check && check.node.isPlaying()) {
    return;
  }

  const player = useMainPlayer();

  while (client.ctrack[interaction.guildId].length > 0) {
    const urrl = client.ctrack[interaction.guildId][0] ?? "None";

    if (urrl === "None") return;

    await player.play(interaction.member.voice.channel, urrl, {
      nodeOptions: {
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 300_000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300_000,
        leaveOnStop: true,
        leaveOnStopCooldown: 300_000,
        maxSize: 1000,
        maxHistorySize: 100,
        volume: 50,
        bufferingTimeout: 3000,
        connectionTimeout: 30000,
        metadata: {
          requestedBy: user,
        },
      },
    });

    await sleep(3000);

    const queue = useQueue(interaction.guildId);
    const curr = queue.currentTrack;

    while (queue.node.isPlaying()) {
      await sleep(100);
    }

    if (client.ctrack[interaction.guildId].length > 0)
      if (
        (await useMainPlayer().search(client.ctrack[interaction.guildId][0]))
          ._data.tracks[0] == curr
      ) {
        if (client.isloop[interaction.guildId] === "2") {
          const first = client.ctrack[interaction.guildId].shift();
          client.ctrack[interaction.guildId].push(first);
        } else if (client.isloop[interaction.guildId] !== "1") {
          const first = client.ctrack[interaction.guildId].shift();
          client.ptrack[interaction.guildId].push(first);
        }
      }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = playing;
