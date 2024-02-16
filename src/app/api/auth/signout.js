export default async function handler(req, res) {
    // Clear any session data or tokens on the server-side
    // For example, destroy the session or revoke the token

    // Respond with a success message or redirect to the login page
    res.status(200).json({ message: 'Sign out successful' });
}