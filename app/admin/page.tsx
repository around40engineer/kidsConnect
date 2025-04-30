'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Download, Eye, Mail } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// 仮のデータ型定義
type Inquiry = {
  id: string;
  date: string;
  facilityName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'pending' | 'contacted' | 'completed';
  message: string;
};

type Registration = {
  id: string;
  date: string;
  facilityName: string;
  facilityType: string;
  representativeName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
};

// 仮のデータ
const dummyInquiries: Inquiry[] = [
  {
    id: '1',
    date: '2025-04-01 10:30',
    facilityName: 'ひまわり保育園',
    contactName: '山田太郎',
    email: 'yamada@example.com',
    phone: '03-1234-5678',
    status: 'pending',
    message: 'サービスの詳細について知りたいです。',
  },
  {
    id: '2',
    date: '2025-04-01 11:45',
    facilityName: 'さくら幼稚園',
    contactName: '佐藤花子',
    email: 'sato@example.com',
    phone: '03-8765-4321',
    status: 'contacted',
    message: '料金プランについて質問があります。',
  },
];

const dummyRegistrations: Registration[] = [
  {
    id: '1',
    date: '2025-04-01',
    facilityName: 'ひまわり保育園',
    facilityType: '保育園',
    representativeName: '山田太郎',
    email: 'yamada@example.com',
    status: 'pending',
  },
  {
    id: '2',
    date: '2025-04-01',
    facilityName: 'さくら幼稚園',
    facilityType: '幼稚園',
    representativeName: '佐藤花子',
    email: 'sato@example.com',
    status: 'approved',
  },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInquiries = dummyInquiries.filter(inquiry =>
    inquiry.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistrations = dummyRegistrations.filter(registration =>
    registration.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    registration.representativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">総施設数</h3>
            <p className="text-3xl font-bold">156</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">今月の新規登録</h3>
            <p className="text-3xl font-bold text-green-600">+12</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">未対応の問い合わせ</h3>
            <p className="text-3xl font-bold text-orange-600">5</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">承認待ち登録</h3>
            <p className="text-3xl font-bold text-blue-600">3</p>
          </Card>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="inquiries" className="flex-1">問い合わせ管理</TabsTrigger>
            <TabsTrigger value="registrations" className="flex-1">登録申請管理</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="施設名・担当者名で検索"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="pending">未対応</SelectItem>
                      <SelectItem value="contacted">対応中</SelectItem>
                      <SelectItem value="completed">対応済み</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  CSVエクスポート
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日時</TableHead>
                      <TableHead>施設名</TableHead>
                      <TableHead>担当者名</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell>{inquiry.date}</TableCell>
                        <TableCell>{inquiry.facilityName}</TableCell>
                        <TableCell>{inquiry.contactName}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            inquiry.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : inquiry.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status === 'pending' ? '未対応'
                              : inquiry.status === 'contacted' ? '対応中'
                              : '対応済み'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            詳細
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            返信
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="registrations">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="施設名・代表者名で検索"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="pending">承認待ち</SelectItem>
                      <SelectItem value="approved">承認済み</SelectItem>
                      <SelectItem value="rejected">却下</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  CSVエクスポート
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>登録日</TableHead>
                      <TableHead>施設名</TableHead>
                      <TableHead>種別</TableHead>
                      <TableHead>代表者名</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell>{registration.date}</TableCell>
                        <TableCell>{registration.facilityName}</TableCell>
                        <TableCell>{registration.facilityType}</TableCell>
                        <TableCell>{registration.representativeName}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            registration.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : registration.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {registration.status === 'pending' ? '承認待ち'
                              : registration.status === 'approved' ? '承認済み'
                              : '却下'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            詳細
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}