import crypto from "crypto";
import { config } from "dotenv";
import admin from "firebase-admin";

config(); // Load environment variables

// Function to decrypt the Firebase key
function decryptFirebaseKey(encryptedKey, encryptionKey) {
  const [ivHex, encryptedHex] = encryptedKey.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedBuffer = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey, "utf-8"),
    iv
  );

  let decrypted;
  try {
    decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }

  // Ensure the decrypted output is JSON-parsed and `private_key` is in the correct format
  const serviceAccount = JSON.parse(decrypted.toString());

  // Correct the formatting of the private key if it was altered
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  return serviceAccount;
}

// Example: Decrypting the previously encrypted key

async function initializeFirebase() {
  // Get environment variables
  const encryptedFirebaseKey = process.env.ENCRYPTION_KEY_DATA;
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (!encryptedFirebaseKey || !encryptionKey) {
    throw new Error("Firebase credentials or encryption key not set");
  }

  // Decrypt Firebase JSON key
  const serviceAccount = decryptFirebaseKey(encryptedFirebaseKey, encryptionKey);

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://bekaspakaistorage.appspot.com",
  });

  return admin.storage().bucket();
}

// Ensure to handle top-level await correctly if used in ES modules
const bucket = await initializeFirebase();
export { bucket };
