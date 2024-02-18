import { axiosInstanceMultipart } from "@/utils/axios";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.prams;
      const { companyName, location, email, jobType, jobDescription, companyProfileImage } = req.body;

      // Send request to update user data in your external API
      const response = await axiosInstanceMultipart.put(`/jobs/updateUserJob/${id}`, {
        companyName, location, email, jobType, jobDescription, companyProfileImage
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Update error:', error.response.data);

      res.status(400).json({ error: 'Update failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}