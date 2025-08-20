"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthGuard } from "../components/AuthContext";

interface Course {
      courseId: string;
      courseTitle: string;
      courseImage: string;
      instructor: string;
      enrolledAt: string;
      progressPercentage: number;
      isCompleted: boolean;
      lastWatchedAt?: string;
      totalLessons: number;
      completedLessons: number;
}

interface DashboardData {
      user: {
            name: string;
            email: string;
            avatar?: string;
      };
      courses: Course[];
      stats: {
            totalCourses: number;
            completedCourses: number;
            totalLessons: number;
            completedLessons: number;
      };
}

export default function LearningDashboard() {
      const [data, setData] = useState<DashboardData | null>(null);
      const [loading, setLoading] = useState(true);
      const router = useRouter();

      // Protect route - only students can access
      const { user, loading: authLoading, isAuthorized } = useAuthGuard(['student']);

      useEffect(() => {
            if (isAuthorized && user) {
                  fetchDashboard();
            }
      }, [isAuthorized, user]);

      // Show loading while checking auth
      if (authLoading) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
                        </div>
                  </div>
            );
      }

      // Don't render anything if not authorized (redirect is handled by useAuthGuard)
      if (!isAuthorized) {
            return null;
      }

      const fetchDashboard = async () => {
            try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                        router.push("/auth/login");
                        return;
                  }

                  const response = await fetch("/api/learning/dashboard", {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });

                  if (response.ok) {
                        const dashboardData = await response.json();
                        setData(dashboardData);
                  } else {
                        throw new Error("Failed to fetch dashboard");
                  }
            } catch (error) {
                  console.error("Error fetching dashboard:", error);
                  router.push("/auth/login");
            } finally {
                  setLoading(false);
            }
      };

      const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString("vi-VN");
      };

      if (loading) {
            return (
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                              <p className="text-gray-600">Đang tải...</p>
                        </div>
                  </div>
            );
      }

      if (!data) {
            return (
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                              <p className="text-gray-600 mb-4">Không thể tải dữ liệu</p>
                              <button
                                    onClick={() => router.push("/auth/login")}
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                              >
                                    Đăng nhập lại
                              </button>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gray-50">
                  {/* Header */}
                  <div className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                              <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                                {data.user.name.charAt(0).toUpperCase()}
                                          </div>
                                          <div>
                                                <h1 className="text-xl font-bold text-gray-900">
                                                      Xin chào, {data.user.name}!
                                                </h1>
                                                <p className="text-gray-600">Chào mừng đến với khu vực học tập</p>
                                          </div>
                                    </div>
                                    <button
                                          onClick={() => {
                                                localStorage.removeItem("token");
                                                router.push("/");
                                          }}
                                          className="text-gray-600 hover:text-black"
                                    >
                                          Đăng xuất
                                    </button>
                              </div>
                        </div>
                  </div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                              <div className="bg-white rounded-lg shadow-sm p-6 border">
                                    <div className="text-3xl font-bold text-black">{data.stats.totalCourses}</div>
                                    <div className="text-gray-600">Khóa học đã đăng ký</div>
                              </div>
                              <div className="bg-white rounded-lg shadow-sm p-6 border">
                                    <div className="text-3xl font-bold text-green-600">{data.stats.completedCourses}</div>
                                    <div className="text-gray-600">Khóa học hoàn thành</div>
                              </div>
                              <div className="bg-white rounded-lg shadow-sm p-6 border">
                                    <div className="text-3xl font-bold text-blue-600">{data.stats.totalLessons}</div>
                                    <div className="text-gray-600">Tổng số bài học</div>
                              </div>
                              <div className="bg-white rounded-lg shadow-sm p-6 border">
                                    <div className="text-3xl font-bold text-purple-600">{data.stats.completedLessons}</div>
                                    <div className="text-gray-600">Bài học đã hoàn thành</div>
                              </div>
                        </div>

                        {/* Courses List */}
                        <div className="bg-white rounded-lg shadow-sm border">
                              <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold text-gray-900">Khóa học của bạn</h2>
                              </div>
                              <div className="p-6">
                                    {data.courses.length === 0 ? (
                                          <div className="text-center py-8">
                                                <p className="text-gray-600 mb-4">Bạn chưa đăng ký khóa học nào</p>
                                                <Link
                                                      href="/courses"
                                                      className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                                                >
                                                      Khám phá khóa học
                                                </Link>
                                          </div>
                                    ) : (
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {data.courses.map((course) => (
                                                      <div
                                                            key={course.courseId}
                                                            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                                      >
                                                            <div className="relative h-48">
                                                                  <Image
                                                                        src={course.courseImage}
                                                                        alt={course.courseTitle}
                                                                        fill
                                                                        className="object-cover"
                                                                        unoptimized
                                                                  />
                                                                  {course.isCompleted && (
                                                                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                                              Hoàn thành
                                                                        </div>
                                                                  )}
                                                            </div>
                                                            <div className="p-4">
                                                                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                                        {course.courseTitle}
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600 mb-3">
                                                                        Giảng viên: {course.instructor}
                                                                  </p>

                                                                  <div className="mb-3">
                                                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                                              <span>Tiến độ</span>
                                                                              <span>{course.progressPercentage}%</span>
                                                                        </div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                                              <div
                                                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                                                    style={{ width: `${course.progressPercentage}%` }}
                                                                              ></div>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 mt-1">
                                                                              {course.completedLessons}/{course.totalLessons} bài học
                                                                        </div>
                                                                  </div>

                                                                  <div className="flex justify-between items-center">
                                                                        <Link
                                                                              href={`/learning/course/${course.courseId}`}
                                                                              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                                                                        >
                                                                              {course.progressPercentage > 0 ? "Tiếp tục học" : "Bắt đầu học"}
                                                                        </Link>
                                                                        <div className="text-xs text-gray-500">
                                                                              Đăng ký: {formatDate(course.enrolledAt)}
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
}
