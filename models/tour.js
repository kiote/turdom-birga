var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
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
  priceRub: {
    type: SchemaTypes.Double
  },
  priceUsd: {
    type: SchemaTypes.Double
  },
  priceEur: {
    type: SchemaTypes.Double
  }
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
      rates.priceRub = parseFloat(price).toFixed(2);
      rates.priceUsd = (parseFloat(rates.rub.usd.value) * parseFloat(price)).toFixed(2);
      rates.priceEur = (parseFloat(rates.rub.eur.value) * parseFloat(price)).toFixed(2);
    } else if (currency == 'usd') {
      rates.priceUsd = parseFloat(price).toFixed(2);
      rates.priceEur = (parseFloat(rates.usd.eur.value) * parseFloat(price)).toFixed(2);
      rates.priceRub = (parseFloat(rates.usd.rub.value) * parseFloat(price)).toFixed(2);
    } else {
      rates.priceEur = parseFloat(price).toFixed(2);
      rates.priceRub = (parseFloat(rates.eur.rub.value) * parseFloat(price)).toFixed(2);
      rates.priceUsd = (parseFloat(rates.eur.usd.value) * parseFloat(price)).toFixed(2);
    }
    callback(rates);
  });
};

var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour
