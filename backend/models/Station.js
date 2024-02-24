const mongoose = require('mongoose')
const chargingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: [Number], // [longitude, latitude]
  },
  address: { type: String, required: true },
  connectors: [{ type: String }], // e.g., ['CHAdeMO', 'CCS', 'Tesla Supercharger']
  capacity: { type: Number }, // kW
  availability: { type: String }, // 'Available', 'Occupied', 'Out of Service'
  operational_status: { type: String }, // 'Operational', 'Under Maintenance', 'Offline'
  last_updated: { type: Date, default: Date.now },
});

// const chargingStation = new ChargingStation({
//   name: "SuperCharge Station A",
//   location: { type: "Point", coordinates: [longitude, latitude] },
//   address: "123 Main St, City, State",
//   connectors: ["CHAdeMO", "CCS"],
//   capacity: 50, // kW
//   availability: "Available",
//   operational_status: "Operational",
// });

module.exports = mongoose.model("Station",chargingStationSchema)