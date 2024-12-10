import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { AxiosError } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  birthdate: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  //Traigo al usuario desde el back con su token
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axiosInstance.get("/users/user-info");
        setUser(res.data.user);
      } catch (error) {
        if (error instanceof AxiosError) {
          localStorage.removeItem("token");
        }
      }
    };

    if (localStorage.getItem("token") && !user) {
      getUserData();
    }
    console.log(user)
  }, [user]);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
