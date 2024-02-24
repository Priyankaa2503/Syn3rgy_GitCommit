const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: "Database query failed" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  });
});

module.exports = router;
