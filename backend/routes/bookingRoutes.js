const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const booking = new Booking(req.body);

    await booking.save();

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("FULL BACKEND ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bookings API Working",
  });
});

module.exports = router;