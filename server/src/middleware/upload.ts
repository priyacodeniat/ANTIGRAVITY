import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { env } from '../config/env.js';

// Memory storage to process buffers securely without storing unvalidated files on disk
const storage = multer.memoryStorage();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Allowed formats: JPG, JPEG, PNG, WEBP.`
      )
    );
  }
};

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: env.MAX_IMAGE_SIZE_MB * 1024 * 1024, // 8 MB limit
    files: 1,
  },
  fileFilter,
});

