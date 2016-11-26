var express = require('express');
var app = express();
var request = require('request');

app.get('/', function (req, res) {
  res.send('done!');
});

const port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!');
});
