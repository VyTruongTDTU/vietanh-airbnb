const Booking = require("../models/Booking");

// Tạo booking mới
const createBooking = async (req, res) => {
      try {
            const booking = new Booking(req.body);
            await booking.save();
            res.status(201).json(booking);
      } catch (err) {
            console.error("Create booking failed:", err);
            res.status(500).json({ error: "Failed to create booking" });
      }
};

// Cập nhật trạng thái thanh toán
const updatePaymentStatus = async (req, res) => {
      try {
            const { id } = req.params;

            const updatedBooking = await Booking.findByIdAndUpdate(
                  id,
                  { paymentStatus: "paid" },
                  { new: true }
            );

            if (!updatedBooking) {
                  return res.status(404).json({ error: "Booking not found" });
            }

            res.json(updatedBooking);
      } catch (err) {
            console.error("Update payment status failed:", err);
            res.status(500).json({ error: "Failed to update payment status" });
      }
};

const getAllBookings = async (req, res) => {
      try {
            const bookings = await Booking.find().sort({ createdAt: -1 });
            res.status(200).json(bookings);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi lấy danh sách đặt phòng" });
      }
};

// Get booking by ID
const getBookingById = async (req, res) => {
      try {
            const booking = await Booking.findById(req.params.id);
            if (!booking) return res.status(404).json({ error: "Không tìm thấy đặt phòng" });
            res.status(200).json(booking);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi tìm đặt phòng theo ID" });
      }
};

// Get bookings by email
const getBookingsByEmail = async (req, res) => {
      try {
            const bookings = await Booking.find({ guestEmail: req.query.email });
            res.status(200).json(bookings);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi tìm đặt phòng theo email" });
      }
};

// Get bookings by phone
const getBookingsByPhone = async (req, res) => {
      try {
            const bookings = await Booking.find({ guestPhone: req.query.phone });
            res.status(200).json(bookings);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi tìm đặt phòng theo số điện thoại" });
      }
};

// Get bookings by date range
const getBookingsByDateRange = async (req, res) => {
      try {
            const { startDate, endDate } = req.query;
            const bookings = await Booking.find({
                  startDate: { $gte: new Date(startDate) },
                  endDate: { $lte: new Date(endDate) },
            });
            res.status(200).json(bookings);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi tìm đặt phòng theo khoảng ngày" });
      }
};

// Update a booking (e.g. payment status)
const updateBooking = async (req, res) => {
      try {
            const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
            });
            if (!booking) return res.status(404).json({ error: "Không tìm thấy đặt phòng để cập nhật" });
            res.status(200).json(booking);
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi cập nhật đặt phòng" });
      }
};

// Delete a booking
const deleteBooking = async (req, res) => {
      try {
            const booking = await Booking.findByIdAndDelete(req.params.id);
            if (!booking) return res.status(404).json({ error: "Không tìm thấy đặt phòng để xoá" });
            res.status(200).json({ message: "Xoá thành công" });
      } catch (error) {
            res.status(500).json({ error: "Lỗi khi xoá đặt phòng" });
      }
};

// Export các hàm
module.exports = {
      createBooking,
      updatePaymentStatus,
      getAllBookings,
      getBookingById,
      getBookingsByEmail,
      getBookingsByPhone,
      getBookingsByDateRange,
      updateBooking,
      deleteBooking
};
