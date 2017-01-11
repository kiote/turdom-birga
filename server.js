const express = require('express');
const app = express();

const Type = require('./models/type');
const Tour = require('./models/tour');

app.get('/types', (req, res) => {
  Type.find()
      .exec((err, types) => {
        if(err) return res.send(500);
        res.set('Content-Type', 'application/json');
        const typeNames = types.map(function(a){
          return {
            name: a.name
          }
        });
        res.json({'types': typeNames});
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
    const toursJson = tours.map((a) => {
      return {
        id: a._id,
        detail: a.detail,
        price: a.price,
        priceRub: a.priceRub,
        priceEur: a.priceEur,
        priceUsd: a.priceUsd,
        currency: a.currency,
        from: a.from,
        depart: a.depart,
        arrive: a.arrive,
        days: a.days,
        operator: a.operator,
        phones: a.phones,
        email: a.email,
        type: a.type
      }
    });
    res.json({'tours': toursJson})
  })
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('App listening on port' + port +'!');
});
