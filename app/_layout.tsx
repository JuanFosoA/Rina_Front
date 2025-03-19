import { router, Stack, useRouter } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken } from '../server/auth.server';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  

  useEffect(() => {
    validateTokenLayout()
    if (!user) {
      router.replace('/auth');
    }
  }, [router, user]);

  return user ? children : null;
};
  const validateTokenLayout = async () => {
      const infoUser = await AsyncStorage.getItem('@auth_token')
      const infoUserObj = JSON.parse(infoUser || '{}')
      const validacion = validateToken(infoUser)
      if (infoUser && Object.entries(infoUserObj).length && await validacion) {
        router.replace('/')
      }
    }
    
const HomeLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <ProtectedRoute>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </ProtectedRoute>
      </Stack>
    </AuthProvider>
  );
};

export default HomeLayout;
