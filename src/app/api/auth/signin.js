import { axiosInstance } from "@/utils/axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            
            // Send request to authentication service
            const response = await axiosInstance.post('auth/signin', {
                email,
                password
            });

            const { token } = response.data.data.user.stsTokenManager.accessToken;

            // Set token in a secure cookie
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict`);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Sign in error: ', error.response.data.error);

            res.status(400).json({ error: 'Sign in failed' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}