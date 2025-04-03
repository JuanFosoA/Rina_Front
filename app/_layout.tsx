import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../context/ProtectedRoute';

import { usePushNotifications } from '../hooks/usePushNotifications'; 
import { useEffect } from 'react';

const HomeLayout = () => {
  
  const { expoPushToken, notification } = usePushNotifications()

  useEffect(() => {
    console.log("expoPushToken", expoPushToken);
    console.log("notification", notification);
    
    
  })

  return (
    // RESCATAR TOKEN - NO CAMBIA GUARDEMOSLO
    // HACER REVISION DE SUBSCRIPTION 
    // BUSCAR EL SDK PARA EXPO NOTIFICATIONS
    <AuthProvider>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default HomeLayout;
