var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Do something in context of database
var database = function(callback) {
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('documents');
    callback(collection);
    db.close();
  });
}

// ---
// docs - array of documents to insert
var insertMany = function(docs) {
  database(function(collection) {
    // Insert some documents
    collection.insertMany(docs, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted ...");
      });
  });
}

var clearCollection = function() {
  database(function(collection){
    collection.remove();
  });
}

module.exports = {
  insertMany: insertMany,
  clearCollection: clearCollection
};
