"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  avatar?: string;
  name?: string;
  email?: string;
  [key: string]: any;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";

  if (isAdminPage) return null;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomePage ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      style={{
        backdropFilter: scrolled || !isHomePage ? "blur(10px)" : "none",
        backgroundColor:
          scrolled || !isHomePage ? "rgba(255, 255, 255, 0.9)" : "transparent",
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

            {/* Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  <ChevronDown size={16} className="text-gray-700" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        router.push("/profile");
                        setDropdownOpen(false);
                      }}
                    >
                      Hồ sơ
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${scrolled || !isHomePage
                    ? "text-white bg-black hover:bg-gray-800"
                    : "text-black bg-white hover:bg-gray-100"
                  }`}
              >
                Đăng nhập
              </Link>
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
                href="/auth/login"
                className="block px-3 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-md text-center mx-3 mt-2 transition-all"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
