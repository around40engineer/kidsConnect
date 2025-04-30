'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, MapPin, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  facilityName: z.string().min(1, '施設名を入力してください'),
  facilityType: z.enum(['nursery', 'kindergarten', 'afterSchool', 'other'], {
    required_error: '施設種別を選択してください',
  }),
  capacity: z.string().min(1, '定員を入力してください'),
  representativeName: z.string().min(1, '代表者名を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().min(1, '電話番号を入力してください'),
  postalCode: z.string().min(1, '郵便番号を入力してください'),
  address: z.string().min(1, '住所を入力してください'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to save facility data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast({
        title: '登録完了',
        description: '施設情報の登録が完了しました。',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'エラー',
        description: '登録に失敗しました。もう一度お試しください。',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">施設登録</h1>
            <p className="text-muted-foreground">
              KidConnectをご利用いただく施設の情報を入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="facilityName" className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  施設名 <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="facilityName"
                  {...register('facilityName')}
                  placeholder="例: ひまわり保育園"
                />
                {errors.facilityName && (
                  <p className="text-sm text-red-500 mt-1">{errors.facilityName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center mb-2">
                    施設種別 <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <RadioGroup defaultValue="nursery" className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nursery" id="nursery" {...register('facilityType')} />
                      <Label htmlFor="nursery">保育園</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kindergarten" id="kindergarten" {...register('facilityType')} />
                      <Label htmlFor="kindergarten">幼稚園</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="afterSchool" id="afterSchool" {...register('facilityType')} />
                      <Label htmlFor="afterSchool">学童保育</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" {...register('facilityType')} />
                      <Label htmlFor="other">その他</Label>
                    </div>
                  </RadioGroup>
                  {errors.facilityType && (
                    <p className="text-sm text-red-500 mt-1">{errors.facilityType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="capacity" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    定員 <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    {...register('capacity')}
                    placeholder="例: 100"
                  />
                  {errors.capacity && (
                    <p className="text-sm text-red-500 mt-1">{errors.capacity.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="representativeName">
                  代表者名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="representativeName"
                  {...register('representativeName')}
                  placeholder="例: 山田太郎"
                />
                {errors.representativeName && (
                  <p className="text-sm text-red-500 mt-1">{errors.representativeName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    メールアドレス <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="例: info@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    電話番号 <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="例: 03-1234-5678"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="postalCode" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  郵便番号 <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="postalCode"
                  {...register('postalCode')}
                  placeholder="例: 123-4567"
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">
                  住所 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="例: 東京都千代田区丸の内1-1-1"
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">施設の特徴・PR</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="施設の特徴やPRポイントを自由に記入してください"
                  rows={4}
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登録中...
                  </>
                ) : (
                  '登録する'
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                登録後すぐにサービスをご利用いただけます
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}