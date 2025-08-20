"use client";

import { useState } from "react";

export default function EnrollmentDemoPage() {
      const [step, setStep] = useState(1);
      const enrollmentData = {
            fullname: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            phone: "0901234567",
            courseTitle: "Khóa Học Toàn Diện về Kinh Doanh Airbnb"
      };

      const simulateEnrollment = async () => {
            setStep(2);
            // Simulate enrollment process
            setTimeout(() => setStep(3), 2000);
            // Simulate payment confirmation
            setTimeout(() => setStep(4), 4000);
      };

      return (
            <div className="min-h-screen bg-gray-50 py-12">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    Demo: Quy Trình Đăng Ký Khóa Học
                              </h1>
                              <p className="text-gray-600">
                                    Xem cách học viên nhận tài khoản sau khi đăng ký khóa học
                              </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                              {/* Step Indicator */}
                              <div className="flex items-center justify-center mb-8">
                                    <div className="flex items-center space-x-4">
                                          {[1, 2, 3, 4].map((stepNumber) => (
                                                <div key={stepNumber} className="flex items-center">
                                                      <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber
                                                                        ? "bg-blue-600 text-white"
                                                                        : "bg-gray-200 text-gray-500"
                                                                  }`}
                                                      >
                                                            {step > stepNumber ? "✓" : stepNumber}
                                                      </div>
                                                      {stepNumber < 4 && (
                                                            <div
                                                                  className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                                                                        }`}
                                                            ></div>
                                                      )}
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* Step Content */}
                              {step === 1 && (
                                    <div className="text-center">
                                          <h2 className="text-xl font-semibold mb-6">Bước 1: Đăng Ký Khóa Học</h2>
                                          <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                                <div className="space-y-4 text-left max-w-md mx-auto">
                                                      <div>
                                                            <div className="block text-sm font-medium text-gray-700 mb-1">
                                                                  Họ và tên
                                                            </div>
                                                            <div className="text-gray-900">{enrollmentData.fullname}</div>
                                                      </div>
                                                      <div>
                                                            <div className="block text-sm font-medium text-gray-700 mb-1">
                                                                  Email
                                                            </div>
                                                            <div className="text-gray-900">{enrollmentData.email}</div>
                                                      </div>
                                                      <div>
                                                            <div className="block text-sm font-medium text-gray-700 mb-1">
                                                                  Số điện thoại
                                                            </div>
                                                            <div className="text-gray-900">{enrollmentData.phone}</div>
                                                      </div>
                                                      <div>
                                                            <div className="block text-sm font-medium text-gray-700 mb-1">
                                                                  Khóa học
                                                            </div>
                                                            <div className="text-gray-900">{enrollmentData.courseTitle}</div>
                                                      </div>
                                                </div>
                                          </div>
                                          <button
                                                onClick={simulateEnrollment}
                                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
                                          >
                                                Đăng ký khóa học
                                          </button>
                                    </div>
                              )}

                              {step === 2 && (
                                    <div className="text-center">
                                          <h2 className="text-xl font-semibold mb-6">Bước 2: Xử Lý Đăng Ký</h2>
                                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                          <p className="text-gray-600">Đang xử lý đăng ký của bạn...</p>
                                    </div>
                              )}

                              {step === 3 && (
                                    <div className="text-center">
                                          <h2 className="text-xl font-semibold mb-6">Bước 3: Chờ Thanh Toán</h2>
                                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                                                <div className="flex items-center justify-center mb-4">
                                                      <svg
                                                            className="w-8 h-8 text-yellow-600 mr-2"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                      >
                                                            <path
                                                                  fillRule="evenodd"
                                                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                                  clipRule="evenodd"
                                                            />
                                                      </svg>
                                                      <span className="text-yellow-800 font-medium">
                                                            Chờ xác nhận thanh toán
                                                      </span>
                                                </div>
                                                <p className="text-yellow-700 text-sm">
                                                      Đang chờ admin xác nhận thanh toán thành công...
                                                </p>
                                          </div>
                                    </div>
                              )}

                              {step === 4 && (
                                    <div className="text-center">
                                          <h2 className="text-xl font-semibold mb-6">Bước 4: Tài Khoản Học Viên Đã Tạo!</h2>
                                          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                                                <div className="flex items-center justify-center mb-4">
                                                      <svg
                                                            className="w-8 h-8 text-green-600 mr-2"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                      >
                                                            <path
                                                                  fillRule="evenodd"
                                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                  clipRule="evenodd"
                                                            />
                                                      </svg>
                                                      <span className="text-green-800 font-medium text-lg">
                                                            Tài khoản đã được tạo thành công!
                                                      </span>
                                                </div>

                                                <div className="bg-white rounded-lg p-4 mb-4">
                                                      <h3 className="font-semibold text-gray-900 mb-3">
                                                            Thông tin đăng nhập của bạn:
                                                      </h3>
                                                      <div className="space-y-2 text-left">
                                                            <div className="flex justify-between">
                                                                  <span className="text-gray-600">Username:</span>
                                                                  <span className="font-mono text-blue-600">
                                                                        {enrollmentData.email}
                                                                  </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                  <span className="text-gray-600">Password:</span>
                                                                  <span className="font-mono text-blue-600">
                                                                        {enrollmentData.phone.replace(/\D/g, "")}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>

                                                <p className="text-green-700 text-sm mb-4">
                                                      Hãy sử dụng thông tin trên để đăng nhập vào khu vực học tập!
                                                </p>

                                                <a
                                                      href="/student-login"
                                                      className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-medium"
                                                >
                                                      Đăng nhập ngay
                                                </a>
                                          </div>
                                    </div>
                              )}

                              {/* Reset Button */}
                              {step === 4 && (
                                    <div className="text-center mt-6">
                                          <button
                                                onClick={() => setStep(1)}
                                                className="text-gray-500 hover:text-gray-700 text-sm"
                                          >
                                                ← Xem lại demo
                                          </button>
                                    </div>
                              )}
                        </div>

                        {/* System Information */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                    Cách Hệ Thống Hoạt Động:
                              </h3>
                              <div className="space-y-3 text-blue-800 text-sm">
                                    <div className="flex items-start">
                                          <span className="font-semibold mr-2">1.</span>
                                          <span>
                                                Học viên đăng ký khóa học với email và số điện thoại
                                          </span>
                                    </div>
                                    <div className="flex items-start">
                                          <span className="font-semibold mr-2">2.</span>
                                          <span>
                                                Admin xác nhận thanh toán thành công trong hệ thống
                                          </span>
                                    </div>
                                    <div className="flex items-start">
                                          <span className="font-semibold mr-2">3.</span>
                                          <span>
                                                Hệ thống tự động tạo tài khoản với{" "}
                                                <strong>username = email</strong> và{" "}
                                                <strong>password = số điện thoại</strong>
                                          </span>
                                    </div>
                                    <div className="flex items-start">
                                          <span className="font-semibold mr-2">4.</span>
                                          <span>
                                                Học viên có thể đăng nhập ngay lập tức mà không cần chờ email
                                          </span>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
