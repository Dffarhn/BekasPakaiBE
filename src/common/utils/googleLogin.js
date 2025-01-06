import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";

config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Must be the same as frontend

async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID, // Same client ID as frontend
  });

  const payload = ticket.getPayload();
  // The token is valid, and you can extract the user information here
  return payload;
}

export default verifyGoogleIdToken
