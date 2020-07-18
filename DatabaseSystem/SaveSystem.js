// var mysql = require('mysql');
// var dotenv = require('dotenv')
// dotenv.config();

// var con = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
// });

// var SetupSQLDatabase = function SetupSQLDatabase() {
//     console.log("SQLServer tried connecting!");
//     con.connect(function (err) {
//         if (err) {
//             console.log("error")
//             throw err;
//         }
//         con.query("CREATE DATABASE IF NOT EXISTS DiscordBotDatabase", function (err, result) {
//             if (err) { throw err };
//             SetupTables();
//         });
//     });
// }

// var pool = mysql.createPool({
//     connectionLimit: 30,
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

// function SetupTables() {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             console.log("error error release"+err);
//             //connection.release();
//             //res.json({ "code": 100, "status": "Error in connection database" });
//             return;
//         }
//         connection.query("CREATE TABLE IF NOT EXISTS UserKarma(UID BIGINT NOT NULL, UserName CHAR(20) NOT NULL,KarmaPoints INT DEFAULT 0, PRIMARY KEY(UID))", function (err, result) {
//             if (err) throw err;
//             console.log("UserKarma table created");
//         });
//         connection.release();
//     });
// }

// var CreateUser = function RegisterNewUser(userInfo) {
//     var playerID = "";
//     return new Promise(resolve => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 connection.release();
//                 res.json({ "code": 100, "status": "Error in connection database" });
//                 resolve("error");
//             } else {
//                 var sql = "INSERT INTO UserKarma(UID,UserName) VALUES ?";
//                 var values = [
//                     [userInfo.ID,userInfo.UserName]
//                 ];
//                 connection.query(sql, [values], function (err, result) {
//                     if (err) throw err;
//                     playerID = result.insertId;
//                     console.log(" New User Added ");
//                     resolve(playerID);
//                 });
//             }
//             connection.release();
//         });
//     });
// }

// var UpdateKarmaPoints = function Update(UID) {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             connection.release();
//             res.json({ "code": 100, "status": "Error in connection database" });
//             return ("error");
//         } else {
//             var sql = "UPDATE UserKarma SET KarmaPoints = KarmaPoints + 1 WHERE UID = ? ";
//             connection.query(sql, [UID], function (err, result) {
//                 if (err) throw err;
//                 console.log(" User's Points Updated"+ result);
//             });
//         }
//         connection.release();
//     });
// }

// var GetTopKarmaUsers = function GetTopKarmaUsers() {
//     return new Promise(resolve => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 connection.release();
//                 res.json({ "code": 100, "status": "Error in connection database" });
//                 resolve("error");
//             } else {
//                 var sql = "SELECT * FROM UserKarma ORDER BY KarmaPoints DESC LIMIT 5";
//                 connection.query(sql, function (err, result) {
//                     if (err) throw err;
//                     console.log("SQL Data stats" + JSON.stringify(result));
//                     if (Object.keys(result).length > 0) {
//                         var Udata = result;
//                         resolve(Udata);
//                     } else {
                        
//                         resolve(null);
//                     }
//                 });
//             }
//             connection.release();
//         });
//     });
// }

// var GetUsersPoints = function GetUserPoints(UID) {
//     return new Promise(resolve => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 connection.release();
//                 res.json({ "code": 100, "status": "Error in connection database" });
//                 resolve("error");
//             } else {
//                 var sql = "SELECT * FROM UserKarma where UID="+UID;
//                 connection.query(sql, function (err, result) {
//                     if (err) throw err;
//                     console.log("SQL Data " + JSON.stringify(result));
//                     if (Object.keys(result).length > 0) {
//                         var Udata = result[0];
//                         resolve(Udata);
//                     } else {
//                         UserID = null;
//                         resolve(UserID);
//                     }
//                 });
//             }
//             connection.release();
//         });
//     });
// }

// module.exports = {
//     GetUsersPoints,
//     GetTopKarmaUsers,
//     UpdateKarmaPoints,
//     CreateUser,
//     SetupSQLDatabase
// }