// const formModel = require("../models/formModel.js");
const publicKey = '2d9106baed378a7a0726505a552e669f';
const attribution = 'Data provided by Marvel. © 2014 Marvel';
const globalUrl = 'http://gateway.marvel.com/v1/public/';

function postForm(req, res) {
  let timestamp = req.session.ts;
  let hash = req.session.hash;

  let topic = req.body.topic,
  subtopic = req.body.subtopic,
  subject = req.body.subject;

  var apiUrl = globalUrl+topic+"?ts="+timestamp+"&apikey="+publicKey+"&hash="+hash;

  console.log("URL: ", apiUrl);

  let result = fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data));

}

module.exports = {
  postForm: postForm
}