const BlogPost = require("../models/BlogPost");

// [POST] /api/blogs/rich - Create rich blog post with sections
exports.createRichBlogPost = async (req, res) => {
      try {
            const {
                  title,
                  excerpt,
                  category,
                  tags,
                  image,
                  sections,
                  seo,
                  status = 'draft',
                  featured = false,
                  author
            } = req.body;

            // Sort sections by order
            if (sections) {
                  sections.sort((a, b) => a.order - b.order);
            }

            // Generate content from sections for search and backup
            let generatedContent = '';
            if (sections) {
                  generatedContent = sections.map(section => {
                        switch (section.type) {
                              case 'header': {
                                    return `## ${section.title}\n`;
                              }
                              case 'paragraph': {
                                    return `${section.content}\n\n`;
                              }
                              case 'quote': {
                                    return `> ${section.content}\n\n`;
                              }
                              case 'list': {
                                    const items = section.data?.items || [];
                                    return items.map(item => `- ${item}`).join('\n') + '\n\n';
                              }
                              default: {
                                    return section.content || '';
                              }
                        }
                  }).join('');
            }

            const blog = new BlogPost({
                  title,
                  excerpt,
                  category,
                  tags,
                  image,
                  sections,
                  seo,
                  status,
                  featured,
                  author,
                  content: generatedContent || req.body.content
            });

            await blog.save();
            res.status(201).json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// [POST] /api/blogs/template - Create blog from predefined template
exports.createFromTemplate = async (req, res) => {
      try {
            const { templateType, data, author } = req.body;

            let blogData = {};

            switch (templateType) {
                  case 'airbnb-guide':
                        blogData = generateAirbnbGuideTemplate(data);
                        break;
                  case 'photography-tips':
                        blogData = generatePhotographyTemplate(data);
                        break;
                  case 'property-review':
                        blogData = generatePropertyReviewTemplate(data);
                        break;
                  case 'investment-analysis':
                        blogData = generateInvestmentTemplate(data);
                        break;
                  default:
                        return res.status(400).json({ error: 'Invalid template type' });
            }

            const blog = new BlogPost({
                  ...blogData,
                  author,
                  status: 'draft'
            });

            await blog.save();
            res.status(201).json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// Template generators
function generateAirbnbGuideTemplate(data) {
      const { title, location, propertyType, tips } = data;

      return {
            title: title || `Hướng dẫn đầu tư Airbnb tại ${location}`,
            excerpt: `Khám phá cơ hội đầu tư và kinh nghiệm quản lý ${propertyType} tại ${location}`,
            category: 'Investment Guide',
            tags: ['airbnb', 'investment', location.toLowerCase(), propertyType.toLowerCase()],
            sections: [
                  {
                        type: 'header',
                        title: 'Tổng quan thị trường',
                        order: 1
                  },
                  {
                        type: 'paragraph',
                        content: `Thị trường Airbnb tại ${location} đang có những cơ hội tốt cho ${propertyType}. Với vị trí địa lý thuận lợi và nhu cầu du lịch ngày càng tăng, đây là thời điểm phù hợp để đầu tư.`,
                        order: 2
                  },
                  {
                        type: 'image',
                        title: 'Hình ảnh khu vực',
                        data: { url: '/images/blog/location-overview.jpg', alt: `${location} overview` },
                        order: 3
                  },
                  {
                        type: 'header',
                        title: 'Kinh nghiệm thực tế',
                        order: 4
                  },
                  {
                        type: 'list',
                        title: 'Những điều cần lưu ý',
                        data: {
                              items: tips || [
                                    'Nghiên cứu kỹ quy định pháp lý địa phương',
                                    'Tính toán chi phí vận hành hàng tháng',
                                    'Đầu tư vào nội thất chất lượng',
                                    'Xây dựng mối quan hệ với các dịch vụ địa phương'
                              ]
                        },
                        order: 5
                  },
                  {
                        type: 'quote',
                        content: 'Thành công trong kinh doanh Airbnb không chỉ đến từ vị trí đẹp mà còn từ cách vận hành chuyên nghiệp.',
                        order: 6
                  }
            ],
            seo: {
                  metaTitle: `Hướng dẫn đầu tư Airbnb ${location} - Kinh nghiệm thực tế`,
                  metaDescription: `Tìm hiểu cơ hội đầu tư Airbnb tại ${location}, kinh nghiệm quản lý ${propertyType} hiệu quả và tối ưu doanh thu.`
            }
      };
}

function generatePhotographyTemplate(data) {
      const { propertyType, roomCount, specialFeatures } = data;

      return {
            title: `Bí quyết chụp ảnh ${propertyType} ${roomCount} phòng thu hút khách`,
            excerpt: `Hướng dẫn chi tiết cách chụp ảnh chuyên nghiệp cho ${propertyType} để tăng tỷ lệ đặt phòng`,
            category: 'Photography',
            tags: ['photography', 'airbnb', propertyType.toLowerCase(), 'marketing'],
            sections: [
                  {
                        type: 'header',
                        title: 'Chuẩn bị trước khi chụp',
                        order: 1
                  },
                  {
                        type: 'paragraph',
                        content: `Để có được bộ ảnh hoàn hảo cho ${propertyType} ${roomCount} phòng, việc chuẩn bị kỹ lưỡng là vô cùng quan trọng.`,
                        order: 2
                  },
                  {
                        type: 'list',
                        title: 'Checklist chuẩn bị',
                        data: {
                              items: [
                                    'Dọn dẹp và sắp xếp toàn bộ không gian',
                                    'Kiểm tra ánh sáng tự nhiên',
                                    'Chuẩn bị thiết bị chụp ảnh',
                                    'Lập danh sách các góc cần chụp'
                              ]
                        },
                        order: 3
                  },
                  {
                        type: 'header',
                        title: 'Kỹ thuật chụp ảnh từng không gian',
                        order: 4
                  },
                  {
                        type: 'image',
                        title: 'Ví dụ góc chụp phòng khách',
                        data: { url: '/images/blog/living-room-angle.jpg', alt: 'Living room photography angle' },
                        order: 5
                  },
                  ...(specialFeatures ? [{
                        type: 'paragraph',
                        content: `Đặc biệt chú ý đến các điểm nổi bật của căn hộ như: ${specialFeatures.join(', ')}.`,
                        order: 6
                  }] : []),
                  {
                        type: 'quote',
                        content: 'Một bức ảnh đẹp có thể tăng tỷ lệ đặt phòng lên đến 40%',
                        order: 7
                  }
            ]
      };
}

function generatePropertyReviewTemplate(data) {
      const { propertyName, location, rating, highlights, drawbacks } = data;

      let ratingDescription = 'cần cân nhắc';
      if (rating >= 4) {
            ratingDescription = 'tuyệt vời';
      } else if (rating >= 3) {
            ratingDescription = 'tốt';
      }

      let conclusionText = 'cần cân nhắc kỹ trước khi đặt';
      if (rating >= 4) {
            conclusionText = 'đáng để trải nghiệm';
      }

      return {
            title: `Đánh giá ${propertyName} - ${location}`,
            excerpt: `Review chi tiết về trải nghiệm tại ${propertyName}, những điểm nổi bật và cần cải thiện`,
            category: 'Property Review',
            tags: ['review', location.toLowerCase(), 'experience'],
            sections: [
                  {
                        type: 'header',
                        title: 'Tổng quan',
                        order: 1
                  },
                  {
                        type: 'paragraph',
                        content: `${propertyName} tại ${location} là một lựa chọn ${ratingDescription} cho du khách.`,
                        order: 2
                  },
                  {
                        type: 'header',
                        title: 'Điểm nổi bật',
                        order: 3
                  },
                  {
                        type: 'list',
                        data: { items: highlights || ['Vị trí thuận lợi', 'Trang thiết bị đầy đủ', 'Host thân thiện'] },
                        order: 4
                  },
                  {
                        type: 'header',
                        title: 'Điểm cần cải thiện',
                        order: 5
                  },
                  {
                        type: 'list',
                        data: { items: drawbacks || ['Cần cập nhật nội thất', 'Wifi chưa ổn định'] },
                        order: 6
                  },
                  {
                        type: 'header',
                        title: 'Kết luận',
                        order: 7
                  },
                  {
                        type: 'paragraph',
                        content: `Với rating ${rating}/5, ${propertyName} ${conclusionText}.`,
                        order: 8
                  }
            ]
      };
}

function generateInvestmentTemplate(data) {
      const { location, propertyPrice, expectedROI, marketTrends } = data;

      return {
            title: `Phân tích đầu tư Airbnb tại ${location}`,
            excerpt: `Đánh giá tiềm năng đầu tư và dự báo lợi nhuận từ bất động sản cho thuê ngắn hạn`,
            category: 'Investment Analysis',
            tags: ['investment', 'analysis', location.toLowerCase(), 'roi'],
            sections: [
                  {
                        type: 'header',
                        title: 'Tổng quan thị trường',
                        order: 1
                  },
                  {
                        type: 'paragraph',
                        content: `Thị trường bất động sản cho thuê ngắn hạn tại ${location} đang cho thấy ${marketTrends || 'xu hướng tích cực'}.`,
                        order: 2
                  },
                  {
                        type: 'header',
                        title: 'Phân tích tài chính',
                        order: 3
                  },
                  {
                        type: 'list',
                        title: 'Các chỉ số quan trọng',
                        data: {
                              items: [
                                    `Giá bất động sản trung bình: ${propertyPrice || 'N/A'}`,
                                    `ROI dự kiến: ${expectedROI || 'N/A'}%/năm`,
                                    'Chi phí vận hành: 20-30% doanh thu',
                                    'Thời gian hoàn vốn: 8-12 năm'
                              ]
                        },
                        order: 4
                  },
                  {
                        type: 'quote',
                        content: 'Đầu tư thông minh là nắm bắt được xu hướng thị trường và tính toán rủi ro cẩn thận.',
                        order: 5
                  }
            ]
      };
}

// [POST] /api/blogs
exports.createBlogPost = async (req, res) => {
      try {
            const blog = new BlogPost(req.body);
            await blog.save();
            res.status(201).json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// [GET] /api/blogs
exports.getAllBlogs = async (req, res) => {
      try {
            const { tag, category, title, startDate, endDate } = req.query;
            const filter = {};

            if (tag) filter.tags = tag;
            if (category) filter.category = category;
            if (title) filter.title = new RegExp(title, "i");
            if (startDate || endDate) {
                  filter.date = {};
                  if (startDate) filter.date.$gte = new Date(startDate);
                  if (endDate) filter.date.$lte = new Date(endDate);
            }

            const blogs = await BlogPost.find(filter)
                  .populate("author", "name avatar")
                  .sort({ createdAt: -1 });

            res.json(blogs);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// [GET] /api/blogs/:slug
exports.getBlogBySlug = async (req, res) => {
      try {
            const blog = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name avatar");
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json(blog);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// [GET] /api/blogs/id/:id
exports.getBlogById = async (req, res) => {
      try {
            const blog = await BlogPost.findById(req.params.id).populate("author", "name avatar");
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json(blog);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

// [PUT] /api/blogs/:id
exports.updateBlogPost = async (req, res) => {
      try {
            const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json(blog);
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
};

// [DELETE] /api/blogs/:id
exports.deleteBlogPost = async (req, res) => {
      try {
            const blog = await BlogPost.findByIdAndDelete(req.params.id);
            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json({ message: "Blog deleted successfully" });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};
