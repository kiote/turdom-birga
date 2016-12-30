var Type = require('./models/type');
var Tour = require('./models/tour');

// clear types
Type.remove({}, function(err, removed){
  console.log('all old types removed');
});

Tour.find({}).distinct('type', function(err, types){
  types.forEach(function(type){
    new Type({name: type}).save();
  });
});
