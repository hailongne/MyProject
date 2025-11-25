import { users } from '../../lib/users';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { setCorsHeaders } from '../_cors';

export default function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token;
    if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

    const decoded = jwt.verify(token, 'your_secret_key');
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'Người dùng không tồn tại' });

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc lỗi server' });
  }
}
