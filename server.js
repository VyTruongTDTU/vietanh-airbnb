require("dotenv").config();
const express = require("express");
const next = require("next");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./backend/config/db");

const userRoutes = require("./backend/routes/userRoute");
const listingRoutes = require("./backend/routes/listingRoute");
const authRoute = require("./backend/routes/authRoute");
const bookingRoutes = require("./backend/routes/bookingRoute");
const courseListingRoutes = require("./backend/routes/courseListingRoutes");
const enrollmentRoute = require("./backend/routes/enrollmentRoute");
const adminRoute = require("./backend/routes/adminRoute");
const blogRoutes = require("./backend/routes/blogPostRoute");


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

// Kết nối MongoDB trước
connectDB();

app.prepare().then(() => {
      const server = express();

      // Middleware xử lý JSON
      server.use(express.json());

      // API Routes
      server.use("/api/admin", adminRoute);
      server.use("/api/users", userRoutes);
      server.use("/api/listings", listingRoutes);
      server.use("/api/auth", authRoute);
      server.use("/api/upload", authRoute);
      server.use("/api/bookings", bookingRoutes);
      server.use("/api/blogs", blogRoutes);
      server.use("/api/courses-listing", courseListingRoutes);
      server.use("/api/enrollments", enrollmentRoute);

      server.use('/images', express.static(path.join(__dirname, 'app', 'images')));


      // All route
      server.all(/(.*)/, (req, res) => {
            return handle(req, res);
      });

      // Start server
      server.listen(PORT, () => {
            console.log(`Server ready on http://localhost:${PORT}`);
      });
}).catch((err) => {
      console.error("Error starting server:", err);
});
