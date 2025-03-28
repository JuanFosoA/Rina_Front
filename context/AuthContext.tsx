import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateToken } from "../server/auth.server";
import { ActivityIndicator, View } from "react-native";

// Añadí isLoading, isLoggingIn y la opción de isAuthenticated como null para
// mejorar la experiencia del usuario entre validacion del login y la verificación de si hay o no
// un token almacenado, por eso gestionamos ahora isAuthenticated como null.
interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  isLoggingIn: boolean;
  userToken: string | null;
  login_AuthContext: (token: string) => Promise<void>;
  logout: () => void;
  setUserToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const router = useRouter();
  
  // Los problemas al renderizar se solucionaron simplemente usando useEffect ya que no forzamos
  // el cambio de ruta o la carga de una ruta antes o durante la carga de otra con mayor prioridad
  // o en cola
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("@myToken");
      setUserToken(token);
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login_AuthContext = async (token: string) => {
    setIsLoggingIn(true);
    try {
      const isValid = await validateToken(token);
      if(isValid){
        await AsyncStorage.setItem('@myToken', token);
        setUserToken(token);
        setIsAuthenticated(true);
        router.replace('/');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@myToken');
    setUserToken(null);
    setIsAuthenticated(false);
    router.replace("/auth");
    setIsLoading(false);
  };

  // usé ActivityIndicator provicionalmente (nunca lo vamos a cambiar XD)
  // para que el usuario reciba feedback mientras todo se verifica
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      isLoggingIn, 
      userToken,
      login_AuthContext, 
      logout,
      setUserToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};