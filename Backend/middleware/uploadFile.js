const multer= require('multer');
const path = require('path');

const stoarge = multer.diskStorage(
    {
        destination: function(req , file , cb){
            cb(null, path.join(__dirname, 'uploads/'));
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
          },
    }
);

// File filter to accept only specific types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
    }
  };

  const upload = multer({
    stoarge,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter,
  });

  module.exports = upload;