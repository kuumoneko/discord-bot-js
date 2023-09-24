const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { get_status, ai, get_ping } = require("../../src/index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ultility")
    .setDescription("Other application from Kurumu")
    .addSubcommand((scm) =>
      scm
        .setName("chat")
        .setDescription("hat with chat bot!")

        .addStringOption((option1) =>
          option1
            .setName("prompt")
            .setDescription("What do you want to ask")
            .setRequired(true)
        )
        .addStringOption((option3) =>
          option3
            .setName("chatbot")
            .setDescription("What chatbot you want to ask?")
            .setRequired(true)
            .addChoices(
              { name: "Bing AI Creative", value: "Creative" },
              { name: "Bing AI Balanced", value: "Balanced" },
              { name: "Bing AI Precise", value: "Precise" },
              { name: "Google Bard", value: "Bard" }
            )
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("help")
        .setDescription("Help for user from kurumu!")
        .addStringOption((command_help) =>
          command_help
            .setName("command_helped")
            .setDescription("What command do you want to help?")
        )
    )
    .addSubcommand((scm) =>
      scm.setName("ping").setDescription("Replies with Pong!")
    )
    .addSubcommand((scm) =>
      scm.setName("status").setDescription("Get status of Kurumu client")
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   */

  async execute(client, interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const scm = interaction.options.getSubcommand();

    var result = "";

    if (scm === "chat") {
      const prompt = interaction.options.getString("prompt");
      const chatbot = interaction.options.getString("chatbot");
      result = await ai(client, interaction, prompt, chatbot);
    } else if (scm === "help") {
      const command_help =
        interaction.options.getString("command_helped") ?? "None";

      var user;

      if (interaction.deferred) {
        user = interaction.user;
      } else {
        user = interaction.author;
      }

      const color = client.get_color();

      if (command_help == "None") {
        const commands = client.client.commands;

        var group_command = [];

        var embeb = new EmbedBuilder();
        embeb.setTitle(`Auto help from ${client.name}`);
        embeb.setDescription("Hello, may I help you?");
        embeb.setColor(color);
        embeb.setThumbnail(user.displayAvatarURL());

        commands.forEach((command) => {
          var value = "";
          if (command.data.options.length > 0) {
            const opts = command.data.options;
            opts.forEach((scm) => {
              value += "`" + `${scm.name}` + "` ";
            });
            const moi = command.data.name.slice(1);
            embeb.addFields({
              name: `${command.data.name[0].toUpperCase()}${command.data.name.slice(
                1
              )}:`,
              value: value,
            });
          }
        });

        // for (const folder in commandFolders) {

        //     const group_command = commands[commandFolders[Number(folder)]]

        //     if (commandFolders[folder].toLowerCase() == 'test')
        //         continue;

        //     var value = ''
        //     group_command.forEach(command => {
        //         value += "`" + `${command.name}` + "` ";
        //     })

        //     embeb.addFields({
        //         name: `${commandFolders[folder]}:`,
        //         value: value,
        //     });
        // }

        result = [embeb];
      } else {
        var command = "";
        await search(client, interaction, command_help).then((data) => {
          command = data;
        });

        if (command === "Not found") {
          result = [
            new EmbedBuilder().setColor(client.get_color()).addFields({
              name: `Error:`,
              value: `404 Not Found`,
            }),
          ];
        } else {
          const command_data = command;

          const commandss = command_data.command;
          const def_perm = commandss.data.default_member_permissions ?? 0;
          var def_mem_perm_arr;

          if (def_perm !== 0) {
            const def_mem_perm = new PermissionsBitField(
              BigInt(Number(def_perm))
            );
            def_mem_perm_arr = def_mem_perm.toArray();
          } else {
            def_mem_perm_arr = [
              `You don't need any permission for this command`,
            ];
          }
          var permss = "";

          def_mem_perm_arr.forEach((perm) => {
            permss += "`" + `${perm}` + "` ";
          });

          const commandd = command_data.scm;
          const command_name = commandd.name;
          const desc = commandd.description;
          const opts = commandd.options;

          var embebs = [];

          embebs.push(
            new EmbedBuilder()
              .setTitle("Auto help from Kurumu for `" + `${command_name}` + "`")
              .setDescription(`Hello, May I help you?`)
              .setColor(color)
              .setThumbnail(user.displayAvatarURL())
              .addFields([
                {
                  name: `Name:`,
                  value: `> ${command_name}`,
                },
                {
                  name: `Description:`,
                  value: `> ${desc}`,
                },
                {
                  name: `Permission:`,
                  value: `> ${permss}`,
                },
                {
                  name: `Options:`,
                  value: `> ${opts.length}`,
                },
              ])
          );

          opts.forEach(
            /**
             * @param {} opt
             */
            function (opt) {
              var temp = Object.getPrototypeOf(opt).constructor.name;
              temp = temp.replace("SlashCommand", "");
              temp = temp.replace("Option", "");

              var embeb = new EmbedBuilder()
                .setTitle("Option: `" + `${opt.name}` + "`")
                .setColor(color)
                .addFields([
                  {
                    name: `Description:`,
                    value: `${opt.description}`,
                  },
                  {
                    name: `Type:`,
                    value: `${temp}`,
                  },
                  {
                    name: `Required:`,
                    value: opt.required ? "true" : "false",
                  },
                ]);

              if (opt.choices != undefined) {
                var temp = "";
                opt.choices.forEach((choice) => {
                  temp += choice.name + "\n";
                });

                embeb.addFields({
                  name: `Choices:`,
                  value: temp,
                });
              }

              embebs.push(embeb);
            }
          );
          result = embebs;
        }
      }
    } else if (scm === "ping") {
      result = await get_ping(client, interaction);
    } else if (scm === "status") {
      result = await get_status(client, interaction);
    }

    if (result !== "") {
      await interaction.followUp({
        embeds: result,
        ephemeral: true,
      });
    }
  },
};

async function search(client, interaction, command_help) {
  return new Promise((resolve) => {
    const commands = client.client.commands;

    var chill = "Not found";
    commands.forEach((command) => {
      command.data.options.forEach((scm) => {
        const moi = scm.name === command_help;
        if (scm.name === command_help) {
          chill = {
            command: command,
            scm: scm,
          };
        }
      });
    });

    resolve(chill);
  });
}
