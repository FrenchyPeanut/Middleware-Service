'use strict';


var mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');
var request = require('request');
var jsonSort = require('sort-json-array');
var key = "AIzaSyDABoCKKU8ElJYuvKQa_c95pPYKU-RBsj8";

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

exports.get_nearby_locations = function(req, res) {
  var location = req.query.location;
  var keyword = req.query.keyword;
  var radius = 500;
  if (req.query.radius){
    radius = req.query.radius;
  }

  var googleReq = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                  + location
                  + "&radius=" + radius
                  + "&keyword=" + keyword
                  + "&key=" + key;

  request.get(googleReq, function(error, response, body){
    var jsonBody = JSON.parse(body);
    var results = jsonBody.results;
    var toReturn = {results: []};

    for (var x in results){
      if (results[x].rating > 4.0) {
        toReturn.results.push(results[x]);
      }
    }

    toReturn.results = jsonSort(toReturn.results, "rating", "des");

    res.send(toReturn);
  });


}

exports.create_a_trip = function(req, res) {

  var userLocation = req.query.location;
  var stopsRemaining = 2;
  var resultsJSON = {results: []};

  getLocation(userLocation, "historical+landmark");

  function getLocation(curLocation, keyword){
    // Gets the next stop on the trip and calls an update to trip itinerary

    // construct query to Google
    var radius = "500";
    var googleReq = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                    + curLocation
                    + "&keyword=" + keyword
                    + "&radius=" + radius
                    + "&key=" + key;

    // send request to Google
    request.get(googleReq, function(error, response, body){
      // get body of response from Google
      var jsonBody = JSON.parse(body);

      // get list of locations from body
      var results = jsonBody.results;

      // choose a random location from the results
      var nextStopIndex = getRandomInt(0, results.length);
      var selectedStop = results[nextStopIndex];

      // update the trip with new stop
      updateTrip(selectedStop);
    });
  }

  function updateTrip(result){
    // Adds a stop to trip itinerary, and if trip is fully generated
    // makes a call to send the response to the user

    // add stop to the trip itinerary
    resultsJSON.results.push(result);

    // decrement number of stops left to make
    stopsRemaining -= 1;

    if (stopsRemaining == 0){
      // return results to user
      sendResponse(resultsJSON)
    } else {
      // get current location in trip
      var stopLocation = result.geometry.location.lat + "," + result.geometry.location.lng;

      // get new trip location based on current location
      getLocation(stopLocation, "bar")
    }
  }

  function sendResponse(results){
    // return results to user
    res.send(results);
  }
}

exports.nearby_suggestion = function(req, res){
  // Suggests a nearby location to visit based on entered keyword

  // get user location and keyword
  var userLocation = req.query.location;
  var keyword = req.query.keyword;

  // construct Google query
  var radius = 500;

  var googleReq = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                  + userLocation
                  + "&keyword=" + keyword
                  + "&radius=" + radius
                  + "&key=" + key;

  // send request to Google
  request.get(googleReq, function(error, response, body){
    // get body of response from Google
    var jsonBody = JSON.parse(body);

    // get list of locations from body
    var results = jsonBody.results;

    // choose a random location from the results
    var nextStopIndex = getRandomInt(0, results.length);
    var selectedStop = results[nextStopIndex];

    // return result to user
    res.send(selectedStop);
  });


}

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


// Utility functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
