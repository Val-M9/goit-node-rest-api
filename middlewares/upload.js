import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";
import { allowedFileTypes } from "../constants/file.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop().toLowerCase();
  if (!allowedFileTypes.includes(extension)) {
    return cb(
      HttpError(
        400,
        `Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`
      ),
      false
    );
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export { upload };
