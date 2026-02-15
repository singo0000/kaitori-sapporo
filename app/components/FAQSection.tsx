import { LINE_URL, SITE_INFO } from "@/app/data/config";

interface FAQSectionProps {
    areaName: string;
    categoryShortName: string;
}

export default function FAQSection({ areaName, categoryShortName }: FAQSectionProps) {
    const faqs = [
        {
            question: `本当に0円で引き取ってもらえますか？`,
            answer: `はい、引取り費用・レッカー費用は完全無料です。${areaName}エリアなら出張費もかかりません。さらに廃車の場合は手続き代行も無料で承ります。`,
        },
        {
            question: `車検が切れている${categoryShortName}でも買取できますか？`,
            answer: `もちろん可能です。車検切れ、ナンバーなし、自走不可の状態でも問題ありません。積載車でお迎えに伺います。`,
        },
        {
            question: "査定だけでもいいですか？",
            answer: `もちろんです。LINEで写真を送っていただくだけで概算査定額をお伝えします。査定は完全無料で、売却の義務はございません。お気軽にご利用ください。`,
        },
        {
            question: "どのくらいで現金化できますか？",
            answer: `最短で当日現金化が可能です。LINEで事前査定した後、ご都合の良い日時にお伺いし、その場で現金をお渡しするか、翌営業日に銀行振込いたします。`,
        },
        {
            question: "買取に必要な書類はありますか？",
            answer: "車検証、自賠責保険証、身分証明書をご準備ください。紛失している場合でも、再発行のサポートをいたしますのでご安心ください。",
        },
        {
            question: `なぜ他社より高く買い取れるのですか？`,
            answer: `${SITE_INFO.name}は海外への直接輸出ルートを持っているため、オークション手数料や中間マージンが発生しません。その分をお客様への買取額に還元しています。`,
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-blue-600 font-bold text-sm tracking-wider uppercase mb-3 bg-blue-50 px-4 py-1.5 rounded-full">
                        FAQ
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                        よくあるご質問
                    </h2>
                    <p className="text-gray-500">
                        {areaName}での{categoryShortName}買取に関するよくあるご質問にお答えします。
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-lg flex items-center justify-center">
                                        Q
                                    </span>
                                    <span className="font-bold text-gray-900 text-left">
                                        {faq.question}
                                    </span>
                                </div>
                                <svg
                                    className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-5 pt-0">
                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded-lg flex items-center justify-center mt-0.5">
                                        A
                                    </span>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 mb-4">
                        その他のご質問もお気軽にどうぞ
                    </p>
                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-xl px-8 py-4 transition-colors shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        LINEで質問する
                    </a>
                </div>
            </div>
        </section>
    );
}
