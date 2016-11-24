var osmosis = require('osmosis');

osmosis
.get('www.tourdom.ru/birga/go3/')
.find('tr > td.date')
.set('date')
.find('tr > td.direction:first')
.set('direction')
.data(function(listing) {
  console.log(listing);
})
// .log(console.log)
// .error(console.log)
// .debug(console.log)
