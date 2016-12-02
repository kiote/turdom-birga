var parser = require('./lib/parser/parse');
var Tour = require('./models/tour');

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

Tour.remove({}, function(err, removed){
  console.log(removed);
});
parser.parse(function(result){
  new Tour(result).save();
  console.log(result);
});
