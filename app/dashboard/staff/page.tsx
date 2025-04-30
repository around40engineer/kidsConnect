'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type Attendance = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected';
  staffName: string;
};

const dummyAttendance: Attendance[] = [
  {
    id: '1',
    date: new Date(),
    startTime: '09:00',
    endTime: '18:00',
    status: 'pending',
    staffName: '山田太郎'
  },
  {
    id: '2',
    date: new Date(),
    startTime: '08:30',
    endTime: '17:30',
    status: 'approved',
    staffName: '佐藤花子'
  }
];

export default function StaffPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [attendance, setAttendance] = useState<Attendance[]>(dummyAttendance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement attendance submission
    alert('勤務時間を記録しました。承認をお待ちください。');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">勤務管理</h1>

      <Tabs defaultValue="record" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="record" className="flex-1">勤務記録</TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1">シフト管理</TabsTrigger>
        </TabsList>

        <TabsContent value="record">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">勤務時間登録</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>日付</Label>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP', { locale: ja }) : <span>日付を選択</span>}
                    </Button>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">開始時間</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">終了時間</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  勤務時間を記録
                </Button>
              </form>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">最近の勤務記録</h2>
              <div className="space-y-4">
                {attendance.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{record.staffName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(record.date, 'PPP', { locale: ja })}
                      </p>
                      <p className="text-sm">
                        {record.startTime} - {record.endTime}
                      </p>
                    </div>
                    <div>
                      {record.status === 'pending' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          承認待ち
                        </span>
                      ) : record.status === 'approved' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          承認済み
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          却下
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">翌月のシフト調整</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>希望シフト</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="time" placeholder="開始時間" />
                    <Input type="time" placeholder="終了時間" />
                  </div>
                </div>
                <Button className="w-full">
                  シフトを申請
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}