const express = require('express');
const path = require('path');
const session = require('express-session');

const homeController = require('./controllers/homeController.js');

const PORT = process.env.PORT || 8080;

var app = express();

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//Middleware
var verifyLogin = function(req, res, next) {
  if(req.session.user)  {
    next();
    return;
  }
  res.redirect('/');
  return;
}

var checkLogin = function(req, res, next) {
  if(req.session.user)  {
    res.render('pages/landing', {
      name: req.session.fullname
    });
    res.end();
    return;
  }
  next();
  return;
}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret:'secret123',
  resave: false,
  saveUninitialized: true,
  fullname: null,
  user: null
}));

// index page
app.get('/', checkLogin, homeController.showHome);
app.get('/logout', homeController.signOut);
app.get('/register', homeController.showRegister);
app.get('/landing', verifyLogin, homeController.showLanding);

app.post('/login', homeController.signIn);
app.post('/submit-register', homeController.submitRegistration);


app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});