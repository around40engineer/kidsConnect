'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LineSettingsPage() {
  const [channelId, setChannelId] = useState('');
  const [channelSecret, setChannelSecret] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [webhookUrl] = useState('https://api.kidconnect.jp/webhook/line');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">LINE公式アカウント連携設定</h1>

      <Tabs defaultValue="guide" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="guide" className="flex-1">設定ガイド</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">連携設定</TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">LINE公式アカウント連携の手順</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">LINE Developersに登録</h3>
                    <p className="text-muted-foreground mb-4">
                      LINE Developersにアクセスし、アカウントを作成してログインします。
                    </p>
                    <Button asChild variant="outline">
                      <Link href="https://developers.line.biz/console/" target="_blank">
                        LINE Developers <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">新規プロバイダーを作成</h3>
                    <p className="text-muted-foreground mb-4">
                      「新規プロバイダー作成」をクリックし、プロバイダー名を入力します。
                      プロバイダー名は施設名などを入力してください。
                    </p>
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        src="https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg"
                        alt="LINE Developersプロバイダー作成画面"
                        width={600}
                        height={300}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Messaging APIチャネルを作成</h3>
                    <p className="text-muted-foreground mb-4">
                      作成したプロバイダーの「チャネル作成」から「Messaging API」を選択し、
                      必要な情報を入力してチャネルを作成します。
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">チャネル作成時の注意点</p>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                          <li>チャネル名：施設名を入力</li>
                          <li>チャネル説明：サービスの説明を入力</li>
                          <li>大業種：教育</li>
                          <li>小業種：学校・教育機関</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">チャネルの設定</h3>
                    <p className="text-muted-foreground mb-4">
                      作成したチャネルの設定画面で以下の情報を確認し、KidConnectの設定画面に入力します：
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>チャネルID</li>
                      <li>チャネルシークレット</li>
                      <li>チャネルアクセストークン（発行が必要）</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Webhook設定</p>
                        <p className="text-sm mt-2">
                          Webhook URLに以下のURLを設定し、Webhook送信を有効化してください：
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded text-sm flex-1">
                            {webhookUrl}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(webhookUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">LINE公式アカウント連携設定</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="channelId">チャネルID</Label>
                <Input
                  id="channelId"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  placeholder="1234567890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channelSecret">チャネルシークレット</Label>
                <Input
                  id="channelSecret"
                  type="password"
                  value={channelSecret}
                  onChange={(e) => setChannelSecret(e.target.value)}
                  placeholder="●●●●●●●●●●●●●●●●"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessToken">チャネルアクセストークン</Label>
                <Input
                  id="accessToken"
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="●●●●●●●●●●●●●●●●"
                />
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                設定を保存
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}