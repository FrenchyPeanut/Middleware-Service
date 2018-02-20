'use strict';


var mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');
var request = require('request');

exports.list_all_trips = function(req, res) {
  Trip.find({}, function(err, trip) {
    if (err)
      res.send(err);
    res.json(trip);
  });
};



exports.create_a_trip = function(req, res) {
  var new_trip = new Trip(req.body);
  new_trip.save(function(err, trip) {
    if (err)
      res.send(err);
    res.json(trip);
  });
};


exports.read_a_trip = function(req, res) {
  Trip.findById(req.params.taskId, function(err, trip) {
    if (err)
      res.send(err);
    res.json(trip);
  });
};


exports.update_a_trip = function(req, res) {
  Trip.findOneAndUpdate({
    _id: req.params.tripId
  }, req.body, {
    new: true
  }, function(err, trip) {
    if (err)
      res.send(err);
    res.json(trip);
  });
};

exports.generate_a_trip = function(req, res) {
  //Connecting to Google Places API
  // AIzaSyDABoCKKU8ElJYuvKQa_c95pPYKU-RBsj8

  // URL example:
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
  var back = "hello world";

  /*request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDABoCKKU8ElJYuvKQa_c95pPYKU-RBsj8', {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err + " test");
    }
    console.log(body.url);
    console.log(body.explanation);
    //back = body.url + body.explanation;
  });*/

  request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDABoCKKU8ElJYuvKQa_c95pPYKU-RBsj8')
  .on('response', function(response) {
    res.json(response);
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  });

  //res.json({message: 'test'});
  //res.send('hello world');

};


exports.delete_a_trip = function(req, res) {
  Trip.remove({
    _id: req.params.taskId
  }, function(err, trip) {
    if (err)
      res.send(err);
    res.json({
      message: 'Trip successfully deleted'
    });
  });
};
