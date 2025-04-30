'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Search, Clock, UserPlus, MessageSquare, Calendar } from 'lucide-react';

type AttendanceRecord = {
  id: string;
  childName: string;
  parentName: string;
  type: 'in' | 'out';
  timestamp: string;
};

const dummyRecords: AttendanceRecord[] = [
  {
    id: '1',
    childName: '山田太郎',
    parentName: '山田花子',
    type: 'in',
    timestamp: '2025-04-01 08:30'
  },
  {
    id: '2',
    childName: '佐藤めぐみ',
    parentName: '佐藤優子',
    type: 'in',
    timestamp: '2025-04-01 08:45'
  },
  {
    id: '3',
    childName: '田中さくら',
    parentName: '田中美咲',
    type: 'out',
    timestamp: '2025-04-01 16:30'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState<AttendanceRecord[]>(dummyRecords);

  const filteredRecords = records.filter(record => 
    record.childName.includes(searchTerm) || 
    record.parentName.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">施設管理ダッシュボード</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/dashboard/settings/line')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              LINE連携設定
            </Button>
            <Button
              onClick={() => router.push('/dashboard/staff')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              勤務管理
            </Button>
            <Button
              onClick={() => router.push('/register-children')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              児童登録
            </Button>
            <Button
              onClick={() => router.push('/attendance')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              入退場管理
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">現在の在園児</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">15名</p>
          </Card>
          
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">本日の総入場数</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">20名</p>
          </Card>
          
          <Card className="p-6 bg-purple-50 dark:bg-purple-900/20">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">未到着</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5名</p>
          </Card>
          
          <Card className="p-6 bg-orange-50 dark:bg-orange-900/20">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">遅刻</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">2名</p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">入退場記録</h2>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="名前で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4">時刻</th>
                  <th className="text-left py-3 px-4">園児名</th>
                  <th className="text-left py-3 px-4">保護者名</th>
                  <th className="text-left py-3 px-4">種別</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {record.timestamp}
                      </div>
                    </td>
                    <td className="py-3 px-4">{record.childName}</td>
                    <td className="py-3 px-4">{record.parentName}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.type === 'in' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {record.type === 'in' ? '入場' : '退場'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}