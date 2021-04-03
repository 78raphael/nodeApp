const verifyModel = require("../models/verifyModel.js");

function verify(req, res) {
  let username = req.body.username,
  password = req.body.password;

  verifyModel.verifyMod(username, password, (error, results)  => {
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


module.exports = {
  verify: verify
};