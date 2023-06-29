import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import dbConnect from '../../helpers/dbConnect';
import User from '../../models/User';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  await dbConnect();

  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists'});
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

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
