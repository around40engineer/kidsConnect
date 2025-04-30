import Image from 'next/image';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "保護者とのコミュニケーションが格段に良くなりました。写真共有も簡単で、保護者からの評判も上々です。QRコード入退室管理で安全面も向上しました。",
      name: "田中 美咲",
      role: "保育園 園長",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      quote: "私のような高齢の職員でも簡単に使えます。LINEは普段から使っているので、特別な操作を覚える必要がなく助かっています。導入コストが低いのも魅力でした。",
      name: "佐藤 健太",
      role: "幼稚園 事務担当",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      quote: "初年度無料で試せたのが決め手でした。小規模な施設でIT投資に不安がありましたが、効果は絶大で2年目以降も継続利用しています。サポートも手厚く安心です。",
      name: "山田 優子",
      role: "小規模保育施設 代表",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            導入施設からの声
          </h2>
          <p className="text-lg text-muted-foreground">
            KidConnectを実際に導入いただいた施設からのお声をご紹介します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  width={48} 
                  height={48}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}