// src/contexts/AuthProvider.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

axios.defaults.withCredentials = true;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/me');
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:3000/api/user/auth', {
      type: 'login',
      email,
      password,
    });
    setUser(res.data.user);

    // Check for pending booking data
    const pendingData = localStorage.getItem('pendingBookingData');
    if (pendingData) {
      localStorage.removeItem('pendingBookingData');
      // Extract product id from bookingData
      const bookingData = JSON.parse(pendingData);
      // Assume product has id field or extract from product string
      const productId = bookingData.productId || '1'; // fallback
      localStorage.setItem('restoreBookingData', pendingData);
      setTimeout(() => {
        window.location.href = `/product/${productId}?place=true`;
      }, 100);
    }
  };

  const register = async (name, email, password, role = 'user') => {
    const res = await axios.post('http://localhost:3000/api/user/auth', {
      type: 'register',
      name,
      email,
      password,
      role,
    });
    setUser(res.data.user);

    // Check for pending booking data
    const pendingData = localStorage.getItem('pendingBookingData');
    if (pendingData) {
      localStorage.removeItem('pendingBookingData');
      setTimeout(() => {
        window.location.href = '/checkout';
        sessionStorage.setItem('bookingData', pendingData);
      }, 100);
    }
  };

  const logout = async () => {
    await axios.post('http://localhost:3000/api/user/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
