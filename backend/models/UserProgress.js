const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
      {
            userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            courseId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "CourseListing",
                  required: true,
            },
            completedLessons: [{
                  lessonId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                  },
                  completedAt: {
                        type: Date,
                        default: Date.now,
                  },
                  watchTime: {
                        type: Number, // in seconds
                        default: 0,
                  }
            }],
            currentLesson: {
                  type: mongoose.Schema.Types.ObjectId,
            },
            lastWatchedAt: {
                  type: Date,
                  default: Date.now,
            },
            progressPercentage: {
                  type: Number,
                  default: 0,
                  min: 0,
                  max: 100,
            },
            isCompleted: {
                  type: Boolean,
                  default: false,
            },
            completedAt: {
                  type: Date,
            }
      },
      { timestamps: true, versionKey: false }
);

// Compound index to ensure one progress record per user per course
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("UserProgress", userProgressSchema);
