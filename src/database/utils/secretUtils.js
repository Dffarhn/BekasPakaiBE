import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { config } from "dotenv";

config()
// Always use the environment variable for the encryption key
const encryptionKey = process.env.ENCRYPTION_KEY_DATA_SENSITIVE;

// Utility to encrypt data
export function encryptData(data) {
  const iv = randomBytes(16); // Generate a random initialization vector
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // Return IV and encrypted data
}

// Utility to decrypt data
export function decryptData(encryptedData) {
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


