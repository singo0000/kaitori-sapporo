"use client";

import Link from 'next/link';

export default function PostCTA() {
    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-8 sm:p-12 text-center mt-16 shadow-2xl relative overflow-hidden group">
            {/* 装飾 */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl group-hover:bg-blue-400/30 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl group-hover:bg-indigo-400/30 transition-colors duration-700"></div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
                この記事を読んで「そろそろ売ろうかな」と思ったら…
            </h3>
            <p className="text-blue-100/90 mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                北海道・札幌エリアに特化した「くるまど札幌」なら、どんな状態のお車でもしっかり査定。<br className="hidden sm:block" />
                古い車、動かない車、過走行車でも、まずは一度ご相談ください！
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    今すぐ無料査定を依頼する
                </Link>
                <a href="tel:0120-xxx-xxx" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    0120-XXX-XXX
                </a>
            </div>
            <p className="text-white/50 text-xs mt-4 relative z-10">※ お電話受付時間：10:00〜18:00（水曜定休）</p>
        </div>
    );
}
