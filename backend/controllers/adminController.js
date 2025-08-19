// controllers/adminController.js
const Course = require("../models/CourseListing");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
      try {
            const [totalCourses, totalUsers, totalEnrollments, totalBookings] = await Promise.all([
                  Course.countDocuments(),
                  User.countDocuments(),
                  Enrollment.countDocuments(),
                  Booking.countDocuments(),
            ]);

            res.json({ totalCourses, totalUsers, totalEnrollments, totalBookings });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

module.exports = { getDashboardStats };