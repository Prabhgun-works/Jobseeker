import React, { createContext, useContext, useState, useEffect } from 'react';
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      // Set user from localStorage immediately
      setUser(JSON.parse(storedUser));

      // Verify token with backend
      const response = await fetch('http://localhost:8080/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 401) {
        // Token is invalid or expired, clear everything silently
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } else {
        // Other errors - keep the user logged in with stored data
        console.warn('Auth check failed, using stored data:', response.status);
      }
    } catch (error) {
      // Network or other errors - keep the user logged in with stored data
      console.warn('Auth check failed, using stored data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 