import multer from 'multer';
import { resolve, extname } from 'path';

function randomNum() {
  return Math.round(Math.random() * 1000);
}

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      return cb(null, true);
    }
    return cb(new multer.MulterError('only supported images with format of JPEG or PNG...'));
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'imgs'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNum()}${extname(file.originalname)}`);
    },
  }),
};
