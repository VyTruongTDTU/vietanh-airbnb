const mongoose = require("mongoose");

const courseListingSchema = new mongoose.Schema(
      {
            slug: {
                  type: String,
                  required: true,
                  unique: true,
            },
            title: {
                  type: String,
                  required: true,
            },
            instructor: {
                  type: String,
                  required: true,
            },
            price: {
                  type: Number,
                  required: true,
            },
            duration: {
                  type: String,
                  required: true,
            },
            image: {
                  type: String,
                  required: true,
            },
            students: {
                  type: Number,
                  default: 0,
            },
            description: {
                  type: String,
            },
            curriculum: {
                  type: [String], 
            },
            features: {
                  type: [String], 
            },
      },
      { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("CourseListing", courseListingSchema);
