const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/", (req, res) => {
  const {
    userId,
    evName,
    evModel,
    evYear,
    evBatteryCapacity,
    evRange,
    evPowerReserve,
    evChargingConnector,
  } = req.body;
  const query =
    "INSERT INTO evs (userId, evName, evModel, evYear, evBatteryCapacity, evRange, evPowerReserve, evChargingConnector) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      userId,
      evName,
      evModel,
      evYear,
      evBatteryCapacity,
      evRange,
      evPowerReserve,
      evChargingConnector,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(201).send({ id: result.insertId, ...req.body });
      }
    }
  );
});

// GET route to get all EV cars by user id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM evs WHERE userId = ?";
  db.query(query, userId, (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
