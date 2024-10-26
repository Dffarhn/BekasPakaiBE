import { config } from "dotenv";
import { UTApi, UTFile } from "uploadthing/server";

config();

const api = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function uploadFilesPicture(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  const blobs = files.map((file) => {
    const { buffer, name, customId } = file;
    const blob = new Blob([buffer], { type: file.type || "application/octet-stream" });
    blob.name = name;
    blob.customId = customId;
    return blob;
  });

  // Upload files and transform response to desired format
  const uploadResponse = await api.uploadFiles(blobs);

  // Format the response with only `alt` and `url` fields
  return uploadResponse.map((item, index) => {
    return {
      key: item.data.key,
      alt: `Image description ${item.data.name}`,  // Customize alt text as needed
      url: item.data.url,
    };
  });
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
