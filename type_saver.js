var Type = require('./models/type');
var Tour = require('./models/tour');

// clear types
Type.remove({}, (err, removed) => {
  console.log('all old types removed');
});

Tour.find({}).distinct('type', (err, types) => {
  types.forEach((type) => {
    new Type({name: type}).save();
  });
});
