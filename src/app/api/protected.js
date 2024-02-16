import { verifyFirebaseToken } from "@/middleware/auth";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const token = req.cookies.token;

            // Validate token
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Proceed with protected operation
            res.status(200).json({ message: 'Protected resource' });
        } catch (error) {
            console.error('Error:', error);

            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

handler.use(verifyFirebaseToken);