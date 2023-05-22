import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Here you should validate the user credentials. We're just checking if they're not empty.
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  // Generate the JWT
  const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

  // Set the JWT as a cookie
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`);

  // Return a success response
  res.status(200).json({ message: 'Login successful' });
}
