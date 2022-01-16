import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api, createSession } from '../services/api';

export const AuthContext = createContext({});

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if(user && token) {
      setUser(JSON.parse(user));
      api.defaults.headers.Authorization = `Barer ${token}`;
    }
    setLoading(false)
  }, []);

  const login = async (email, password) => {
    const { data } = await createSession(email, password);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    api.defaults.headers.Authorization = `Barer ${data.token}`;
    setUser(data.user);

    navigate('/');
  }
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{  authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}