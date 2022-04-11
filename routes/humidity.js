const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateHumidity, Humidity } = require("../models/humidity");
const validateSecretKey = require("./checkSecretKey");
//POST: CREATE A NEW station
router.post("/", async (req, res) => {
  const checkSecretKey = await validateSecretKey(req.body);
  if (!checkSecretKey) res.status(401).json({ err: 'Not Authorized'});
  else {
    const error = await validateHumidity(req.body);
    if (error.message) res.status(400).json({ err: error.message });
    else {
      let humidity = new Humidity({
        value: req.body.value
      });
      humidity
        .save()
        .then((humidity) => {
          res.send(humidity);
        })
        .catch((error) => {
          res.status(500).json({ err: "Something went wrong" });
        });
    }
  }
});
  
router.get("/", (req, res) => {
  Humidity.find().sort({ "_id" : -1 }).limit(10)
    .then((humidity) => res.send(humidity))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;