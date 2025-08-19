const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = (userId) => {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register
exports.register = async (req, res) => {
      try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

            const hashedPassword = await bcrypt.hash(password, 10);

            // Xử lý ảnh đại diện nếu có
            let avatar = "";
            if (req.file) {
                  avatar = `/images/user/${req.file.filename}`; // Đường dẫn lưu trữ
            }

            const newUser = await User.create({
                  name,
                  email,
                  password: hashedPassword,
                  avatar,
            });

            const token = generateToken(newUser._id);

            res.status(201).json({ user: newUser.toJSON(), token });
      } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({ message: "Đăng ký thất bại", error: error.message });
      }
};

// POST /api/auth/login
exports.login = async (req, res) => {
      const { email, password } = req.body;

      try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "Email không tồn tại" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });

            const token = generateToken(user._id);

            res.json({ user: user.toJSON(), token });
      } catch (error) {
            res.status(500).json({ message: "Đăng nhập thất bại", error: error.message });
      }
};

// GET /api/auth/profile
exports.getProfile = async (req, res) => {
      try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

            res.json({ user });
      } catch (error) {
            res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
      }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
      try {
            // Không cần huỷ token trong server khi dùng JWT
            res.status(200).json({ message: "Đăng xuất thành công" });
      } catch (error) {
            res.status(500).json({ message: "Lỗi khi đăng xuất", error: error.message });
      }
};
