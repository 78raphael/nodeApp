const express = require('express');
const path = require('path');

const homeController = require('./controllers/homeController.js');

const PORT = process.env.PORT || 8080;

var app = express();

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));

// index page
app.get('/', homeController.showHome);
app.get('/register', homeController.showRegister);

app.post('/validate', homeController.verifySignIn);
app.post('/submit-register', homeController.submitRegistration);


//     pool.query('INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [
//       req.body.firstname.trim(),
//       req.body.lastname.trim(),
//       req.body.username.trim(),
//       req.body.password.trim()
//     ], (error, response) => {
//       if(error) throw error;

//       pool.end();
//       res.redirect('/');
//       return;
//     });

//     return;
//   });


app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});