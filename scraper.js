var parser = require('./lib/parser/parse');
var rateGetter = require('./lib/rate_getter');
var Tour = require('./models/tour');
var Rate = require('./models/rate');

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

// clear previously scrapped tours
Tour.remove({}, function(err, removed){
  console.log('all old tours removed');
});

Rate.remove({}, function(err, removed){
  console.log('all old rates removed');
});

rateGetter.parse(function(result) {
  new Rate(result).save();
  console.log('rates saved');
});

// parse
parser.parse(function(result){

  var tour = new Tour(result);
  tour.calcPriceInRub(result['price'],
                      result['currency']);
  tour.save();
  // calcPriceInUsd(result['price'],
  //                result['currency']);
  // calcPriceInEur(result['price'],
  //                result['currency']);
  console.log(tour);
});
