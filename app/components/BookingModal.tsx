"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

type BookingData = {
      email: string;
      fullname: string;
      phone: string;
      startDate: string;
      endDate: string;
      guests: number;
};

interface BookingModalProps {
      pricePerNight: number;
      isOpen: boolean;
      onClose: () => void;
      name: string; // Tên phòng (listing)
      listingId: string; // ID của phòng
}

export default function BookingModal({
      pricePerNight,
      isOpen,
      onClose,
      name,
      listingId,
}: BookingModalProps) {
      const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
      const [data, setData] = useState<BookingData>({
            email: "",
            fullname: "",
            phone: "",
            startDate: "",
            endDate: "",
            guests: 1,
      });
      const [qrImage, setQrImage] = useState<string | null>(null);
      const bookingIdRef = useRef<string | null>(null);

      useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                  if (e.key === "Escape") onClose();
            };
            if (isOpen) {
                  document.addEventListener("keydown", handleKeyDown);
            }
            return () => document.removeEventListener("keydown", handleKeyDown);
      }, [isOpen, onClose]);

      const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
      };

      const calcNights = () => {
            if (!data.startDate || !data.endDate) return 0;
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            const diff = Math.floor(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
            );
            return Math.max(diff, 0);
      };

      const nights = calcNights();
      const totalPrice = nights * pricePerNight;

      // Gọi API tạo booking ở bước 2
      const handleSubmitBooking = async () => {
            try {
                  const res = await fetch("/api/bookings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              listingId,
                              listingName: name,
                              guestName: data.fullname,
                              guestEmail: data.email,
                              guestPhone: data.phone,
                              startDate: data.startDate,
                              endDate: data.endDate,
                              totalNights: nights,
                              totalPrice,
                              paymentStatus: "pending",
                        }),
                  });

                  const result = await res.json();
                  if (res.ok && result._id) {
                        bookingIdRef.current = result._id;
                        setStep(2);
                  } else {
                        alert("Tạo đặt phòng thất bại.");
                  }
            } catch (err) {
                  console.error("Create booking error:", err);
                  alert("Lỗi kết nối khi tạo đặt phòng.");
            }
      };

      // Gọi API cập nhật trạng thái thanh toán ở bước 4
      const handleConfirmPayment = async () => {
            if (!bookingIdRef.current) {
                  alert("Không tìm thấy mã đặt phòng.");
                  return;
            }

            try {
                  const res = await fetch(`/api/bookings/${bookingIdRef.current}/payment`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                  });

                  if (res.ok) {
                        setStep(4);
                  } else {
                        alert("Cập nhật trạng thái thanh toán thất bại.");
                  }
            } catch (err) {
                  console.error("Update payment error:", err);
                  alert("Lỗi kết nối khi cập nhật thanh toán.");
            }
      };

      useEffect(() => {
            const fetchQr = async () => {
                  if (step === 3 && totalPrice > 0) {
                        try {
                              const res = await fetch("https://api.vietqr.io/v2/generate", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                          accountNo: 3906205275760,
                                          accountName: "TRAN HUU KHANH",
                                          acqId: 970405,
                                          amount: totalPrice,
                                          addInfo: `${data.fullname} ${data.phone} Dat phong ${name}`,
                                          format: "text",
                                          template: "compact",
                                    }),
                              });

                              const result = await res.json();
                              if (result?.data?.qrDataURL) {
                                    setQrImage(result.data.qrDataURL);
                              }
                        } catch (err) {
                              console.error("QR Fetch error:", err);
                        }
                  }
            };

            fetchQr();
      }, [step, totalPrice, name]);

      if (!isOpen) return null;

      return (
            <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
                  onClick={onClose}
            >
                  <div
                        className="relative w-full max-w-2xl sm:max-w-3xl mx-4 bg-white rounded-3xl shadow-2xl p-8 sm:p-10 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                  >
                        {/* Close Button */}
                        <button
                              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                              onClick={onClose}
                              aria-label="Đóng"
                        >
                              <X className="w-7 h-7" />
                        </button>

                        {/* Step 1 - Nhập thông tin */}
                        {step === 1 && (
                              <>
                                    <h2 className="text-2xl font-bold mb-6 text-center">
                                          Thông tin đặt phòng
                                    </h2>
                                    <div className="grid gap-4 text-base text-gray-700">
                                          <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border rounded-lg px-4 py-3"
                                                value={data.email}
                                                onChange={(e) =>
                                                      setData((d) => ({ ...d, email: e.target.value }))
                                                }
                                          />
                                          <input
                                                type="text"
                                                placeholder="Họ tên"
                                                className="w-full border rounded-lg px-4 py-3"
                                                value={data.fullname}
                                                onChange={(e) =>
                                                      setData((d) => ({ ...d, fullname: e.target.value }))
                                                }
                                          />
                                          <input
                                                type="tel"
                                                placeholder="Số điện thoại"
                                                className="w-full border rounded-lg px-4 py-3"
                                                value={data.phone}
                                                onChange={(e) =>
                                                      setData((d) => ({ ...d, phone: e.target.value }))
                                                }
                                          />
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <input
                                                      type="date"
                                                      className="w-full border rounded-lg px-4 py-3"
                                                      value={data.startDate}
                                                      onChange={(e) =>
                                                            setData((d) => ({ ...d, startDate: e.target.value }))
                                                      }
                                                />
                                                <input
                                                      type="date"
                                                      className="w-full border rounded-lg px-4 py-3"
                                                      value={data.endDate}
                                                      onChange={(e) =>
                                                            setData((d) => ({ ...d, endDate: e.target.value }))
                                                      }
                                                />
                                          </div>
                                          <input
                                                type="number"
                                                min={1}
                                                placeholder="Số khách"
                                                className="w-full border rounded-lg px-4 py-3"
                                                value={data.guests}
                                                onChange={(e) =>
                                                      setData((d) => ({ ...d, guests: +e.target.value }))
                                                }
                                          />
                                    </div>

                                    <button
                                          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
                                          disabled={
                                                !data.email ||
                                                !data.fullname ||
                                                !data.phone ||
                                                !data.startDate ||
                                                !data.endDate ||
                                                nights <= 0
                                          }
                                          onClick={handleSubmitBooking}
                                    >
                                          Tiếp tục
                                    </button>
                              </>
                        )}

                        {/* Step 2 - Xác nhận */}
                        {step === 2 && (
                              <>
                                    <h2 className="text-2xl font-bold mb-6 text-center">
                                          Xác nhận đặt phòng
                                    </h2>
                                    <ul className="space-y-3 text-base">
                                          <li>
                                                <strong>Họ tên:</strong> {data.fullname}
                                          </li>
                                          <li>
                                                <strong>Email:</strong> {data.email}
                                          </li>
                                          <li>
                                                <strong>Điện thoại:</strong> {data.phone}
                                          </li>
                                          <li>
                                                <strong>Ngày:</strong> {formatDate(data.startDate)} →{" "}
                                                {formatDate(data.endDate)} ({nights + 1} ngày, {nights} đêm)
                                          </li>
                                          <li>
                                                <strong>Số khách:</strong> {data.guests}
                                          </li>
                                          <li>
                                                <strong>Tổng cộng:</strong>{" "}
                                                {totalPrice.toLocaleString("vi-VN")} VND
                                          </li>
                                    </ul>
                                    <div className="flex justify-between mt-8">
                                          <button
                                                className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                                                onClick={() => setStep(1)}
                                          >
                                                Quay lại
                                          </button>
                                          <button
                                                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                onClick={() => setStep(3)}
                                          >
                                                Thanh toán
                                          </button>
                                    </div>
                              </>
                        )}

                        {/* Step 3 - QR code */}
                        {step === 3 && (
                              <>
                                    <h2 className="text-2xl font-bold mb-6 text-center">Quét mã QR</h2>
                                    {qrImage ? (
                                          <div className="flex justify-center mb-4">
                                                <img
                                                      src={qrImage}
                                                      alt="QR code"
                                                      className="mt-4 mx-auto"
                                                      style={{ width: "300px", height: "300px" }}
                                                />
                                          </div>
                                    ) : (
                                          <p className="text-center text-gray-500">Đang tải mã QR...</p>
                                    )}
                                    <p className="text-center text-gray-600 mb-6">
                                          Quét mã bằng app ngân hàng để chuyển{" "}
                                          {totalPrice.toLocaleString("vi-VN")} VND
                                    </p>
                                    <button
                                          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
                                          onClick={handleConfirmPayment}
                                    >
                                          Tôi đã thanh toán
                                    </button>
                              </>
                        )}

                        {/* Step 4 - Cảm ơn */}
                        {step === 4 && (
                              <>
                                    <h2 className="text-2xl font-bold mb-6 text-center">
                                          Cảm ơn bạn!
                                    </h2>
                                    <p className="text-gray-700 mb-6 text-center">
                                          Chúng tôi đã nhận được yêu cầu đặt phòng của bạn. Thông tin xác
                                          nhận sẽ được gửi qua email trong thời gian sớm nhất.
                                    </p>
                                    <button
                                          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900"
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
