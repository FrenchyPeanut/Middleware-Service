var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

  mongoose = require('mongoose');
  Trip = require('./api/models/traveleeModel');
  bodyParser = require('body-parser');

  //Mongoose connection
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/Tripdb');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  var routes = require('./api/routes/traveleeRoutes');
  routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
