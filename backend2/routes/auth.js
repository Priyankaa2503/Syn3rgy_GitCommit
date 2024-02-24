const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (results.length > 0) {
        return res.send("That email is already in use");
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedPassword,
          isAdmin: isAdmin,
        },
        (error, results) => {
          if (error) {
            res.status(500).send("Error registering user");
          } else {
            db.query(
              "SELECT * FROM users WHERE email = ?",
              [email],
              (error, userResults) => {
                if (error) {
                  res.status(500).send("Error fetching user");
                } else {
                  res.status(200).send({
                    id: userResults[0]?.id,
                    name: userResults[0]?.name,
                    email: userResults[0]?.email,
                  });
                }
              }
            );
          }
        }
      );
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        res.status(500).send("Error logging user in");
      } else {
        res.status(200).send({
          id: results[0]?.id,
          name: results[0]?.name,
          email: results[0]?.email,
        });
      }
    }
  );
});

module.exports = router;
