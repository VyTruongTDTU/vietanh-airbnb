'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
      _id: string;
      title: string;
      excerpt: string;
      slug: string;
      category: string;
      tags: string[];
      image: string;
      date: string;
      featured: boolean;
      author: any;
      readingTime: number;
      views: number;
      likes: number;
}

export default function TestAPIPage() {
      const [posts, setPosts] = useState<BlogPost[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            fetchPosts();
      }, []);

      const fetchPosts = async () => {
            try {
                  setLoading(true);
                  const response = await fetch('/api/blogs');

                  if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  const data = await response.json();
                  setPosts(data);
                  setError(null);
            } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to fetch posts');
                  console.error('Error fetching posts:', err);
            } finally {
                  setLoading(false);
            }
      };

      const createTestPost = async () => {
            try {
                  const testPost = {
                        title: "Test Rich Blog Post",
                        excerpt: "This is a test blog post created via API",
                        category: "Test",
                        tags: ["test", "api", "blog"],
                        image: "/images/blog/test.jpg",
                        author: "674c123456789012345678ab", // Replace with a valid user ID
                        featured: false,
                        status: "published",
                        sections: [
                              {
                                    type: "header",
                                    title: "Welcome to Rich Content",
                                    order: 1
                              },
                              {
                                    type: "paragraph",
                                    content: "This is a test paragraph created through the rich blog API. It demonstrates how we can create structured content without markdown files.",
                                    order: 2
                              },
                              {
                                    type: "quote",
                                    content: "Rich content makes blogs more engaging and interactive!",
                                    order: 3
                              },
                              {
                                    type: "list",
                                    title: "Benefits of Rich Content",
                                    data: {
                                          items: [
                                                "Better user experience",
                                                "More interactive elements",
                                                "Easier content management",
                                                "Professional appearance"
                                          ]
                                    },
                                    order: 4
                              }
                        ],
                        seo: {
                              metaTitle: "Test Rich Blog Post - API Demo",
                              metaDescription: "Testing the rich blog API functionality with structured content sections."
                        }
                  };

                  const response = await fetch('/api/blogs/rich', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(testPost)
                  });

                  if (!response.ok) {
                        throw new Error(`Failed to create post: ${response.status}`);
                  }

                  const result = await response.json();
                  console.log('Test post created:', result);
                  alert('Test post created successfully!');
                  fetchPosts(); // Refresh the list
            } catch (err) {
                  console.error('Error creating test post:', err);
                  alert('Failed to create test post: ' + (err instanceof Error ? err.message : 'Unknown error'));
            }
      };

      const createTemplatePost = async () => {
            try {
                  const templateData = {
                        templateType: "airbnb-guide",
                        author: "674c123456789012345678ab", // Replace with a valid user ID
                        data: {
                              title: "Hướng dẫn đầu tư Airbnb tại TP.HCM",
                              location: "TP.HCM",
                              propertyType: "căn hộ",
                              tips: [
                                    "Nghiên cứu kỹ quy định pháp lý",
                                    "Chọn vị trí gần trung tâm hoặc điểm du lịch",
                                    "Đầu tư vào nội thất chất lượng",
                                    "Xây dựng dịch vụ khách hàng tốt"
                              ]
                        }
                  };

                  const response = await fetch('/api/blogs/template', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(templateData)
                  });

                  if (!response.ok) {
                        throw new Error(`Failed to create template post: ${response.status}`);
                  }

                  const result = await response.json();
                  console.log('Template post created:', result);
                  alert('Template post created successfully!');
                  fetchPosts(); // Refresh the list
            } catch (err) {
                  console.error('Error creating template post:', err);
                  alert('Failed to create template post: ' + (err instanceof Error ? err.message : 'Unknown error'));
            }
      };

      if (loading) {
            return (
                  <div className="max-w-4xl mx-auto p-8">
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                              <p className="mt-4 text-gray-600">Loading posts...</p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="max-w-4xl mx-auto p-8">
                  <h1 className="text-3xl font-bold mb-8">Blog API Test Page</h1>

                  {/* Test Buttons */}
                  <div className="mb-8 space-x-4">
                        <button
                              onClick={createTestPost}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                              Create Test Rich Post
                        </button>
                        <button
                              onClick={createTemplatePost}
                              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                              Create Template Post
                        </button>
                        <button
                              onClick={fetchPosts}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                              Refresh Posts
                        </button>
                  </div>

                  {/* Error Display */}
                  {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                              <strong>Error:</strong> {error}
                        </div>
                  )}

                  {/* Posts List */}
                  <div className="space-y-4">
                        <h2 className="text-2xl font-semibold mb-4">
                              Current Posts ({posts.length})
                        </h2>

                        {posts.length === 0 ? (
                              <div className="text-center py-8 text-gray-500">
                                    No posts found. Create some test posts to see them here!
                              </div>
                        ) : (
                              posts.map((post) => (
                                    <div
                                          key={post._id}
                                          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                                    >
                                          <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                      {post.title}
                                                </h3>
                                                <span className={`px-2 py-1 rounded text-sm ${post.featured
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                      }`}>
                                                      {post.featured ? 'Featured' : 'Regular'}
                                                </span>
                                          </div>

                                          <p className="text-gray-600 mb-3">{post.excerpt}</p>

                                          <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center space-x-4">
                                                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                            {post.category}
                                                      </span>
                                                      <span>{post.readingTime} min read</span>
                                                      <span>👁️ {post.views}</span>
                                                      <span>❤️ {post.likes}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                      <span>Slug: {post.slug}</span>
                                                      <a
                                                            href={`/blog/${post.slug}`}
                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                      >
                                                            View Post
                                                      </a>
                                                </div>
                                          </div>

                                          {/* Tags */}
                                          {post.tags && post.tags.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                      {post.tags.map((tag) => (
                                                            <span
                                                                  key={tag}
                                                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                                            >
                                                                  #{tag}
                                                            </span>
                                                      ))}
                                                </div>
                                          )}
                                    </div>
                              ))
                        )}
                  </div>

                  {/* API Information */}
                  <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">API Endpoints:</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                              <li><code>GET /api/blogs</code> - Get all blog posts</li>
                              <li><code>GET /api/blogs/:slug</code> - Get single post by slug</li>
                              <li><code>POST /api/blogs/rich</code> - Create rich content post</li>
                              <li><code>POST /api/blogs/template</code> - Create post from template</li>
                              <li><code>PUT /api/blogs/:id</code> - Update post</li>
                              <li><code>DELETE /api/blogs/:id</code> - Delete post</li>
                        </ul>
                  </div>
            </div>
      );
}
