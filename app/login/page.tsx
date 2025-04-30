'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            施設管理者ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            施設管理用Webアプリにログインします
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
}