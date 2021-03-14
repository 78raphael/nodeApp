// load the things we need
var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
const { Pool } = require('pg');
var guts;

// const connectionString = process.env.DATABASE_URL || "postgres://jay:jay_pass@localhost:5432/postgres";
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

pool.query('SELECT * FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
});

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
app.get('/', function(req, res) {
    res.render('pages/index', {
      // mail: mail
    });
    res.end();
});

app.listen(PORT, () => {
  console.log('8080 is the magic port');
});

