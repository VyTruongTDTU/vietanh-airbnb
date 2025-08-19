const mongoose = require("mongoose");
const slugify = require("slugify");

const blogPostSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
      },
      excerpt: {
            type: String,
            trim: true,
            maxlength: 500
      },
      date: { type: Date, default: Date.now },

      author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },

      image: { type: String },
      slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
      },

      content: {
            type: String,
            required: true,
            trim: true
      },

      // Rich content structure for beautiful blog posts
      sections: [{
            type: {
                  type: String,
                  enum: ['header', 'paragraph', 'image', 'quote', 'list', 'code', 'divider', 'gallery', 'video'],
                  required: true
            },
            title: String,
            content: String,
            data: mongoose.Schema.Types.Mixed, // For flexible data like image URLs, list items, etc.
            order: {
                  type: Number,
                  default: 0
            }
      }],

      // SEO and social media
      seo: {
            metaTitle: String,
            metaDescription: String,
            socialImage: String,
            canonicalUrl: String
      },

      // Additional fields for enhanced blog functionality
      tags: [{
            type: String,
            trim: true,
            lowercase: true
      }],

      category: {
            type: String,
            trim: true,
            default: 'General'
      },

      status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft'
      },

      views: {
            type: Number,
            default: 0
      },

      likes: {
            type: Number,
            default: 0
      },

      comments: [{
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
            },
            content: {
                  type: String,
                  required: true,
                  trim: true
            },
            date: {
                  type: Date,
                  default: Date.now
            }
      }],

      metaDescription: {
            type: String,
            trim: true,
            maxlength: 160
      },

      metaKeywords: [{
            type: String,
            trim: true
      }],

      featured: {
            type: Boolean,
            default: false
      },

      readingTime: {
            type: Number, // in minutes
            default: 1
      }
}, { timestamps: true, versionKey: false });


// Pre-save middleware to generate slug and calculate reading time
blogPostSchema.pre("save", function (next) {
      // Generate slug from title if not provided
      if (this.title && (!this.slug || this.isModified('title'))) {
            this.slug = slugify(this.title, { lower: true, strict: true });
      }

      // Calculate reading time based on content (average 200 words per minute)
      if (this.content) {
            const wordCount = this.content.split(/\s+/).length;
            this.readingTime = Math.ceil(wordCount / 200);
      }

      next();
});

// Create indexes for better query performance
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ author: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ featured: 1 });
blogPostSchema.index({ date: -1 });

// Virtual for comment count
blogPostSchema.virtual('commentCount').get(function () {
      return this.comments.length;
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
