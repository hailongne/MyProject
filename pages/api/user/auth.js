// backend/pages/api/user/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../../lib/users';

export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, name, email, password, role } = req.body;

  if (type === 'register') {
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hash, role: role || 'user' };
    users.push(newUser);
    return res.status(201).json({ message: 'Đăng ký thành công', user: { id: newUser.id, name, email, role: newUser.role } });
  }

  if (type === 'login') {
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'your_secret_key', { expiresIn: '1d' });
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=86400; SameSite=Strict`);
    return res.status(200).json({ message: 'Đăng nhập thành công', user: { id: user.id, name: user.name, email, role: user.role } });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
