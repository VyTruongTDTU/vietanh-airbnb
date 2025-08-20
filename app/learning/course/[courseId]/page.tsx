"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "../../../components/AuthContext";

interface Lesson {
      _id: string;
      title: string;
      description: string;
      videoUrl: string;
      duration: string;
      order: number;
      isPreview: boolean;
}

interface Course {
      _id: string;
      title: string;
      instructor: string;
      image: string;
      lessons: Lesson[];
      totalVideos: number;
      totalDuration: string;
}

interface Progress {
      _id: string;
      completedLessons: Array<{
            lessonId: string;
            completedAt: string;
            watchTime: number;
      }>;
      currentLesson: string;
      progressPercentage: number;
      isCompleted: boolean;
}

interface CourseData {
      course: Course;
      progress: Progress;
      totalLessons: number;
}

export default function CourseLearningPage() {
      const params = useParams();
      const router = useRouter();
      const courseId = params.courseId as string;

      // Protect route - only students can access
      const { user, loading: authLoading, isAuthorized } = useAuthGuard(['student']);

      const [courseData, setCourseData] = useState<CourseData | null>(null);
      const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
      const [loading, setLoading] = useState(true);
      const [sidebarOpen, setSidebarOpen] = useState(true);

      useEffect(() => {
            if (courseId) {
                  fetchCourseContent();
            }
      }, [courseId]);

      const fetchCourseContent = async () => {
            try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                        router.push("/auth/login");
                        return;
                  }

                  const response = await fetch(`/api/learning/courses/${courseId}`, {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });

                  if (response.ok) {
                        const data = await response.json();
                        setCourseData(data);

                        // Set current lesson from progress or first lesson
                        if (data.progress.currentLesson) {
                              const lesson = data.course.lessons.find(
                                    (l: Lesson) => l._id === data.progress.currentLesson
                              );
                              setCurrentLesson(lesson || data.course.lessons[0]);
                        } else {
                              setCurrentLesson(data.course.lessons[0]);
                        }
                  } else if (response.status === 403) {
                        alert("Bạn chưa đăng ký khóa học này");
                        router.push("/learning");
                  } else {
                        throw new Error("Failed to fetch course content");
                  }
            } catch (error) {
                  console.error("Error fetching course content:", error);
                  router.push("/learning");
            } finally {
                  setLoading(false);
            }
      };

      const selectLesson = async (lesson: Lesson) => {
            setCurrentLesson(lesson);

            try {
                  const token = localStorage.getItem("token");
                  await fetch(`/api/learning/courses/${courseId}/lessons/${lesson._id}`, {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });
            } catch (error) {
                  console.error("Error updating current lesson:", error);
            }
      };

      const markLessonCompleted = async () => {
            if (!currentLesson) return;

            try {
                  const token = localStorage.getItem("token");
                  const response = await fetch(
                        `/api/learning/courses/${courseId}/lessons/${currentLesson._id}/complete`,
                        {
                              method: "POST",
                              headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ watchTime: 0 }),
                        }
                  );

                  if (response.ok) {
                        const result = await response.json();
                        // Refresh course data to update progress
                        fetchCourseContent();

                        if (result.isCompleted) {
                              alert("🎉 Chúc mừng! Bạn đã hoàn thành khóa học!");
                        }
                  }
            } catch (error) {
                  console.error("Error marking lesson as completed:", error);
            }
      };

      const getYouTubeEmbedUrl = (url: string) => {
            // Convert YouTube URL to embed format
            if (url.includes("youtube.com/watch?v=")) {
                  const videoId = url.split("v=")[1].split("&")[0];
                  return `https://www.youtube.com/embed/${videoId}`;
            } else if (url.includes("youtu.be/")) {
                  const videoId = url.split("youtu.be/")[1].split("?")[0];
                  return `https://www.youtube.com/embed/${videoId}`;
            } else if (url.includes("youtube.com/embed/")) {
                  return url;
            }
            return url;
      };

      const isLessonCompleted = (lessonId: string) => {
            return courseData?.progress.completedLessons.some(
                  (completion) => completion.lessonId === lessonId
            );
      };

      if (loading) {
            return (
                  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                              <p className="text-white">Đang tải khóa học...</p>
                        </div>
                  </div>
            );
      }

      if (!courseData || !currentLesson) {
            return (
                  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                        <div className="text-center">
                              <p className="text-white mb-4">Không thể tải khóa học</p>
                              <Link
                                    href="/learning"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                              >
                                    Quay lại dashboard
                              </Link>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gray-900 flex">
                  {/* Main Video Area */}
                  <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
                        {/* Top Header */}
                        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                    <Link
                                          href="/learning"
                                          className="text-gray-300 hover:text-white"
                                    >
                                          ← Quay lại
                                    </Link>
                                    <h1 className="text-lg font-semibold truncate">{courseData.course.title}</h1>
                              </div>
                              <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-300">
                                          {courseData.progress.progressPercentage}% hoàn thành
                                    </span>
                                    <button
                                          onClick={() => setSidebarOpen(!sidebarOpen)}
                                          className="p-2 hover:bg-gray-700 rounded"
                                    >
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                                          </svg>
                                    </button>
                              </div>
                        </div>

                        {/* Video Player */}
                        <div className="flex-1 bg-black flex items-center justify-center">
                              <div className="w-full h-full max-w-6xl mx-auto">
                                    <iframe
                                          src={getYouTubeEmbedUrl(currentLesson.videoUrl)}
                                          className="w-full h-full min-h-[60vh]"
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                          title={currentLesson.title}
                                    ></iframe>
                              </div>
                        </div>

                        {/* Video Info and Controls */}
                        <div className="bg-gray-800 text-white p-6">
                              <div className="flex items-center justify-between mb-4">
                                    <div>
                                          <h2 className="text-xl font-semibold mb-2">{currentLesson.title}</h2>
                                          <p className="text-gray-300">{currentLesson.description}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                          {!isLessonCompleted(currentLesson._id) && (
                                                <button
                                                      onClick={markLessonCompleted}
                                                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium"
                                                >
                                                      Đánh dấu hoàn thành
                                                </button>
                                          )}
                                          {isLessonCompleted(currentLesson._id) && (
                                                <span className="bg-green-600 text-white px-6 py-2 rounded-md font-medium">
                                                      ✓ Đã hoàn thành
                                                </span>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Sidebar - Course Content */}
                  {sidebarOpen && (
                        <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg overflow-y-auto z-10">
                              <div className="p-4 border-b bg-gray-50">
                                    <h3 className="font-semibold text-gray-900 mb-2">Nội dung khóa học</h3>
                                    <div className="text-sm text-gray-600">
                                          {courseData.progress.completedLessons.length}/{courseData.course.lessons.length} bài học
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                          <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${courseData.progress.progressPercentage}%` }}
                                          ></div>
                                    </div>
                              </div>

                              <div className="p-4">
                                    <div className="space-y-2">
                                          {courseData.course.lessons
                                                .sort((a, b) => a.order - b.order)
                                                .map((lesson, index) => {
                                                      const isCompleted = isLessonCompleted(lesson._id);
                                                      const isCurrent = currentLesson._id === lesson._id;

                                                      let statusBgColor = "bg-gray-300 text-gray-700";
                                                      if (isCompleted) {
                                                            statusBgColor = "bg-green-500 text-white";
                                                      } else if (isCurrent) {
                                                            statusBgColor = "bg-blue-500 text-white";
                                                      }

                                                      return (
                                                            <button
                                                                  key={lesson._id}
                                                                  onClick={() => selectLesson(lesson)}
                                                                  className={`w-full p-3 rounded-lg border transition-all text-left ${isCurrent
                                                                        ? "bg-blue-50 border-blue-200"
                                                                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                                                        }`}
                                                            >
                                                                  <div className="flex items-start space-x-3">
                                                                        <div className="flex-shrink-0">
                                                                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${statusBgColor}`}>
                                                                                    {isCompleted ? "✓" : index + 1}
                                                                              </div>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                              <h4 className={`text-sm font-medium ${isCurrent ? "text-blue-900" : "text-gray-900"
                                                                                    }`}>
                                                                                    {lesson.title}
                                                                              </h4>
                                                                              <p className="text-xs text-gray-500 mt-1">
                                                                                    {lesson.duration}
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            </button>
                                                      );
                                                })}
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
