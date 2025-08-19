const express = require("express");
const {
      createBooking,
      updatePaymentStatus,
      getAllBookings,
      getBookingById,
      getBookingsByEmail,
      getBookingsByPhone,
      getBookingsByDateRange,
      updateBooking,
      deleteBooking
} = require("../controllers/bookingController");

const router = express.Router();

// Tạo booking mới
router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/search/by-email", getBookingsByEmail);
router.get("/search/by-phone", getBookingsByPhone);
router.get("/search/by-dates", getBookingsByDateRange);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

// Cập nhật trạng thái thanh toán
router.patch("/:id/payment", updatePaymentStatus);

module.exports = router;
