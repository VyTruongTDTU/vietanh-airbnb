const express = require("express");
const router = express.Router();
const {
      getAllCourses,
      getCourseById,
      getCourseBySlug,
      getCourseByTitle,
      getCoursesByInstructor,
      createCourse,
      updateCourse,
      deleteCourse,
} = require("../controllers/courseListingController");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/slug/:slug", getCourseBySlug);
router.get("/title/:title", getCourseByTitle);
router.get("/instructor/:instructor", getCoursesByInstructor);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
