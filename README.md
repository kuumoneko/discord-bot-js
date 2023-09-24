# Discord bot template using javascript

# Install:

```shell
npm i discordpath-js
```

# Support:

1. Moderator:
```shell
	- ban:					|	ban a member
	- bans:					|   	view baned list 
	- chnick:				|	change nick name a member
	- chrole:				|	change role a member
	- deafen:				|	set deafen a member
	- kick:					|	kick a member
	- mute:					|	set mute a member
	- timeout:				|	set timeout a member
	- undeafen:				|	remove deafen a member
	- unmute:				|	remove mute a member
	- untimeout:				|	remove timeout a member
```

2. Music:
```shell
	- join:					|	join your current voice channel
	- leave:				|   	leave current voice channel
	- nplay:				|	see what track is playing
	- pause:				|	Pause playing
	- play:					|	play an url, find and play from a query
	- queue:				|	see current queue
	- resume:				|	resume playing
	- setloop:				|	set repeated mode for your queue
	- shuffle:				|	shuffle current queue
	- skip:					|	skip current track to next track
	- stop:					|	stop playing and leave voice channel
```

3. Ultility:
```shell
	- ping:					|	get latency of your bot and API
	- status:				|	get bot's status
	- chat:					|	Ask Bing AI or Google Bard
```

# Usage:

1. Create `config.json`

```json
{
  "name": "", (You can use that for your help command)
  "prefix": "Your-prefix", (Only use if you want to use prefix command)

  "token": "Your-Bot-Token",
  "clientId": "Your-Bot-ClientId",

  "YOUTUBE_API_KEY": "Your-Youtube-API-key",

  "cookie_U": "Your-cookie-_U",
  "cookies": Your-Google-Bard-Cookie ,
}
```

2. Run

```shell
  node test/index.js
```

# How to get token and clientID:

1. Token

> Go to https://discord.com/developers/applications/
>
> Chose your discord bot
>
> Chose `Bot`
>
> Chose `Reset Token` and follow the directions, then copy `token`
>
> Go to `config.py`
>
> Paste your Token to variable named `token`

2. CLientID

> Go to https://discord.com/developers/applications/
>
> Chose your discord bot
>
> Copy `application ID` value
>
> Go to `config.py`
>
> Paste your Token to variable named `clientID`

# How to get cookies for ai reponse:

1. Bing AI

> Go to https://bing.com/chat
>
> Run your cookies extension
>
> Copy value of cookies named `_U`
>
> Go to `database/config.json`
>
> Paste the cookies to `cookie_U`

2. Google Bard

> Go to https://bard.google.com/
>
> Run your `cookies extension`
>
> Copy all cookies to JSON to your clipboard
>
> Go to `database/cookies.js`
>
> Paste your cookies to this file

# Get FFMPEG:

> Go to https://ffmpeg.org/download.html
>
> Download latest version for your OS system
>
> Make sure that ffmpeg can run in your terminal or cmd. If you use Windows, you should add to Your environment variables

# Note:

> Before running your bot, please update Bing AI cookies and Google Bard cookies if you don't want to have some error when running:>

# Contributors

</summary>

This project exists thanks to all the people who contribute.

<a href="https://github.com/kuumoneko/discord-bot-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuumoneko/discord-bot-js" />
</a>

</details>
