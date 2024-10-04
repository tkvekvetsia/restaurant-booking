import multer, { FileFilterCallback, MulterError } from 'multer';
import { Request } from 'express';
import path from 'path';

// Define storage destination for uploaded files
const storage = multer.memoryStorage(); // Store in memory to later use sharp

// File filter to ensure only images are uploaded
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file) {
    return cb(null, true);
  }

  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (
    !extname ||
    !mimetype ||
    (file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg')
  ) {
    return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer configuration for file size (max 1 MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
});

const uploadAvatar = upload.single('img'); // Single image upload with field name 'img'

export { uploadAvatar };
// export default {
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = fileTypes.test(file.mimetype);
//     if (
//       !extname ||
//       !mimetype ||
//       (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
//     ) {
//       return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
//     }
//
//     return cb(null, true);
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
//   storage: multer.memoryStorage(),
// };
