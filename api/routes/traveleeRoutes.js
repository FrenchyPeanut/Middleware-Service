'use strict';
module.exports = function(app) {
  var travelee = require('../controllers/traveleeController');

  // todoList Routes
  app.route('/trips')
    .get(travelee.list_all_trips)
    .post(travelee.create_a_trip);


  app.route('/trips/:tripId')
    .get(travelee.read_a_trip)
    .put(travelee.update_a_trip)
    .delete(travelee.delete_a_trip);

  app.route('/find')
    .get(travelee.generate_a_trip);

};
