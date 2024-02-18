import { axiosInstance } from "@/utils/axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            // Send request to authentication service for signup
            const response = await axiosInstance.post('/auth/signup', {
                name,
                email,
                password,
            });

            const { token } = response.data.accessToken;

            console.log('Sign up successful with token: ', token);

            // If signup is successful, return success message
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Sign up error:', error.response.data.error);

            res.status(400).json({ error: 'Sign up failed' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
