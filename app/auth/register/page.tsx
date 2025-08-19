"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
      const router = useRouter();
      const [form, setForm] = useState({
            name: "",
            email: "",
            password: "",
            avatar: null as File | null,
      });
      const [preview, setPreview] = useState<string | null>(null);
      const [error, setError] = useState("");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = e.target;
            if (name === "avatar" && files?.[0]) {
                  const file = files[0];
                  setForm((prev) => ({ ...prev, avatar: file }));

                  // Xem trước ảnh
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
            } else {
                  setForm((prev) => ({ ...prev, [name]: value }));
            }
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");

            try {
                  let avatarUrl = "";

                  // 1. Upload ảnh trước nếu có
                  if (form.avatar) {
                        const formData = new FormData();
                        formData.append("image", form.avatar);

                        const uploadRes = await fetch("http://localhost:3000/api/upload/user", {
                              method: "POST",
                              body: formData,
                        });

                        const uploadData = await uploadRes.json();

                        if (!uploadRes.ok) {
                              setError("Lỗi upload ảnh");
                              return;
                        }

                        avatarUrl = uploadData.url;
                  }

                  // 2. Gửi JSON đến đăng ký
                  const res = await fetch("http://localhost:3000/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              name: form.name,
                              email: form.email,
                              password: form.password,
                              avatar: avatarUrl,
                        }),
                  });

                  const data = await res.json();
                  if (res.ok) {
                        localStorage.setItem("token", data.token);
                        router.push("/courses");
                  } else {
                        setError(data.message || "Đăng ký thất bại");
                  }
            } catch (err) {
                  setError("Lỗi kết nối máy chủ");
            }
      };


      return (
            <div className="pt-24 px-4">
                  <h1 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h1>
                  <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto space-y-4 bg-white shadow-md p-6 rounded-lg"
                  >
                        <div>
                              <label className="block mb-1 font-medium">Họ tên</label>
                              <input
                                    name="name"
                                    placeholder="Nhập họ tên"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                              />
                        </div>
                        <div>
                              <label className="block mb-1 font-medium">Email</label>
                              <input
                                    name="email"
                                    type="email"
                                    placeholder="Nhập email"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                              />
                        </div>
                        <div>
                              <label className="block mb-1 font-medium">Mật khẩu</label>
                              <input
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                              />
                        </div>
                        <div>
                              <label className="block mb-1 font-medium">Ảnh đại diện</label>
                              <input
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                              />
                              {preview && (
                                    <img
                                          src={preview}
                                          alt="Xem trước avatar"
                                          className="w-24 h-24 object-cover rounded-full mt-2"
                                    />
                              )}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                              type="submit"
                              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                        >
                              Đăng ký
                        </button>
                  </form>
            </div>
      );
}
