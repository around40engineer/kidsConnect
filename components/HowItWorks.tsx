import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: '登録・設定',
      description: '簡単な登録フォームからサービスに登録。LINE公式アカウントとの連携設定を行います。導入サポートもご用意しています。',
      image: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg',
      alt: '登録フォームに入力する様子'
    },
    {
      number: 2,
      title: '保護者の招待',
      description: '施設のLINE公式アカウントを保護者にともだち追加してもらい、KidConnectの利用を開始します。',
      image: 'https://images.pexels.com/photos/5053847/pexels-photo-5053847.jpeg',
      alt: 'スマホでQRコードを読み取る様子'
    },
    {
      number: 3,
      title: 'QRコード発行',
      description: '各児童ごとにユニークなQRコードが発行され、保護者のLINEアプリ上で確認できるようになります。',
      image: 'https://images.pexels.com/photos/9989993/pexels-photo-9989993.jpeg',
      alt: 'スマホにQRコードが表示されている'
    },
    {
      number: 4,
      title: '入退園の管理',
      description: '登園・降園時にQRコードをタブレットで読み取るだけで記録完了。自動的に時間が記録され、必要に応じて保護者にも通知されます。',
      image: 'https://images.pexels.com/photos/14757553/pexels-photo-14757553.jpeg',
      alt: 'タブレットでQRコードを読み取る様子'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            導入から活用までの流れ
          </h2>
          <p className="text-lg text-muted-foreground">
            KidConnectは簡単4ステップで導入できます。わずか数分で運用開始できる手軽さが特徴です。
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 dark:bg-blue-900/30 -translate-x-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 mb-20 last:mb-0">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                <div className="md:w-1/2 relative">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 blur-xl opacity-70 -z-10"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <Image 
                      src={step.image} 
                      alt={step.alt} 
                      width={600} 
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="flex justify-center md:justify-start mt-4">
                      <ArrowRight className="h-6 w-6 text-blue-500 animate-pulse md:hidden" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}