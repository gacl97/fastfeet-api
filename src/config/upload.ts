import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

export default {
  tmpFolder,
  uploadsFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileNameHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileNameHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
