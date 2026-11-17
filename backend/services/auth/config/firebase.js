import { cert, initializeApp, getApps } from "firebase-admin";

const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJSON) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is missing");
}

const serviceAccount = JSON.parse(serviceAccountJSON);

export const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });


// // In development
// import { cert, initializeApp, getApps } from "firebase-admin";
// import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

// export const app = getApps().length
//   ? getApps()[0]
//   : initializeApp({
//       credential: cert(serviceAccount),
//     });