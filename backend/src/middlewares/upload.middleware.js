import multer from "multer";
import sharp from "sharp";
import path from "path";

// Set storage for profile pictures and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  if (
    (file.fieldname === "profilePic" && file.mimetype.startsWith("image/")) ||
    (file.fieldname === "videoFile" && file.mimetype === "video/mp4")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 }, // General 6 MB limit
});

// Middleware for additional profile picture checks
const profilePicMiddleware = async (req, res, next) => {
  if (req.file.fieldname === "profilePic") {
    try {
      const filePath = path.join(__dirname, "./uploads/", req.file.filename);

      // Use sharp to validate and resize
      const image = sharp(filePath);
      const metadata = await image.metadata();

      if (metadata.width !== 500 || metadata.height !== 500) {
        throw new Error("Profile picture must be 500x500 pixels");
      }

      if (req.file.size > 1 * 1024 * 1024) { // 1 MB
        throw new Error("Profile picture must not exceed 1 MB");
      }

      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    next();
  }
};

export { upload, profilePicMiddleware};