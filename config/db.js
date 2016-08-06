const mysql = require('mysql');

const connection = mysql.createConnection("mysql://ot0iftg11w3xcz4a:vjuxwlijm7tcpjwa@gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/qqds7mdh7z3uj80l")

// or {host: localhost // url of db
// user: root}
// password : process.env.MYSQL_PASSWORD
// db: 'testdb'

connection.connect();

// connection.query(`create table city values (
//                 name varchar(50),
//                 location varchar(50)
//               );`, err => {


//      console.log('err ', err  )
//   connection.query('select * from city', (err, rows, fields) => {
//      console.log('rows ', rows )
//     connection.end()
//   });
// })

module.exports = connection