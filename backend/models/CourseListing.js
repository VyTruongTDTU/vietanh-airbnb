const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true,
      },
      description: {
            type: String,
      },
      videoUrl: {
            type: String,
            required: true, // YouTube video ID or full URL
      },
      duration: {
            type: String, // e.g., "15:30"
      },
      order: {
            type: Number,
            required: true,
      },
      isPreview: {
            type: Boolean,
            default: false, // If true, anyone can watch without enrollment
      }
});

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
            lessons: [lessonSchema], // Array of video lessons
            totalVideos: {
                  type: Number,
                  default: 0,
            },
            totalDuration: {
                  type: String, // Total course duration
            }
      },
      { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("CourseListing", courseListingSchema);
