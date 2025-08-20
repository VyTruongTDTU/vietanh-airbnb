"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";
  const isLearningPage = pathname.startsWith("/learning");

  // Hide navbar on admin pages
  if (isAdminPage) return null;

  // Different styling for learning pages to prevent overlay
  const navbarClass = isLearningPage
    ? "relative bg-white shadow-md py-2"
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomePage ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`;

  useEffect(() => {
    if (!isLearningPage) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLearningPage]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  // Đóng dropdown nếu click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={
        isLearningPage
          ? "relative bg-white shadow-md py-2"
          : scrolled || !isHomePage
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2 transition-all duration-300"
            : "fixed top-0 left-0 right-0 z-50 bg-transparent py-4 transition-all duration-300"
      }
      style={{
        backdropFilter: (scrolled || !isHomePage) && !isLearningPage ? "blur(10px)" : "none",
        backgroundColor:
          (scrolled || !isHomePage) && !isLearningPage ? "rgba(255, 255, 255, 0.9)" :
            isLearningPage ? "white" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-xl font-bold transition-colors duration-300 ${scrolled || !isHomePage ? "text-gray-900" : "text-white"
                }`}
              style={{ letterSpacing: "0.5px" }}
            >
              Nguyễn Việt Anh
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-6">
                {["/", "/airbnb", "/courses", "/blog", "/careers"].map((path, i) => (
                  <Link
                    key={i}
                    href={path}
                    className={`text-sm font-medium transition-all ${scrolled || !isHomePage
                      ? "text-gray-800 hover:text-black"
                      : "text-white hover:text-gray-200"
                      }`}
                    style={{ letterSpacing: "0.3px" }}
                  >
                    {["Home", "Airbnb", "Khoá học", "Blog", "Tuyển dụng"][i]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors ${scrolled || !isHomePage
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
                }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/contact"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${scrolled || !isHomePage
                ? "text-white bg-black hover:bg-gray-800"
                : "text-black bg-white hover:bg-gray-100"
                }`}
              style={{
                boxShadow:
                  scrolled || !isHomePage
                    ? "0 2px 10px rgba(0,0,0,0.1)"
                    : "0 2px 15px rgba(0,0,0,0.2)",
              }}
            >
              Liên hệ
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled || !isHomePage || isLearningPage ? "text-gray-700" : "text-white"
                    }`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 py-1">
                    {user.role === 'student' && (
                      <button
                        className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          router.push("/learning");
                          setDropdownOpen(false);
                        }}
                      >
                        <span className="w-4 h-4 mr-3">📚</span>
                        Khu vực học tập
                      </button>
                    )}
                    <button
                      className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        router.push("/profile");
                        setDropdownOpen(false);
                      }}
                    >
                      <span className="w-4 h-4 mr-3">👤</span>
                      Hồ sơ cá nhân
                    </button>
                    <hr className="my-1" />
                    <button
                      className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={handleLogout}
                    >
                      <span className="w-4 h-4 mr-3">🚪</span>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/student-login"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${scrolled || !isHomePage || isLearningPage
                    ? "text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                    : "text-black bg-white hover:bg-gray-100 shadow-lg"
                    }`}
                >
                  🔑 Đăng nhập
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${scrolled || !isHomePage
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
                }`}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="md:hidden bg-white shadow-lg"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { path: "/", label: "Home" },
              { path: "/airbnb", label: "Airbnb" },
              { path: "/courses", label: "Khoá học" },
              { path: "/blog", label: "Blog" },
              { path: "/careers", label: "Tuyển dụng" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className="block px-3 py-2 text-gray-800 hover:bg-gray-100 hover:text-black rounded-md transition-all"
                style={{ letterSpacing: "0.3px" }}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 hover:text-black rounded-md transition-all mx-1">
              <Search size={20} className="text-gray-700 mr-2" />
              <span className="text-gray-600">Tìm kiếm</span>
            </div>

            <Link
              href="/contact"
              className="block px-3 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md text-center mx-3 mt-2 transition-all"
              style={{
                letterSpacing: "0.3px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Liên hệ
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md text-center"
                >
                  Hồ sơ
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md text-center"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                href="/student-login"
                className="block px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center mx-3 mt-2 transition-all"
              >
                🔑 Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
