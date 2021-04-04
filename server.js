const express = require('express');
const path = require('path');
// const { Pool } = require('pg');

const homeController = require('./controllers/homeController.js');
const verifyController = require('./controllers/verifyController.js');

const PORT = process.env.PORT || 8080;
// var bool = process.env.DATABASE_URL ? true : false;

var app = express();
// var guts;

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// if(!bool) {
//   guts = {
//     connectionString: "postgres://jay:jay_pass@localhost:5432/postgres",
//     ssl: bool
//   };
// } else {
//   guts = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false 
//     }
//   };
// }

// const pool = new Pool( guts );
// pool.on('connect', () => {
//   console.log('Connected to DB');
// });

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));

// index page
app.get('/', homeController.showHome);

app.post('/validate', verifyController.verify);

// app.get('/register', (req, res) => {

//   pool.query('SELECT id, name FROM social_media', (error, response) => {
//     if (error) throw error;

//     if(!response.rows) {
//       res.redirect('/');
//       return;
//     }

//     res.render('pages/register', {
//       socials: response.rows
//     });
//     res.end();
//   });
// });

// app.post('/submit-register', (req, res) => {

//   pool.query('SELECT username FROM users', (error, response) => {
//     if(error) throw error;

//     for(let row of response.rows)  {
//       if(req.body.username.trim() === row.username.trim()) {
//         pool.query('SELECT id, name FROM social_media', (er, re) => {
//           if (er) throw er;

//           res.render('pages/register', {
//             socials: re.rows,
//             message: "Username already in use. Please select another"
//           });
//           res.end();
//           return;
//         });
//       }
//     }


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

// });

app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});