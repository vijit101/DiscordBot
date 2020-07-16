DatabaseSystem = require('../DatabaseSystem/SaveSystem');
const Discord = require('discord.js');

var LeaderBoard = function LeaderBoard() {
    return new Promise(async resolve => {
        var Udata = await DatabaseSystem.GetTopKarmaUsers();
        var leaderboardData = "";
        leaderboardData = leaderboardData + "Your Gurus Are\n"
        leaderboardData = leaderboardData + "User Name : Karma Points" + "\n";
        for (var i = 0; i < Udata.length; i++) {
            if (Udata[i].KarmaPoints != 0) {
                leaderboardData = leaderboardData + Udata[i].UserName + " : " + Udata[i].KarmaPoints + "\n";
            }
        }
        resolve(leaderboardData);
    });
}

var Points = function Points(UID) {
    return new Promise(async resolve => {
        var data = await DatabaseSystem.GetUsersPoints(UID);
        resolve("Your Karma points are : " + data.KarmaPoints);
    });
}

var Help = function Help() {
    return "here are some Commands You can Try \n* !help\n* !points\n* !leaderboard";
}

var GiveRole = function GiveRole(message) { 
    return new Promise(async resolve => {
        // get roles info from google spreadsheet (load it once only!)
        // decide which is the next role to be granted to the user 
        // verify the user is on the Target Colleges -> GCStudents sheet (they are in GC!)
        // then only give them the cpp-group-X role 
        // write the email id and role given to Daily Updates -> Roles sheet 
        resolve("Granting role!");
    });
}

module.exports = {
    LeaderBoard,
    Points,
    Help,
    GiveRole
}
