import Image from "next/image";
import { SITE_INFO } from "@/app/data/config";

export default function TrustSection() {
    const trustItems = [
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: `創業${SITE_INFO.established}の輸出実績`,
            description: "長年の経験と実績で適正な買取価格をご提示。業界知識を活かして、お客様の車両の価値を最大限に評価します。",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "世界30カ国以上の海外販路",
            description: "アフリカ・東南アジア・中東など独自の海外販路を確保。国内では値段がつかない車でも海外需要で高値買取を実現します。",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "中間マージンカット",
            description: "オークションを通さない直接輸出だから、中間マージンを大幅にカット。その分をお客様への買取額に還元しています。",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Image + Intro Row */}
                <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/50">
                        <Image
                            src="/trust-appraiser.png"
                            alt="経験豊富なスタッフが丁寧に査定"
                            width={600}
                            height={600}
                            className="w-full h-auto object-cover"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-6">
                            <p className="text-white font-bold text-lg">
                                経験豊富なスタッフが丁寧に査定
                            </p>
                        </div>
                    </div>
                    <div>
                        <span className="inline-block text-blue-600 font-bold text-sm tracking-wider uppercase mb-3 bg-blue-50 px-4 py-1.5 rounded-full">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                            <span className="text-blue-700">{SITE_INFO.name}</span>が<br />選ばれる理由
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6">
                            輸出直販の強みを活かし、他社では実現できない高価買取をお約束します。
                            アフリカ・東南アジア・中東など世界30カ国以上への販路を持ち、
                            中間マージンをカットした適正価格でお客様にご提案いたします。
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/export-shipping.png"
                                    alt="海外輸出の様子"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">海外直接輸出</p>
                                <p className="text-xs text-gray-500">自社で輸出手配まで一貫対応</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Items */}
                <div className="grid md:grid-cols-3 gap-8">
                    {trustItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Number badge */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                                {index + 1}
                            </div>

                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-2xl mb-6 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: "15年+", label: "業界経験" },
                        { value: "5,000台+", label: "累計買取台数" },
                        { value: "30カ国+", label: "輸出先" },
                        { value: "98%", label: "お客様満足度" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-2xl sm:text-3xl font-black text-blue-700 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
