const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Electric Vehicle Details
    evMake: { type: String }, // Make/brand of the EV (e.g., Tesla, Nissan, etc.)
    evModel: { type: String }, // Model name of the EV (e.g., Model 3, Leaf, etc.)
    evYear: { type: Number }, // Year of the EV (e.g., 2022)
    evBatteryCapacity: { type: Number }, // Battery capacity in kWh
    evRange: { type: Number }, // Estimated range in miles or kilometers
    evChargingConnector: { type: String }, // Preferred charging connector type (e.g., Type 2, CCS, etc.)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
