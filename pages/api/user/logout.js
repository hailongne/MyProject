import cookie from 'cookie';
import { setCorsHeaders } from '../_cors';

export default function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
    path: '/',
    sameSite: 'lax',
  }));

  return res.status(200).json({ message: 'Đã đăng xuất' });
}
