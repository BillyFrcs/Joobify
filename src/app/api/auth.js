// pages/api/firebase-auth.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    // Verify the Firebase token sent with the request
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = await jwt.verify(idToken, process.env.FIREBASE_PUBLIC_KEY);

        req.user = decodedToken;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Firebase token' });
    }
}
