// app/_layout.tsx

import { Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import { AuthProvider } from '../context/AuthContext';
import { usePushNotifications } from '../hooks/usePushNotifications';

const DATABASE_NAME = 'tasks';

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

function App() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);

  const { error } = useMigrations(drizzleDb, migrations);
  const { expoPushToken, notification } = usePushNotifications();

  useEffect(() => {
    console.log('Token:', expoPushToken);
    console.log('Notificación:', notification);
  }, [expoPushToken, notification]);

  if (error) {
    console.error('Error corriendo migraciones', error);
  }

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(menu)" options={{ headerShown: false }} />
    </Stack>
  );
}