var mongoose = require('mongoose');

var typeSchema = mongoose.Schema({
  name: String
})

var Type = mongoose.model('Type', typeSchema);
module.exports = Type
