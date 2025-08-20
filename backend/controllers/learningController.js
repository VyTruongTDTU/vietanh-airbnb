// controllers/learningController.js
const CourseListing = require("../models/CourseListing");
const User = require("../models/User");
const UserProgress = require("../models/UserProgress");

// Get user's enrolled courses
const getEnrolledCourses = async (req, res) => {
      try {
            const userId = req.user.id; // From auth middleware

            const user = await User.findById(userId).populate({
                  path: 'enrolledCourses.courseId',
                  model: 'CourseListing'
            });

            if (!user) {
                  return res.status(404).json({ error: "User not found" });
            }

            // Get progress for each course
            const coursesWithProgress = await Promise.all(
                  user.enrolledCourses.map(async (enrollment) => {
                        const progress = await UserProgress.findOne({
                              userId: userId,
                              courseId: enrollment.courseId._id
                        });

                        return {
                              course: enrollment.courseId,
                              enrolledAt: enrollment.enrolledAt,
                              progress: progress || {
                                    progressPercentage: 0,
                                    completedLessons: [],
                                    isCompleted: false
                              }
                        };
                  })
            );

            res.json(coursesWithProgress);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get course content for enrolled student
const getCourseContent = async (req, res) => {
      try {
            const { courseId } = req.params;
            const userId = req.user.id;

            // Check if user is enrolled in this course
            const user = await User.findById(userId);
            const isEnrolled = user.enrolledCourses.some(
                  enrollment => enrollment.courseId.toString() === courseId
            );

            if (!isEnrolled) {
                  return res.status(403).json({ error: "You are not enrolled in this course" });
            }

            // Get course with lessons
            const course = await CourseListing.findById(courseId);
            if (!course) {
                  return res.status(404).json({ error: "Course not found" });
            }

            // Get user's progress
            let progress = await UserProgress.findOne({ userId, courseId });
            if (!progress) {
                  // Create initial progress record
                  progress = await UserProgress.create({
                        userId,
                        courseId,
                        currentLesson: course.lessons[0]?._id || null
                  });
            }

            res.json({
                  course,
                  progress,
                  totalLessons: course.lessons.length
            });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get specific lesson
const getLesson = async (req, res) => {
      try {
            const { courseId, lessonId } = req.params;
            const userId = req.user.id;

            // Check enrollment
            const user = await User.findById(userId);
            const isEnrolled = user.enrolledCourses.some(
                  enrollment => enrollment.courseId.toString() === courseId
            );

            if (!isEnrolled) {
                  return res.status(403).json({ error: "You are not enrolled in this course" });
            }

            // Get course and find lesson
            const course = await CourseListing.findById(courseId);
            const lesson = course.lessons.id(lessonId);

            if (!lesson) {
                  return res.status(404).json({ error: "Lesson not found" });
            }

            // Update current lesson in progress
            await UserProgress.findOneAndUpdate(
                  { userId, courseId },
                  {
                        currentLesson: lessonId,
                        lastWatchedAt: new Date()
                  },
                  { upsert: true }
            );

            res.json(lesson);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Mark lesson as completed
const markLessonCompleted = async (req, res) => {
      try {
            const { courseId, lessonId } = req.params;
            const { watchTime } = req.body;
            const userId = req.user.id;

            // Get course
            const course = await CourseListing.findById(courseId);
            if (!course) {
                  return res.status(404).json({ error: "Course not found" });
            }

            // Update progress
            let progress = await UserProgress.findOne({ userId, courseId });
            if (!progress) {
                  progress = new UserProgress({ userId, courseId });
            }

            // Check if lesson already completed
            const existingCompletion = progress.completedLessons.find(
                  completion => completion.lessonId.toString() === lessonId
            );

            if (!existingCompletion) {
                  progress.completedLessons.push({
                        lessonId,
                        watchTime: watchTime || 0
                  });
            }

            // Calculate progress percentage
            const totalLessons = course.lessons.length;
            const completedCount = progress.completedLessons.length;
            progress.progressPercentage = Math.round((completedCount / totalLessons) * 100);

            // Check if course is completed
            if (completedCount === totalLessons) {
                  progress.isCompleted = true;
                  progress.completedAt = new Date();
            }

            await progress.save();

            res.json({
                  message: "Lesson marked as completed",
                  progress: progress.progressPercentage,
                  isCompleted: progress.isCompleted
            });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get learning dashboard
const getLearningDashboard = async (req, res) => {
      try {
            const userId = req.user.id;

            // Get all enrolled courses with progress
            const user = await User.findById(userId).populate({
                  path: 'enrolledCourses.courseId',
                  model: 'CourseListing'
            });

            const progressData = await Promise.all(
                  user.enrolledCourses.map(async (enrollment) => {
                        const progress = await UserProgress.findOne({
                              userId,
                              courseId: enrollment.courseId._id
                        });

                        return {
                              courseId: enrollment.courseId._id,
                              courseTitle: enrollment.courseId.title,
                              courseImage: enrollment.courseId.image,
                              instructor: enrollment.courseId.instructor,
                              enrolledAt: enrollment.enrolledAt,
                              progressPercentage: progress?.progressPercentage || 0,
                              isCompleted: progress?.isCompleted || false,
                              lastWatchedAt: progress?.lastWatchedAt,
                              totalLessons: enrollment.courseId.lessons?.length || 0,
                              completedLessons: progress?.completedLessons?.length || 0
                        };
                  })
            );

            res.json({
                  user: {
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                  },
                  courses: progressData,
                  stats: {
                        totalCourses: progressData.length,
                        completedCourses: progressData.filter(c => c.isCompleted).length,
                        totalLessons: progressData.reduce((sum, c) => sum + c.totalLessons, 0),
                        completedLessons: progressData.reduce((sum, c) => sum + c.completedLessons, 0)
                  }
            });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

module.exports = {
      getEnrolledCourses,
      getCourseContent,
      getLesson,
      markLessonCompleted,
      getLearningDashboard
};
