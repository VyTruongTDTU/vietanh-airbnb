"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../../backend/utils/axiosInstance";


// 1. Định nghĩa kiểu dữ liệu cho user (bạn chỉnh sửa nếu backend trả khác)
export interface User {
      _id: string;
      name: string;
      email: string;
      avatar?: string;
      role?: string;
      token?: string; // token chỉ lưu tạm sau login
}

// 2. Kiểu dữ liệu của context
interface UserContextType {
      user: User | null;
      loading: boolean;
      updateUser: (userData: User) => void;
      clearUser: () => void;
}

// 3. Tạo context mặc định là undefined
export const UserContext = createContext<UserContextType>({
      user: null,
      loading: true,
      updateUser: () => { },
      clearUser: () => { },
});

// 4. Props cho provider
interface UserProviderProps {
      children: ReactNode;
}

// 5. Component provider
const UserProvider = ({ children }: UserProviderProps) => {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (user) return;

            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                  setLoading(false);
                  return;
            }

            const fetchUser = async () => {
                  try {
                        const response = await axiosInstance.get("http://localhost:3000/api/auth/profile");
                        setUser(response.data);
                  } catch (error) {
                        console.error("User not authenticated", error);
                        clearUser();
                  } finally {
                        setLoading(false);
                  }
            };

            fetchUser();
      }, []);

      const updateUser = (userData: User) => {
            setUser(userData);
            if (userData.token) {
                  localStorage.setItem("token", userData.token);
            }
            setLoading(false);
      };

      const clearUser = () => {
            setUser(null);
            localStorage.removeItem("token");
      };

      return (
            <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
                  {children}
            </UserContext.Provider>
      );
};

export default UserProvider;
