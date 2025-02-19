'use client';

import { createContext, useCallback, useState, useEffect } from 'react';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<{
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user } = await authApi.login({ email, password });
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/notes');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [router]);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    try {
      const { user } = await authApi.register({ email, password, name });
      setUser(user);
      router.push('/notes');
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      setUser(null);
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
} 