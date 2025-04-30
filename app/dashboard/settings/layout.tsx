'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Settings, MessageSquare, Bell, Shield, Users } from 'lucide-react';

const sidebarItems = [
  {
    title: 'LINE連携',
    href: '/dashboard/settings/line',
    icon: MessageSquare,
  },
  {
    title: '通知設定',
    href: '/dashboard/settings/notifications',
    icon: Bell,
  },
  {
    title: 'セキュリティ',
    href: '/dashboard/settings/security',
    icon: Shield,
  },
  {
    title: 'スタッフ管理',
    href: '/dashboard/settings/staff',
    icon: Users,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">設定</h1>
        </div>

        <div className="grid md:grid-cols-[240px,1fr] gap-8">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}