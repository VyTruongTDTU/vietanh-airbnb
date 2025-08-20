// controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const CourseListing = require("../models/CourseListing");
const bcrypt = require('bcrypt');



// Function to generate password from phone number
const generatePassword = (phone) => {
      // Use phone number as password (remove any special characters)
      return phone.replace(/\D/g, '');
};

// Function to create student account
const createStudentAccount = async (enrollmentData) => {
      try {
            // Check if user already exists
            let user = await User.findOne({ email: enrollmentData.email });

            if (!user) {
                  // Use phone number as password
                  const plainPassword = generatePassword(enrollmentData.phone);
                  const hashedPassword = await bcrypt.hash(plainPassword, 10);

                  // Create new user
                  user = await User.create({
                        name: enrollmentData.fullname,
                        email: enrollmentData.email,
                        password: hashedPassword,
                        role: "student",
                        enrolledCourses: [{
                              courseId: enrollmentData.courseId,
                              enrolledAt: new Date()
                        }]
                  });

                  return { user, password: plainPassword, isNewUser: true };
            } else {
                  // Add course to existing user's enrolled courses if not already enrolled
                  const isAlreadyEnrolled = user.enrolledCourses.some(
                        course => course.courseId.toString() === enrollmentData.courseId.toString()
                  );

                  if (!isAlreadyEnrolled) {
                        user.enrolledCourses.push({
                              courseId: enrollmentData.courseId,
                              enrolledAt: new Date()
                        });
                        await user.save();
                  }

                  // For existing users, still return phone as password for consistency
                  const plainPassword = generatePassword(enrollmentData.phone);
                  return { user, password: plainPassword, isNewUser: false };
            }
      } catch (error) {
            throw new Error(`Error creating student account: ${error.message}`);
      }
};// Create enrollment with improved flow
const createEnrollment = async (req, res) => {
      try {
            const { fullname, email, phone, courseId, title, price } = req.body;

            // Check if user already exists
            let user = await User.findOne({ email });
            let isNewUser = false;

            if (user) {
                  // User exists - check if already enrolled in this course
                  const alreadyEnrolled = user.enrolledCourses.some(
                        enrollment => enrollment.courseId.toString() === courseId.toString()
                  );

                  if (alreadyEnrolled) {
                        return res.status(400).json({
                              error: "ALREADY_ENROLLED",
                              message: "Bạn đã đăng ký khóa học này rồi. Vui lòng đăng nhập để truy cập khóa học.",
                              loginRequired: true,
                              userEmail: email
                        });
                  }

                  // Update user's name if different (in case user provided different name)
                  if (user.name !== fullname) {
                        user.name = fullname;
                        await user.save();
                  }
            } else {
                  // Create new user
                  const plainPassword = generatePassword(phone);
                  const hashedPassword = await bcrypt.hash(plainPassword, 10);

                  user = await User.create({
                        name: fullname,
                        email: email,
                        password: hashedPassword,
                        role: "student",
                        enrolledCourses: []
                  });
                  isNewUser = true;
            }

            // Create enrollment record
            const newEnrollment = await Enrollment.create({
                  courseId,
                  title,
                  fullname,
                  email,
                  phone,
                  price,
                  paymentStatus: "pending"
            });

            // Add course to user's enrolled courses (with pending status)
            user.enrolledCourses.push({
                  courseId: courseId,
                  enrolledAt: new Date(),
                  enrollmentId: newEnrollment._id // Link to enrollment record
            });
            await user.save();

            res.status(201).json({
                  enrollment: newEnrollment,
                  isNewUser,
                  message: isNewUser
                        ? "Đăng ký thành công! Tài khoản học viên đã được tạo."
                        : "Đăng ký thành công! Khóa học đã được thêm vào tài khoản của bạn."
            });

      } catch (err) {
            console.error("Enrollment error:", err);
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

// Update payment status and create student account
const updatePaymentStatus = async (req, res) => {
      try {
            const { id } = req.params;
            const enrollment = await Enrollment.findByIdAndUpdate(
                  id,
                  { paymentStatus: "paid" },
                  { new: true }
            );

            if (!enrollment) {
                  return res.status(404).json({ error: "Enrollment not found" });
            }

            // Create student account when payment is confirmed
            if (enrollment.paymentStatus === "paid") {
                  const accountInfo = await createStudentAccount(enrollment);

                  // Update course student count
                  await CourseListing.findByIdAndUpdate(
                        enrollment.courseId,
                        { $inc: { students: 1 } }
                  );

                  res.json({
                        enrollment,
                        studentAccount: {
                              username: accountInfo.user.email,
                              password: accountInfo.password,
                              isNewUser: accountInfo.isNewUser,
                              message: accountInfo.isNewUser
                                    ? "New student account created successfully!"
                                    : "Course added to existing account!"
                        }
                  });
            } else {
                  res.json(enrollment);
            }
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

// Debug endpoint to check user account creation
const debugUserAccount = async (req, res) => {
      try {
            const { email } = req.params;
            const user = await User.findOne({ email }).populate('enrolledCourses.courseId');

            if (!user) {
                  return res.status(404).json({ error: "User not found" });
            }

            res.json({
                  user: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        enrolledCourses: user.enrolledCourses,
                        createdAt: user.createdAt
                  },
                  message: "User found successfully"
            });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// Check if email is already enrolled in a course
const checkEnrollment = async (req, res) => {
      try {
            const { email, courseId } = req.body;

            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                  return res.json({
                        isEnrolled: false,
                        message: "Email chưa được đăng ký"
                  });
            }

            // Check if user is enrolled in this specific course
            const isEnrolled = user.enrolledCourses.some(
                  enrollment => enrollment.courseId.toString() === courseId.toString()
            );

            if (isEnrolled) {
                  // For existing users, we need to get their actual phone number that was used as password
                  // Let's find the enrollment record to get the phone
                  const enrollment = await Enrollment.findOne({
                        email: email,
                        courseId: courseId
                  });

                  return res.json({
                        isEnrolled: true,
                        message: "Email đã đăng ký khóa học này",
                        email: user.email,
                        phone: enrollment ? enrollment.phone : "Contact support", // Use enrollment phone as password
                        userName: user.name
                  });
            } else {
                  return res.json({
                        isEnrolled: false,
                        message: "Email đã tồn tại nhưng chưa đăng ký khóa học này"
                  });
            }

      } catch (error) {
            console.error("Check enrollment error:", error);
            res.status(500).json({
                  error: "SERVER_ERROR",
                  message: "Lỗi hệ thống khi kiểm tra đăng ký"
            });
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
      debugUserAccount,
      checkEnrollment
};
