'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Trash2, Save } from 'lucide-react';

type Student = {
  id: string;
  grade: string;
  className: string;
  name: string;
};

export default function RegisterChildrenPage() {
  const [bulkInput, setBulkInput] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [grade, setGrade] = useState('');
  const [className, setClassName] = useState('');

  const handleBulkImport = () => {
    const lines = bulkInput.split('\n').filter(line => line.trim());
    const newStudents = lines.map((line, index) => ({
      id: `${Date.now()}-${index}`,
      grade,
      className,
      name: line.trim()
    }));
    setStudents([...students, ...newStudents]);
    setBulkInput('');
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving students:', students);
    alert('保存しました');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">児童登録</h1>
        
        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">学年</Label>
                  <Input
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="例: 年少"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="className">クラス名</Label>
                  <Input
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="例: ひまわり組"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bulkInput">
                  児童名一括入力
                  <span className="text-sm text-muted-foreground ml-2">
                    (1行に1名ずつ入力してください)
                  </span>
                </Label>
                <Textarea
                  id="bulkInput"
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="山田太郎&#13;&#10;佐藤花子&#13;&#10;鈴木一郎"
                  rows={5}
                />
              </div>

              <Button
                onClick={handleBulkImport}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                一括登録
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">登録済み児童一覧</h2>
            {students.length > 0 ? (
              <>
                <div className="overflow-x-auto mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>学年</TableHead>
                        <TableHead>クラス</TableHead>
                        <TableHead>名前</TableHead>
                        <TableHead className="w-[100px]">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.className}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveStudent(student.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  保存する
                </Button>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                児童が登録されていません
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}