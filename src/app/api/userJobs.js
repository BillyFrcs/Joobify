import { axiosInstance } from "@/utils/axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Send request to update user data in your external API
            const response = await axiosInstance.get('/jobs/displayUserJobs');

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Display user job error:', error.response.data);

            res.status(400).json({ error: 'Display user job failed' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}