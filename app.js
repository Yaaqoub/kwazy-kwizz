const createError = require('http-errors');
const express = require('express');
const consign = require('consign');
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const env = require('dotenv').load();

var cors = require('cors')

let app = express();

let dbconf = require('./config/db.config');

app.use(cors())
app.set('secretKey', process.env.JWT_ENCRYPTION); // jwt secret token

// Schemas 
User = require('./models/user');
Quizz = require('./models/quizz');

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


consign(config.consign)
  .include('config')
  .then('controllers')
  .then('routes')
  .into(app);

// The main page
app.get('/', function(req, res) {
  res.send('Kahoot Look Alike API.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  let errorMessage = {};
  errorMessage.message = err.message;
  errorMessage.error = req.app.get('env') === 'development' ? err : {};

  errorMessage.status = err.status || 500;

  res.json(errorMessage);
});


app.listen(3000, function(){
  console.log('app running on port 3000')
})

module.exports = app;