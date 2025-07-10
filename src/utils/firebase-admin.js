import admin from 'firebase-admin';
import serviceAccount from './firebase-admin.json'; // path relative to this file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bharat-tax-file.firebaseio.com", // optional
  });
}

export default admin;
