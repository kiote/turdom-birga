var express = require('express');
var app = express();
var request = require('request');
var Tour = require('./models/tour');

app.get('/', function (req, res) {
  Tour.find({}, function(err, tours){
    if(err) return res.send(500);
    res.set('Content-Type', 'application/json');
    res.json(tours.map(function(a){
      return {
        id: a._id,
        detail: a.detail,
        price: a.price,
        currency: a.currency,
        from: a.from,
        depart: a.depart,
        arrive: a.arrive,
        days: a.days,
        operator: a.operator,
        phones: a.phones,
        email: a.email
      }
    }))
  })
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!');
});
