// Example API calls for creating rich blog posts

// 1. Create a rich blog post with custom sections
export async function createRichBlogPost() {
      const blogData = {
            title: "Hướng dẫn tối ưu hóa listing Airbnb cho năm 2024",
            excerpt: "Khám phá các chiến lược mới nhất để tăng tỷ lệ đặt phòng và doanh thu từ căn hộ Airbnb của bạn",
            category: "Marketing Strategy",
            tags: ["airbnb", "optimization", "marketing", "2024"],
            image: "/images/blog/airbnb-optimization.jpg",
            author: "60f0cf4b8c8a3c4b4c8f0d3f", // User ID
            featured: true,
            status: "published",
            seo: {
                  metaTitle: "Tối ưu hóa Airbnb 2024 - Chiến lược Marketing hiệu quả",
                  metaDescription: "Học cách tối ưu hóa listing Airbnb với các chiến lược marketing mới nhất năm 2024. Tăng đặt phòng và doanh thu hiệu quả.",
                  socialImage: "/images/blog/airbnb-optimization-social.jpg"
            },
            sections: [
                  {
                        type: "header",
                        title: "Xu hướng thị trường Airbnb 2024",
                        order: 1
                  },
                  {
                        type: "paragraph",
                        content: "Thị trường du lịch 2024 đang chứng kiến những thay đổi lớn trong hành vi của khách hàng. Việc hiểu rõ xu hướng này sẽ giúp bạn điều chỉnh chiến lược marketing phù hợp.",
                        order: 2
                  },
                  {
                        type: "image",
                        title: "Thống kê thị trường du lịch 2024",
                        data: {
                              url: "/images/blog/market-trends-2024.jpg",
                              alt: "Market trends for travel industry 2024",
                              caption: "Số liệu thống kê cho thấy sự phục hồi mạnh mẽ của ngành du lịch"
                        },
                        order: 3
                  },
                  {
                        type: "quote",
                        content: "Thành công không đến từ việc có nhiều phòng, mà từ việc tối ưu hóa từng chi tiết nhỏ.",
                        order: 4
                  },
                  {
                        type: "header",
                        title: "Chiến lược tối ưu hóa tiêu đề",
                        order: 5
                  },
                  {
                        type: "list",
                        title: "Yếu tố quan trọng trong tiêu đề",
                        data: {
                              items: [
                                    "Sử dụng từ khóa địa điểm cụ thể",
                                    "Nhấn mạnh điểm độc đáo của căn hộ",
                                    "Bao gồm thông tin về tiện nghi nổi bật",
                                    "Tạo cảm giác cấp thiết và hấp dẫn",
                                    "Tối ưu độ dài tiêu đề (50-60 ký tự)"
                              ]
                        },
                        order: 6
                  },
                  {
                        type: "header",
                        title: "Hình ảnh chuyên nghiệp",
                        order: 7
                  },
                  {
                        type: "gallery",
                        title: "Ví dụ về bộ ảnh chuyên nghiệp",
                        data: {
                              images: [
                                    {
                                          url: "/images/blog/living-room-pro.jpg",
                                          alt: "Professional living room photography"
                                    },
                                    {
                                          url: "/images/blog/bedroom-pro.jpg",
                                          alt: "Professional bedroom photography"
                                    },
                                    {
                                          url: "/images/blog/kitchen-pro.jpg",
                                          alt: "Professional kitchen photography"
                                    }
                              ]
                        },
                        order: 8
                  },
                  {
                        type: "header",
                        title: "Mô tả chi tiết và hấp dẫn",
                        order: 9
                  },
                  {
                        type: "paragraph",
                        content: "Mô tả listing của bạn phải kể một câu chuyện. Thay vì chỉ liệt kê tiện nghi, hãy giúp khách hàng hình dung được trải nghiệm sống tại căn hộ của bạn.",
                        order: 10
                  },
                  {
                        type: "code",
                        title: "Template mô tả hiệu quả",
                        content: `🏙️ [Tên căn hộ] - Trải nghiệm [đặc điểm nổi bật]

✨ Điểm nổi bật:
• [Tiện nghi 1] với [mô tả cụ thể]
• [Tiện nghi 2] giúp bạn [lợi ích]
• [Vị trí] chỉ cách [địa điểm nổi tiếng] [khoảng cách]

🛏️ Không gian nghỉ ngơi:
• [Chi tiết phòng ngủ]
• [Chi tiết phòng tắm]

🍳 Khu vực sinh hoạt:
• [Chi tiết bếp và phòng khách]

📍 Vị trí thuận lợi:
• [Các điểm đến gần đó]
• [Phương tiện di chuyển]`,
                        order: 11
                  },
                  {
                        type: "header",
                        title: "Quản lý đánh giá và phản hồi",
                        order: 12
                  },
                  {
                        type: "paragraph",
                        content: "Đánh giá tích cực là yếu tố quyết định trong thuật toán xếp hạng của Airbnb. Việc duy trì rating cao và phản hồi nhanh chóng sẽ giúp listing của bạn xuất hiện nhiều hơn.",
                        order: 13
                  },
                  {
                        type: "divider",
                        order: 14
                  },
                  {
                        type: "header",
                        title: "Kết luận",
                        order: 15
                  },
                  {
                        type: "paragraph",
                        content: "Tối ưu hóa listing Airbnb là một quá trình liên tục. Bằng cách áp dụng các chiến lược trên và theo dõi kết quả thường xuyên, bạn sẽ thấy sự cải thiện đáng kể trong tỷ lệ đặt phòng và doanh thu.",
                        order: 16
                  }
            ]
      };

      try {
            const response = await fetch('/api/blogs/rich', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(blogData)
            });

            const result = await response.json();
            console.log('Rich blog post created:', result);
            return result;
      } catch (error) {
            console.error('Error creating rich blog post:', error);
            throw error;
      }
}

