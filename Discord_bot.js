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

client.on('message', async msg => {
    if (msg.author.username != "Bot_helper") {
        if (msg.type == "GUILD_MEMBER_JOIN") {
            console.log("User Joined" + msg.author.username + " " + msg.author.id);
            var userInfo = {
                ID: msg.author.id,
                UserName: msg.author.username
            }
            DatabaseSystem.CreateUser(userInfo);
            msg.reply("Welcome");
        } else if (msg.content == 'ping') {
            SendMessageToGeneralChannel("pong");
        } else if (msg.content == '!leaderboard') {
            var leaderboardString=await Command.LeaderBoard();
            SendMessageToGeneralChannel(leaderboardString);
        } else if (msg.content == '!points') {
            var messagePoints = await Command.Points(msg.author.id);
            SendMessageToGeneralChannel(messagePoints);
        } else if (msg.content == '!help') {
            msg.reply(Command.Help());
        } else if (msg.content.includes("thank")) {
            //console.log(msg.mentions.users.array()[0]);
            for (var i = 0; i < msg.mentions.users.size; i++) {
                console.log(msg.mentions.users.array()[i].id);
                if (msg.mentions.users.array()[i].id != msg.author.id) {
                    DatabaseSystem.UpdateKarmaPoints(msg.mentions.users.array()[i].id);
                }
            }
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