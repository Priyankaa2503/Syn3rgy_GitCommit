const mongoose = require("mongoose");
const routePlanSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional: Reference to User collection
  start_location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: [Number], // [longitude, latitude]
  },
  end_location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: [Number], // [longitude, latitude]
  },
  current_battery_percentage: { type: Number, required: true },
  EV_range: { type: Number }, // Estimated range based on battery capacity
  required_stops: { type: Number }, // Number of charging stops required
  optimal_route: [{ type: mongoose.Schema.Types.ObjectId, ref: "Station" }], // References to ChargingStation collection
  total_distance: { type: Number }, // Total distance of the route (in km or miles)
  total_duration: { type: Number }, // Total estimated duration (in minutes)
  created_at: { type: Date, default: Date.now },
});
// example
// const routePlan = new RoutePlan({
//   user_id: userObjectId,
//   start_location: {
//     type: "Point",
//     coordinates: [startLongitude, startLatitude],
//   },
//   end_location: { type: "Point", coordinates: [endLongitude, endLatitude] },
//   current_battery_percentage: 60,
//   EV_range: 200, // km
//   required_stops: 2,
//   optimal_route: [chargingStationObjectId1, chargingStationObjectId2],
//   total_distance: 300, // km
//   total_duration: 180, // minutes
// });
module.exports = mongoose.model("Route",routePlanSchema );
