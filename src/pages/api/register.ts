// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // TODO: Implement user registration logic here
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Replace with your own JWT Secret
    const token = jwt.sign({ username, hashedPassword }, 'your-secret-key');

    return res.status(200).json({ token , message:"Logged in"});
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
