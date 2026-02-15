import Image from "next/image";
import { LINE_URL } from "@/app/data/config";

export default function ProcessSection() {
    const steps = [
        {
            number: "01",
            title: "LINEで車の写真を送信",
            description: "友だち追加後、車の写真を数枚と車種・年式・走行距離をメッセージで送るだけ。面倒な書類は不要です。",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            number: "02",
            title: "概算査定額をご連絡",
            description: "写真と情報をもとに、最短30分で概算の買取金額をLINEでご案内いたします。もちろん無料です。",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            number: "03",
            title: "現場で実車確認＆現金化",
            description: "ご都合の良い日時にお伺いし、実車を確認。金額にご納得いただければ、その場で現金化または振込対応いたします。",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0aDR2NGgtNHpNMTYgMzRoNHY0aC00ek00NiA0NGg0djRoLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-orange-300 font-bold text-sm tracking-wider uppercase mb-3 bg-white/10 px-4 py-1.5 rounded-full">
                        Simple 3 Steps
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black mb-4">
                        カンタン<span className="text-orange-400">3ステップ</span>で完了
                    </h2>
                    <p className="text-blue-200/80 max-w-xl mx-auto">
                        面倒な手続きは一切不要。LINEだけで査定から買取まで完結します。
                    </p>
                </div>

                {/* Steps + Image Layout */}
                <div className="grid lg:grid-cols-5 gap-8 items-center">
                    {/* LINE mockup image */}
                    <div className="lg:col-span-2 flex justify-center order-2 lg:order-1">
                        <div className="relative w-64 sm:w-72">
                            <Image
                                src="/line-appraisal.png"
                                alt="LINEで簡単に査定依頼"
                                width={400}
                                height={400}
                                className="w-full h-auto rounded-3xl shadow-2xl shadow-black/30"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                                30秒で完了！
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group flex items-start gap-6">
                                    {/* Step number */}
                                    <div className="flex-shrink-0">
                                        <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-white font-black text-lg">{step.number}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-800/50 rounded-xl mb-2 text-blue-200">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-blue-200/80 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-14">
                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl px-10 py-5 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        まずはLINEで無料査定
                    </a>
                </div>
            </div>
        </section>
    );
}
