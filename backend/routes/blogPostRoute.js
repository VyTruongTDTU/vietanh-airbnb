const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogPostController");

// CRUD Routes
router.post("/", blogController.createBlogPost);
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.put("/:id", blogController.updateBlogPost);
router.delete("/:id", blogController.deleteBlogPost);

module.exports = router;
