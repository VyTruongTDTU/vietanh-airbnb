// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "Chuyên Viên Đào Tạo Airbnb",
    type: "Full-time",
    location: "Hà Nội",
    department: "Đào tạo",
    salary: "15-25 triệu",
    description:
      "Chúng tôi đang tìm kiếm Chuyên viên Đào tạo có kinh nghiệm về Airbnb để phát triển và thực hiện các chương trình đào tạo cho học viên.",
    requirements: [
      "Tối thiểu 2 năm kinh nghiệm quản lý Airbnb",
      "Kỹ năng đào tạo và thuyết trình tốt",
      "Khả năng làm việc độc lập và theo nhóm",
      "Tiếng Anh giao tiếp tốt",
    ],
    benefits: [
      "Lương thưởng hấp dẫn",
      "Bảo hiểm sức khỏe cao cấp",
      "Đào tạo và phát triển chuyên môn",
      "Môi trường làm việc năng động",
    ],
  },
  {
    id: 2,
    title: "Chuyên Viên Marketing",
    type: "Full-time",
    location: "Hà Nội",
    department: "Marketing",
    salary: "12-20 triệu",
    description:
      "Tìm kiếm Chuyên viên Marketing tài năng để phát triển và thực hiện các chiến lược marketing cho các khóa học và dịch vụ tư vấn Airbnb.",
    requirements: [
      "Tối thiểu 2 năm kinh nghiệm Marketing",
      "Hiểu biết về Digital Marketing",
      "Kỹ năng viết content tốt",
      "Khả năng phân tích dữ liệu",
    ],
    benefits: [
      "Lương thưởng cạnh tranh",
      "Chế độ bảo hiểm đầy đủ",
      "Môi trường làm việc trẻ trung",
      "Cơ hội thăng tiến cao",
    ],
  },
  {
    id: 3,
    title: "Chuyên Viên Tư Vấn Airbnb",
    type: "Full-time",
    location: "Hà Nội",
    department: "Tư vấn",
    salary: "15-25 triệu",
    description:
      "Tìm kiếm Chuyên viên Tư vấn có kinh nghiệm để hỗ trợ khách hàng trong việc setup và vận hành Airbnb hiệu quả.",
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm quản lý Airbnb",
      "Kỹ năng tư vấn và giao tiếp tốt",
      "Khả năng giải quyết vấn đề",
      "Tiếng Anh giao tiếp tốt",
    ],
    benefits: [
      "Thu nhập hấp dẫn theo năng lực",
      "Được đào tạo chuyên sâu",
      "Môi trường làm việc chuyên nghiệp",
      "Cơ hội phát triển bản thân",
    ],
  },
];

// Company culture data
const culturalValues = [
  {
    title: "Đổi mới & Sáng tạo",
    description:
      "Chúng tôi luôn khuyến khích những ý tưởng mới và cách tiếp cận sáng tạo trong công việc.",
    icon: (
      <svg
        className="w-8 h-8 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Phát triển bản thân",
    description:
      "Tạo môi trường để mọi người phát triển kỹ năng và đạt được mục tiêu cá nhân.",
    icon: (
      <svg
        className="w-8 h-8 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Tinh thần đồng đội",
    description:
      "Xây dựng môi trường làm việc đoàn kết, nơi mọi người cùng nhau phát triển.",
    icon: (
      <svg
        className="w-8 h-8 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          Cơ Hội Nghề Nghiệp
        </h1>
        <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tham gia cùng chúng tôi trong sứ mệnh giúp đỡ mọi người thành công với
          Airbnb. Khám phá các cơ hội nghề nghiệp hấp dẫn tại đây.
        </p>
      </div>

      {/* Company Culture */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          Văn hóa công ty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {culturalValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className="p-3 rounded-full bg-gray-50"
                  style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                >
                  {value.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <span className="h-5 w-1 bg-black mr-3"></span>
          Vị trí đang tuyển dụng
        </h2>
        <div className="space-y-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
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
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {job.type}
                      </span>
                      <span className="mx-3">•</span>
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
                        {job.location}
                      </span>
                      <span className="mx-3">•</span>
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
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Yêu cầu
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Quyền lợi
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-gray-50 px-6 py-4"
                style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
              >
                <button
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                >
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
