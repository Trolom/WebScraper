import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      api.get('/api/users/me/')
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    try {
      const response = await api.get('/api/users/me/');
      setUser(response.data);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error fetching user data after login', error);
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthenticated(false);
    setUser({});
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
