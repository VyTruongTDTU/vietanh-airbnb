const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      comment: { type: String },
      rating: { type: Number, required: true, min: 1, max: 5 },
      createdAt: { type: Date, default: Date.now },
});
const locationSchema = new mongoose.Schema({
      street: String,
      district: String,
      city: String,
      country: String,
}, { _id: false });

const listingSchema = new mongoose.Schema(
      {
            name: { type: String, required: true },
            slug: { type: String, required: true, unique: true },
            images: [{ type: String }],
            description: { type: String },
            price: { type: Number, required: true },
            location: locationSchema,
            amenities: [{ type: String }],
            host: {
                  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                  response_time: { type: String },
            },
            booking: {
                  airbnb_link: { type: String },
                  phone: { type: String },
                  facebook: { type: String },
            },
            reviews: [reviewSchema],
            average_rating: { type: Number, default: 0 },
      },
      { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Listing", listingSchema);
