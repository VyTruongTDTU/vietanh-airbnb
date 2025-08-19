import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <Image
              src="/images/avatar.jpg"
              alt="Nguyễn Việt Anh"
              fill
              className="object-cover"
            />
          </div>
          <h1
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
            style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}
          >
            Nguyễn Việt Anh
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
            Chuyên gia tư vấn & đào tạo về kinh doanh Airbnb tại Việt Nam
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/airbnb"
              className="group bg-white text-black px-8 py-4 rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center"
              style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.15)" }}
            >
              Xem Bất Động Sản
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/courses"
              className="group border border-white/50 text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              Khóa Học
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="w-8 h-8 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 bg-gradient-to-r from-gray-900 to-black text-white"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-lg">Bất động sản quản lý</div>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg">Học viên đã đào tạo</div>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="text-lg">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
              Về Tôi
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl"
              style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            >
              <Image
                src="/images/avatar-2.png"
                alt="Nguyễn Việt Anh"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                  Nguyễn Việt Anh
                </h3>
                <p
                  className="text-white/80"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  Chuyên gia Airbnb & Đào tạo
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Kinh nghiệm & Chuyên môn
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Với hơn 5 năm kinh nghiệm trong lĩnh vực Airbnb, tôi đã xây dựng
                và quản lý thành công nhiều bất động sản cho thuê ngắn hạn trên
                khắp Việt Nam.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Hiện tại, tôi tập trung vào việc chia sẻ kiến thức và kinh
                nghiệm của mình thông qua các khóa học và tư vấn 1-1 cho những
                người muốn thành công trong lĩnh vực này.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
              >
                Liên hệ với tôi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
              Bất Động Sản Nổi Bật
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Khám phá những bất động sản đẳng cấp và độc đáo tại các điểm du
              lịch hàng đầu Việt Nam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Luxury Villa Đà Nẵng",
                price: "2,500,000",
                location: "Đà Nẵng",
                image: "/images/airbnb/danang-villa.jpg",
                slug: "luxury-villa-danang",
                rating: 4.9,
                type: "Villa",
              },
              {
                title: "Ocean View Apartment",
                price: "1,800,000",
                location: "Nha Trang",
                image: "/images/airbnb/nhatrang-penthouse.jpg",
                slug: "luxury-penthouse-nhatrang",
                rating: 4.8,
                type: "Penthouse",
              },
              {
                title: "Mountain Resort Villa",
                price: "3,200,000",
                location: "Đà Lạt",
                image: "/images/airbnb/dalat-villa.jpg",
                slug: "mountain-villa-dalat",
                rating: 4.7,
                type: "Villa",
              },
            ].map((property, index) => (
              <Link
                href={`/airbnb/${property.slug}`}
                key={index}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                    {property.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-black transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-black mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{property.location}</p>
                  <p className="text-gray-900 font-semibold">
                    {property.price} VND
                    <span className="text-gray-600 font-normal">/đêm</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/airbnb"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm uppercase tracking-wider"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            >
              Xem Tất Cả Bất Động Sản
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
              Dịch Vụ
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Tôi cung cấp các dịch vụ chuyên nghiệp giúp bạn thành công trong
              lĩnh vực kinh doanh Airbnb
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white backdrop-blur-sm rounded-xl p-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl group"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-black transition-colors">
                Tư Vấn 1-1
              </h3>
              <p className="text-gray-600 mb-6">
                Giải đáp mọi thắc mắc và xây dựng chiến lược kinh doanh Airbnb
                phù hợp với bạn. Tư vấn trực tiếp hoặc online.
              </p>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-black inline-flex items-center font-medium"
              >
                Tìm hiểu thêm <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div
              className="bg-white backdrop-blur-sm rounded-xl p-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl group"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-black transition-colors">
                Khóa Học Online
              </h3>
              <p className="text-gray-600 mb-6">
                Học mọi lúc mọi nơi với các khóa học được thiết kế chi tiết và
                thực tế. Nội dung cập nhật liên tục.
              </p>
              <Link
                href="/courses"
                className="text-gray-900 hover:text-black inline-flex items-center font-medium"
              >
                Xem các khóa học <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div
              className="bg-white backdrop-blur-sm rounded-xl p-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl group"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-black transition-colors">
                Quản Lý BĐS
              </h3>
              <p className="text-gray-600 mb-6">
                Dịch vụ quản lý toàn diện cho bất động sản của bạn trên Airbnb.
                Từ chụp ảnh, thiết kế đến vận hành.
              </p>
              <Link
                href="/management"
                className="text-gray-900 hover:text-black inline-flex items-center font-medium"
              >
                Tìm hiểu thêm <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
              Khóa Học Nổi Bật
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Nâng cao kiến thức và kỹ năng của bạn với các khóa học được thiết
              kế bởi các chuyên gia hàng đầu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Khóa Học Toàn Diện về Kinh Doanh Airbnb",
                instructor: "Nguyễn Việt Anh",
                price: "2,990,000",
                image: "/images/courses/airbnb-hosting.jpg",
                lessons: 42,
                hours: 18,
                level: "Tất cả cấp độ",
              },
              {
                title: "Chụp Ảnh Chuyên Nghiệp cho Airbnb",
                instructor: "Nguyễn Việt Anh",
                price: "1,490,000",
                image: "/images/courses/photography.jpg",
                lessons: 24,
                hours: 8,
                level: "Trung cấp",
              },
              {
                title: "Thiết Kế Nội Thất cho Airbnb",
                instructor: "Lê Văn C",
                price: "2,490,000",
                image: "/images/courses/interior-design.jpg",
                lessons: 36,
                hours: 14,
                level: "Nâng cao",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        {course.lessons} bài học
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {course.hours} giờ
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Giảng viên: {course.instructor}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900 font-bold text-lg">
                      {course.price} VND
                    </p>
                    <Link
                      href="/courses"
                      className="text-gray-900 hover:text-black text-sm font-medium"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm uppercase tracking-wider"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            >
              Xem Tất Cả Khóa Học
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
              Bài Viết Mới Nhất
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Cập nhật những kiến thức và xu hướng mới nhất trong lĩnh vực kinh
              doanh Airbnb
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cách Tối Ưu Hóa Listing Airbnb",
                date: "15/03/2024",
                excerpt:
                  "Khám phá những bí quyết để làm cho listing của bạn nổi bật và thu hút nhiều đặt phòng hơn.",
                image: "/images/blog/success.jpg",
                slug: "toi-uu-hoa-listing-airbnb",
              },
              {
                title: "Kinh Nghiệm Chọn Địa Điểm Đầu Tư Airbnb",
                date: "10/03/2024",
                excerpt:
                  "Phân tích chi tiết các yếu tố cần cân nhắc khi lựa chọn địa điểm đầu tư Airbnb.",
                image: "/images/blog/airbnb-management.jpg",
                slug: "kinh-nghiem-chon-dia-diem",
              },
              {
                title: "Quản Lý Đánh Giá Khách Hàng Hiệu Quả",
                date: "05/03/2024",
                excerpt:
                  "Hướng dẫn cách xử lý và tận dụng đánh giá của khách hàng để cải thiện dịch vụ.",
                image: "/images/blog/customer-service.jpg",
                slug: "quan-ly-danh-gia-khach-hang",
              },
            ].map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div className="relative h-64 mb-4 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm uppercase tracking-wider"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            >
              Xem Tất Cả Bài Viết
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
