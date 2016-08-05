const express = require('express')
const morgan = require('morgan')
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
const app = express()
const users = require('./model/user')
const messages = require('./model/message')
//MIDDLEWARE
app.set('view engine', 'pug') //For which engine for res.render to use
app.set('views', './views') //directory where the pug files are located
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'));

//ROUTES
app.get('/', (req, res, next) => {
  res.render('index', {title: "Message Board"})

});

app.listen(port, err => {
  console.log(err || `Listenning at port ${port}`); 
});

///Get the users 
app.get('/users', (req, res) => {
  users.getUsers((err, data) => {
    console.log('Getting Users...... ', data)
    if (err) res.status(400).send(err)
    else res.send(data)
  })
})

//Create mand create essages 
app.route('/messages')
  //Get all the messages
  .get((req, res) => {
  messages.getAll((err, messages) => {
    res.status(err ? 400 : 200).send(err || messages)
  });
})
  .post((req, res) => {
    messages.create(req.body, (err, message) => {
      res.status(err ? 400 : 200).send(err || message)
    });
  });