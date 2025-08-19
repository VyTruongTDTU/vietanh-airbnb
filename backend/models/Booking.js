const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
      listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
            required: true,
      },
      listingName: {
            type: String,
            required: true,
      },
      guestName: {
            type: String,
            required: true,
      },
      guestEmail: {
            type: String,
            required: true,
      },
      guestPhone: {
            type: String,
            required: false,
      },
      guestNote: {
            type: String,
      },
      startDate: {
            type: Date,
            required: true,
      },
      endDate: {
            type: Date,
            required: true,
      },
      totalNights: {
            type: Number,
            required: true,
      },
      totalPrice: {
            type: Number,
            required: true,
      },
      paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending",
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
}, { timestamps: true, versionKey: false }); 

module.exports = mongoose.model("Booking", bookingSchema);
