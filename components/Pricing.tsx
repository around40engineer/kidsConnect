import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Pricing() {
  const tiers = [
    {
      name: '初年度プラン',
      price: '0',
      description: '1年間無料でお試しいただけます',
      features: [
        'LINE ミニアプリ提供',
        'ギャラリー機能',
        'LINE 公式アカウント連携',
        'QRコードによる入退園管理',
        '自動通知機能',
        'メール・チャットサポート',
        'データバックアップ',
      ],
      cta: '無料で始める',
      popular: true
    },
    {
      name: '2年目以降継続プラン',
      price: '3,000',
      description: '充実した機能を継続的にご利用いただけます',
      features: [
        'LINE ミニアプリ提供',
        'ギャラリー機能',
        'LINE 公式アカウント連携',
        'QRコードによる入退園管理',
        '自動通知機能',
        'メール・チャットサポート',
        'データバックアップ',
        'API連携',
        '優先サポート',
      ],
      cta: '無料で始める',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            シンプルな料金プラン
          </h2>
          <p className="text-lg text-muted-foreground">
            小規模施設でも導入しやすい価格設定。初年度は無料でお試しいただけます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border ${
                tier.popular 
                  ? 'border-blue-500 shadow-lg relative' 
                  : 'border-gray-200 dark:border-gray-700 shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  おすすめ
                </div>
              )}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-blue-500' : ''}`}>
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">¥{tier.price}</span>
                  <span className="text-muted-foreground">/月</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild
                  className={`w-full ${
                    tier.popular 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : ''
                  }`}
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  <Link href="#contact">{tier.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            ご不明な点はお気軽にお問い合わせください。お客様に最適なプランをご提案いたします。
          </p>
          <Button asChild variant="outline" className="mx-auto">
            <Link href="#contact">お問い合わせ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}