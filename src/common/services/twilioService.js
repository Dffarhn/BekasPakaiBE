// import { config } from "dotenv";
// import twilio from "twilio";

// config()

// const accountSid = process.env.TWILIO_ACCOUNT_SID 
// const authToken = process.env.TWILIO_AUTH_TOKEN 
// const verifyServiceSid = process.env.TWILIO_verifyService

// // Initialize Twilio client
// const client = twilio(accountSid, authToken);

// /**
//  * Sends a verification code to the provided phone number via SMS
//  * @param {string} phoneNumber - The phone number to verify (e.g., '+6285174369313')
//  */
// export async function sendVerificationCodeTwillio(phoneNumber) {
//   try {
//     const verification = await client.verify.v2.services(verifyServiceSid).verifications.create({ to: phoneNumber, channel: "sms" });

//   } catch (error) {
//     console.error("Error sending verification:", error);
//   }
// }

//{bio,username,name,profile_picture,banner_profile_picture,noHandphone,tanggalLahir,jenisKelamin}

// /**
//  * Verifies the OTP code entered by the user
//  * @param {string} phoneNumber - The phone number associated with the OTP
//  * @param {string} code - The OTP code to verify
//  * @returns {Promise<boolean>} - Returns true if verified, false otherwise
//  */
// export async function verifyUserOTPTwillio(phoneNumber, code) {
//   try {
//     const verificationCheck = await client.verify.v2.services(verifyServiceSid).verificationChecks.create({ to: phoneNumber, code });

//     if (verificationCheck.status === "approved") {
//       console.log("Verification successful!");
//       return true;
//     } else {
//       console.log("Verification failed.");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error verifying code:", error);
//     return false;
//   }
// }
