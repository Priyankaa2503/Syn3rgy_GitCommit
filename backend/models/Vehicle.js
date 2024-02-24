// Vehicle.js
const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    make: { type: String,},
    model: { type: String, },
    year: { type: Number, },
    batteryCapacity: { type: Number, },
    range: { type: Number, },
    chargingConnector: { type: String, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
