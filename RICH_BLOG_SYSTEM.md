# Rich Blog System Documentation

## Overview

This system allows you to create beautiful, structured blog posts without needing markdown files. Instead, you can create rich content through API calls with predefined templates or custom sections.

## Features

### ✨ Rich Content Sections
- **Header**: Styled headings with visual emphasis
- **Paragraph**: Well-formatted text content
- **Image**: Interactive images with zoom functionality
- **Quote**: Beautifully styled blockquotes
- **List**: Ordered and unordered lists with custom styling
- **Code**: Syntax-highlighted code blocks
- **Divider**: Visual section separators
- **Gallery**: Image galleries with grid layout
- **Video**: Embedded or direct video content

### 🎨 Predefined Templates
1. **Airbnb Guide**: Investment and management guides
2. **Photography Tips**: Property photography tutorials
3. **Property Review**: Detailed property reviews
4. **Investment Analysis**: Market analysis and ROI calculations

### 🔧 Enhanced Features
- Auto-generated slugs and reading time
- SEO optimization fields
- Comment system
- Like and view tracking
- Featured post support
- Responsive design
- Accessibility compliant

## API Endpoints

### Create Rich Blog Post
```
POST /api/blogs/rich
```

**Request Body:**
```json
{
  "title": "Blog post title",
  "excerpt": "Short description",
  "category": "Category name",
  "tags": ["tag1", "tag2"],
  "image": "/path/to/image.jpg",
  "author": "user_id",
  "featured": true,
  "status": "published",
  "seo": {
    "metaTitle": "SEO title",
    "metaDescription": "SEO description",
    "socialImage": "/path/to/social-image.jpg"
  },
  "sections": [
    {
      "type": "header",
      "title": "Section Title",
      "order": 1
    },
    {
      "type": "paragraph", 
      "content": "Your content here",
      "order": 2
    }
  ]
}
```

### Create from Template
```
POST /api/blogs/template
```

**Request Body:**
```json
{
  "templateType": "airbnb-guide",
  "author": "user_id",
  "data": {
    "title": "Custom title",
    "location": "Location name",
    "propertyType": "apartment",
    "tips": ["tip1", "tip2"]
  }
}
```

## Available Templates

### 1. Airbnb Guide Template
```json
{
  "templateType": "airbnb-guide",
  "data": {
    "title": "Investment guide title",
    "location": "City/Area name",
    "propertyType": "apartment/villa/studio",
    "tips": ["Array of investment tips"]
  }
}
```

### 2. Photography Tips Template
```json
{
  "templateType": "photography-tips",
  "data": {
    "propertyType": "apartment/villa/studio",
    "roomCount": "number of rooms",
    "specialFeatures": ["unique features array"]
  }
}
```

### 3. Property Review Template
```json
{
  "templateType": "property-review",
  "data": {
    "propertyName": "Property name",
    "location": "Location",
    "rating": 4.5,
    "highlights": ["positive points"],
    "drawbacks": ["negative points"]
  }
}
```

### 4. Investment Analysis Template
```json
{
  "templateType": "investment-analysis", 
  "data": {
    "location": "Investment location",
    "propertyPrice": "Price range",
    "expectedROI": "12-15",
    "marketTrends": "Market description"
  }
}
```

## Section Types

### Header
```json
{
  "type": "header",
  "title": "Section Title",
  "order": 1
}
```

### Paragraph
```json
{
  "type": "paragraph",
  "content": "Your text content here",
  "order": 2
}
```

### Image
```json
{
  "type": "image",
  "title": "Image title (optional)",
  "data": {
    "url": "/path/to/image.jpg",
    "alt": "Alt text",
    "caption": "Image caption (optional)"
  },
  "order": 3
}
```

### Quote
```json
{
  "type": "quote",
  "content": "Your inspirational quote here",
  "order": 4
}
```

