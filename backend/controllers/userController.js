const User = require("../models/User");
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
      try {
            const users = await User.find();
            res.json(users);
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
};

// Get single user by ID
const getUserById = async (req, res) => {
      try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
};

// Create a new user
const createUser = async (req, res) => {
      try {
            const { name, email, password, avatar, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, avatar, role });
            await user.save();

            res.status(201).json(user);
      } catch (err) {
            res.status(400).json({ message: err.message });
      }
};

// Update user by ID
const updateUser = async (req, res) => {
      try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
            });
            if (!updatedUser) return res.status(404).json({ message: "User not found" });
            res.json(updatedUser);
      } catch (err) {
            res.status(400).json({ message: err.message });
      }
};

// Delete user by ID
const deleteUser = async (req, res) => {
      try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: "User not found" });
            res.json({ message: "User deleted" });
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
};

module.exports = {
      getAllUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
};
