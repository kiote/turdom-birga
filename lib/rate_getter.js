var request = require('request');
const datasource = 'https://tourdom-currency-rates.herokuapp.com/';
var Rate = require('./../models/rate');

var parse = function(callback) {
  request(datasource, function (err, result, body) {
    if (!err && result.statusCode == 200) {
      var rates = JSON.parse(body)['rates'];
      callback(rates);
    }
  });
}

module.exports = {
  parse: parse
};
