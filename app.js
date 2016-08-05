const express = require('express')
const app = express()
const port = process.env.PORT || 8000

//MIDDLEWARE
app.set('view engine', 'pug') //For which engine for res.render to use
app.set('views', './views') //directory where the pug files are located
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'));

//ROUTES
app.get('/', (req, res, next) => {

});
app.listen(port, err => {
  console.log(err || `Listenning at port ${port}`); 
});