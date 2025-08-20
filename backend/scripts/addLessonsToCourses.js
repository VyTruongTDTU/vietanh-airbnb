// This script adds sample lessons to existing courses
const mongoose = require('mongoose');
const CourseListing = require('../models/CourseListing');
require('dotenv').config();

const sampleLessons = [
      {
            title: "Giới thiệu về Airbnb và cơ hội kinh doanh",
            description: "Tìm hiểu về mô hình kinh doanh Airbnb và cơ hội đầu tư.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Sample YouTube URL
            duration: "15:30",
            order: 1,
            isPreview: true
      },
      {
            title: "Lựa chọn địa điểm và loại hình bất động sản",
            description: "Hướng dẫn chọn địa điểm và loại căn hộ phù hợp.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "22:45",
            order: 2,
            isPreview: false
      },
      {
            title: "Setup và trang trí căn hộ",
            description: "Cách setup và trang trí căn hộ để thu hút khách.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "18:20",
            order: 3,
            isPreview: false
      },
      {
            title: "Chụp ảnh listing chuyên nghiệp",
            description: "Kỹ thuật chụp ảnh để listing nổi bật.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "25:15",
            order: 4,
            isPreview: false
      },
      {
            title: "Viết mô tả listing hấp dẫn",
            description: "Cách viết mô tả để thu hút booking.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "16:40",
            order: 5,
            isPreview: false
      },
      {
            title: "Chiến lược định giá hiệu quả",
            description: "Cách định giá để tối ưu doanh thu.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "20:30",
            order: 6,
            isPreview: false
      },
      {
            title: "Quản lý booking và giao tiếp khách hàng",
            description: "Quy trình quản lý đặt phòng và chăm sóc khách.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "19:25",
            order: 7,
            isPreview: false
      },
      {
            title: "Xử lý vấn đề và khiếu nại",
            description: "Cách xử lý các tình huống phát sinh.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "14:50",
            order: 8,
            isPreview: false
      },
      {
            title: "Tối ưu SEO và marketing listing",
            description: "Chiến lược marketing để tăng booking.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "21:10",
            order: 9,
            isPreview: false
      },
      {
            title: "Mở rộng và phát triển kinh doanh",
            description: "Chiến lược phát triển portfolio bất động sản.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "23:35",
            order: 10,
            isPreview: false
      }
];

async function addLessonsToCourses() {
      try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');

            // Get all courses
            const courses = await CourseListing.find();

            for (const course of courses) {
                  // Add lessons to each course
                  course.lessons = sampleLessons;
                  course.totalVideos = sampleLessons.length;
                  course.totalDuration = "3h 17m";

                  await course.save();
                  console.log(`Added lessons to course: ${course.title}`);
            }

            console.log('Successfully added lessons to all courses');
            process.exit(0);
      } catch (error) {
            console.error('Error:', error);
            process.exit(1);
      }
}

// Run the script
addLessonsToCourses();
