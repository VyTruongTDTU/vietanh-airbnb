const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            const type = req.params.type;

            const allowedTypes = ['airbnb', 'course', 'blog', 'hiring', 'user'];
            if (!allowedTypes.includes(type)) {
                  return cb(new Error('Invalid upload type.'), false);
            }

            // Di chuyển ra khỏi backend, vào thư mục app/images
            const uploadPath = path.join(__dirname, '..', '..', 'app', 'images', type);
            fs.mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
      },

      filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
      }
});

const fileFilter = (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
      } else {
            cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
      }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
