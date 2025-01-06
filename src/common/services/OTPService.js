import NodeCache from 'node-cache';
import crypto from 'crypto';

// Initialize the cache with a 5-minute TTL
const otpCache = new NodeCache({ stdTTL: 300 }); // 300 seconds = 5 minutes

// Function to generate a 6-digit OTP
function generateOTP() {
  return crypto.randomInt(100000, 999999); // Generate a random number between 100000 and 999999
}

function storeOTP(userId, otp) {
  otpCache.set(userId, otp); // Store OTP with TTL
}

function getOTP(userId) {
  return otpCache.get(userId); // Retrieve OTP if not expired
}

function clearOTP(userId) {
  otpCache.del(userId); // Manually delete OTP
}

// Validate OTP
function validateOTP(userId, inputOtp) {
  const cachedOtp = getOTP(userId);
  if (cachedOtp && cachedOtp === inputOtp) {
    clearOTP(userId); // Clear OTP after successful validation
    return true;
  }
  return false; // OTP is either expired or does not match
}

export { generateOTP, storeOTP, getOTP, clearOTP, validateOTP };
