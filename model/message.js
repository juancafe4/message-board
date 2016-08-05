const fs = require('fs');
const path = require('path')
const uuid = require('uuid')
const dataFilePath = path.join(__dirname, '../data//messages.json');
const moment = require('moment')

exports.getAll = cb => {
  // 1. read the json file tp ge the data
  // 2. parse the data, to get the array
  // 3. callback with the array
  //(if there is an error, callback with error)

  fs.readFile(dataFilePath, (err, buffer) => {
    if (err) return cb(err)
    let messages;
    try {
      messages = JSON.parse(buffer)
    } catch(err) {
      cb(err);
      return;
    }
    // we got cats
    cb(null, messages)
  });
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

    messages.push(data)
    fs.writeFile(dataFilePath, JSON.stringify(messages), err => {
      if (err) return cb(err);
      else cb(null, data)
    });
  })
}