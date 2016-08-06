const fs = require('fs');
const path = require('path')
const dataFilePath = path.join(__dirname, '../data//users.json');
const connection = require('../config/db')


//Create a table of users
// connection.query(`create table if not exists USERS (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   username varchar(50),
//   password  varchar(50)
//   )`, err => {
//     if(err) console.log('table create err: ', err)

//     else {
//       connection.query(`insert into users( username, pasSword)
//                        VALUES
//                        ("user1", "secret"),
//                        ("juancafe2", "admin"),
//                        ("awesome32", "secret"),
//                        ("user2", "secret"),
//                        ("user3", "secret")`, (err, users) => {
//                         // console.log(err || city)
//                         console.log(err || users)
//                         //cb(err, city);
//                     });
//     }
// })


// exports.getUsers = function(cb) {
//   // 1. read the json file tp ge the data
//   // 2. parse the data, to get the array
//   // 3. callback with the array
//   //(if there is an error, callback with error)

//   fs.readFile(dataFilePath, (err, data) => {
//     if (err ) return cb(err, null)
//       console.log('data', data);
    
    
//     let users
//     try {
//       console.log('test 1');
//       users = JSON.parse(data)
//       console.log('test 2');
//       console.log('Data found ',  data , err)
//     } catch(err) {
//       return cb(err)
//     }

//     cb(null, users)
//   });

  // fs.readFile(dataFilePath, (err, buffer) => {
  //   if (err) return cb(err)
  //   let users;
  //   try {
  //     console.log('json users ', dataFilePath)
  //     users = JSON.parse(buffer)
  //   } catch(err) {
  //     cb(err);
  //     return;
  //   }
  //   // we got cats
  //   cb(null, users)
  // });
//}