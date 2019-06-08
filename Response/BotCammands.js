DatabaseSystem = require('../DatabaseSystem/SaveSystem');

var LeaderBoard = function LeaderBoard() {
    return new Promise(async resolve => { 
        var Udata=await DatabaseSystem.GetTopKaraUsers();
        resolve(Udata);
    });
}

var Points = function Points(UID) {
    return new Promise(async resolve => { 
        var data=await DatabaseSystem.GetUsersPoints(UID);
        resolve(data);
    });
}

var Help = function Help() {
   return "here are some Commands You can Try";
}

module.exports = {
    LeaderBoard,
    Points,
    Help
}
