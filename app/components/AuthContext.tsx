"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
      _id: string;
      name: string;
      email: string;
      avatar?: string;
      role: 'user' | 'admin' | 'student';
}

interface AuthContextType {
      user: User | null;
      loading: boolean;
      login: (token: string) => Promise<void>;
      logout: () => void;
      checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);
      const router = useRouter();

      const checkAuth = async () => {
            try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                        setLoading(false);
                        return;
                  }

                  const response = await fetch("/api/auth/profile", {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });

                  if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                  } else {
                        localStorage.removeItem("token");
                        setUser(null);
                  }
            } catch (error) {
                  console.error("Auth check failed:", error);
                  localStorage.removeItem("token");
                  setUser(null);
            } finally {
                  setLoading(false);
            }
      };

      const login = async (token: string) => {
            localStorage.setItem("token", token);
            await checkAuth();
      };

      const logout = () => {
            localStorage.removeItem("token");
            setUser(null);
            router.push("/");
      };

      useEffect(() => {
            checkAuth();
      }, []);

      return (
            <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
                  {children}
            </AuthContext.Provider>
      );
}

export function useAuth() {
      const context = useContext(AuthContext);
      if (context === undefined) {
            throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}

// Route protection hook
export function useAuthGuard(allowedRoles?: string[]) {
      const { user, loading } = useAuth();
      const router = useRouter();
      const pathname = usePathname();

      useEffect(() => {
            if (!loading) {
                  if (!user) {
                        // Don't redirect if already on login page
                        if (pathname === '/student-login' || pathname === '/auth/login') {
                              return;
                        }
                        // Redirect to student login if not authenticated
                        router.push(`/student-login?redirect=${encodeURIComponent(pathname)}`);
                        return;
                  }

                  if (allowedRoles && !allowedRoles.includes(user.role)) {
                        // Redirect if user doesn't have required role
                        router.push("/");
                        return;
                  }
            }
      }, [user, loading, router, pathname, allowedRoles]);

      return { user, loading, isAuthorized: !loading && user && (!allowedRoles || allowedRoles.includes(user.role)) };
}
