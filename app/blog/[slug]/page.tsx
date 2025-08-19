import Image from "next/image";
import RichBlogRenderer from "../../components/RichBlogRenderer";

// Interface for blog post from API
interface BlogSection {
  type: 'header' | 'paragraph' | 'image' | 'quote' | 'list' | 'code' | 'divider' | 'gallery' | 'video';
  title?: string;
  content?: string;
  data?: any;
  order: number;
}

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
  author: {
    _id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  readingTime: number;
  views: number;
  likes: number;
  content: string;
  sections?: BlogSection[];
  comments?: any[];
  updatedAt?: string;
  createdAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

// Get post data from API
async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Get all posts for static generation
async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="mx-2">•</span>
            <time>
              {new Date(post.date).toLocaleDateString("vi-VN")}
            </time>
            <span className="mx-2">•</span>
            <span>{post.readingTime} phút đọc</span>
            <span className="mx-2">•</span>
            <span>👁️ {post.views} lượt xem</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>

          {/* Author info */}
          {post.author && (
            <div className="flex items-center">
              <div
                className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white"
                style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
              >
                <Image
                  src={post.author.avatar || '/images/default-avatar.jpg'}
                  alt={post.author.name || 'Author'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-600">
                  {post.author.bio || 'Blog Author'}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <div
              className="relative h-[400px] w-full rounded-xl overflow-hidden"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mb-12">
          {post.sections && post.sections.length > 0 ? (
            // Render rich content using sections
            <RichBlogRenderer sections={post.sections} />
          ) : (
            // Fallback to plain text content
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-black prose-a:font-medium prose-blockquote:border-gray-500 prose-strong:text-gray-900">
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
                {post.content}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Post Stats */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {post.views} lượt xem
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {post.likes} lượt thích
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                </svg>
                {post.comments?.length || 0} bình luận
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Cập nhật: {new Date(post.updatedAt || post.createdAt || post.date).toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center space-x-4 mb-12">
          <span className="text-gray-700 font-medium">Chia sẻ:</span>
          <button className="text-gray-600 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </div>

        {/* Related Posts or Call to Action */}
        <div className="border-t pt-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bạn thích bài viết này?
            </h3>
            <p className="text-gray-600 mb-6">
              Đăng ký để nhận thông báo về những bài viết mới nhất về Airbnb và bất động sản
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

