const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateLightButton, LightButton } = require("../models/lightButton");
const validateSecretKey = require("./checkSecretKey");
//POST: CREATE A NEW station
router.post("/", async (req, res) => {
  const checkSecretKey = await validateSecretKey(req.body);
  if (!checkSecretKey) res.status(401).json({ err: 'Not Authorized'});
  else {
    const error = await validateLightButton(req.body);
    if (error.message) res.status(400).json({ err: error.message });
    else {
      let lightButton = new LightButton({
        value: req.body.value
      });
      lightButton
        .save()
        .then((lightButton) => {
          res.send(lightButton);
        })
        .catch((error) => {
          res.status(500).json({ err: "Something went wrong" });
        });
    }
  }
});
  
router.get("/", (req, res) => {
  LightButton.find().sort({ "_id" : -1 }).limit(1)
    .then((lightButton) => res.send(lightButton))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;