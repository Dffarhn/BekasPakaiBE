import admin from "firebase-admin";

async function initializeFirebase() {
  const serviceAccount = await import("../../bekaspakaistorage-firebase-adminsdk-hedsy-f629c92b9b.json", {
    assert: { type: "json" },
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default), // Use .default to access the JSON data
    storageBucket:"gs://bekaspakaistorage.appspot.com"
  });

  const bucket = admin.storage().bucket();
  const admin2 = admin

  return { admin2, bucket };
}

const { admin2, bucket } = await initializeFirebase();

export { admin2, bucket };
