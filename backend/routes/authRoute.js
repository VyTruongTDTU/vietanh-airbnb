const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { register, login, logout, getProfile } = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile);

// Upload route
router.post("/:type", upload.single("image"), (req, res) => {
      const { type } = req.params;

      if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = `/images/${type}/${req.file.filename}`;
      res.json({ url: fileUrl });
});


module.exports = router;
