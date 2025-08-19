import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ElementContent } from "hast";

// Get post data from markdown file
async function getPost(slug: string) {
  const markdownFile = fs.readFileSync(
    path.join("content/blog", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownFile);
  return {
    frontmatter,
    content,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("content/blog"));
  const paths = files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));

  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {post.frontmatter.category}
            </span>
            <span className="mx-2">•</span>
            <time>
              {new Date(post.frontmatter.date).toLocaleDateString("vi-VN")}
            </time>
            <span className="mx-2">•</span>
            <span>{post.frontmatter.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
            {post.frontmatter.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {post.frontmatter.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center">
            <div
              className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            >
              <Image
                src={post.frontmatter.author.avatar}
                alt={post.frontmatter.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900">
                {post.frontmatter.author.name}
              </p>
              <p className="text-sm text-gray-600">
                {post.frontmatter.author.bio}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-black prose-a:font-medium prose-blockquote:border-gray-500 prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-code:text-gray-700 prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              img: (props) => {
                const { src, alt } = props;
                // Return null for img inside p tag to prevent hydration error
                if (
                  props.node?.position?.start?.line ===
                  props.node?.position?.end?.line
                ) {
                  return null;
                }
                return (
                  <div className="my-8">
                    <div
                      className="relative h-[400px] w-full rounded-xl overflow-hidden"
                      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                    >
                      <Image
                        src={typeof src === "string" ? src : ""}
                        alt={alt || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              },
              p: ({ children, node }) => {
                if (!node)
                  return (
                    <p className="text-lg leading-relaxed mb-6">{children}</p>
                  );

                // Check if p contains an img
                const hasImg = node.children?.some(
                  (child): child is ElementContent =>
                    typeof child === "object" &&
                    child !== null &&
                    "type" in child &&
                    child.type === "element" &&
                    "tagName" in child &&
                    child.tagName === "img"
                );

                if (hasImg) {
                  // If p contains img, render the img separately
                  const imgNode = node.children?.find(
                    (child): child is ElementContent =>
                      typeof child === "object" &&
                      child !== null &&
                      "type" in child &&
                      child.type === "element" &&
                      "tagName" in child &&
                      child.tagName === "img"
                  );

                  if (imgNode && "properties" in imgNode) {
                    return (
                      <>
                        <div className="my-8">
                          <div
                            className="relative h-[400px] w-full rounded-xl overflow-hidden"
                            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                          >
                            <Image
                              src={(imgNode.properties?.src as string) || ""}
                              alt={(imgNode.properties?.alt as string) || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        {/* Render other children if any */}
                        {node.children
                          .filter(
                            (child): child is ElementContent =>
                              !(
                                typeof child === "object" &&
                                child !== null &&
                                "type" in child &&
                                child.type === "element" &&
                                "tagName" in child &&
                                child.tagName === "img"
                              )
                          )
                          .map((child, i) => (
                            <p key={i} className="text-lg leading-relaxed mb-6">
                              {child.type === "text" ? child.value : null}
                            </p>
                          ))}
                      </>
                    );
                  }
                }

                return (
                  <p className="text-lg leading-relaxed mb-6">{children}</p>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-8 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold mb-6 mt-10 text-gray-900">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mb-4 mt-8">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-3 mb-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-3 mb-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-600">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-black pl-4 italic my-6 text-gray-700 bg-gray-50 py-2 px-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              pre: ({ children }) => (
                <pre
                  className="bg-gray-900 text-gray-100 p-4 my-6 overflow-x-auto rounded-lg"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                >
                  {children}
                </pre>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 rounded px-1 py-0.5 text-black">
                  {children}
                </code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
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
      </article>
    </div>
  );
}
