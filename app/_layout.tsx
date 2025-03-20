import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../context/ProtectedRoute';

const HomeLayout = () => {
  
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default HomeLayout;
