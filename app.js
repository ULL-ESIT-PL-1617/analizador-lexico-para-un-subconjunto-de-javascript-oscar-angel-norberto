// auth-example.js
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var hash = require('pbkdf2-password')()
var session = require('express-session');
var fs = require('fs-extra');
var util = require("util");
var bcrypt = require("bcrypt-nodejs");

var app = module.exports = express();
var json = fs.readFileSync("./users.json");
var users = JSON.parse(json);
// config
app.set('port', (process.env.PORT || 8080));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware

//app.use(bodyParser(usu));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/public/analizadorCodigo'));
// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// dummy database
/*
var users = {
  tj: { name: 'tj' }
};
*/


//console.log(obj[0].nombre);
// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
/*
hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});
*/

// Authenticate using our plain-object database of doom!

var auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); 
};
/*
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}*/

app.get('/', function(req, res){
  res.redirect('/login');
});

app.get('/analizador', function (req, res) {
  
  res.sendFile(__dirname + '/public/analizadorCodigo/analizador.html');
});
/*
app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});
*/
app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/login', function(req, res){
  
  res.render('login');
});

app.post('/login', function(req, res){
  if (!req.body.username || !req.body.password) {
    console.log('login failed');
    res.send('login failed');    
  } else if(req.body.username in users  && 
            bcrypt.compareSync(req.body.password, users[req.body.username])) {
    req.session.user = req.body.username;
    req.session.admin = true;
    console.log("login success! user "+req.session.user);
    res.redirect('/content');
  } else {
    console.log(`login ${util.inspect(req.body)} failed`);    
    res.send(`login ${util.inspect(req.body)} failed. You are ${req.session.user || 'not logged'}`);    
  }
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/addUser', function (req, res) {
  users[req.body.username] = bcrypt.hashSync(req.body.password);
  fs.outputJsonSync('users.json', users);
  res.redirect('/login');
});


app.get('/content/*?', auth);
 
app.use('/content', express.static(__dirname + '/public'), function (req, res) {
  res.redirect('/index.html');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log('Manual en el puerto: ', app.get('port'));
  });
  console.log('Express started on port 8080');
}