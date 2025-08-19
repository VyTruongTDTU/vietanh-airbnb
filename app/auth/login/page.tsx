"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
      const [form, setForm] = useState({ email: "", password: "" });
      const [error, setError] = useState("");
      const router = useRouter();

      const handleChange = (e: any) =>
            setForm({ ...form, [e.target.name]: e.target.value });

      const handleSubmit = async (e: any) => {
            e.preventDefault();

            try {
                  const res = await fetch("http://localhost:3000/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form),
                  });

                  const data = await res.json();
                  if (res.ok) {
                        localStorage.setItem("token", data.token);
                        router.push("/courses");
                  } else {
                        setError(data.message || "Đăng nhập thất bại");
                  }
            } catch (err) {
                  setError("Có lỗi xảy ra khi kết nối máy chủ.");
            }
      };

      return (
            <div className="p-8 max-w-md mx-auto">
                  <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                              name="email"
                              type="email"
                              placeholder="Email"
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                        />
                        <input
                              name="password"
                              type="password"
                              placeholder="Mật khẩu"
                              onChange={handleChange}
                              className="w-full border px-3 py-2 rounded"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                              type="submit"
                              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                              Đăng nhập
                        </button>
                  </form>
            </div>
      );
}
