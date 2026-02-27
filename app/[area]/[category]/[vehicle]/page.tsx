import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    TARGET_AREAS,
    TARGET_CATEGORIES,
    TARGET_VEHICLES,
    SITE_INFO,
    LINE_URL,
} from "@/app/data/config";
import { getCurrentSeasonalMessage } from "@/app/data/seasonal";
import StickyFooter from "@/app/components/StickyFooter";

type Props = {
    params: {
        area: string;
        category: string;
        vehicle: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { area, category, vehicle } = params;
    const areaData = TARGET_AREAS.find((a) => a.slug === area);
    const categoryData = TARGET_CATEGORIES.find((c) => c.slug === category);
    const vehicleData = TARGET_VEHICLES.find((v) => v.slug === vehicle);

    if (!areaData || !categoryData || !vehicleData) return {};

    return {
        title: `${areaData.name}で${vehicleData.name}の高価買取・査定 | ${SITE_INFO.name}`,
        description: `${areaData.name}区エリアで${vehicleData.maker} ${vehicleData.name}（${vehicleData.categorySlug}）の高価買取なら${SITE_INFO.name}にお任せください。${vehicleData.features.join("。")}。不動車や過走行車も即日現金買取可能です。`,
    };
}

export async function generateStaticParams() {
    const params: { area: string; category: string; vehicle: string }[] = [];

    for (const area of TARGET_AREAS) {
        for (const category of TARGET_CATEGORIES) {
            const vehicles = TARGET_VEHICLES.filter(
                (v) => v.categorySlug === category.slug
            );
            for (const vehicle of vehicles) {
                params.push({
                    area: area.slug,
                    category: category.slug,
                    vehicle: vehicle.slug,
                });
            }
        }
    }

    return params;
}



export default function VehiclePage({ params }: Props) {
    const { area, category, vehicle } = params;
    const areaData = TARGET_AREAS.find((a) => a.slug === area);
    const categoryData = TARGET_CATEGORIES.find((c) => c.slug === category);
    const vehicleData = TARGET_VEHICLES.find((v) => v.slug === vehicle);
    const seasonalMessage = getCurrentSeasonalMessage(); // 現在の季節メッセージを取得

    if (!areaData || !categoryData || !vehicleData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Seasonal Alert */}
            <div className="bg-yellow-400 text-yellow-900 px-4 py-3 text-center font-bold border-b-4 border-yellow-500 animate-pulse sticky top-12 z-40 shadow-lg">
                <span className="text-xl mr-2">{seasonalMessage.icon}</span>
                {seasonalMessage.title}
                <span className="text-sm block sm:inline sm:ml-2 font-normal">
                    {seasonalMessage.description}
                </span>
            </div>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white pt-20 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-6 animate-pulse">
                        {areaData.name}エリア 強化買取中
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
                        {areaData.name}で<span className="text-blue-300">{vehicleData.name}</span>を
                        <br className="sm:hidden" />
                        高く売るなら
                    </h1>
                    <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
                        {vehicleData.description}
                        <br />
                        海外輸出直販だからできる驚きの査定額をご提示します。
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
                        <p className="text-yellow-300 font-bold mb-1 text-lg">
                            {seasonalMessage.icon} {seasonalMessage.title}
                        </p>
                        <p className="text-sm text-blue-50">
                            {seasonalMessage.description}
                        </p>
                    </div>

                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b84d] text-white text-lg font-bold rounded-xl px-10 py-5 shadow-lg active:scale-95 transition-all"
                    >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        {vehicleData.name}をLINE査定
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 max-w-4xl mx-auto -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        {vehicleData.name}の高価買取ポイント
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {vehicleData.features.map((feature, i) => (
                            <div key={i} className="bg-blue-50 rounded-xl p-5 text-center">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                    {i + 1}
                                </div>
                                <p className="font-bold text-blue-900">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-blue-600">◆</span>
                            こんな{vehicleData.name}も買取ります
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {vehicleData.keywords.map((keyword, i) => (
                                <span key={i} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm">
                                    {keyword}
                                </span>
                            ))}
                            <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm">
                                不動車
                            </span>
                            <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm">
                                事故車
                            </span>
                            <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm">
                                車検切れ
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Area Info */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {areaData.name}全域へ無料出張査定
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {SITE_INFO.name}は、{areaData.name}を中心に活動する地域密着の買取店です。
                        <br />
                        {areaData.description}
                        <br />
                        お電話一本で、最短即日に{vehicleData.name}の査定にお伺いします。
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-xl mx-auto">
                        <p className="font-bold text-blue-900 mb-2">出張査定 完全無料</p>
                        <p className="text-sm text-blue-700">
                            査定額にご納得いただけない場合でも、出張費や査定料は一切いただきません。
                            安心してご依頼ください。
                        </p>
                    </div>
                </div>
            </section>

            <StickyFooter />
        </main>
    );
}
