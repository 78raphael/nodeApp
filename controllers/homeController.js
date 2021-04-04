function showHome(req, res) {
  res.render('pages/index', {
    // mail: mail
    });
    res.end();
    return;
}

module.exports = {
  showHome: showHome
}