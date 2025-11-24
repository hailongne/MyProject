// backend/pages/api/user/me.js
import jwt from 'jsonwebtoken';
import { users } from '../../lib/users';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'Token không hợp lệ' });

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
}
