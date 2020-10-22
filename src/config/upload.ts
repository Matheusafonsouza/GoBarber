import { resolve } from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  directory: string;
  uploadsFolder: string;

  multer: { storage: StorageEngine };

  config: {
    disk: {};
    aws: { bucket: string };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  directory: tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, cb) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return cb(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'gobarber-aplication',
    },
  },
} as IUploadConfig;
