import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Get all posts
async function getPosts() {
  const files = fs.readdirSync(path.join("content/blog"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("content/blog", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      frontmatter,
      slug: filename.replace(".md", ""),
    };
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPosts = posts.filter((post) => post.frontmatter.featured);
  const recentPosts = posts.filter((post) => !post.frontmatter.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          Blog
        </h1>
        <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Chia sẻ kinh nghiệm và kiến thức về quản lý, vận hành Airbnb hiệu quả
        </p>
      </header>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="h-5 w-1 bg-black mr-3"></span>
            Bài viết nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="relative h-48">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {post.frontmatter.category}
                      </span>
                      <span className="mx-2">•</span>
                      <time>
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </time>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <span className="h-5 w-1 bg-black mr-3"></span>
          Bài viết mới nhất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {post.frontmatter.category}
                    </span>
                    <span className="mx-2">•</span>
                    <time>
                      {new Date(post.frontmatter.date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {post.frontmatter.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
            Đăng ký nhận bài viết mới
          </h2>
          <p className="text-gray-600 mb-6">
            Nhận thông báo khi có bài viết mới về quản lý và vận hành Airbnb
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-300"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
