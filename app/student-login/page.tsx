"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";

export default function StudentLoginPage() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const router = useRouter();
      const searchParams = useSearchParams();
      const { login } = useAuth();

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError("");

            console.log("Login attempt with:", { email, password: "***" });

            try {
                  const response = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                  });

                  console.log("Login response status:", response.status);
                  const data = await response.json();
                  console.log("Login response data:", data);

                  if (response.ok) {
                        // Use the auth context login method
                        await login(data.token);

                        // Get redirect URL from query params
                        const redirectUrl = searchParams.get('redirect');
                        console.log("Redirect URL:", redirectUrl);

                        // Check if user is a student and redirect accordingly
                        if (data.user.role === "student") {
                              const targetUrl = redirectUrl || "/learning";
                              console.log("Redirecting student to:", targetUrl);
                              // Use router.replace to avoid back button issues
                              router.replace(targetUrl);
                        } else {
                              console.log("Redirecting non-student to home");
                              router.replace("/");
                        }
                  } else {
                        console.error("Login failed:", data);
                        setError(data.message || "Đăng nhập thất bại");
                  }
            } catch (error) {
                  console.error("Login error:", error);
                  setError("Có lỗi xảy ra, vui lòng thử lại");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="text-center">
                              <h2 className="text-3xl font-bold text-gray-900">
                                    Đăng nhập học viên
                              </h2>
                              <p className="mt-2 text-sm text-gray-600">
                                    Truy cập vào khu vực học tập của bạn
                              </p>
                        </div>
                  </div>

                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                              <form className="space-y-6" onSubmit={handleSubmit}>
                                    {error && (
                                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                                {error}
                                          </div>
                                    )}

                                    <div>
                                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                          </label>
                                          <div className="mt-1">
                                                <input
                                                      id="email"
                                                      name="email"
                                                      type="email"
                                                      autoComplete="email"
                                                      required
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                      placeholder="Nhập email đã đăng ký khóa học"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Mật khẩu
                                          </label>
                                          <div className="mt-1">
                                                <input
                                                      id="password"
                                                      name="password"
                                                      type="password"
                                                      autoComplete="current-password"
                                                      required
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                      placeholder="Nhập số điện thoại đã đăng ký"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                                          >
                                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                                          </button>
                                    </div>
                              </form>

                              <div className="mt-6">
                                    <div className="relative">
                                          <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300" />
                                          </div>
                                          <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Hoặc</span>
                                          </div>
                                    </div>

                                    <div className="mt-6 text-center space-y-2">
                                          <p className="text-sm text-gray-600">
                                                Chưa có tài khoản học viên?
                                          </p>
                                          <Link
                                                href="/courses"
                                                className="font-medium text-black hover:text-gray-800"
                                          >
                                                Đăng ký khóa học ngay
                                          </Link>
                                    </div>

                                    <div className="mt-4 text-center">
                                          <Link
                                                href="/"
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                          >
                                                ← Quay về trang chủ
                                          </Link>
                                    </div>
                              </div>
                        </div>

                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                              <div className="flex">
                                    <div className="flex-shrink-0">
                                          <svg
                                                className="h-5 w-5 text-blue-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                          >
                                                <path
                                                      fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                      clipRule="evenodd"
                                                />
                                          </svg>
                                    </div>
                                    <div className="ml-3">
                                          <h3 className="text-sm font-medium text-blue-800">
                                                Thông tin đăng nhập
                                          </h3>
                                          <div className="mt-2 text-sm text-blue-700">
                                                <p>
                                                      • <strong>Username:</strong> Email bạn đã sử dụng để đăng ký khóa học
                                                </p>
                                                <p>
                                                      • <strong>Mật khẩu:</strong> Số điện thoại bạn đã đăng ký (chỉ số, không có ký tự đặc biệt)
                                                </p>
                                                <p className="mt-2 text-xs text-blue-600">
                                                      Ví dụ: Nếu số điện thoại là 0901234567, mật khẩu sẽ là: 0901234567
                                                </p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
