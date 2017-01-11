const request = require('request');
const datasource = 'https://tourdom-currency-rates.herokuapp.com/';
const Rate = require('./../models/rate');

var parse = (callback) => {
  request(datasource, (err, result, body) => {
    if (!err && result.statusCode == 200) {
      const rates = JSON.parse(body)['rates'];
      callback(rates);
    }
  });
}

module.exports = {
  parse: parse
};
