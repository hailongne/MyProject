import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

axios.defaults.withCredentials = true;
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/me');
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:3000/api/user/auth', { type: 'login', email, password });
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await axios.post('http://localhost:3000/api/user/auth', { type: 'register', name, email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('http://localhost:3000/api/user/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
