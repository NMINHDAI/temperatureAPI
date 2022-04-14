const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateLandHumidity, LandHumidity } = require("../models/landHumidity");
const validateSecretKey = require("./checkSecretKey");
//POST: CREATE A NEW station
router.post("/", async (req, res) => {
  const checkSecretKey = await validateSecretKey(req.body);
  if (!checkSecretKey) res.status(401).json({ err: 'Not Authorized'});
  else {
    const error = await validateLandHumidity(req.body);
    if (error.message) res.status(400).json({ err: error.message });
    else {
      let landHumidity = new LandHumidity({
        value: req.body.value
      });
      landHumidity
        .save()
        .then((landHumidity) => {
          res.send(landHumidity);
        })
        .catch((error) => {
          res.status(500).json({ err: "Something went wrong" });
        });
    }
  }
});
  
router.get("/", (req, res) => {
  LandHumidity.find().sort({ "_id" : -1 }).limit(5)
    .then((landHumidity) => res.send(landHumidity))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;