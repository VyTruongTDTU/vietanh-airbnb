import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Trang không tồn tại
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-white bg-black  hover:bg-gray-800 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
