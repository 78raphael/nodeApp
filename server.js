// load the things we need
var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();

var rates = [{
  "name": "Letters (Stamped)",
  "value": 1,
  "rates": {
    1: "0.55",
    2: "0.75",
    3: "0.95",
    4: "1.15"
  }
},{
  "name": "Letters (Metered)",
  "value": 2,
  "rates": {
    1: "0.51",
    2: "0.71",
    3: "0.91",
    4: "1.11"
  }
},{
  "name": "Large Envelope (Flats)",
  "value": 3,
  "rates": {
    1: "1.00",
    2: "1.20",
    3: "1.40",
    4: "1.60",
    5: "1.80",
    6: "2.00",
    7: "2.20",
    8: "2.40",
    9: "2.60",
    10: "2.80",
    11: "3.00",
    12: "3.20",
    13: "3.40"
  }
},{
  "name": "First-Class Package Service (Retail)",
  "value": 4,
  "rates": {
    1: "4.00",
    2: "4.00",
    3: "4.00",
    4: "4.00",
    5: "4.80",
    6: "4.80",
    7: "4.80",
    8: "4.80",
    9: "5.50",
    10: "5.50",
    11: "5.50",
    12: "5.50",
    13: "6.25"
  }
}]

var setParams = function(req, res, next)  {
  req.item_weight = req.body.item_weight;
  req.mail_type = req.body.mail_type;
  next()
}

function getRate(type, weight)  {
  console.log("type: ", type);
  console.log("weight: ", weight);

  console.log("Rates array: ", rates);
  console.log("Rates value: ", rates[0].value);
  

}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(setParams);

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index', {
      rates: rates
    });
});

app.post('/calculate', (req, res ) =>  {
  getRate(req.mail_type, req.item_weight)

  res.render('pages/rates', {
    item_weight: req.item_weight,
    mail_type: req.mail_type
  });
  res.end();
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(PORT, () => {
  console.log('8080 is the magic port');
});

