"use client";

import Image from "next/image";
import { LINE_URL } from "@/app/data/config";

interface HeroSectionProps {
    areaName: string;
    categoryName: string;
    categoryShortName: string;
    heroImage: string;
}

export default function HeroSection({
    areaName,
    categoryName,
    categoryShortName,
    heroImage,
}: HeroSectionProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src={heroImage}
                alt={`${categoryShortName}の買取`}
                fill
                className="object-cover"
                priority
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/80 to-blue-950/90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtdjRoNHptMCAwdi00aC00djRoNHptMCAwdjRoLTR2LTRoNHptMCAwdjRoNHYtNGgtNHpNMTYgMzR2LTRoLTR2NGg0em0wIDB2LTRoNHYtNGgtNHptMCAwdjRoNHYtNGgtNHptMCAwdjRoLTR2LTRoNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

            {/* Floating particles */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-blue-600 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-40 right-20 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-40" />
            <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-blue-600 rounded-full animate-pulse opacity-30" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm font-medium">
                        {areaName}エリア対応 ─ 出張査定<span className="text-blue-600 font-bold">無料</span>
                    </span>
                </div>

                {/* Main Copy */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                    <span className="text-blue-600">【{areaName}】</span>で
                    <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {categoryShortName}
                    </span>
                    <br />
                    を高く売るなら
                    <br />
                    <span className="text-2xl sm:text-3xl md:text-4xl text-blue-200">
                        出張買取サポート札幌へ
                    </span>
                </h1>

                {/* Sub Copy */}
                <p className="text-lg sm:text-xl text-blue-100/90 mb-4 font-medium">
                    海外輸出直販だからできる<span className="text-blue-600 font-bold">高価買取</span>。
                    <br className="sm:hidden" />
                    動かない車もOK。
                </p>

                <p className="text-sm text-blue-200/70 mb-10">
                    ※{categoryName}の買取実績多数。まずはお気軽にLINEでご相談ください。
                </p>

                {/* CTA Button */}
                <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white text-lg sm:text-xl font-bold rounded-2xl px-8 sm:px-12 py-5 sm:py-6 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    {/* Shine effect */}
                    <span className="absolute inset-0 rounded-2xl overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </span>

                    <svg className="w-8 h-8 relative" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    <span className="relative">
                        LINEで写真を送って無料査定
                        <span className="block text-sm font-normal opacity-90">30秒で完了 ─ 24時間受付中</span>
                    </span>
                </a>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-blue-200/70">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        出張費0円
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        引取り費0円
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        手続き代行0円
                    </div>
                </div>
            </div>
        </section>
    );
}
