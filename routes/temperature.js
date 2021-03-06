const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateTemperature, Temperature } = require("../models/temperature");
const validateSecretKey = require("./checkSecretKey");
//POST: CREATE A NEW station
router.post("/", async (req, res) => {
  const checkSecretKey = await validateSecretKey(req.body);
  if (!checkSecretKey) res.status(401).json({ err: 'Not Authorized'});
  else {
    const error = await validateTemperature(req.body);
    if (error.message) res.status(400).json({ err: error.message });
    else {
      let temperature = new Temperature({
        value: req.body.value
      });
      temperature
        .save()
        .then((temperature) => {
          res.send(temperature);
        })
        .catch((error) => {
          res.status(500).json({ err: "Something went wrong" });
        });
    }
  }
});
  
router.get("/", (req, res) => {
  Temperature.find().sort({ "_id" : -1 }).limit(10)
    .then((temperature) => res.send(temperature))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;