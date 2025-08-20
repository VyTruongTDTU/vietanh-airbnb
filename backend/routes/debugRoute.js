const express = require('express');
const router = express.Router();
const CourseListing = require('../models/CourseListing');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Debug endpoint to get course IDs
router.get('/courses', async (req, res) => {
      try {
            const courses = await CourseListing.find({}, '_id title slug price');
            res.json({
                  status: 'success',
                  courses: courses
            });
      } catch (error) {
            res.status(500).json({
                  status: 'error',
                  message: error.message
            });
      }
});

// Debug endpoint to get all users
router.get('/users', async (req, res) => {
      try {
            const users = await User.find({}, 'name email role enrolledCourses createdAt').populate('enrolledCourses.courseId', 'title');
            res.json({
                  status: 'success',
                  users: users
            });
      } catch (error) {
            res.status(500).json({
                  status: 'error',
                  message: error.message
            });
      }
});

// Debug endpoint to get all enrollments
router.get('/enrollments', async (req, res) => {
      try {
            const enrollments = await Enrollment.find({}).populate('courseId', 'title').populate('userId', 'name email');
            res.json({
                  status: 'success',
                  enrollments: enrollments
            });
      } catch (error) {
            res.status(500).json({
                  status: 'error',
                  message: error.message
            });
      }
});

// Clean up test data
router.delete('/cleanup-test-data', async (req, res) => {
      try {
            // Delete test users and enrollments
            const deletedUsers = await User.deleteMany({
                  email: { $regex: /test\.com$|newuser@test\.com/ }
            });
            const deletedEnrollments = await Enrollment.deleteMany({
                  email: { $regex: /test\.com$|newuser@test\.com/ }
            });

            res.json({
                  status: 'success',
                  message: 'Test data cleaned up',
                  deletedUsers: deletedUsers.deletedCount,
                  deletedEnrollments: deletedEnrollments.deletedCount
            });
      } catch (error) {
            res.status(500).json({
                  status: 'error',
                  message: error.message
            });
      }
});

module.exports = router;
