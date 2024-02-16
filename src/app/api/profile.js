import { axiosInstance } from "@/utils/axios";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { name, headline, location, userProfileImage, phoneNumber, about } = req.body;

      // Send request to update user data in your external API
      const response = await axiosInstance.put('/users/updateUserAccountProfile', {
        name, headline, location, userProfileImage, phoneNumber, about
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