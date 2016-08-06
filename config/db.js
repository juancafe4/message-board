const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'admin',
  database: 'testdb' })
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