const express = require('express');
const transportationRoute = require('../routes/transportation');
const stationRoute = require('../routes/station');
const userRoute = require('../routes/user');
const authRoute = require('../routes/auth')
const error = require('../middleware/error');
const temperatureRoute = require('../routes/temperature');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  

  app.use('/api/transportation',transportationRoute);
  app.use('/api/station', stationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/temperature', temperatureRoute);
  app.use(error);
}