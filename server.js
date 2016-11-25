var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
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
         .data(function(listing) {
           console.log(listing);
         });
  res.send('done!');
});

const port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!');
});
