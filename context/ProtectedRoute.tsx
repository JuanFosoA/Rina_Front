// components/ProtectedRoute.tsx
import { useContext, useEffect } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.replace('/auth');
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
}
