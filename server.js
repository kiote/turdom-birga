var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello there!')
})

const port = 8080
app.listen(port, function () {
  console.log('Example app listening on port' + port +'!')
});
