"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import EnrollmentModal from "../../components/EnrollmentModal";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  instructor: string;
  image: string;
  price: number;
  duration: string;
  curriculum: string[];
  features: string[];
  students: number;
}

interface PageProps {
  params: { slug?: string } | Promise<{ slug?: string }>;
}

async function fetchCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/courses-listing/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    return (await res.json()) as Course;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export default function CourseDetailPage({ params }: PageProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const resolvedParams = await Promise.resolve(params);
      const slug = resolvedParams.slug;
      if (!slug) {
        notFound();
        return;
      }
      const fetched = await fetchCourseBySlug(slug);
      if (!fetched) {
        notFound();
        return;
      }
      setCourse(fetched);
    })();
  }, [params]);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Link
          href="/courses"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại danh sách khóa học
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-[400px] w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>

            {/* Nội dung khóa học */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">Nội dung khóa học</h2>
              <div className="space-y-4">
                {course.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full mr-4 font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-gray-800 font-medium">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bạn sẽ nhận được */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">Bạn sẽ nhận được gì?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Giá khóa học</span>
                    <span className="text-2xl font-bold text-black">
                      {course.price.toLocaleString("vi-VN")} VND
                    </span>
                  </div>

                  <button
                    className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all font-semibold"
                    onClick={() => setOpen(true)}
                  >
                    Đăng ký ngay
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    * Bảo đảm hoàn tiền trong 30 ngày
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Thông tin khóa học
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <p className="text-sm text-gray-500">Giảng viên</p>
                    <p className="font-medium ml-2">{course.instructor}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <p className="text-sm text-gray-500">Thời lượng</p>
                    <p className="font-medium ml-2">{course.duration}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <p className="text-sm text-gray-500">Học viên</p>
                    <p className="font-medium ml-2">
                      {course.students.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <EnrollmentModal
          isOpen={open}
          onClose={() => setOpen(false)}
          courseTitle={course.title}
          courseId={course._id}
          price={course.price}
        />
      </div>
    </div>
  );
}
