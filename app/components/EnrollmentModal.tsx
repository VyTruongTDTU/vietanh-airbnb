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
      const enrollmentIdRef = useRef<string | null>(null);

      useEffect(() => {
            const escHandler = (e: KeyboardEvent) => {
                  if (e.key === "Escape") onClose();
            };
            if (isOpen) document.addEventListener("keydown", escHandler);
            return () => document.removeEventListener("keydown", escHandler);
      }, [isOpen, onClose]);

      const handleSubmit = async () => {
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
                        setStep(2);
                  } else {
                        alert("Đăng ký thất bại.");
                  }
            } catch (err) {
                  console.error("Enrollment error:", err);
                  alert("Có lỗi xảy ra khi gửi yêu cầu.");
            }
      };

      const handlePaymentConfirm = async () => {
            if (!enrollmentIdRef.current) return;
            try {
                  const res = await fetch(`/api/enrollments/${enrollmentIdRef.current}/payment-status`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                  });

                  if (res.ok) setStep(4);
                  else alert("Cập nhật thanh toán thất bại.");
            } catch (err) {
                  console.error("Payment error:", err);
                  alert("Lỗi kết nối khi xác nhận thanh toán.");
            }
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
                                          onClick={handleSubmit}
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
                                    <h2 className="text-xl font-bold mb-4 text-center">Cảm ơn bạn!</h2>
                                    <p className="text-center text-gray-700">
                                          Bạn đã đăng ký thành công. Chúng tôi sẽ liên hệ qua email sớm nhất để xác nhận thông tin khóa học.
                                    </p>
                                    <button
                                          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                                          onClick={onClose}
                                    >
                                          Đóng
                                    </button>
                              </>
                        )}
                  </div>
            </div>
      );
}
