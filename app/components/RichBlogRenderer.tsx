'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogSection {
      type: 'header' | 'paragraph' | 'image' | 'quote' | 'list' | 'code' | 'divider' | 'gallery' | 'video';
      title?: string;
      content?: string;
      data?: any;
      order: number;
}

interface RichBlogRendererProps {
      sections: BlogSection[];
      className?: string;
}

export default function RichBlogRenderer({ sections, className = '' }: RichBlogRendererProps) {
      const [expandedImages, setExpandedImages] = useState<Set<number>>(new Set());

      const toggleImageExpansion = (index: number) => {
            const newExpanded = new Set(expandedImages);
            if (newExpanded.has(index)) {
                  newExpanded.delete(index);
            } else {
                  newExpanded.add(index);
            }
            setExpandedImages(newExpanded);
      };

      const sortedSections = sections.sort((a, b) => a.order - b.order);

      const renderSection = (section: BlogSection, index: number) => {
            switch (section.type) {
                  case 'header':
                        return (
                              <h2
                                    key={index}
                                    className="text-3xl font-bold mb-6 mt-10 text-gray-900 border-l-4 border-black pl-4"
                              >
                                    {section.title}
                              </h2>
                        );

                  case 'paragraph':
                        return (
                              <p
                                    key={index}
                                    className="text-lg leading-relaxed mb-6 text-gray-700"
                              >
                                    {section.content}
                              </p>
                        );

                  case 'image':
                        return (
                              <div key={index} className="my-8">
                                    {section.title && (
                                          <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                                {section.title}
                                          </h3>
                                    )}
                                    <button
                                          className={`relative overflow-hidden rounded-xl w-full transition-all duration-300 ${expandedImages.has(index) ? 'h-auto' : 'h-[400px]'
                                                }`}
                                          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                                          onClick={() => toggleImageExpansion(index)}
                                          onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                      e.preventDefault();
                                                      toggleImageExpansion(index);
                                                }
                                          }}
                                          aria-label={`Toggle image expansion for ${section.title || 'image'}`}
                                    >
                                          <Image
                                                src={section.data?.url || section.content || ''}
                                                alt={section.data?.alt || section.title || ''}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                          />
                                          {!expandedImages.has(index) && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                          )}
                                    </button>
                                    {section.data?.caption && (
                                          <p className="text-sm text-gray-500 mt-2 italic text-center">
                                                {section.data.caption}
                                          </p>
                                    )}
                              </div>
                        );

                  case 'quote':
                        return (
                              <blockquote
                                    key={index}
                                    className="border-l-4 border-black pl-6 italic my-8 text-xl text-gray-700 bg-gray-50 py-6 px-8 rounded-r-lg relative"
                                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}
                              >
                                    <span className="text-4xl text-black absolute -top-2 -left-2">"</span>
                                    {section.content}
                                    <span className="text-4xl text-black absolute -bottom-6 -right-2">"</span>
                              </blockquote>
                        );

                  case 'list': {
                        const items = section.data?.items || [];
                        const isOrdered = section.data?.ordered || false;

                        return (
                              <div key={index} className="my-6">
                                    {section.title && (
                                          <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                                {section.title}
                                          </h3>
                                    )}
                                    {isOrdered ? (
                                          <ol className="list-decimal list-inside space-y-3 ml-4">
                                                {items.map((item: string, itemIndex: number) => (
                                                      <li key={`${index}-${item.slice(0, 10)}-${itemIndex}`} className="text-gray-700 leading-relaxed">
                                                            {item}
                                                      </li>
                                                ))}
                                          </ol>
                                    ) : (
                                          <ul className="space-y-3">
                                                {items.map((item: string, itemIndex: number) => (
                                                      <li key={`${index}-${item.slice(0, 10)}-${itemIndex}`} className="flex items-start text-gray-700 leading-relaxed">
                                                            <span className="inline-block w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0"></span>
                                                            <span>{item}</span>
                                                      </li>
                                                ))}
                                          </ul>
                                    )}
                              </div>
                        );
                  }

                  case 'code':
                        return (
                              <div key={index} className="my-6">
                                    {section.title && (
                                          <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                                {section.title}
                                          </h3>
                                    )}
                                    <pre
                                          className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto"
                                          style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                                    >
                                          <code className="text-sm font-mono">
                                                {section.content}
                                          </code>
                                    </pre>
                              </div>
                        );

                  case 'divider':
                        return (
                              <div key={index} className="my-12 flex items-center">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                    <div className="px-4">
                                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                              </div>
                        );

                  case 'gallery': {
                        const images = section.data?.images || [];
                        return (
                              <div key={index} className="my-8">
                                    {section.title && (
                                          <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                                                {section.title}
                                          </h3>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {images.map((img: any, imgIndex: number) => (
                                                <button
                                                      key={`gallery-${index}-${img.url || img}-${imgIndex}`}
                                                      className="relative h-48 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                                                      style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                                                      onClick={() => toggleImageExpansion(index * 100 + imgIndex)}
                                                      onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                  e.preventDefault();
                                                                  toggleImageExpansion(index * 100 + imgIndex);
                                                            }
                                                      }}
                                                      aria-label={`View gallery image ${imgIndex + 1}`}
                                                >
                                                      <Image
                                                            src={img.url || img}
                                                            alt={img.alt || `Gallery image ${imgIndex + 1}`}
                                                            fill
                                                            className="object-cover"
                                                      />
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        );
                  }

                  case 'video':
                        return (
                              <div key={index} className="my-8">
                                    {section.title && (
                                          <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                                {section.title}
                                          </h3>
                                    )}
                                    <div
                                          className="relative h-64 md:h-96 rounded-xl overflow-hidden"
                                          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                                    >
                                          {section.data?.embedUrl ? (
                                                <iframe
                                                      src={section.data.embedUrl}
                                                      className="w-full h-full"
                                                      frameBorder="0"
                                                      allowFullScreen
                                                      title={section.title || 'Video content'}
                                                />
                                          ) : (
                                                <video
                                                      controls
                                                      className="w-full h-full object-cover"
                                                      poster={section.data?.poster}
                                                >
                                                      <source src={section.data?.url || section.content} type="video/mp4" />
                                                      <track kind="captions" srcLang="vi" label="Vietnamese captions" />
                                                      Your browser does not support the video tag.
                                                </video>
                                          )}
                                    </div>
                                    {section.data?.description && (
                                          <p className="text-sm text-gray-600 mt-3 text-center">
                                                {section.data.description}
                                          </p>
                                    )}
                              </div>
                        );

                  default:
                        return null;
            }
      };

      return (
            <div className={`prose prose-lg max-w-none ${className}`}>
                  {sortedSections.map((section, index) => renderSection(section, index))}
            </div>
      );
}

