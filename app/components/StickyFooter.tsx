"use client";

import { LINE_URL, SITE_INFO } from "@/app/data/config";

export default function StickyFooter() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
            {/* Gradient overlay for smooth blend */}
            <div className="h-4 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />

            <div className="bg-white border-t border-gray-200 px-3 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-2 safe-bottom">

                {/* 1. Phone Button (Secondary but important) */}
                <a
                    href={`tel:${SITE_INFO.phone}`}
                    className="flex flex-col items-center justify-center bg-gray-100 text-gray-700 font-bold rounded-lg py-2 px-1 w-1/3 active:bg-gray-200 transition-colors"
                >
                    <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[10px] leading-tight">電話相談</span>
                </a>

                {/* 2. LINE Button (Primary CTA) */}
                <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center bg-[#06C755] text-white font-bold rounded-lg py-2 px-1 w-2/3 shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform relative overflow-hidden"
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shine" />

                    <div className="flex items-center gap-1.5 mb-0.5 relative z-10">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        <span className="text-sm">LINEで無料査定</span>
                    </div>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full relative z-10">
                        写真を送るだけ・最短30秒
                    </span>
                </a>
            </div>
        </div>
    );
}
