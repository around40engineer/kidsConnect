'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: "導入にはどのくらいの時間がかかりますか？",
      answer: "基本的な設定は1〜2日で完了します。LINE公式アカウントの作成から連携設定、保護者への案内までをサポートいたしますので、スムーズに導入いただけます。"
    },
    {
      question: "必要な機材はありますか？",
      answer: "入退園管理用にタブレットやスマートフォン、PCなどカメラ機能のあるデバイスが1台必要です。既存のものをご利用いただけますので、新たに購入する必要はありません。"
    },
    {
      question: "保護者全員がLINEを使えない場合はどうすればよいですか？",
      answer: "LINEを利用されない保護者様向けには、代替の紙ベースでの対応も可能です。ただし、大半の機能はLINEを通じて提供されますので、可能な限りLINEの利用をお勧めしています。"
    },
    {
      question: "データのバックアップはどうなっていますか？",
      answer: "すべてのデータは定期的に自動バックアップされます。写真や動画などの大切な思い出も安全に保管されますのでご安心ください。"
    },
    {
      question: "複数の施設で利用することはできますか？",
      answer: "はい、可能です。グループ運営の園や複数施設をお持ちの法人様向けに、まとめてご契約いただける法人プランもご用意しております。詳細はお問い合わせください。"
    },
    {
      question: "契約期間の縛りはありますか？",
      answer: "最低契約期間はございません。月単位でのご利用が可能です。初年度無料プランをご利用の場合も、継続利用の義務はございません。"
    },
    {
      question: "個人情報の扱いは安全ですか？",
      answer: "すべてのデータは暗号化され、適切なセキュリティ対策を施しています。個人情報保護法に準拠した運用を行っており、お預かりした情報は厳重に管理しています。"
    },
    {
      question: "サポート体制はどうなっていますか？",
      answer: "メールとチャットによるサポートを平日9:00〜18:00で提供しています。プレミアムプランでは専任のサポート担当者がつき、より手厚いサポートを受けることができます。"
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            よくあるご質問
          </h2>
          <p className="text-lg text-muted-foreground">
            KidConnectについてよくいただくご質問にお答えします。
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            ここに記載されていない質問がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </section>
  );
}