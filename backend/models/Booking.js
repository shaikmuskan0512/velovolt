const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bikeName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: String,
    required: true,
  },
  dropoffDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);