'use strict';


var mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');

exports.list_all_trips = function(req, res) {
  Trip.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_trip = function(req, res) {
  var new_task = new Trip(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_trip = function(req, res) {
  Trip.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_trip = function(req, res) {
  Trip.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_trip = function(req, res) {


  Trip.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Trip successfully deleted' });
  });
};
