import jwt from 'jsonwebtoken';

export default async function verifyFirebaseToken(req, res) {
    // Verify the Firebase token sent with the request
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = await jwt.verify(idToken, process.env.API_KEY);

        req.user = decodedToken;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Firebase token' });
    }
}

export const verifyUserToken = (router) => {
    const token = getToken();

    if (token) {
        router.push('/');
    }
};

export const setToken = (token, expiryTime) => {
    const expirationTimestamp = new Date().getTime() + expiryTime * 1000;

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTimestamp', expirationTimestamp);
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    const expirationTimestamp = localStorage.getItem('expirationTimestamp');

    if (!token || !expirationTimestamp) {
        return null;
    }

    if (new Date().getTime() > expirationTimestamp) {
        // Token has expired, clear it
        clearToken();

        return null;
    }

    return token;
};

export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTimestamp');
};