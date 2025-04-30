'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CTA() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    facilityName: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  return (
    <section id="contact" className="py-20 bg-blue-50 dark:bg-blue-900/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <h2 className="text-3xl font-bold mb-6">無料で始める</h2>
              <p className="mb-6">
                KidConnectを導入して、保育施設の運営をより効率的に。初年度は無料でご利用いただけます。
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                  <p>初年度無料でお試しいただけます</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                  <p>導入サポート付きで安心</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                  <p>オンライン説明会も実施中</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                  <p>LINEミニアプリのデモも可能</p>
                </div>
              </div>
              
              <div className="text-sm opacity-80">
                <p>※ お問い合わせいただいた内容に関しては、担当者より2営業日以内にご連絡いたします。</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <Button
                onClick={() => router.push('/register')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4"
              >
                今すぐ無料で始める
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mb-8">
                または、以下のフォームからお問い合わせください
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formState.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facilityName">施設名 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="facilityName" 
                      name="facilityName" 
                      value={formState.facilityName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formState.phone} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">お問い合わせ内容</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formState.message} 
                    onChange={handleChange} 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <SendIcon className="mr-2 h-4 w-4" /> 送信する
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  送信いただいた情報は、お問い合わせへの回答以外には使用いたしません。
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}