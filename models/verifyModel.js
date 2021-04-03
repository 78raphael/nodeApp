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

function verifyMod(username, password, callback) {
  pool.query('SELECT firstName, lastName, password FROM users WHERE username = $1', [username], (error, response) => {
    if(error) throw error;

    console.log('rows.password: ', response.rows[0].password.trim());
    console.log('password: ', password);

    if(password.trim() === response.rows[0].password.trim())  {
      let name = response.rows[0].firstname + ' ' + response.rows[0].lastname;

      console.log("name: ", name);

      callback(null, name);
    } else {
      callback('Passwords not the same', null);
    }

  });
}

module.exports = {
  verifyMod: verifyMod
}