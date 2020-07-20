const Discord = require('discord.js');
// const DatabaseSystem = require('./DatabaseSystem/SaveSystem');
const Command = require('./Response/BotCammands.js');

const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();

//DatabaseSystem.SetupSQLDatabase();
//var generalChannel;

client.login(process.env.DISCORD_APP_TOKEN); 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    //generalChannel = client.channels.get(process.env.GENERAL_CHANNEL_ID);
});

client.on('message', async msg => {
    if (msg.author.username != "Bot_helper") {
        // if (msg.type == "GUILD_MEMBER_JOIN") {
        //     console.log("User Joined" + msg.author.username + " " + msg.author.id);
        //     var userInfo = {
        //         ID: msg.author.id,
        //         UserName: msg.author.username
        //     }
        //     DatabaseSystem.CreateUser(userInfo);
        //     msg.reply("Welcome! Please introduce yourself to the rest of the clan.");
        // } 
        if (msg.content == 'ping') {
            SendMessageToChannel("pong",msg.channel.id);
        } 
        // else if (msg.content == '!leaderboard') {
        //     var leaderboardString = await Command.LeaderBoard();
        //     SendMessageToChannel(leaderboardString,msg.channel.id);
        // } 
        // else if (msg.content == '!points') {
        //     var messagePoints = await Command.Points(msg.author.id);
        //     SendMessageToChannel(messagePoints,msg.channel.id);
        // } 
        else if (msg.content == '!help') {
            msg.reply(Command.Help());
        } 
        else if (msg.content.startsWith("!giverole") && msg.channel.name === "bot"){
            if(msg.member.roles.cache.some(role => role.name === 'team')) { 
                // command as !giverole discordId,discordId roleId
                var splitMsgContents = msg.content.split(" ");    // splitting command contents 
                var allStudentId = splitMsgContents[1];           // All discord ID's
                var batchID = splitMsgContents[2];                // roleId to assign
                var studentIdList = allStudentId.split(",");
                const roleToAssign = msg.guild.roles.cache.find(role=>role.id == batchID);
                //console.log(splitMsgContents);
                //console.log(studentIdList.length);
                for(var i = 0 ;i<studentIdList.length;i++){
                    var studentmember = msg.guild.members.cache.find(member=>member.id == studentIdList[i]); //find from discord id which member of discord 
                    studentmember.roles.add(roleToAssign);
                    msg.reply("student : "+studentmember.displayName+" is assigned to role " + roleToAssign.name); 
                }               
                // old code             
                //const studentmember = msg.guild.members.cache.find(member=>member.id == studentId);
                //console.log(studentmember.nickname);             
                //studentmember.roles.add(roleToAssign);    
                //msg.member.roles.add(roleToAssign);           
                //var reply = await Command.GiveRole(msg,splitMsgContents[1],splitMsgContents[2]);
                //msg.reply("student : "+studentmember.displayName+" is assigned to role " + roleToAssign.name);
            }
        }
        else if (msg.content.startsWith("!showid") && msg.channel.name === "bot") {           
            msg.reply("Your Discord Id is : " + msg.author);    
            //SendMessageToChannel(reply, msg.channel.id);       
        }
        // else if (msg.content.includes("thank")) {
        //     //console.log(msg.mentions.users.array()[0]);
        //     for (var i = 0; i < msg.mentions.users.size; i++) {
        //         console.log(msg.mentions.users.array()[i].id);
        //         if (msg.mentions.users.array()[i].id != msg.author.id) {
        //             DatabaseSystem.UpdateKarmaPoints(msg.mentions.users.array()[i].id);
        //             SendMessageToChannel("Karma point awarded to:" + msg.mentions.user.array()[i].id,msg.channel.id);
        //         }
        //     }
        // }
    }
}); 

// function SetupBotForChannel(msg){
//     for (var i = 0; i < msg.channel.members.size; i++) {
//         var userInfo = { };
//         if(msg.channel.members.array()[i].nickname!=null){
//             console.log(msg.channel.members.array()[i].nickname)
//             userInfo = {
//                 ID: msg.channel.members.array()[i].user.id,
//                 UserName: msg.channel.members.array()[i].nickname
//             }
//         }else{
//             console.log(msg.channel.members.array()[i].user.username);
//             userInfo = {
//                 ID: msg.channel.members.array()[i].user.id,
//                 UserName: msg.channel.members.array()[i].user.username
//             }
//         }
//         DatabaseSystem.CreateUser(userInfo);
//     }
// }

// function SendAttatchment(link) {
//     // Provide a path to a local file or link
//     const localFileAttachment = new Discord.Attachment(link);
//     generalChannel.send(localFileAttachment);
// }

// function ListOfServers() {
//     // List servers the bot is connected to
//     console.log("Servers:")
//     client.guilds.forEach((guild) => {
//         console.log(" - " + guild.name);
//         ListOfChannels(guild);

//     })
// }

// function ifTagged(receivedMessage) {
//     return receivedMessage.content.includes(client.user.toString())
// }
function ListOfChannels(guild) {
    guild.channels.forEach((channel) => {
        console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    })
}

function SendMessageToChannel(message,channelID) {
    client.channels.cache.get(channelID).send(message);
}