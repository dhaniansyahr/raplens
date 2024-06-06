import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";

interface AuthContextType {
  auth: { accessToken: string } | null;
  login: (data: { accessToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useLocalStorage<string>("rapplens", "");
  // const [userId, setUserId] = useLocalStorage<string | null>("hievent-uid", null);
  const router = useRouter();

  const login = (data: { accessToken: string }) => {
    setAccessToken(data.accessToken);
    // setUserId(data.sessionId)
    router.replace("/");
  };

  const logout = () => {
    setAccessToken("");
    // setUserId("");
    router.replace("/auth");
  };

  const auth = accessToken ? { accessToken } : null;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
