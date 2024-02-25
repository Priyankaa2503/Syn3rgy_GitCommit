const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const stationRoute = require("./routes/stations.js");
const evRoute = require("./routes/ev.js");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/stations", stationRoute);
app.use("/evs", evRoute);
app.post("/send-email", async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "priyankaar25@gmail.com",
      pass: "xyqj ifjp oqph jemj",
    },
  });

  let mailOptions = {
    from: "priyankaar25@gmail.com", // replace with your email
    to: "surveaditya521@gmail.com", // replace with the recipient's email
    subject: "Booking confirmed",
    text: `Dear Customer,

Thank you for booking an EV charging station with us. 

Your booking details are as follows:

Booking ID: 8295826
Station Location: 
EVmatch Charging Station, Sacramento St, San Francisco, CA 94122
Charging Slot Time: 12:30 PM

Please find the attachment for the QR code to start your charging session.

We look forward to serving you. If you have any questions or need further assistance, please do not hesitate to contact us.

Best Regards,
Volt Voyage Team`,
    attachments: [
      {
        filename: "Qr.png",
        path: __dirname + "/Qr.png", // replace with the path to the QR code image
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
