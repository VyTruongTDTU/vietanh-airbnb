// controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");

// Create enrollment
const createEnrollment = async (req, res) => {
      try {
            const newEnrollment = await Enrollment.create(req.body);
            res.status(201).json(newEnrollment);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// Get all enrollments
const getAllEnrollments = async (req, res) => {
      try {
            const enrollments = await Enrollment.find().sort({ createdAt: -1 });
            res.json(enrollments);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get enrollment by ID
const getEnrollmentById = async (req, res) => {
      try {
            const enrollment = await Enrollment.findById(req.params.id);
            if (!enrollment) return res.status(404).json({ error: "Not found" });
            res.json(enrollment);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get enrollments by phone
const getEnrollmentByPhone = async (req, res) => {
      try {
            const enrollments = await Enrollment.find({ phone: req.params.phone });
            res.json(enrollments);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Get enrollments by fullname
const getEnrollmentByName = async (req, res) => {
      try {
            const enrollments = await Enrollment.find({
                  fullname: { $regex: req.params.name, $options: "i" },
            });
            res.json(enrollments);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Update enrollment
const updateEnrollment = async (req, res) => {
      try {
            const updated = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
            });
            res.json(updated);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
      try {
            const { id } = req.params;
            const updated = await Enrollment.findByIdAndUpdate(
                  id,
                  { paymentStatus: "paid" },
                  { new: true }
            );
            res.json(updated);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// Delete enrollment
const deleteEnrollment = async (req, res) => {
      try {
            await Enrollment.findByIdAndDelete(req.params.id);
            res.json({ message: "Enrollment deleted" });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

module.exports = {
      createEnrollment,
      getAllEnrollments,
      getEnrollmentById,
      getEnrollmentByPhone,
      getEnrollmentByName,
      updateEnrollment,
      updatePaymentStatus,
      deleteEnrollment,
};
