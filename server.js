// load the things we need
var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
const { Pool } = require('pg');
var guts;

var bool = process.env.DATABASE_URL ? true : false;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

if(!bool) {
  guts = {
    connectionString: "postgres://jay:jay_pass@localhost:5432/postgres",
    ssl: bool
  };
} else {
  guts = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false 
    }
  };
}

const pool = new Pool( guts );
pool.on('connect', () => {
  console.log('Connected to DB');
});

// Middleware
var setDropDown = function(req, res, next)  {
  pool.query('SELECT id, name FROM social_media', (error, response) => {
    if (error) throw error;
    console.log("response.rows", response.rows);

    req.locals.dropDown = response.rows;
  });
  next();
}


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.use(setDropDown);

// index page
app.get('/', (req, res) => {
  res.render('pages/index', {
  // mail: mail
  });
  res.end();
});

app.post('/validate', (req, res) => {

  pool.query('SELECT firstName, lastName, password FROM users WHERE username = $1', [req.body.username], (error, response) => {
    if (error) throw error;

    if(req.body.password.trim() === response.rows[0].password.trim()) {

      var name = response.rows[0].firstname + ' ' + response.rows[0].lastname;

      res.render('pages/landing', {
        name: name
      });
      res.end();
      return;
    }
    res.redirect('/');
    return;
  });
  // pool.end();
});

app.get('/register', (req, res) => {

  // pool.query('SELECT id, name FROM social_media', (error, response) => {
  //   if (error) throw error;

  //   if(!response.rows) {
  //     res.redirect('/');
  //     return;
  //   }
  console.log("req.drop-down-menu 2", req.drop_down_menu);

    return res.render('pages/register', {
      socials: locals.dropDown,
    });
    res.end();
  // });
});

app.post('/submit-register', (req, res) => {

  pool.query('SELECT username FROM users', (error, response) => {
    if(error) throw error;

    for(let row of response.rows)  {
      if(req.body.username.trim() === row.username.trim()) {
        pool.query('SELECT id, name FROM social_media', (er, re) => {
          if (er) throw er;

          res.render('pages/register', {
            socials: re.rows,
            message: "Username already in use. Please select another"
          });
          res.end();
          return;
        });
      }
    }


    pool.query('INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [
      req.body.firstname.trim(),
      req.body.lastname.trim(),
      req.body.username.trim(),
      req.body.password.trim()
    ], (error, response) => {
      if(error) throw error;

      pool.end();
      res.redirect('/');
      return;
    });

    return;
  });

});

app.listen(PORT, () => {
  console.log('8080 is the magic port');
});