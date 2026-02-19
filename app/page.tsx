import Link from "next/link";
import {
  TARGET_AREAS,
  TARGET_CATEGORIES,
  SITE_INFO,
  LINE_URL,
} from "@/app/data/config";
import PurchaseTicker from "@/app/components/PurchaseTicker";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
      {/* Ticker */}
      <PurchaseTicker />

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtdjRoNHptMCAwdi00aC00djRoNHptMCAwdjRoLTR2LTRoNHptMCAwdjRoNHYtNGgtNHpNMTYgMzR2LTRoLTR2NGg0em0wIDB2LTRoNHYtNGgtNHptMCAwdjRoNHYtNGgtNHptMCAwdjRoLTR2LTRoNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              北海道札幌近郊対応 ─ 出張査定<span className="text-orange-300 font-bold">無料</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            <span className="text-orange-400">北海道</span>で車を高く売るなら
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-blue-200">
              {SITE_INFO.name}
            </span>
          </h1>

          <p className="text-lg text-blue-100/80 mb-10 max-w-2xl mx-auto">
            トラック・ハイエース・事故車・農機具 ─ なんでも高価買取。
            <br />
            海外輸出直販だから実現できる査定額をまずはLINEでご確認ください。
          </p>

          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-2xl px-10 py-5 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで無料査定する
          </a>
        </div>
      </section>

      {/* Area × Category Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            エリア × カテゴリから
            <span className="text-orange-400">専門ページ</span>を探す
          </h2>
          <p className="text-blue-200/60 text-center mb-12 text-sm">
            あなたの地域と車種に特化した買取情報をご覧いただけます
          </p>

          {/* Category Headers + Area Grid */}
          <div className="space-y-10">
            {TARGET_CATEGORIES.map((category) => (
              <div key={category.slug}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">
                    {category.shortName}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TARGET_AREAS.map((area) => (
                    <Link
                      key={`${area.slug}-${category.slug}`}
                      href={`/${area.slug}/${category.slug}`}
                      className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/50 rounded-xl px-4 py-3 text-center transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <span className="text-white font-medium text-sm group-hover:text-orange-300 transition-colors">
                        {area.name}
                      </span>
                      <span className="block text-blue-300/50 text-xs mt-0.5">
                        {category.shortName}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Total count */}
          <p className="text-center text-blue-300/40 text-xs mt-10">
            全{TARGET_AREAS.length * TARGET_CATEGORIES.length}ページの専門買取情報をご用意しています
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-blue-300/40 text-xs">
          © {new Date().getFullYear()} {SITE_INFO.name} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
