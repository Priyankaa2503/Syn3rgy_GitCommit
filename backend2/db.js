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
    isAdmin BOOLEAN DEFAULT FALSE
  )
`;

const createEvTable = `
    CREATE TABLE IF NOT EXISTS evs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      evName VARCHAR(100),
      evModel VARCHAR(100),
      evYear INT,
      evBatteryCapacity INT,
      evRange INT,
      evPowerReserve INT,
      evChargingConnector VARCHAR(100)
    )
  `;

const createStationsTable = `
    CREATE TABLE IF NOT EXISTS stations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      stationId VARCHAR(100),
      noOfVisits INT,
      parkingFee DECIMAL(10, 2),
      perkWh DECIMAL(10, 2)
    )
  `;

db.query(createUsersTable, (err, results) => {
  if (err) {
    throw err;
  }
  console.log("Users table created/already exists");
});

db.query(createStationsTable, (err, results) => {
  if (err) {
    throw err;
  }
  console.log("Stations table created/already exists");
});

db.query(createEvTable, (err, results) => {
  if (err) {
    throw err;
  }
  console.log("EVs table created/already exists");
});
});

module.exports = db;
