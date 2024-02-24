const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Route to add a station
router.post("/", (req, res) => {
  const { stationId, noOfVisits } = req.body;
  db.query(
    "INSERT INTO stations (stationId, noOfVisits) VALUES (?, ?)",
    [stationId, noOfVisits],
    (error, results) => {
      if (error) {
        res.status(500).send("Error adding station");
      } else {
        res.status(200).send({ id: results.insertId, stationId, noOfVisits });
      }
    }
  );
});

// Route to get all stations
router.get("/", (req, res) => {
  db.query("SELECT * FROM stations", (error, results) => {
    if (error) {
      res.status(500).send("Error fetching stations");
    } else {
      res.status(200).send(results);
    }
  });
});

// Route to get one station
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM stations WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error fetching station");
      } else {
        res.status(200).send(results[0]);
      }
    }
  );
});

router.patch("/:id", (req, res) => {
  const { stationId, noOfVisits } = req.body;
  db.query(
    "UPDATE stations SET stationId = ?, noOfVisits = ? WHERE id = ?",
    [stationId, noOfVisits, req.params.id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error updating station");
      } else {
        res.status(200).send({ id: req.params.id, stationId, noOfVisits });
      }
    }
  );
});

module.exports = router;
