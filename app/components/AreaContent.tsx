import { LINE_URL } from "@/app/data/config";

interface AreaContentProps {
    areaName: string;
    categoryShortName: string;
    areaDescription?: string;
    keywords?: string[];
}

export default function AreaContent({ areaName, categoryShortName, areaDescription, keywords }: AreaContentProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">
                    {areaName}での{categoryShortName}買取について
                </h2>

                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                    <p className="mb-4">
                        {areaDescription || `${areaName}全域にて、${categoryShortName}の出張査定・買取を強化しております。`}
                    </p>

                    <p className="mb-6">
                        「地元のディーラーで下取り価格がつかなかった」「古いから廃車費用がかかると言われた」
                        そんなお悩みをお持ちの{areaName}のお客様は、ぜひ一度私たちにご相談ください。
                        海外への直接輸出ルートを持つ私たちなら、他社にはできない高額査定が可能です。
                    </p>

                    {keywords && keywords.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-lg mb-8">
                            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                                <span className="mr-2">💡</span>
                                {areaName}ならではの買取強化ポイント
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {keywords.map((kw, i) => (
                                    <span key={i} className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-blue-100">
                                        #{kw}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-blue-700/80">
                                特に、地域特有の需要がある上記のような車両は、プラス査定の対象となります。
                                サビや腐食があっても、部品取りや海外需要で価値がつきますので、諦めずにご連絡ください。
                            </p>
                        </div>
                    )}

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {areaName}の対象エリア
                        </h3>
                        <p className="mb-4">
                            {areaName}内であれば、ご自宅はもちろん、職場、農地、資材置き場など、
                            動かないお車がある場所まで無料で出張査定に伺います。
                        </p>
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg text-center">
                            <p className="font-bold text-orange-800 mb-2">
                                出張費・引取費用・手続き代行
                            </p>
                            <p className="text-2xl font-black text-orange-600">
                                すべて完全無料
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
