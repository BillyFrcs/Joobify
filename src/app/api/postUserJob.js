import { axiosInstanceMultipart } from "@/utils/axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { id } = req.prams;
            const { title, companyName, location, email, jobType, jobDescription, companyProfileImage } = req.body;

            // Send request to update user data in your external API
            const response = await axiosInstanceMultipart.put(`/jobs/postJob`, {
                title, companyName, location, email, jobType, jobDescription, companyProfileImage
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Post job error:', error.response.data);

            res.status(400).json({ error: 'Post job failed' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}