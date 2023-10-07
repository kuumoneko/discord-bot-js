const { CommandInteraction, Message } = require('discord.js');
const discordClient = require('../../client');
const { conversation_style } = require('bingai-js');

module.exports = get_result;

/**
 * @param {discordClient} client 
 * @param {CommandInteraction} interaction 
 * @param {Message} interaction
 * @param {string} prompt 
 * @param {string} chatbot 
 */
async function get_result(client, interaction, prompt, chatbot) {
    chatbot = chatbot.toLowerCase();
    return new Promise(async (resolve) => {
        try {
            var res = ""
            if (chatbot == "bard") {
                await client.BardChatBot.ask(prompt).then(data => {
                    res = data
                });
            }
            else {
                await client.EdgeChatBot.init()
                if (chatbot == "creative") {
                    res = await client.EdgeChatBot.ask(prompt, conversation_style.creative);
                }
                else if (chatbot == "balanced") {
                    res = await client.EdgeChatBot.ask(prompt, conversation_style.balanced);
                }
                else if (chatbot == "precise") {
                    res = await client.EdgeChatBot.ask(prompt, conversation_style.precise);
                }
                client.EdgeChatBot.close();
            }

            resolve(res)
        }
        catch (e) {
            resolve(e);
        }
    })
}

