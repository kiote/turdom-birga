const parser = require('./lib/parser/parse');
const rateGetter = require('./lib/rate_getter');
const Tour = require('./models/tour');
const Rate = require('./models/rate');
const request = require('request');

const opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

request('http://www.tourdom.ru/birga/go3/', (error, response, body) => {
  if (!error) {
    // clear previously scrapped tours
    Tour.remove({}, (err, removed) => console.log('all old tours removed'));
  } else {
    console.log(error);
  }
});

// clear rates
Rate.remove({}, (err, removed) => console.log('all old rates removed'));

rateGetter.parse((result) => {
  new Rate(result).save();
  console.log('rates saved');

  // parse
  parser.parse((result, error) => {
    if (error) {
      console.log(error);
    }
    const tour = new Tour(result);
    tour.convertPrice(result['price'],
                      result['currency'], (rates) => {
      tour.priceRub = rates.priceRub;
      tour.priceUsd = rates.priceUsd;
      tour.priceEur = rates.priceEur;
      const dateArray = tour.depart.split('.');
      let needToSave = true;
      if (dateArray.length > 2) {
        date = new Date(dateArray[2]+'/'+dateArray[1]+'/'+dateArray[0]);
        today = new Date();
        if (date < today) {
          needToSave = false;
        }
      }
      if (needToSave) {
        console.log('saved');
        tour.save();
      }
    });
  });
});
