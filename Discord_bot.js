const Discord = require('discord.js');
const Tokens = require('./Strings/ServerStrings');
const DatabaseSystem = require('./DatabaseSystem/SaveSystem');
const Command = require('./Response/BotCammands.js');
const client = new Discord.Client();

DatabaseSystem.SetupSQLDatabase();
var generalChannel;

client.login(Tokens.DISCORD_APP_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //ListOfServers();
    generalChannel = client.channels.get(Tokens.GENERAL_CHANNEL_ID);
});

client.on('message',async msg => {
    if (msg.author.username != "Bot_helper") {
        console.log(msg);
        if (msg.type == "GUILD_MEMBER_JOIN") {
            console.log("User Joined" + message.author.username + " " + msg.author.id);
            var userInfo = {
                ID: msg.author.id,
                UserName: message.author.username
            }
            DatabaseSystem.CreateUser(userInfo);
            msg.reply("Welcome");
        } else if (msg.content == 'ping') {
            SendMessageToGeneralChannel("pong");
        } else if (msg.content == '!leaderboard') {
            Command.LeaderBoard();
        } else if (msg.content == '!points') {
            Command.Points(msg.author.id);
        } else if (msg.content == '!help') {
            msg.reply(Command.Help());
        }
    }
});

function SendAttatchment(link) {
    // Provide a path to a local file or link
    const localFileAttachment = new Discord.Attachment(link);
    generalChannel.send(localFileAttachment);
}

function ListOfServers() {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);
        ListOfChannels(guild);

    })
}

function ifTagged(receivedMessage) {
    return receivedMessage.content.includes(client.user.toString())
}
function ListOfChannels(guild) {
    guild.channels.forEach((channel) => {
        console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    })
}

function SendMessageToGeneralChannel(message) {
    generalChannel.send(message);
}