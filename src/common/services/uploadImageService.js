import { config } from "dotenv";
import { UTApi, UTFile } from "uploadthing/server";
import { bucket } from "../../database/firebaseConfig.js";

config();

const api = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});


export async function FBuploadFilesPicture(files,saveAt) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const { buffer, originalname } = file;
      const firebaseFile = bucket.file(`${saveAt}/${Date.now()}_${originalname}`); // Unique filename with timestamp

      const stream = firebaseFile.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      // Handle the buffer stream and upload to Firebase
      stream.end(buffer);

      return new Promise((resolve, reject) => {
        stream.on("finish", async () => {
          const url = await firebaseFile.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // Customize expiration date as needed
          });
          resolve({
            key: firebaseFile.name,
            alt: `Image description ${originalname}`, // Customize alt text as needed
            url: url[0],
          });
        });

        stream.on("error", (error) => {
          console.error("Upload error:", error);
          reject(new Error("Firebase upload failed"));
        });
      });
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Firebase upload error:", error);
    throw new Error("Firebase upload failed");
  }
}

// Delete files from Firebase
export async function FBdeleteFilesPicture(keys) {
  try {
    const deletePromises = keys.map(async (key) => {
      const file = bucket.file(key);
      await file.delete();
    });
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Firebase delete error:", error);
    throw new Error("Firebase deletion failed");
  }
}


export async function uploadFilesPicture(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  const blobs = files.map((file) => {
    const { buffer, originalname } = file;
    // Create a blob from the buffer
    const blob = new Blob([buffer], { type: "image/webp" });
    // Assign the name property for the upload
    blob.name = originalname;
    return blob;
  });

  // Upload files and transform response to desired format
  const uploadResponse = await api.uploadFiles(blobs);

  // Format the response with only `alt` and `url` fields
  return uploadResponse.map((item) => ({
    key: item.data.key,
    alt: `Image description ${item.data.name}`, // Customize alt text as needed
    url: item.data.url,
  }));
}
// Function to delete files
export async function deleteFilesPicture(keys) {
  try {
    await api.deleteFiles(keys);
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("File deletion failed");
  }
}

// Function to list files
export async function listFilesPicture() {
  try {
    const files = await api.listFiles();
    return files;
  } catch (error) {
    console.error("List error:", error);
    throw new Error("Failed to list files");
  }
}

// Upload Response: [
//   {
//     data: {
//       key: '682c03f6-fc3c-4a37-8514-65e2d53f665b-wbmhze',
//       url: 'https://utfs.io/f/682c03f6-fc3c-4a37-8514-65e2d53f665b-wbmhze',
//       appUrl: 'https://utfs.io/a/xg0vqn81qs/682c03f6-fc3c-4a37-8514-65e2d53f665b-wbmhze',
//       name: '1729865799997',
//       size: 64740,
//       type: 'image/jpeg',
//       customId: null
//     },
//     error: null
//   }
// ]
