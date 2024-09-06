type Auth = {
  role: string | null;
};

import { useEffect, useState } from 'react';

export const useAuth = (): Auth => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const auth = localStorage.getItem('role') ||"user";
      console.log(auth)
      if (auth) {
        setRole(auth);
      } else {
        setRole(null);
      }
    };

    handleStorageChange();

    // window.location.reload()

    // window.addEventListener('storage', handleStorageChange);

    // return () => window.removeEventListener('storage', handleStorageChange);

  }, []);

  return { role };
};