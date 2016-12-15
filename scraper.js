var parser = require('./lib/parser/parse');
var Tour = require('./models/tour');

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

// clear previously scrapped tours
Tour.remove({}, function(err, removed){
  console.log(removed);
});

// parse
parser.parse(function(result){
  new Tour(result).save();
  console.log(result);
});
