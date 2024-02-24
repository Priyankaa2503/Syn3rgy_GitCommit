// vehicleRoutes.js
const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// POST a new vehicle
router.post("/", async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.status(201).send(vehicle);
});

// GET a specific vehicle
router.get(":id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.send(vehicle);
});

// PUT update a vehicle
router.put("/:id", async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(vehicle);
});

// DELETE a vehicle
router.delete("/:id", async (req, res) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  res.send(vehicle);
});

module.exports = router;
