// utils/requireAuth.js
import nookies from 'nookies';
import admin from './firebase-admin';

export const requireAuth = async (context) => {
  try {
    const cookies = nookies.get(context);
    const sessionCookie = cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return { user: decodedClaims };
  } catch (err) {
    return null;
  }
};
