import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}
