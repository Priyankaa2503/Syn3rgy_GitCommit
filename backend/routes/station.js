const express = require("express");
const router = express.Router();
const Station = require("../models/Station");

// GET all charging stations
router.get("/", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific charging station
router.get("/:id", getStation, (req, res) => {
  res.json(res.station);
});


// POST a new charging station
router.post("/", async (req, res) => {
  const station = new Station({
    // fill in the station details from req.body
  });
  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a charging station
router.put("/:id", getStation, async (req, res) => {
  // update the station details from req.body
  try {
    const updatedStation = await res.station.save();
    res.json(updatedStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a charging station
router.delete("/:id", getStation, async (req, res) => {
  try {
    await res.station.remove();
    res.json({ message: "Deleted Charging Station" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for getting station by ID
async function getStation(req, res, next) {
  let station;
  try {
    station = await Station.findById(req.params.id);
    if (station == null) {
      return res.status(404).json({ message: "Cannot find station" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.station = station;
  next();
}


// // GET the nearest charging station
// router.get("/nearest-charging-station", async (req, res) => {
//   const { lat, lng } = req.query;
//   const nearestStation = await findNearestStation(lat, lng);
//   res.send(nearestStation);
// });


// // GET a list of available charging stations
// router.get("/available", async (req, res) => {
//   const availableStations = await Station.find({ availability: true });
//   res.send(availableStations);
// });
// // 

// GET all available connector types
router.get("/types", async (req, res) => {
  const connectorTypes = await Station.distinct("connectorTypes");
  res.send(connectorTypes);
});

module.exports = router;
