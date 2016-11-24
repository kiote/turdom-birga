var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');

app.get('/', function (req, res) {
  // get content of birga's page
  request('http://www.tourdom.ru/birga/go3/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      fs.writeFile('content/page.html', body, function(err) {
        if (err) {
          console.log(err);
        }
      });
      res.send('saved!');
    }
  })
});

const port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!');
});
