import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = queryClient.getQueryData<string>(['token']);
      console.log('token in useAuth =>', token);
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, [queryClient]);

  console.log('isAuthenticated =>', isAuthenticated);
  return { isAuthenticated };
};
