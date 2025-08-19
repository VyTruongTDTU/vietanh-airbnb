const BlogPost = require("../models/BlogPost");

// [POST] /api/blogs
exports.createBlogPost = async (req, res) => {
      try {
            const blog = new BlogPost(req.body);
            await blog.save();
            res.status(201).json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// [GET] /api/blogs
exports.getAllBlogs = async (req, res) => {
      try {
            const { tag, category, title, startDate, endDate } = req.query;
            const filter = {};

            if (tag) filter.tags = tag;
            if (category) filter.category = category;
            if (title) filter.title = new RegExp(title, "i");
            if (startDate || endDate) {
                  filter.date = {};
                  if (startDate) filter.date.$gte = new Date(startDate);
                  if (endDate) filter.date.$lte = new Date(endDate);
            }

            const blogs = await BlogPost.find(filter)
                  .populate("author", "name avatar")
                  .sort({ createdAt: -1 });

            res.json(blogs);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// [GET] /api/blogs/:slug
exports.getBlogBySlug = async (req, res) => {
      try {
            const blog = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name avatar");
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json(blog);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// [PUT] /api/blogs/:id
exports.updateBlogPost = async (req, res) => {
      try {
            const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// [DELETE] /api/blogs/:id
exports.deleteBlogPost = async (req, res) => {
      try {
            const blog = await BlogPost.findByIdAndDelete(req.params.id);
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json({ message: "Blog deleted successfully" });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};
