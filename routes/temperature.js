const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateTemperature, Temperature } = require("../models/temperature");

//POST: CREATE A NEW station
router.post("/", auth, async (req, res) => {
  const error = await validateTemperature(req.body);
  if (error.message) res.status(400).json({ err: error.message });

  let temperature = new Temperature({
    value: req.body.value
  });

  
router.get("/", (req, res) => {
  Temperature.find()
    .then((temperature) => res.send(temperature))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});