// 2. Create blog from template
export async function createBlogFromTemplate() {
      const templateData = {
            templateType: "airbnb-guide",
            author: "60f0cf4b8c8a3c4b4c8f0d3f", // User ID
            data: {
                  title: "Hướng dẫn đầu tư Airbnb tại Quận 1, TP.HCM",
                  location: "Quận 1, TP.HCM",
                  propertyType: "căn hộ studio",
                  tips: [
                        "Nghiên cứu quy định về kinh doanh lưu trú ngắn hạn",
                        "Tính toán chi phí quản lý và vận hành hàng tháng",
                        "Đầu tư vào nội thất chất lượng và hiện đại",
                        "Xây dựng mạng lưới dịch vụ hỗ trợ đáng tin cậy",
                        "Tối ưu hóa listing để tăng tỷ lệ đặt phòng"
                  ]
            }
      };

      try {
            const response = await fetch('/api/blogs/template', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(templateData)
            });

            const result = await response.json();
            console.log('Blog from template created:', result);
            return result;
      } catch (error) {
            console.error('Error creating blog from template:', error);
            throw error;
      }
}

// 3. Create photography tips blog
export async function createPhotographyBlog() {
      const templateData = {
            templateType: "photography-tips",
            author: "60f0cf4b8c8a3c4b4c8f0d3f",
            data: {
                  propertyType: "căn hộ duplex",
                  roomCount: "3",
                  specialFeatures: [
                        "Ban công view thành phố",
                        "Bếp mở hiện đại",
                        "Phòng tắm kính cường lực",
                        "Góc làm việc riêng biệt"
                  ]
            }
      };

      try {
            const response = await fetch('/api/blogs/template', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(templateData)
            });

            const result = await response.json();
            console.log('Photography blog created:', result);
            return result;
      } catch (error) {
            console.error('Error creating photography blog:', error);
            throw error;
      }
}

// 4. Create property review blog
export async function createPropertyReview() {
      const templateData = {
            templateType: "property-review",
            author: "60f0cf4b8c8a3c4b4c8f0d3f",
            data: {
                  propertyName: "Saigon Sky Villa",
                  location: "Quận 7, TP.HCM",
                  rating: 4.5,
                  highlights: [
                        "Vị trí thuận lợi gần Crescent Mall",
                        "View sông Sài Gòn tuyệt đẹp",
                        "Nội thất cao cấp, thiết kế hiện đại",
                        "Host phản hồi nhanh và nhiệt tình",
                        "Bảo mật tốt với thẻ từ và camera"
                  ],
                  drawbacks: [
                        "Giá đỗ xe hơi cao",
                        "Wifi có lúc chậm vào giờ cao điểm",
                        "Âm thanh từ đường phố khá ồn"
                  ]
            }
      };

      try {
            const response = await fetch('/api/blogs/template', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(templateData)
            });

            const result = await response.json();
            console.log('Property review created:', result);
            return result;
      } catch (error) {
            console.error('Error creating property review:', error);
            throw error;
      }
}

// 5. Create investment analysis blog
export async function createInvestmentAnalysis() {
      const templateData = {
            templateType: "investment-analysis",
            author: "60f0cf4b8c8a3c4b4c8f0d3f",
            data: {
                  location: "Đà Nẵng",
                  propertyPrice: "2.5 tỷ VNĐ",
                  expectedROI: "12-15",
                  marketTrends: "tăng trưởng mạnh nhờ du lịch phục hồi"
            }
      };

      try {
            const response = await fetch('/api/blogs/template', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(templateData)
            });

            const result = await response.json();
            console.log('Investment analysis created:', result);
            return result;
      } catch (error) {
            console.error('Error creating investment analysis:', error);
            throw error;
      }
}

// Example usage in a React component
export function BlogCreationExample() {
      const handleCreateRichBlog = async () => {
            try {
                  await createRichBlogPost();
                  alert('Rich blog post created successfully!');
            } catch (error) {
                  alert('Error creating blog post');
            }
      };

      const handleCreateTemplate = async (templateType: string) => {
            try {
                  switch (templateType) {
                        case 'airbnb-guide':
                              await createBlogFromTemplate();
                              break;
                        case 'photography':
                              await createPhotographyBlog();
                              break;
                        case 'review':
                              await createPropertyReview();
                              break;
                        case 'investment':
                              await createInvestmentAnalysis();
                              break;
                  }
                  alert(`${templateType} blog created successfully!`);
            } catch (error) {
                  alert('Error creating blog from template');
            }
      };

      return (
            <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Blog Creation Examples</h2>

                  <button
                        onClick={handleCreateRichBlog}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                        Create Rich Blog Post
                  </button>

                  <div className="space-x-2">
                        <button
                              onClick={() => handleCreateTemplate('airbnb-guide')}
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                              Airbnb Guide Template
                        </button>

                        <button
                              onClick={() => handleCreateTemplate('photography')}
                              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                              Photography Tips Template
                        </button>

                        <button
                              onClick={() => handleCreateTemplate('review')}
                              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                              Property Review Template
                        </button>

                        <button
                              onClick={() => handleCreateTemplate('investment')}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                              Investment Analysis Template
                        </button>
                  </div>
            </div>
      );
}
