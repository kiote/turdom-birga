var parser = require('./lib/parser/parse');
var rateGetter = require('./lib/rate_getter');
var Tour = require('./models/tour');
var Rate = require('./models/rate');
var request = require('request');

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

request('http://www.tourdom.ru/birga/go3/', function (error, response, body) {
  if (!error) {
    // clear previously scrapped tours
    Tour.remove({}, function(err, removed){
      console.log('all old tours removed');
    });
  } else {
    console.log(error);
  }
});

// clear rates
Rate.remove({}, function(err, removed){
  console.log('all old rates removed');
});

rateGetter.parse(function(result) {
  new Rate(result).save();
  console.log('rates saved');

  // parse
  parser.parse(function(result, error){
    if (error) {
      console.log(error);
    }
    var tour = new Tour(result);
    tour.convertPrice(result['price'],
                      result['currency'], function(rates) {
      tour.priceRub = rates.priceRub;
      tour.priceUsd = rates.priceUsd;
      tour.priceEur = rates.priceEur;
      var dateArray = tour.depart.split('.');
      var needToSave = true;
      if (dateArray.length > 2) {
        date = new Date(dateArray[2]+'/'+dateArray[1]+'/'+dateArray[0]);
        today = new Date();
        if (date < today) {
          needToSave = false;
        }
      }
      if (needToSave) {
        tour.save();
      }
    });
  });
});
