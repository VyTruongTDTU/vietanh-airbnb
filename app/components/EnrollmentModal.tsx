"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface EnrollmentModalProps {
      isOpen: boolean;
      onClose: () => void;
      courseTitle: string;
      courseId: string;
      price: number;
}

export default function EnrollmentModal({
      isOpen,
      onClose,
      courseTitle,
      courseId,
      price,
}: EnrollmentModalProps) {
      const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
      const [formData, setFormData] = useState({
            fullname: "",
            email: "",
            phone: "",
      });
      const [qrImage, setQrImage] = useState<string | null>(null);
      const [showAlreadyEnrolledPopup, setShowAlreadyEnrolledPopup] = useState(false);
      const [existingAccountInfo, setExistingAccountInfo] = useState<{ email: string, phone: string } | null>(null);
      const enrollmentIdRef = useRef<string | null>(null);

      useEffect(() => {
            const escHandler = (e: KeyboardEvent) => {
                  if (e.key === "Escape") onClose();
            };
            if (isOpen) document.addEventListener("keydown", escHandler);
            return () => document.removeEventListener("keydown", escHandler);
      }, [isOpen, onClose]);

      // First step: Check if email already enrolled in this course
      const checkEmailEnrollment = async () => {
            try {
                  const res = await fetch("/api/enrollments/check-enrollment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              courseId,
                              email: formData.email,
                        }),
                  });

                  const result = await res.json();

                  if (result.isEnrolled) {
                        // Show beautiful popup for already enrolled
                        setExistingAccountInfo({ email: formData.email, phone: result.phone || formData.phone });
                        setShowAlreadyEnrolledPopup(true);
                  } else {
                        // Move to step 2: Confirm information
                        setStep(2);
                  }
            } catch (err) {
                  console.error("Check enrollment error:", err);
                  alert("Có lỗi xảy ra khi kiểm tra thông tin.");
            }
      };

      // Create enrollment (after payment confirmation in step 4)
      const createEnrollment = async () => {
            try {
                  const res = await fetch("/api/enrollments", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              courseId,
                              title: courseTitle,
                              fullname: formData.fullname,
                              email: formData.email,
                              phone: formData.phone,
                              price,
                        }),
                  });

                  const result = await res.json();

                  if (res.ok && result._id) {
                        enrollmentIdRef.current = result._id;
                        setStep(4); // Move to success step
                  } else {
                        alert(result.message || "Đăng ký thất bại.");
                  }
            } catch (err) {
                  console.error("Enrollment error:", err);
                  alert("Có lỗi xảy ra khi gửi yêu cầu.");
            }
      }; const handlePaymentConfirm = async () => {
            // After payment confirmation, create the enrollment and user account
            await createEnrollment();
      };

      useEffect(() => {
            const fetchQR = async () => {
                  if (step === 3 && price > 0) {
                        try {
                              const res = await fetch("https://api.vietqr.io/v2/generate", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                          accountNo: 3906205275760,
                                          accountName: "TRAN HUU KHANH",
                                          acqId: 970405,
                                          amount: price,
                                          addInfo: `${formData.fullname} ${formData.phone} Đăng ký ${courseTitle}`,
                                          format: "text",
                                          template: "compact",
                                    }),
                              });

                              const result = await res.json();
                              if (result?.data?.qrDataURL) {
                                    setQrImage(result.data.qrDataURL);
                              }
                        } catch (err) {
                              console.error("QR Error:", err);
                        }
                  }
            };

            fetchQR();
      }, [step, price, courseTitle]);

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10" onClick={onClose}>
                  <div
                        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                  >
                        <button
                              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                              onClick={onClose}
                        >
                              <X className="w-6 h-6" />
                        </button>

                        {step === 1 && (
                              <>
                                    <h2 className="text-xl font-bold mb-4 text-center">
                                          Đăng ký khóa học: {courseTitle}
                                    </h2>
                                    <div className="space-y-4">
                                          <input
                                                type="text"
                                                placeholder="Họ tên"
                                                className="w-full border rounded-lg px-4 py-2"
                                                value={formData.fullname}
                                                onChange={(e) =>
                                                      setFormData((prev) => ({ ...prev, fullname: e.target.value }))
                                                }
                                          />
                                          <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border rounded-lg px-4 py-2"
                                                value={formData.email}
                                                onChange={(e) =>
                                                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                                                }
                                          />
                                          <input
                                                type="tel"
                                                placeholder="Số điện thoại"
                                                className="w-full border rounded-lg px-4 py-2"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                                                }
                                          />
                                    </div>
                                    <button
                                          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                          onClick={checkEmailEnrollment}
                                          disabled={
                                                !formData.fullname || !formData.email || !formData.phone
                                          }
                                    >
                                          Tiếp tục
                                    </button>
                              </>
                        )}

                        {step === 2 && (
                              <>
                                    <h2 className="text-xl font-bold mb-4 text-center">Xác nhận thông tin</h2>
                                    <ul className="text-base space-y-2">
                                          <li><strong>Họ tên:</strong> {formData.fullname}</li>
                                          <li><strong>Email:</strong> {formData.email}</li>
                                          <li><strong>Điện thoại:</strong> {formData.phone}</li>
                                          <li><strong>Khóa học:</strong> {courseTitle}</li>
                                          <li><strong>Học phí:</strong> {price.toLocaleString("vi-VN")} VND</li>
                                    </ul>
                                    <div className="flex justify-between mt-6">
                                          <button
                                                className="px-4 py-2 border rounded-lg"
                                                onClick={() => setStep(1)}
                                          >
                                                Quay lại
                                          </button>
                                          <button
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                onClick={() => setStep(3)}
                                          >
                                                Thanh toán
                                          </button>
                                    </div>
                              </>
                        )}

                        {step === 3 && (
                              <>
                                    <h2 className="text-xl font-bold mb-4 text-center">Quét mã QR</h2>
                                    {qrImage ? (
                                          <div className="flex justify-center mb-4">
                                                <img src={qrImage} alt="QR code" className="w-[300px] h-[300px]" />
                                          </div>
                                    ) : (
                                          <p className="text-center text-gray-500">Đang tạo mã QR...</p>
                                    )}
                                    <p className="text-center text-gray-600 mb-4">
                                          Vui lòng quét mã để thanh toán {price.toLocaleString("vi-VN")} VND
                                    </p>
                                    <button
                                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                          onClick={handlePaymentConfirm}
                                    >
                                          Tôi đã thanh toán
                                    </button>
                              </>
                        )}

                        {step === 4 && (
                              <>
                                    <h2 className="text-xl font-bold mb-4 text-center text-green-600">Đăng ký thành công!</h2>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                          <h3 className="font-semibold text-green-800 mb-2">Thông tin tài khoản học sinh:</h3>
                                          <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">Email đăng nhập:</span> {formData.email}</p>
                                                <p><span className="font-medium">Mật khẩu:</span> {formData.phone}</p>
                                          </div>
                                    </div>
                                    <p className="text-center text-gray-700 mb-4">
                                          Bạn có thể đăng nhập ngay bằng thông tin trên để bắt đầu học!
                                    </p>
                                    <div className="flex gap-3">
                                          <button
                                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                                onClick={() => window.open('/student-login', '_blank')}
                                          >
                                                Đăng nhập ngay
                                          </button>
                                          <button
                                                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                                                onClick={onClose}
                                          >
                                                Đóng
                                          </button>
                                    </div>
                              </>
                        )}
                  </div>

                  {/* Beautiful popup for already enrolled users */}
                  {showAlreadyEnrolledPopup && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                              <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
                                    <div className="text-center">
                                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                          </div>
                                          <h3 className="text-xl font-bold text-gray-900 mb-2">Bạn đã đăng ký khóa học này!</h3>
                                          <p className="text-gray-600 mb-4">
                                                Email <strong>{existingAccountInfo?.email}</strong> đã được đăng ký cho khóa học này.
                                          </p>
                                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                                <h4 className="font-semibold text-blue-800 mb-2">Thông tin đăng nhập:</h4>
                                                <p className="text-sm text-blue-700">
                                                      <span className="font-medium">Email:</span> {existingAccountInfo?.email}
                                                </p>
                                                <p className="text-sm text-blue-700">
                                                      <span className="font-medium">Mật khẩu:</span> {existingAccountInfo?.phone}
                                                </p>
                                          </div>
                                          <div className="flex gap-3">
                                                <button
                                                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                                      onClick={() => window.open('/student-login', '_blank')}
                                                >
                                                      Đăng nhập học ngay
                                                </button>
                                                <button
                                                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                                      onClick={() => {
                                                            setShowAlreadyEnrolledPopup(false);
                                                            onClose();
                                                      }}
                                                >
                                                      Đóng
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
