var mongoose = require('mongoose');
var Rate = require('./rate');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject'
mongoose.connect(mongoUri);

var tourSchema = mongoose.Schema({
  detail: String,
  price: String,
  currency: String,
  from: String,
  depart: String,
  arrive: String,
  days: String,
  operator: String,
  phones: String,
  email: String,
  type: String,
  priceRub: Number,
  priceUsd: Number,
  priceEur: Number
});

var getCurrency = function(currency) {
  switch (currency) {
    case '€':
      return 'eur';
    case '$':
      return 'usd';
    default:
      return 'rub';
  }
};

tourSchema.methods.convertPrice = function (price, currency, callback) {
  currency = getCurrency(currency);
  var price = parseFloat(price);
  Rate.find({}, function(err, rates){
    rates = rates[0];
    if (currency == 'rub') {
      rates.priceRub = Number(parseFloat(price).toFixed(2));
      rates.priceUsd = Number((parseFloat(rates.rub.usd.value) * parseFloat(price)).toFixed(2));
      rates.priceEur = Number((parseFloat(rates.rub.eur.value) * parseFloat(price)).toFixed(2));
    } else if (currency == 'usd') {
      rates.priceUsd = Number(parseFloat(price).toFixed(2));
      rates.priceEur = Number((parseFloat(rates.usd.eur.value) * parseFloat(price)).toFixed(2));
      rates.priceRub = Number((parseFloat(rates.usd.rub.value) * parseFloat(price)).toFixed(2));
    } else {
      rates.priceEur = Number(parseFloat(price).toFixed(2));
      rates.priceRub = Number((parseFloat(rates.eur.rub.value) * parseFloat(price)).toFixed(2));
      rates.priceUsd = Number((parseFloat(rates.eur.usd.value) * parseFloat(price)).toFixed(2));
    }
    callback(rates);
  });
};

var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour
