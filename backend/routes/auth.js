const router = require("express").Router();
const User = require("../models/User.js");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    // username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    isAdmin: req.body.isAdmin,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    // Check for specific error types and respond accordingly
    if (error.code === 11000) {
      // MongoDB duplicate key error (unique constraint)
      res.status(400).json({ error: "Username or email already exists." });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ error: "Wrong Credentials" });
    }
    const hashPass = cryptojs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(cryptojs.enc.Utf8);
    if (hashPass !== req.body.password) {
      res.status(401).json({ error: "Incorrect Password" });
    }
    //create a jwt token after successful login
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );
    // remove password from response
    //_.doc is used to only return required doc and not the other data mongodb stores in a collection
    const { password, ...data } = user._doc;
    res.status(200).json({ ...data, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist." });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "priyankaar25@gmail.com",
        pass: "xyqj ifjp oqph jemj",
      },
    });

    const mailOptions = {
      from: "priyankaar25@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        "localhost:3000" +
        "/auth/reset-password/" +
        token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to send email." });
      }
      res.status(200).json({
        message:
          "An e-mail has been sent to " +
          user.email +
          " with further instructions.",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/resetPassword/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Password reset token is invalid or has expired." });
    }

    user.password = cryptojs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});



module.exports = router;
