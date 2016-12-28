var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

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

tourSchema.methods.calcPriceInRub = function (price, currency) {
  currency = getCurrency(currency);
  var price = parseFloat(price);
  // todo: get rates here
  this.priceRub = 1000;
};

var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour
