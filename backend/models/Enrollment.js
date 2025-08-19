// models/Course.js
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
      {
            courseId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "CourseListing",
                  required: true,
            },
            title: {
                  type: String,
                  required: true,
            },
            fullname: {
                  type: String,
                  required: true,
            },
            email: {
                  type: String,
                  required: true,
            },
            phone: {
                  type: String,
                  required: true,
            },
            price: {
                  type: Number,
                  required: true,
            },
            paymentStatus: {
                  type: String,
                  enum: ["pending", "paid"],
                  default: "pending",
            },
      },
      { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
