import Image from 'next/image';
import { MessageSquare, Image as ImageIcon, QrCode, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'ギャラリー機能',
    description: '保護者から送信された写真や動画、施設側が撮影した日常の様子をまとめて管理・共有できます。思い出をカンタンに残せます。',
    icon: <ImageIcon className="h-10 w-10 text-blue-500" />,
    image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
    alt: '子どもの写真を見る親子'
  },
  {
    title: 'LINE連携コミュニケーション',
    description: '欠席・遅刻の連絡や、行事のお知らせなど、日々のコミュニケーションがLINEで完結。既読確認もでき、確実に情報が届きます。',
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    image: 'https://images.pexels.com/photos/8460163/pexels-photo-8460163.jpeg',
    alt: 'スマホでメッセージを確認する女性'
  },
  {
    title: 'QRコードによる入退園管理',
    description: 'お迎え時の本人確認や、入退園の記録をQRコードでカンタンに。保護者のスマホに表示されるQRコードを施設のタブレットで読み取るだけ。',
    icon: <QrCode className="h-10 w-10 text-blue-500" />,
    image: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg',
    alt: 'QRコードを読み取る様子'
  },
  {
    title: '自動通知システム',
    description: '登園時間になっても来園していない場合や、お迎えが遅れている場合に自動でLINE通知。安全管理と保護者サポートを両立します。',
    icon: <Bell className="h-10 w-10 text-blue-500" />,
    image: 'https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg',
    alt: 'スマホの通知を確認する人'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            施設運営をもっとシンプルに、もっと安全に
          </h2>
          <p className="text-lg text-muted-foreground">
            保育現場の日々の業務をLINE連携によってスムーズに。保護者とのコミュニケーションから安全管理まで、すべてをカバーします。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700",
                "flex flex-col"
              )}
            >
              <div className="mb-6">
                <div className="inline-block p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="mt-auto rounded-lg overflow-hidden relative group">
                <Image 
                  src={feature.image} 
                  alt={feature.alt} 
                  width={500} 
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}