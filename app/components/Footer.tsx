import { SITE_INFO, LINE_URL } from "@/app/data/config";

interface FooterProps {
    areaName: string;
    categoryShortName: string;
}

export default function Footer({ areaName, categoryShortName }: FooterProps) {
    return (
        <footer className="bg-gray-900 text-white pb-28 md:pb-8">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-orange-400">{SITE_INFO.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            北海道札幌近郊を中心に、{categoryShortName}の出張買取を行っております。
                            海外輸出直販の強みを活かし、どこよりも高価な買取を目指しています。
                        </p>
                    </div>

                    {/* Service Areas */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-300">対応エリア</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            札幌市・江別市・北広島市・小樽市・千歳市・石狩市・恵庭市・岩見沢市
                            <br />
                            <span className="text-orange-300">※上記以外のエリアもご相談ください</span>
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-green-300">お問い合わせ</h3>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm mb-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            LINE公式アカウント
                        </a>
                        <p className="text-gray-500 text-xs mt-2">24時間受付・年中無休</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} {SITE_INFO.name} All rights reserved.
                        </p>
                        <a href="/about" className="text-[10px] text-gray-500 opacity-20 hover:opacity-100 hover:text-green-500 transition-all duration-700 font-mono tracking-widest select-none cursor-pointer">
                            [OPERATOR_DATA]
                        </a>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">
                        {areaName} {categoryShortName}買取専門ページ
                    </p>
                </div>
            </div>
        </footer>
    );
}
