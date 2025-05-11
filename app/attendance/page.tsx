'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {QrCode, UserCheck, UserX} from 'lucide-react';
import QrCodeScanner from '@/components/QrCodeScanner';

export default function AttendancePage() {
    const handleQRScan = () => {
        // QRコードスキャン機能は実際のカメラ統合時に実装
        alert('QRコードスキャン機能は準備中です');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Card className="p-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">入退場管理</h2>
                    <div className="flex justify-center items-center w-full mb-8">
                        <div className="text-center w-full">
                            <QrCodeScanner/>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <Button
                            onClick={handleQRScan}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-lg py-6"
                        >
                            <UserCheck className="h-6 w-6 mr-2"/>
                            入場
                        </Button>
                        <Button
                            onClick={handleQRScan}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-lg py-6"
                        >
                            <UserX className="h-6 w-6 mr-2"/>
                            退場
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}