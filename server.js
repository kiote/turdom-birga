var express = require('express');
var app = express();
var Tour = require('./models/tour');

app.get('/', function (req, res) {
  Tour.find({}, function(err, tours){
    if(err) return res.send(500);
    res.set('Content-Type', 'application/json');
    var tours = tours.map(function(a){
      return {
        id: a._id,
        detail: a.detail,
        price: a.price,
        priceRub: a.priceRub,
        priceEur: a.priceEur,
        priceUsd: a.priceUsd,
        currency: a.currency,
        from: a.from,
        depart: a.depart,
        arrive: a.arrive,
        days: a.days,
        operator: a.operator,
        phones: a.phones,
        email: a.email,
        type: a.type
      }
    });
    res.json({'tours': tours})
  })
});

const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log('App listening on port' + port +'!');
});
