// routes/learningRoute.js
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
      getEnrolledCourses,
      getCourseContent,
      getLesson,
      markLessonCompleted,
      getLearningDashboard
} = require("../controllers/learningController");

// All routes require authentication
router.use(authMiddleware);

// Get learning dashboard
router.get("/dashboard", getLearningDashboard);

// Get enrolled courses
router.get("/courses", getEnrolledCourses);

// Get course content (lessons list)
router.get("/courses/:courseId", getCourseContent);

// Get specific lesson
router.get("/courses/:courseId/lessons/:lessonId", getLesson);

// Mark lesson as completed
router.post("/courses/:courseId/lessons/:lessonId/complete", markLessonCompleted);

module.exports = router;
