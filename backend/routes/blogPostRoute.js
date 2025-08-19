const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogPostController");

// Rich content creation routes
router.post("/rich", blogController.createRichBlogPost);
router.post("/template", blogController.createFromTemplate);

// CRUD Routes
router.post("/", blogController.createBlogPost);
router.get("/", blogController.getAllBlogs);
// router.get("/:id", blogController.getBlogById);
router.get("/:slug", blogController.getBlogBySlug);
router.put("/:id", blogController.updateBlogPost);
router.delete("/:id", blogController.deleteBlogPost);

module.exports = router;
