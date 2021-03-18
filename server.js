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

// Middleware
// var setParams = function(req, res, next)  {
//   req.item_weight = req.body.item_weight;
//   req.mail_type = req.body.mail_type;
//   req.name = mail[req.body.mail_type];
//   next()
// }


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
// app.use(setParams);

// index page
app.get('/', (req, res) => {
  res.render('pages/index', {
  // mail: mail
  });
  res.end();
});

app.post('/validate', (req, res) => {
  checkUser(req.body.username, req.body.password);


  res.render('pages/landing', {

  });
  res.end();
});

app.listen(PORT, () => {
  console.log('8080 is the magic port');
});

var checkUser = (usr, pass) => {
  console.log("checkUser: ", usr);
  
  pool.query('SELECT firstName, lastName, password FROM users WHERE username = $1', [usr], (err, res) => {
    if (err) throw err; 

    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    pool.end();
  });
}
