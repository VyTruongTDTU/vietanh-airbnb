"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Course = {
  _id: string;
  slug: string;
  title: string;
  instructor: string;
  price: number;
  duration: string;
  image: string;
  students: number;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await fetch("http://localhost:3000/api/courses-listing", {
        cache: "no-store",
      }).then((res) => res.json());

      setCourses(data);
    }

    loadCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          Khóa Học Airbnb
        </h1>
        <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Khám phá các khóa học chất lượng cao về kinh doanh Airbnb, được thiết
          kế bởi các chuyên gia hàng đầu.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link
            href={`/courses/${course.slug}`}
            key={course._id}
            className="group"
          >
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold group-hover:text-black transition-colors mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Giảng viên: {course.instructor}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Thời lượng: {course.duration}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Học viên: {course.students.toLocaleString()}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-900 font-bold">
                    {course.price.toLocaleString("vi-VN")} VND
                  </p>
                  <span className="text-black hover:text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-black transition-all">
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
