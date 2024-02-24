const mysql = require("mysql");

// Create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "my_database",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(32) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      resetPasswordToken VARCHAR(255),
      resetPasswordExpires DATETIME,
      isAdmin BOOLEAN DEFAULT FALSE,
      evName VARCHAR(100),
      evModel VARCHAR(100),
      evYear INT,
      evBatteryCapacity DECIMAL,
      evRange DECIMAL,
      evPowerReserve INT,
      evChargingConnector VARCHAR(100)
    )
  `;

  db.query(createUsersTable, (err, results) => {
    if (err) {
      throw err;
    }
    console.log("Users table created/already exists");
  });
});

module.exports = db;
