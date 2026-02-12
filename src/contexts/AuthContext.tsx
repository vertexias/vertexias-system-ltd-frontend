// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '@/utils/config';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminPath: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Get admin path from config
  const adminPath = config.admin.path;

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('admin_auth_token');
    const username = localStorage.getItem('admin_username');
    const expiration = localStorage.getItem('admin_auth_expiration');

    if (token && username && expiration) {
      const now = new Date().getTime();
      if (now < parseInt(expiration)) {
        setIsAuthenticated(true);
        setUser(username);
      } else {
        // Token expired
        logout();
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === config.admin.username && password === config.admin.password) {
      const authToken = btoa(`${username}:${Date.now()}`);
      localStorage.setItem('admin_auth_token', authToken);
      localStorage.setItem('admin_username', username);
      
      const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('admin_auth_expiration', expirationTime.toString());
      
      setIsAuthenticated(true);
      setUser(username);
      navigate(`/${adminPath}`); // Use dynamic admin path
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_auth_expiration');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      adminPath 
    }}>
      {children}
    </AuthContext.Provider>
  );
};