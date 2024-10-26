// src/services/imageConversionService.js
import sharp from "sharp";

/**
 * Converts images to .webp format in parallel.
 * @param {Array} files - Array of image files (buffered).
 * @param {number} quality - Quality for the .webp conversion (0-100).
 * @returns {Promise<Array>} - Promise resolving to an array of converted files.
 */
export async function convertImagesToWebP(files, quality = 80) {
  return Promise.all(
    files.map(async (file) => {
      const webpBuffer = await sharp(file.buffer)
        .webp({ quality })
        .toBuffer();

      return {
        ...file,
        buffer: webpBuffer,
        originalname: `${file.originalname.split(".")[0]}.webp`,
        mimetype: "image/webp",
      };
    })
  );
}   