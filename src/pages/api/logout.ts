import type { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  // Clear the token cookie
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);

  // Return a success response
  res.status(200).json({ message: 'Logged out' });
}
