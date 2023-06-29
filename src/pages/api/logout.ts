import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import cookie from 'cookie';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post((_, res) => {
  // Clear the auth cookie
  res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  }));

  res.status(200).json({ success: true });
});

export default handler;
