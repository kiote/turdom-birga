var parser = require('./lib/parser/parse');
var Tour = require('./models/tour');

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

parser.parse(function(result){
  Tour.remove({});
  new Tour(result).save();
  console.log(result);
});
