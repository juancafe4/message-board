const fs = require('fs');
const path = require('path')
const uuid = require('uuid')
const dataFilePath = path.join(__dirname, '../data//messages.json');
const moment = require('moment')
const connection = require('../config/db')


exports.remove = function(messageId, cb) {
  connection.query('select * from messages', (err, messages) => {
    cb(err, messages)
  });
  // exports.getAll((err, messages) => {
  //   if(err) return cb(err)
  //   messages = messages.filter(message => message.id !== messageId)
  //   fs.writeFile(dataFilePath, JSON.stringify(messages), err => {
  //     cb(err);
  //   });
  // })
}

exports.getAll = cb => {
  // 1. read the json file tp ge the data
  // 2. parse the data, to get the array
  // 3. callback with the array
  //(if there is an error, callback with error)

  connection.query('select * from messages', (err, messages) => {
    cb(err, messages)
  });
  // fs.readFile(dataFilePath, (err, buffer) => {
  //   if (err) return cb(err)
  //   let messages;
  //   try {
  //     messages = JSON.parse(buffer)
  //   } catch(err) {
  //     cb(err);
  //     return;
  //   }
  //   // we got cats
  //   cb(null, messages)
  // });
}
// Create a message {
//   userID: String,
//   id : String,
//   time: String,
//   message: String 
// }
exports.create = function (data, cb) {
  this.getAll((err, messages) => {
    if (err) return cb(err)
    data.id = uuid.v4()
    data.time = moment().format("YYYY-MM-DD HH:mm");
    console.log('creating data... ', data)
    connection.query(`insert into messages 
      (id,message,time,userId,userName)
      VALUES
      ("${data.id}","${data.message}","${data.time}","${data.userId}","${data.userName}")`, 
      (err, messages) => {
      console.log(err || messages)
      cb(err, data)
    });
  });
  //   messages.push(data)
  //   fs.writeFile(dataFilePath, JSON.stringify(messages), err => {
  //     if (err) return cb(err);
  //     else cb(null, data)
  //   });
  // })
}


exports.update  = function(id, updateObj, cb) {
  this.getAll((err, messages) => {
    //filtering stuff and updating
    if (err) return cb(err);
    let message = messages.filter(val => val.id === id)[0]
    if(!message) return cb({err: "Cat not found."})

    let index = messages.indexOf(message);
    for (let key in message) {
      message[key] = updateObj[key] || message[key];
    }
    message.time = moment().format("YYYY-MM-DD HH:mm");
    messages[index] = message
    fs.writeFile(dataFilePath, JSON.stringify(messages), err => {
      if (err) return cb(err);
      cb(null, message)
    });
  });
}
