"use client";

import { LINE_URL } from "@/app/data/config";

interface PainPointsSectionProps {
    areaName: string;
    categoryShortName: string;
    painPoints: string[];
    features: string[];
}

export default function PainPointsSection({
    areaName,
    categoryShortName,
    painPoints,
    features,
}: PainPointsSectionProps) {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-orange-600 font-bold text-sm tracking-wider uppercase mb-3 bg-orange-50 px-4 py-1.5 rounded-full">
                        こんなお悩みありませんか？
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                        {areaName}で{categoryShortName}の
                        <br className="sm:hidden" />
                        <span className="text-red-600">処分</span>にお困りの方へ
                    </h2>
                </div>

                {/* Pain Points */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Problems */}
                    <div className="bg-white border-2 border-red-100 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">よくあるお悩み</h3>
                        </div>
                        <ul className="space-y-4">
                            {painPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        ✕
                                    </span>
                                    <span className="text-gray-700 leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold">すべて解決します！</h3>
                        </div>
                        <ul className="space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-green-400 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        ✓
                                    </span>
                                    <span className="text-white/95 leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Highlight Box */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 sm:p-12 text-center text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <p className="text-2xl sm:text-3xl font-black mb-4">
                            ディーラーで0円と言われた車も
                            <br />
                            <span className="text-yellow-200">全て買い取ります！</span>
                        </p>
                        <p className="text-white/90 mb-8 text-lg">
                            車検切れ・エンジン不動・事故車…どんな状態でもまずはご相談ください
                        </p>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-orange-600 font-bold text-lg rounded-xl px-10 py-4 hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl active:scale-95 transition-transform"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            LINEで今すぐ無料査定
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
