import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="font-mochiy text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">保育施設の運営を</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                LINE一つでカンタンに
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              保育園・幼稚園向けのLINE連携サービス。写真共有、保護者とのコミュニケーション、入退園管理を全て一つのサービスで。新たなアプリのインストール不要で、スムーズな導入が可能です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Link href="/register">
                  無料で始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">
                  詳しく見る
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
              <Image 
                src="https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg" 
                alt="保育園の子どもたち" 
                width={600} 
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-100 dark:bg-cyan-900/30 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}