var mongoose = require('mongoose');
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
  email: String
});

var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour
