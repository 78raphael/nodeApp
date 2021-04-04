const homeModel = require("../models/homeModel.js");

function submitRegistration(req, res) {
  let username = req.body.username.trim();

  homeModel.checkUsername(username, (error, results) => {
    if(error) throw error;

    if(results == true) {

      homeModel.getDropDown((error, results) => {
        if (error) throw error;
    
        res.render('pages/register', {
          socials: results,
          message: "Username already in use. Please select another"
        });
        res.end();
        return;
      });

    } else {

      let firstname = req.body.firstname.trim(),
      lastname = req.body.lastname.trim(),
      password = req.body.password.trim();

      homeModel.insertUser(firstname, lastname, username, password, (error, results) => {
        if(error) throw error;

        res.redirect('/');
        return;
      });
    }

  });
}

function showRegister(req, res) {
  homeModel.getDropDown((error, results) => {
    if (error) throw error;

    if(!results) {
      res.redirect('/');
      return;
    }

    res.render('pages/register', {
      socials: results
    });
    res.end();
  });
}

function verifySignIn(req, res) {
  let username = req.body.username,
  password = req.body.password;

  homeModel.verify(username, password, (error, results)  => {
    if(error) {
      res.redirect('/');
      return;
    };

    res.render('pages/landing', {
      name: results
    });
    res.end();
    return;

  });
}

function showHome(req, res) {
  res.render('pages/index', {
    // mail: mail
    });
    res.end();
    return;
}

module.exports = {
  showHome: showHome,
  verifySignIn: verifySignIn,
  showRegister: showRegister,
  submitRegistration: submitRegistration
}