const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateTransportation, Transportation } = require("../models/transportation");
const { validateStation, Station } = require("../models/station");
//POST: CREATE A NEW Transprotation
router.post("/", auth, async (req, res) => {
  const error = await validateTransportation(req.body);
  if (error.message) res.status(400).send(error.message);

  let transportation = new Transportation({
    transportationName: req.body.transportationName,
    description: req.body.description,
    urlImage: req.body.urlImage,
    startStation: req.body.startStation,
    endStation: req.body.endStation
  });

  transportation
    .save()
    .then((transportation) => {
      res.send(transportation);
    })
    .catch((error) => {
      res.status(500).json({ err: 'Cannot create a new one' });
    });
});

//GET ALL transportation
router.get("/", (req, res) => {
  Transportation.find()
    .then((transportation) => res.send(transportation))
    .catch((error) => {
      res.status(500).json({ err: "Something went wrong" });
    });
});

//GET THE transportation BY ID
router.get("/:transportationId", async (req, res) => {
  const transportation = await Transportation.findById(req.params.transportationId);
  if (!transportation) res.status(404).json({ err: "Transportation not found" });
  res.send(transportation);
});

//UPDATE transportation BASED ON ID
router.put("/:transportationId", auth, async (req, res) => {
  const updatedTransportation = await Transportation.findByIdAndUpdate(
    req.params.transportationId,
    {
      transportationName: req.body.transportationName,
      description: req.body.description,
      urlImage: req.body.urlImage,
      startStation: req.body.startStation,
      endStation: req.body.endStation
    },
    { new: true }
  );

  if (!updatedTransportation) res.status(404).json({ err: "Transportation not found" });
  res.send(updatedTransportation);
});

//DELETE transportation BASED ON ID
router.delete("/:transportationId", auth, async (req, res) => {
  const transportation = await Transportation.findByIdAndRemove(req.params.transportationId);
  if (!transportation) res.status(404).json({ err: "Transportation not found" });
  else {
    for (const element of transportation.station) {
      const station = await Station.findByIdAndRemove(element);
      console.log(element);
    }
    
  }
  res.send(transportation);
});

module.exports = router;
