'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode, UserCheck, UserX } from 'lucide-react';

export default function AttendancePage() {
  const handleQRScan = () => {
    // QRコードスキャン機能は実際のカメラ統合時に実装
    alert('QRコードスキャン機能は準備中です');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto px-4 py-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">入退場管理</h2>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">カメラを起動してQRコードをスキャンしてください</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleQRScan}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              入場
            </Button>
            <Button
              onClick={handleQRScan}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <UserX className="h-4 w-4 mr-2" />
              退場
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}