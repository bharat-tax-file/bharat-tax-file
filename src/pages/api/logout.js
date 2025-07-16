import admin from '@/utils/firebase-admin';
import nookies from 'nookies';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const cookies = nookies.get({ req });
    const sessionCookie = cookies.session || '';

    // Verify the cookie and get the user's UID
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie);
    
    // Revoke the user's refresh tokens. This logs them out of all devices.
    await admin.auth().revokeRefreshTokens(decodedClaims.sub); // sub is the user's uid

    // Destroy the session cookie
    nookies.destroy({ res }, 'session', { path: '/' });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    // If the cookie is already invalid, that's okay.
    // We can still clear it and send a success response.
    nookies.destroy({ res }, 'session', { path: '/' });
    res.status(200).json({ status: 'success', message: 'Cookie cleared despite error.' });
  }
};