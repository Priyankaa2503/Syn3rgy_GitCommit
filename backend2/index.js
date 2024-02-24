const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const stationRoute = require("./routes/stations.js");
const evRoute = require("./routes/ev.js");
const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/stations", stationRoute);
app.use("/evs", evRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
