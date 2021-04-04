const { Pool } = require('pg');
var bool = process.env.DATABASE_URL ? true : false;
var guts;

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

function verify(username, password, callback) {
  pool.query('SELECT firstName, lastName, password FROM users WHERE username = $1', [username], (error, response) => {
    if(error) throw error;

    if(password.trim() === response.rows[0].password.trim())  {
      let name = response.rows[0].firstname + ' ' + response.rows[0].lastname;

      callback(null, name);
    } else {
      callback('Passwords not the same', null);
    }

  });
}

function getDropDown(callback)  {
  pool.query('SELECT id, name FROM social_media', (error, response) => {
    if(error) throw error;

    callback(null, response.rows);
  });
}

function checkUsername(username, callback) {
  let duplicateName = false;

  pool.query('SELECT username FROM users', (error, response) => {
    if(error) throw error;

    for(let row of response.rows)  {
      if(username === row.username.trim()) {
        duplicateName = true;
      }
    }

    callback(null, duplicateName);
  });
}

function insertUser(firstname, lastname, username, password, callback) {
  pool.query('INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, username, password], (error, response) => {
    if(error) throw error;

    callback(null, response.rowCount);
  });
}

module.exports = {
  verify: verify,
  getDropDown: getDropDown,
  checkUsername: checkUsername,
  insertUser: insertUser
}