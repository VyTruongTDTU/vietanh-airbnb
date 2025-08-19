import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white py-16"
      style={{
        backgroundImage: "linear-gradient(to bottom, #111111, #0a0a0a)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div
          className="mb-16 p-8 rounded-xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Nâng cao kỹ năng của bạn
              </h3>
              <p className="text-gray-400">
                Đăng ký nhận bản tin của chúng tôi để cập nhật các mẹo, thủ
                thuật và chiến lược kinh doanh Airbnb mới nhất.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-200 transition-all"
                  style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "2rem",
          }}
        >
          {/* Company Info */}
          <div>
            <h3
              className="text-xl font-bold mb-6"
              style={{ letterSpacing: "0.5px" }}
            >
              Nguyễn Việt Anh
            </h3>
            <p className="text-gray-400 mb-6">
              Chuyên gia Airbnb và đào tạo chuyên nghiệp với hơn 5 năm kinh
              nghiệm. Đã giúp hơn 1000+ host khởi nghiệp và phát triển thành
              công.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{ letterSpacing: "0.5px" }}
            >
              Dịch vụ
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/airbnb"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Căn hộ Airbnb
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Khóa học
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Tư vấn 1-1
                </Link>
              </li>
              <li>
                <Link
                  href="/management"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Quản lý BĐS
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{ letterSpacing: "0.5px" }}
            >
              Tài nguyên
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Hướng dẫn
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{ letterSpacing: "0.5px" }}
            >
              Công ty
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-all"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center text-gray-400">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>contact@nguyenvietanh.com</span>
          </div>
          <div className="flex items-center text-gray-400">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>0123.456.789</span>
          </div>
          <div className="flex items-center text-gray-400">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Hà Nội, Việt Nam</span>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Nguyễn Việt Anh. Tất cả các quyền được
            bảo lưu.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-all text-sm"
              style={{ letterSpacing: "0.3px" }}
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-all text-sm"
              style={{ letterSpacing: "0.3px" }}
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white transition-all text-sm"
              style={{ letterSpacing: "0.3px" }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
