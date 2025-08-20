// routes/enrollmentRoute.js
const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

router.post("/", enrollmentController.createEnrollment);
router.post("/check-enrollment", enrollmentController.checkEnrollment);
router.get("/", enrollmentController.getAllEnrollments);
router.get("/:id", enrollmentController.getEnrollmentById);
router.get("/phone/:phone", enrollmentController.getEnrollmentByPhone);
router.get("/name/:name", enrollmentController.getEnrollmentByName);
router.put("/:id", enrollmentController.updateEnrollment);
router.patch("/:id/payment-status", enrollmentController.updatePaymentStatus);
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
