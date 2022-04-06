const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateTemperature, Temperature } = require("../models/temperature");

//POST: CREATE A NEW station
router.post("/", async (req, res) => {
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
  
});
  
router.get("/", (req, res) => {
  Temperature.find()
    .then((temperature) => res.send(temperature))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;