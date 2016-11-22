var express = require('express');
var app     = express();

app.get('/', function(req, res){

});

var port = 8088;
app.listen(port);
console.log('Magic happens on port ' + port);
