var express = require('express');
var app = express();
var request = require('request');
var jsonfile = require('jsonfile');
var file = 'content/data.json'
var osmosis = require('osmosis');

app.get('/', function (req, res) {
  // get content of birga's page
  osmosis.get('www.tourdom.ru/birga/go3/')
         .find('tr > td.date')
         .set('date')
         .find('tr > td.direction:first')
         .set('from')
         .find('table.table-result > tr > td[3].direction')
         .set('to')
         .find('table.table-result > tr > td[4]')
         .set('full-offer')
         .then(function(context, data, next, done) {
           data.date = data.date.replace('New', '')
                                .replace(/(?:\r\n|\r|\n|\t|\s)/g, '');
           data.to = data.to.replace(/(?:\r\n|\r|\n|\t)/g, '')
                            .replace(/\s+/g,' ');
           var price = data.to.match(/(\d+)\s(\$|\€|\р)/, data.to);
           data.price = price[1];
           data.unit = price[2];
           next(context, data);
         })
         .data(function(listing) {
           jsonfile.writeFileSync(file, listing, {flag: 'a'});
         });
  res.send('done!');
});

const port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!');
});
