import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('authToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};