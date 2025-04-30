import { CheckCircle } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      title: '新規アプリ不要',
      description: 'LINEアプリを使うので、新たにアプリをインストールする必要がありません。保護者の負担を減らし、スムーズに導入できます。'
    },
    {
      title: '高い開封率',
      description: 'LINEメッセージは一般的なメールよりも開封率が高く、重要なお知らせを確実に届けることができます。'
    },
    {
      title: 'ITリテラシーが低くても安心',
      description: '多くの方が日常的に使っているLINEを活用するため、ITが苦手な方でも使いやすい設計になっています。'
    },
    {
      title: '初期導入コスト削減',
      description: '既存のタブレット・スマホ・PCを活用できるため、新たな設備投資が不要です。経済的な負担を抑えて導入できます。'
    },
    {
      title: '小規模施設に最適',
      description: '月額2000〜3000円の手頃な利用料金で、小規模施設でも導入しやすい価格設定です。'
    },
    {
      title: '初年度無料プラン',
      description: '初年度は無料でお試しいただけます。サービスの良さを実感してから継続利用を検討いただけます。'
    }
  ];

  return (
    <section id="benefits" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            なぜ<span className="text-blue-500">KidConnect</span>なのか
          </h2>
          <p className="text-lg text-muted-foreground">
            他のサービスとは一線を画す、KidConnectならではのメリットをご紹介します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1 mr-3" />
                <h3 className="text-xl font-bold">{benefit.title}</h3>
              </div>
              <p className="text-muted-foreground pl-9">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}