var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myproject');

var tourSchema = mongoose.Schema({
  detail: String,
  price: String,
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
