'use client';

import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Phone,
  Clock,
  ShieldCheck,
  MessageSquare,
  History,
  Star,
  Truck,
  Car,
  Zap,
} from "lucide-react";
import {
  TARGET_AREAS,
  TARGET_CATEGORIES,
  SITE_INFO,
  LINE_URL,
} from "@/app/data/config";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">

      {/* ─── Navigation ─── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-blue-700 font-black text-lg leading-tight tracking-tight">
              出張買取<br className="hidden sm:block" />サポート札幌
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/about" className="hover:text-blue-600 transition-colors">会社情報</Link>
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">プライバシー</Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">利用規約</Link>
            </div>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05b049] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle size={16} />
              LINE無料査定
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-blue-200 text-sm font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
              北海道札幌近郊 出張査定無料
            </p>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              買取後もあんしん<br />
              <span className="text-blue-200">ライフサポート付</span><br />
              クルマ買取サービス
            </h1>
            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-lg">
              【安心リリース買取】　お客様の大切なお車を査定から引き取りまで、誠実に対応します。
              買取後の生活もサポートするプロがそばにいます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b049] text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg"
              >
                <MessageCircle size={24} />
                LINEで無料査定
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Webからお問い合わせ
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-1 gap-3 w-full md:w-64">
            {[
              { label: "出張査定", desc: "ご自宅まで無料で伺います" },
              { label: "査定無料", desc: "費用は一切かかりません" },
              { label: "手続き代行", desc: "名義変更も完全無料" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white text-sm">{item.label}</p>
                  <p className="text-blue-200 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
            <p className="text-blue-300 text-xs text-center leading-relaxed mt-1">
              ※無料サービスは現在、札幌市内限定
            </p>
          </div>
        </div>
      </section>

      {/* ─── こんな車もOK ─── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">こんなクルマもお任せください</h2>
          <p className="text-slate-500 text-center mb-10">どんな状態でも、誠実に査定いたします。</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "キズ・凹みあり", desc: "状態に関わらず適正に査定します" },
              { title: "故障・不動車", desc: "レッカー無料でお引取りします" },
              { title: "走行多い", desc: "過走行でも海外ルートで高価買取" },
              { title: "車検切れ", desc: "車検不要でそのまま買取OK" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 買取 vs オークション ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">「買取」と「オークション出品」どちらが高く売れる？</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">札幌の相場を知り尽くしたプロが、最適な売却方法をご提案します。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 買取 */}
            <div className="border border-slate-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Car size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">買取プラン</h3>
                  <p className="text-xs text-blue-600 font-bold">スピード重視の方へ</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "最短即日査定・即日引取り可能",
                  "故障車・不動車もその場で現金化",
                  "名義変更など手続きも完全無料",
                  "明確な根拠をご説明した上で提示",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-slate-400 leading-relaxed">
                ※査定当日に金額が確定し、速やかに銀行振込が可能です。
              </p>
            </div>
            {/* オークション */}
            <div className="border border-blue-600 bg-blue-900 text-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star size={20} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg">オークション出品</h3>
                  <p className="text-xs text-blue-200 font-bold">高値を狙いたい方へ</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "全国数千社が競り合うため相場以上も",
                  "最低希望価格を自分で設定できる",
                  "車は自宅に置いたままでOK",
                  "しつこい営業電話は一切なし",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                    <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-blue-300 leading-relaxed">
                ※時間はかかりますが、国内下取りより大幅に高値がつく可能性があります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 誠実買取3つの約束 ─── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">誠実買取・3つの約束</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare size={24} className="text-blue-600" />,
                title: "しつこい営業なし",
                desc: "「今すぐ決めないと帰らない」といった強引な営業は一切行いません。お客様のペースでご検討いただけます。",
              },
              {
                icon: <ShieldCheck size={24} className="text-blue-600" />,
                title: "価格の根拠を提示",
                desc: "「なぜこの金額なのか」を市場データに基づいて説明します。不当な減額・不透明な駆け引きはいたしません。",
              },
              {
                icon: <History size={24} className="text-blue-600" />,
                title: "手続き完全代行",
                desc: "名義変更・廃車手続き・所有権解除など、面倒な役所手続きはすべて無料で代行いたします。",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 買取の流れ ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">出張査定・買取の流れ</h2>
          <div className="space-y-8">
            {[
              { step: "Step 1", title: "まずはご予約", desc: "お電話・WEB・公式LINEから24時間受け付けています。個別チャットでの相談も可能です。" },
              { step: "Step 2", title: "無料出張査定", desc: "スタッフがご自宅まで無料でお伺いします。お忙しい方でも安心してご利用いただけます。" },
              { step: "Step 3", title: "お車の査定", desc: "その場でスピーディーかつ丁寧に査定金額をご提示いたします。" },
              { step: "Step 4", title: "お取引の確認", desc: "ご納得いただければ、引取り日・お支払い日を決定します。" },
              { step: "Step 5", title: "書類とお支払い", desc: "書類の受け渡しと代金のお支払いを行い、お車をお引取りします。" },
              { step: "Step 6", title: "車内の最終確認", desc: "忘れ物がないかを一緒にチェックしてから安心してお引渡しください。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg whitespace-nowrap">{item.step}</span>
                </div>
                <div className="border-l-2 border-slate-200 pl-6 pb-2 flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── エリア × カテゴリ SEO グリッド ─── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
            エリア × カテゴリから専門ページを探す
          </h2>
          <p className="text-slate-500 text-center mb-10 text-sm">
            あなたの地域と車種に特化した買取情報をご覧いただけます
          </p>
          <div className="space-y-8">
            {TARGET_CATEGORIES.map((category) => (
              <div key={category.slug}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h3 className="font-bold text-slate-800">{category.shortName}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                  {TARGET_AREAS.map((area) => (
                    <Link
                      key={`${area.slug}-${category.slug}`}
                      href={`/${area.slug}/${category.slug}`}
                      className="bg-white border border-slate-200 hover:border-blue-400 rounded-lg px-3 py-2 text-center text-xs font-medium text-slate-600 hover:text-blue-600 transition-all shadow-sm"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-8">
            全 {TARGET_AREAS.length * TARGET_CATEGORIES.length} ページの専門買取情報をご用意しています
          </p>
        </div>
      </section>

      {/* ─── アクセス＋お問い合わせ ─── */}
      <section className="py-16 px-4 bg-white" id="contact">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 会社情報 */}
          <div>
            <h2 className="text-2xl font-black mb-8">アクセス・連絡先</h2>
            <div className="space-y-6 text-sm">
              {[
                { icon: <Clock size={18} className="text-blue-600" />, label: "営業時間", content: "平日 10:00〜18:00（土日祝定休）" },
                { icon: <Phone size={18} className="text-blue-600" />, label: "電話番号", content: <a href="tel:050-1724-2478" className="font-bold text-blue-700 text-lg">050-1724-2478</a> },
                { icon: <MapPin size={18} className="text-blue-600" />, label: "所在地", content: "〒065-0021 北海道札幌市東区北21条東3-1-14-603 第2美香保ローズビラ" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold mb-0.5">{item.label}</p>
                    <div className="text-slate-800 font-medium">{item.content}</div>
                  </div>
                </div>
              ))}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-xs leading-relaxed mt-4">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <p>オフィスでの直接持ち込み査定は行っておりません。事前にご予約をお願いいたします。</p>
              </div>
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <h2 className="text-xl font-black mb-6">お問い合わせ</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="お名前（姓）" className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition" />
                <input type="text" placeholder="お名前（名）" className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition" />
              </div>
              <input type="tel" placeholder="お電話番号" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition" />
              <input type="email" placeholder="メールアドレス" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition" />
              <textarea placeholder="お問い合わせ内容" className="w-full h-28 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                送信する
              </button>
              <p className="text-xs text-slate-400 text-center">
                <Link href="/privacy" className="underline">プライバシーポリシー</Link>にご同意の上、送信してください。
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 bg-slate-900 text-white text-center">
        <div className="flex justify-center gap-8 mb-6 text-xs text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">会社情報</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-white transition-colors">利用規約</Link>
        </div>
        <p className="text-slate-500 text-xs">© {new Date().getFullYear()} 出張買取サポート札幌. All Rights Reserved.</p>
      </footer>

      {/* ─── Floating Action ─── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
        <div className="bg-white shadow-2xl rounded-2xl p-3 flex items-center justify-between border border-slate-200">
          <div className="pl-2">
            <p className="text-xs text-slate-400 font-bold">電話でのお問い合わせ</p>
            <a href="tel:050-1724-2478" className="text-lg font-black text-slate-900 leading-none">050-1724-2478</a>
          </div>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05b049] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
          >
            <MessageCircle size={18} />
            LINE査定
          </a>
        </div>
      </div>

    </main>
  );
}
