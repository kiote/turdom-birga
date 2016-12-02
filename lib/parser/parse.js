var osmosis = require('osmosis');

var parse = function(callback) {
  osmosis.get('www.tourdom.ru/birga/go3/')
         .find('td > div > a.n-list-item-link-bottom')
         .follow('@href')
         .find('h1.detail-h1')
         .set('detail')
         .find('h1.detail-h1 > span > span#itemPrice')
         .set('price')
         .find('td.n-tickets-td-2:first')
         .set('from')
         .find('td.n-tickets-td-2:eq(2)')
         .set('depart')
         .find('td.n-tickets-td-2:eq(3)')
         .set('arrive')
         .find('div.n-ticket-info:first')
         .set('days')
         .find('div.n-ticket-contacts.n-ticket-contacts1')
         .set('operator')
         .find('div.n-ticket-contacts-new.n-ticket-contacts2')
         .set('phones')
         .find('div.n-ticket-contacts-new.n-ticket-contacts3.item_description')
         .set('email')
         .then(function(context, data, next){
           data.from = data.from.split('\n')[0];
           data.depart = data.depart.match(/\d{2}\.\d{2}\.\d{4}/)[0];
           var priceItem = data.price.split(' ');
           data.price = priceItem[0];
           data.currency = priceItem[1];
           var days = data.days.split(' ');
           data.days = isNaN(parseInt(days[2])) ? '-' : days[2];
           next(context, data);
         })
         .data(function(listing) {
           callback(listing);
         });
}

module.exports = {
  parse: parse
};