### List
```json
{
  "type": "list",
  "title": "List title (optional)",
  "data": {
    "items": ["Item 1", "Item 2", "Item 3"],
    "ordered": false
  },
  "order": 5
}
```

### Code Block
```json
{
  "type": "code",
  "title": "Code example (optional)",
  "content": "const example = 'code here';",
  "order": 6
}
```

### Gallery
```json
{
  "type": "gallery",
  "title": "Gallery title (optional)",
  "data": {
    "images": [
      {
        "url": "/path/to/image1.jpg",
        "alt": "Image 1 description"
      },
      {
        "url": "/path/to/image2.jpg", 
        "alt": "Image 2 description"
      }
    ]
  },
  "order": 7
}
```

### Video
```json
{
  "type": "video",
  "title": "Video title (optional)",
  "data": {
    "url": "/path/to/video.mp4",
    "poster": "/path/to/thumbnail.jpg",
    "embedUrl": "https://youtube.com/embed/video_id",
    "description": "Video description"
  },
  "order": 8
}
```

### Divider
```json
{
  "type": "divider",
  "order": 9
}
```

## Usage Examples

### Creating a Custom Rich Blog Post

```javascript
import { createRichBlogPost } from './BlogAPI';

const blogData = {
  title: "Amazing Airbnb Photography Guide",
  excerpt: "Learn professional photography techniques",
  category: "Photography",
  tags: ["photography", "airbnb", "tips"],
  author: "user_id_here",
  sections: [
    {
      type: "header",
      title: "Introduction to Airbnb Photography",
      order: 1
    },
    {
      type: "paragraph",
      content: "Great photos are crucial for Airbnb success...",
      order: 2
    },
    {
      type: "image",
      data: {
        url: "/images/camera-setup.jpg",
        alt: "Professional camera setup"
      },
      order: 3
    }
  ]
};

await createRichBlogPost(blogData);
```

### Using Templates

```javascript
import { createBlogFromTemplate } from './BlogAPI';

// Create an Airbnb investment guide
await createBlogFromTemplate({
  templateType: "airbnb-guide",
  author: "user_id",
  data: {
    location: "Ho Chi Minh City",
    propertyType: "studio apartment",
    tips: [
      "Research local regulations",
      "Calculate operating costs",
      "Invest in quality furnishing"
    ]
  }
});
```

## Frontend Integration

### Using the RichBlogRenderer Component

```jsx
import RichBlogRenderer from './components/RichBlogRenderer';

function BlogPost({ blogData }) {
  return (
    <article>
      <header>
        <h1>{blogData.title}</h1>
        <p>{blogData.excerpt}</p>
      </header>
      
      <RichBlogRenderer 
        sections={blogData.sections}
        className="my-8"
      />
    </article>
  );
}
```

## Database Schema

The enhanced BlogPost model includes:

```javascript
{
  title: String,
  excerpt: String, 
  content: String, // Auto-generated from sections
  sections: [BlogSection], // Rich content structure
  seo: {
    metaTitle: String,
    metaDescription: String,
    socialImage: String,
    canonicalUrl: String
  },
  // ... other existing fields
}
```

## Benefits

1. **No Markdown Required**: Create beautiful content through structured data
2. **Consistent Styling**: All content follows the same design system
3. **Interactive Elements**: Images, galleries, and videos with built-in interactions
4. **SEO Optimized**: Built-in SEO fields and auto-generated content
5. **Template System**: Quick content creation with predefined structures
6. **Responsive Design**: Works perfectly on all devices
7. **Accessibility**: Screen reader friendly and keyboard navigable

## Best Practices

1. **Order Sections**: Always specify the `order` field for proper sequencing
2. **SEO Fields**: Include meta titles and descriptions for better search visibility
3. **Image Optimization**: Use optimized images and provide alt text
4. **Content Structure**: Use headers to break up long content
5. **Template Customization**: Modify template data to fit your specific needs

This system provides a powerful, flexible way to create beautiful blog content without the complexity of markdown while maintaining full control over styling and structure.
