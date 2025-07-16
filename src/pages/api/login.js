import admin from '@/utils/firebase-admin';
import nookies from 'nookies';

export default async (req, res) => {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const { token } = req.body;

    // Set session expiration to 4 hours.
    const expiresIn = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    // Create the session cookie from the temporary token.
    const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

    const options = {
      maxAge: expiresIn / 1000, // maxAge is in seconds
      httpOnly: true, // The cookie is not accessible via client-side script
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      path: '/',
    };

    // Set the cookie on the response
    nookies.set({ res }, 'session', sessionCookie, options);

    // Send a success response
    res.status(200).json({ status: 'success' });
  } catch (error) {
    // Handle any errors during cookie creation
    console.error('Session cookie creation error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};