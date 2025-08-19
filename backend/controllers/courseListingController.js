const CourseListing = require("../models/CourseListing");
// GET /api/courses
const getAllCourses = async (req, res) => {
      try {
            const courses = await CourseListing.find();
            res.json(courses);
      } catch (err) {
            res.status(500).json({ error: "Server Error" });
      }
};

// GET /api/courses/:id
const getCourseById = async (req, res) => {
      try {
            const course = await CourseListing.findById(req.params.id);
            if (!course) return res.status(404).json({ error: "Course not found" });
            res.json(course);
      } catch (err) {
            res.status(400).json({ error: "Invalid ID" });
      }
};

// GET /api/courses/slug/:slug
const getCourseBySlug = async (req, res) => {
      try {
            const course = await CourseListing.findOne({ slug: req.params.slug });
            if (!course) return res.status(404).json({ error: "Course not found" });
            res.json(course);
      } catch (err) {
            res.status(500).json({ error: "Server Error" });
      }
};

// GET /api/courses/title/:title
const getCourseByTitle = async (req, res) => {
      try {
            const course = await CourseListing.findOne({ title: req.params.title });
            if (!course) return res.status(404).json({ error: "Course not found" });
            res.json(course);
      } catch (err) {
            res.status(500).json({ error: "Server Error" });
      }
};

// GET /api/courses/instructor/:instructor
const getCoursesByInstructor = async (req, res) => {
      try {
            const courses = await CourseListing.find({
                  instructor: req.params.instructor,
            });
            res.json(courses);
      } catch (err) {
            res.status(500).json({ error: "Server Error" });
      }
};

// POST /api/courses
const createCourse = async (req, res) => {
      try {
            const newCourse = new CourseListing(req.body);
            await newCourse.save();
            res.status(201).json(newCourse);
      } catch (err) {
            res.status(400).json({ error: "Invalid data", details: err.message });
      }
};

// PUT /api/courses/:id
const updateCourse = async (req, res) => {
      try {
            const updated = await CourseListing.findByIdAndUpdate(
                  req.params.id,
                  req.body,
                  { new: true }
            );
            if (!updated) return res.status(404).json({ error: "Course not found" });
            res.json(updated);
      } catch (err) {
            res.status(400).json({ error: "Invalid data or ID" });
      }
};

// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
      try {
            const deleted = await CourseListing.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ error: "Course not found" });
            res.json({ message: "Course deleted" });
      } catch (err) {
            res.status(400).json({ error: "Invalid ID" });
      }
};

module.exports = {
      getAllCourses,
      getCourseById,
      getCourseBySlug,
      getCourseByTitle,
      getCoursesByInstructor,
      createCourse,
      updateCourse,
      deleteCourse,
};
