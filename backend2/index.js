const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.js");

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
