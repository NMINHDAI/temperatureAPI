const express = require('express');
const temperatureRoute = require('../routes/temperature');
const humidityRoute = require('../routes/humidity');
const landHumidityRoute = require('../routes/landHumidity');
const lightButtonRoute = require('../routes/lightButton');
const photoresistorRoute = require('../routes/photoresistor');
const error = require('../middleware/error');
const cors = require('cors');
const app = express();
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://bestgarden.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  app.use(cors({
    origin: '*'
  }));
  app.use("/api/temperature", temperatureRoute);
  app.use("/api/humidity", humidityRoute);
  app.use("/api/landHumidity", landHumidityRoute);
  app.use("/api/lightButton", lightButtonRoute);
  app.use("/api/photoresistor", photoresistorRoute);
  app.use(error);


}