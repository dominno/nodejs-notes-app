'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  // Only render after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render navigation on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <Link href="/" className="text-xl font-bold">
        Secure Notes
      </Link>
      
      <div className="flex gap-4">
        {user ? (
          <>
            <Link href="/notes" className="text-gray-600 hover:text-gray-900">
              My Notes
            </Link>
            <button
              onClick={() => logout()}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-gray-900">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
} 