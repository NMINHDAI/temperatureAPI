const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validateStation, Station } = require("../models/station");
const { validateTransportation, Transportation} = require("../models/transportation");

//POST: CREATE A NEW station
router.post("/", auth, async (req, res) => {
  const error = await validateStation(req.body);
  if (error.message) res.status(400).json({ err: error.message });

  let station = new Station({
    stationName: req.body.stationName,
    address: req.body.address,
    cityId: req.body.cityId,
    contactName: req.body.contactName,
    phone: req.body.phone,
    urlImage: req.body.urlImage,
    workTime: req.body.workTime,

    transportationId: req.body.transportationId
  });

  // update transportation
  const updatedTransportation = await Transportation.findByIdAndUpdate(
    req.body.transportationId,
    {
      $push: {
        station: station._id,
      },
    },
    { new: true }
  );
  if (!updatedTransportation) res.status(404).json({ err: "Transportation not found" });
  else {
    station
    .save()
    .then((station) => {
      res.send(station);
    })
    .catch((error) => {
      res.status(500).json({ err: "Something went wrong" });
    });
  } 
});

//GET ALL station
router.get("/", (req, res) => {
  Station.find()
    .then((station) => res.send(station))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

//GET THE station BY ID
router.get("/cityId/:cityId", async (req, res) => {
  
  const station = await Station.find({cityId: req.params.cityId});
  if (!station) res.status(404).json({ err: "Station not found" });
  res.send(station);
});

//GET THE station BY ID
router.get("/:stationId", async (req, res) => {
  const station = await Station.findById(req.params.stationId);
  if (!station) res.status(404).json({ err: "Station not found" });
  res.send(station);
});

//UPDATE station BASED ON ID
router.put("/:stationId", auth, async (req, res) => {
  const updatedStation = await Station.findByIdAndUpdate(
    req.params.stationId,
    {
      stationName: req.body.stationName,
      address: req.body.address,
      
      cityId: req.body.cityId,
      contactName: req.body.contactName,
      phone: req.body.phone,
      urlImage: req.body.urlImage,
      workTime: req.body.workTime,
    },
    { new: true }
  );

  if (!updatedStation) res.status(404).json({ err: "Station not found" });
  res.send(updatedStation);
});

//DELETE station BASED ON ID
router.delete("/:stationId", auth, async (req, res) => {
  const station = await Station.findByIdAndRemove(req.params.stationId);
  if (!station) res.status(404).json({ err: "Station not found" });
  else {
    const updatedTransportation = await Transportation.findByIdAndUpdate(
      station.transportationId,
      {
        $pullAll: {
          station: [station._id] ,
        },
      },
      { new: true }
    );
    if (!updatedTransportation) res.status(500).json({ err: "Something went wrong" });
  }
  res.send(station);
});

module.exports = router;
