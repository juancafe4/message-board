const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL ||{
  host: 'localhost', 
  user: 'root',
  password: 'admin',
  database: 'testdb' })
connection.connect();

connection.query(`create table users (id int not null auto_increment primary key,
    username varchar(50),
    password varchar(50)`, err => {

    if(err) throw err;
    else {
      connection.query(`insert into users 
        (username, password) 
        VALUES ("juancafe2","admin").
        ("user2","secret"),
        ("user1","secret"),
        ("root","admin"),` , err => {
          if(err) throw err;
        })
    }
    //  console.log('err ', err  )
    // connection.query('select * from city', (err, rows, fields) => {
    //  console.log('rows ', rows )
    // connection.end()
  });
})

module.exports = connection