// Example usage component for testing
export function ExampleRichBlog() {
      const exampleSections: BlogSection[] = [
            {
                  type: 'header',
                  title: 'Hướng dẫn đầu tư Airbnb hiệu quả',
                  order: 1
            },
            {
                  type: 'paragraph',
                  content: 'Đầu tư Airbnb đang trở thành một hình thức đầu tư bất động sản phổ biến với tiềm năng sinh lời cao. Tuy nhiên, để thành công cần có chiến lược và kiến thức chuyên môn.',
                  order: 2
            },
            {
                  type: 'image',
                  title: 'Thị trường Airbnb Việt Nam',
                  data: {
                        url: '/images/blog/airbnb-market.jpg',
                        alt: 'Vietnam Airbnb market analysis',
                        caption: 'Phân tích thị trường Airbnb tại Việt Nam 2024'
                  },
                  order: 3
            },
            {
                  type: 'list',
                  title: 'Các yếu tố quan trọng khi đầu tư',
                  data: {
                        items: [
                              'Vị trí địa lý thuận lợi gần trung tâm hoặc điểm du lịch',
                              'Pháp lý minh bạch và đầy đủ',
                              'Tính toán chi phí vận hành và bảo trì',
                              'Nghiên cứu nhu cầu thị trường địa phương'
                        ]
                  },
                  order: 4
            },
            {
                  type: 'quote',
                  content: 'Thành công trong đầu tư Airbnb không chỉ đến từ bất động sản đẹp mà còn từ dịch vụ chuyên nghiệp.',
                  order: 5
            }
      ];

      return <RichBlogRenderer sections={exampleSections} />;
}
