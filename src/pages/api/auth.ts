import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the token from the cookies
    const token = req.cookies.token;

    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // If everything is okay, return a success response
    res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    // If the token is invalid or not present, return an error response
    res.status(401).json({ error: 'Not authenticated' });
  }
}
