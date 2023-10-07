const discord = require("discord.js");
const { Player } = require("discord-player");
const { ChatBot: EdgeChatBot } = require("bingai-js");
const { ChatBot: BardChatBot } = require("googlebard-js");
const {
  SpotifyExtractor,
  YouTubeExtractor,
  SoundCloudExtractor,
} = require("@discord-player/extractor");

class discordClient {
  constructor(data) {
    /**
     * data = {
     *      name: str,
     *      prifix: str,
     *      youtube_api_key: str,
     *      __Secure_1PSID,
     *      __Secure_1PSIDTS,
     *      cookie_U : str,
     *      version: str,
     * }
     */
    this.name = data.name;
    this.version = data.version;
    this.ytb_api_key = data.youtube_api_key;
    this.prefix = data.prefix;
    this.client = new discord.Client({
      intents: Object.keys(discord.GatewayIntentBits).map((a) => {
        return discord.GatewayIntentBits[a];
      }),
    });

    this.player = new Player(this.client, {
      ytdlOptions: {
        quality: "highestaudio",
      },
    });

    this.ctrack = {};
    this.ptrack = {};

    this.isloop = {};

    // You can add more colors here
    this.color = [
      0xcd5c5c, 0xff6a6a, 0xee6363, 0xcd5555, 0x8b3a3a, 0xb22222, 0xff3030,
      0xee2c2c, 0xcd2626, 0x8b1a1a, 0xa52a2a, 0xff4040, 0xee3b3b, 0x8b2323,
      0xff8c00, 0xff7f00, 0xee7600, 0xcd6600, 0xff6347, 0xee5c42, 0xff4500,
      0xee4000, 0xff0000, 0xee0000, 0xdc143c, 0xcd3333,
    ];

    const cookie = `__Secure-1PSIDTS=${data.__Secure_1PSIDTS};__Secure-1PSID=${data.__Secure_1PSID}`;

    this.BardChatBot = new BardChatBot(cookie);
    this.EdgeChatBot = new EdgeChatBot(data.cookie_U);
  }

  get_color() {
    var rand = Math.floor(Math.random() * this.color.length);

    return this.color[rand];
  }

  async setup() {
    await this.player.extractors.loadDefault();
    await this.player.extractors.register(SpotifyExtractor, {});
    await this.player.extractors.register(SoundCloudExtractor, {});
    await this.player.extractors.register(YouTubeExtractor, {});
    await this.BardChatBot.getAPI();
  }
}

module.exports = discordClient;
