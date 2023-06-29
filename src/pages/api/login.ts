import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import cookie from 'cookie';

import dbConnect from '../../helpers/withAuth';
import User from '../../models/User';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  await dbConnect();

  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

  // Send the JWT in a cookie
  res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3600,
    path: '/',
  }));

  res.status(200).json({ success: true, data: user });
});

export default handler;
