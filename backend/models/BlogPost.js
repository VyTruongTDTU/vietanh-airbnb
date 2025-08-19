const mongoose = require("mongoose");
const slugify = require("slugify");

const blogPostSchema = new mongoose.Schema({
      title: { type: String, required: true },
      excerpt: { type: String },
      date: { type: Date, default: Date.now },

      author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
      },

      category: { type: String },
      tags: [String],

      image: { type: String }, 
      slug: { type: String, unique: true },

      content: { type: String, required: true }, 
}, { timestamps: true, versionKey: false });


blogPostSchema.pre("validate", function (next) {
      if (this.title && !this.slug) {
            this.slug = slugify(this.title, { lower: true, strict: true });
      }
      next();
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
