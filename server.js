const express = require('express');
const path = require('path');
const session = require('express-session');
var md5 = require('md5');

const homeController = require('./controllers/homeController.js');
const formController = require('./controllers/formController.js');

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

var setHash = function(req, res, next)  {
  let key1 = '2d9106baed378a7a0726505a552e669f';
  let key2 = 'ce01c0d84fcb28013c47bb1881abf9316f0d7b62';
  let ts = new Date();

  req.session.hash = md5(ts+key2+key1);
  req.session.ts = ts;

  next();
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

app.post('/form', verifyLogin, setHash, formController.postForm);


app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});