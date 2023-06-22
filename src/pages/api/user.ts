import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import cookie from 'cookie';

import dbConnect from '../../helpers/dbConnect';
import User from '../../models/User';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await dbConnect();

  // Get the JWT from the auth cookie
  const { auth } = cookie.parse(req.headers.cookie || '');
  if (!auth) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  // Verify the JWT
  let payload;
  try {
    payload = jwt.verify(auth, process.env.JWT_SECRET!);
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  // Find the user
  const user = await User.findById(payload.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({ success: true, data: user });
});

export default handler;
