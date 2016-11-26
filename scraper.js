var parser = require('./lib/parser/parse');
var mongo = require('./lib/mongo/insert');

mongo.clearCollection();
parser.parse(function(result){
  mongo.insertMany([result]);
  // console.log(result);
});
