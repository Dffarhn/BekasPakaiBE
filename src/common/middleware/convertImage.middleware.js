import { convertImagesToWebP } from "../services/convertToWEBPService.js";

// Middleware to convert files to WebP
export const convertToWebPMiddleware = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    req.files = await convertImagesToWebP(req.files);
    next();
  } catch (error) {
    console.error("Error in image conversion:", error);
    return res.status(500).json({ message: "Error processing images" });
  }
};
