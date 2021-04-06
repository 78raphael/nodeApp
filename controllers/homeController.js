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

function signIn(req, res) {
  let username = req.body.username,
  password = req.body.password;

  homeModel.verify(username, password, (error, results)  => {

    if(error) {
      res.redirect('/');
      return;
    };

    req.session.user = req.body.username;
    req.session.fullname = results;

    console.log('Signed In');
    res.redirect('/landing');
    return;

  });
}

function showLanding(req, res)  {
  res.render('pages/landing', {
    name: req.session.fullname
  });
  res.end();
  return;
}

function signOut(req, res)  {
  console.log('Signed Out');
  req.session.destroy();
  res.redirect('/');
  return;
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
  signIn: signIn,
  signOut: signOut,
  showRegister: showRegister,
  showLanding: showLanding,
  submitRegistration: submitRegistration
}