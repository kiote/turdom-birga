const express = require('express');
const app = express();

const Type = require('./models/type');
const Tour = require('./models/tour');

app.get('/types', (req, res) => {
  Type.find()
      .exec((err, types) => {
        if(err) return res.send(500);
        res.set('Content-Type', 'application/json');
        res.json({'types': types});
      });
});

app.get('/', (req, res) => {
  finder = {}
  if (req.query['type'] !== undefined) {
    finder.type = req.query['type'];
  }
  if (req.query['gt'] !== undefined) {
    finder.priceUsd = {$gt: Number(req.query['gt'])};
  }
  if (req.query['lt'] !== undefined) {
    finder.priceUsd = {$lt: Number(req.query['lt'])};
  }
  Tour.find(finder)
    .exec((err, tours) => {
    if(err) return res.send(500);
    res.set('Content-Type', 'application/json');
    res.json({'tours': tours})
  })
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('App listening on port' + port +'!');
});
