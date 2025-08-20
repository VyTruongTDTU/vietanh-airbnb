const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, required: true, unique: true },
      password: String,
      avatar: String,
      role: { type: String, enum: ["user", "admin", "student"], default: "user" },
      enrolledCourses: [{
            courseId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "CourseListing",
            },
            enrollmentId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Enrollment",
            },
            enrolledAt: {
                  type: Date,
                  default: Date.now,
            },
            accessExpires: {
                  type: Date, // Optional: for course access expiration
            }
      }],
      isActive: {
            type: Boolean,
            default: true,
      },
      lastLogin: {
            type: Date,
      },
      createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

userSchema.methods.toJSON = function () {
      const userObject = this.toObject();
      delete userObject.password;
      return userObject;
};

module.exports = mongoose.model("User", userSchema);
