'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  MessageCircle, CheckCircle2, Phone, ShieldCheck,
  MessageSquare, History, Star, Car, Loader2,
  ChevronDown, ArrowRight, TrendingUp,
} from "lucide-react";
import { TARGET_AREAS, TARGET_CATEGORIES, LINE_URL } from "@/app/data/config";

/* ─── FAQ データ ─── */
const FAQS = [
  { q: "査定費や出張費はかかりますか？", a: "いいえ、出張費・査定費・名義変更手続きはすべて無料です。現在、無料サービスは札幌市内限定で提供しています。" },
  { q: "故障した車や動かない車でも買い取れますか？", a: "はい。不動車・廃車寸前の車でも対応可能です。レッカー費用も無料でご対応します。まずはお気軽にご相談ください。" },
  { q: "他の買取店で断られた車でも大丈夫ですか？", a: "大丈夫です。走行距離が多い車や車検切れ・事故歴あり等、他店では断られやすい車種も海外輸出ルートがあるため高価買取できるケースが多くあります。" },
  { q: "査定後に断ることはできますか？", a: "もちろんです。査定額をご提示した後、「考えます」「断ります」と言っていただいても一切問題ありません。しつこい営業は行いません。" },
  { q: "契約から入金までどれくらいかかりますか？", a: "当日中〜翌営業日の銀行振込が基本です。状況によってその場で現金対応も可能です。お急ぎの場合はご相談ください。" },
  { q: "トラック・バン・軽トラも買い取れますか？", a: "はい。普通乗用車に限らず、軽トラック・バン・ハイエース・商用車・SUVなど幅広い車種に対応しています。" },
];

export default function HomePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const token = await new Promise<string>((resolve) => {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '', { action: 'contact' })
            .then(resolve);
        });
      });
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken: token }),
      });
      const data = await res.json();
      setStatus(data.success ? 'ok' : 'err');
    } catch {
      setStatus('err');
    }
  };

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}`} />
      <main className="min-h-screen bg-white text-slate-800" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" }}>

        {/* ─── Nav ─── */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-slate-900 text-base md:text-lg tracking-tight">
              出張買取サポート<span className="text-blue-700">札幌</span>
            </Link>
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                <Link href="/about" className="hover:text-blue-600 transition-colors">会社情報</Link>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">ブログ</Link>
                <a href="#faq" className="hover:text-blue-600 transition-colors">よくある質問</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">お問い合わせ</a>
              </div>
              <a href="tel:050-1724-2478" className="hidden md:flex items-center gap-1.5 text-slate-700 font-bold text-sm hover:text-blue-700 transition-colors">
                <Phone size={15} />050-1724-2478
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-1.5 bg-[#06C755] hover:bg-[#05a849] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <MessageCircle size={15} />LINE無料査定
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section className="relative bg-slate-900 text-white overflow-hidden min-h-[580px] md:min-h-[640px] flex items-center">
          <div className="absolute inset-0">
            <Image src="/hero-inspection.png" alt="札幌 出張車査定" fill className="object-cover opacity-25" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 w-full">
            <div className="max-w-xl">
              {/* バッジ */}
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/40 text-blue-200 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                北海道 札幌近郊 ｜ 出張・査定・手続きすべて無料
              </div>
              <h1 className="text-3xl md:text-[2.75rem] font-black leading-[1.25] mb-5 tracking-tight">
                どんなクルマも<br />
                <span className="text-blue-300">誠実に、高く。</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                故障車・不動車・過走行車・車検切れもOK。<br />
                海外輸出ルートを持つ買取サービスだからこそ、<br className="hidden md:block" />
                他店より高い査定額をご提示できます。
              </p>
              {/* 実績ナンバー */}
              <div className="flex items-center gap-6 mb-8">
                {[
                  { num: "24h", label: "AI電話対応" },
                  { num: "0円", label: "出張費" },
                  { num: "最短当日", label: "入金対応" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-white font-black text-xl leading-none">{s.num}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05a849] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-xl shadow-green-900/30 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle size={20} />
                  LINEで今すぐ無料査定
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-bold px-7 py-4 rounded-xl transition-all text-base"
                >
                  メール・電話で相談する
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 課題Section（Why Us / Pain Point）─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-[420px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/worried-seller.png"
                alt="車売却で悩む男性"
                width={420}
                height={380}
                className="w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-blue-600 tracking-widest uppercase mb-3">こんなお悩みありませんか？</p>
              <h2 className="text-2xl md:text-3xl font-black mb-7 leading-tight">
                「すぐ決めて」と<br />
                せかされた経験はありませんか
              </h2>
              <ul className="space-y-4 mb-7">
                {[
                  "査定スタッフが帰ってくれなくて困った",
                  "なぜこの金額なのか説明してもらえなかった",
                  "故障車だからと0円で買い叩かれた",
                  "名義変更の手続きがよくわからなかった",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">×</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
                <p className="text-blue-900 text-sm font-bold">出張買取サポート札幌では、<span className="underline underline-offset-2">そういった経験を一切させません。</span></p>
                <p className="text-blue-700 text-xs mt-1.5 leading-relaxed">価格の根拠を必ず説明し、強引な営業は行いません。納得いただけた場合のみ、お取引を進めます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3つの約束 ─── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-xs font-black text-blue-600 tracking-widest uppercase mb-3">Our Promise</p>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10">誠実買取・3つの約束</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  icon: <MessageSquare size={22} className="text-blue-600" />,
                  title: "しつこい営業は一切なし",
                  desc: "「今すぐ決めてください」という強引なクロージングは絶対に行いません。その場での即決を促すことなく、お客様のペースで判断していただけます。",
                },
                {
                  num: "02",
                  icon: <ShieldCheck size={22} className="text-blue-600" />,
                  title: "価格の根拠を必ず提示",
                  desc: "市場データに基づき「なぜこの金額なのか」を具体的に説明します。不当な減額交渉や根拠のない値引きは一切行いません。",
                },
                {
                  num: "03",
                  icon: <History size={22} className="text-blue-600" />,
                  title: "手続きをすべて代行",
                  desc: "名義変更・廃車手続きなど、複雑な行政手続きはすべて無料で代行いたします。お客様が役所に出向く必要はありません。",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm relative overflow-hidden group hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="absolute top-5 right-5 text-slate-100 text-5xl font-black leading-none select-none group-hover:text-blue-50 transition-colors">{item.num}</div>
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-3 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── こんな車もOK ─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-xs font-black text-blue-600 tracking-widest uppercase mb-3">Any Condition OK</p>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-3">他店で断られた車もOK</h2>
            <p className="text-slate-500 text-center text-sm mb-8">海外販売ルートがあるため、国内では値がつかない車でも査定できます。</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { icon: "🔧", title: "故障・不動車", sub: "レッカー費用無料" },
                { icon: "💥", title: "事故歴あり", sub: "適正査定で評価" },
                { icon: "⏰", title: "車検切れ", sub: "そのまま買取可" },
                { icon: "📍", title: "過走行車", sub: "海外ルートで高値" },
                { icon: "🎨", title: "キズ・凹みあり", sub: "減額幅は最小限" },
                { icon: "🚛", title: "トラック・バン", sub: "商用車対応可" },
                { icon: "🚗", title: "軽自動車", sub: "全メーカー対応" },
                { icon: "🛻", title: "ハイエース", sub: "特に高値で査定" },
              ].map((c, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl p-4 text-center transition-all cursor-default">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="font-bold text-slate-800 text-xs mb-1">{c.title}</div>
                  <div className="text-slate-400 text-[10px]">{c.sub}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image src="/various-cars.png" alt="買取対象となる様々な車種" width={1200} height={400} className="w-full object-cover max-h-64" />
            </div>
          </div>
        </section>

        {/* ─── 買取 vs オークション ─── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-xs font-black text-blue-600 tracking-widest uppercase mb-3">2 Options</p>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-3">あなたに最適な売り方をご提案</h2>
            <p className="text-slate-500 text-center text-sm mb-8">状況に合わせてプロが最良の方法をアドバイスします。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Car size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">出張買取プラン</div>
                    <div className="text-xs font-bold text-blue-600 mt-0.5">スピード重視の方へ</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-5">
                  {[
                    "最短即日査定・当日入金も相談可",
                    "故障車・不動車もその場で現金化",
                    "名義変更など全手続き無料代行",
                    "根拠をもとに明確な金額を提示",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />{t}
                    </li>
                  ))}
                </ul>
                <a href={LINE_URL} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-3 rounded-xl transition-colors w-full">
                  LINEでまず相談する <ArrowRight size={15} />
                </a>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center">
                    <TrendingUp size={22} className="text-blue-300" />
                  </div>
                  <div>
                    <div className="font-black">オークション出品</div>
                    <div className="text-xs font-bold text-blue-300 mt-0.5">高値を狙いたい方へ</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-5">
                  {[
                    "全国数千社が競り合い相場以上の高値も",
                    "最低希望価格を自分で設定できる",
                    "車は自宅に置いたままでOK",
                    "しつこい営業電話は一切なし",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />{t}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold py-3 rounded-xl transition-colors w-full">
                  詳しく問い合わせる <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 買取の流れ ─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
            <div className="flex-1">
              <p className="text-xs font-black text-blue-600 tracking-widest uppercase mb-3">How It Works</p>
              <h2 className="text-2xl md:text-3xl font-black mb-8">出張査定・買取の流れ</h2>
              <div className="relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />
                <div className="space-y-7">
                  {[
                    { title: "ご予約", desc: "お電話・LINE・メールで24時間受付中。お気軽にどうぞ。" },
                    { title: "スタッフが出張", desc: "ご自宅や職場、ご指定の場所まで無料でお伺いします。" },
                    { title: "お車の査定", desc: "状態を確認し、根拠をお伝えしながら丁寧に金額をご提示します。" },
                    { title: "ご確認・決断", desc: "ご納得いただけた場合のみ、引取り日・お支払い日を決めます。" },
                    { title: "書類とお支払い", desc: "代金をお受け取りの上、お車とお別れです。" },
                    { title: "完了・手続き代行", desc: "名義変更など残りの手続きはすべて弊社が代行します。" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 relative">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/staff-handover.png" alt="書類の説明をするスタッフ" width={400} height={500} className="w-full object-cover" />
              </div>
              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <p className="text-blue-900 font-bold text-sm mb-0.5">ご相談はいつでも無料です</p>
                <p className="text-blue-600 text-xs">査定だけのご依頼も大歓迎。断っても問題ありません。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-16 px-4 bg-slate-50" id="faq">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-xs font-black text-blue-600 tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-8">よくある質問</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-bold text-slate-800 text-sm pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-slate-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SEO グリッド ─── */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-black text-center mb-2">エリア・車種から専門情報を探す</h2>
            <p className="text-slate-500 text-center text-xs mb-8">地域・車種別の買取情報をご用意しています</p>
            <div className="space-y-6">
              {TARGET_CATEGORIES.map((category) => (
                <div key={category.slug}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-blue-600 rounded-full" />
                    <h3 className="font-bold text-slate-700 text-xs">{category.shortName}</h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-1.5">
                    {TARGET_AREAS.map((area) => (
                      <Link
                        key={`${area.slug}-${category.slug}`}
                        href={`/${area.slug}/${category.slug}`}
                        className="bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-lg px-2 py-2 text-center text-xs text-slate-600 font-medium transition-all"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── お問い合わせ ─── */}
        <section className="py-16 px-4 bg-slate-900 text-white" id="contact">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 左：連絡手段 */}
            <div>
              <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">Contact</p>
              <h2 className="text-2xl md:text-3xl font-black mb-3">お気軽にご連絡ください</h2>
              <p className="text-slate-400 text-sm mb-7 leading-relaxed">
                査定額が気になる方、売ろうか迷っている方、まずはご相談だけでも構いません。
              </p>
              <div className="space-y-4">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-4 bg-[#06C755]/10 hover:bg-[#06C755]/20 border border-[#06C755]/40 rounded-2xl p-5 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#06C755] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white">LINE（おすすめ）</div>
                    <div className="text-slate-400 text-xs mt-0.5">写真を送るだけで査定額が分かります</div>
                  </div>
                  <ArrowRight size={18} className="text-slate-500 ml-auto group-hover:text-green-400 transition-colors" />
                </a>
                <a
                  href="tel:050-1724-2478"
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white">050-1724-2478</div>
                    <div className="text-slate-400 text-xs mt-0.5">AI対応・24時間 ｜ 音声ガイダンスに従ってください</div>
                  </div>
                  <ArrowRight size={18} className="text-slate-500 ml-auto group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* 右：フォーム */}
            <div className="bg-white rounded-2xl p-7 text-slate-800">
              <h3 className="font-black text-slate-900 mb-5">メールでのお問い合わせ</h3>
              {status === 'ok' ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={44} className="text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-slate-900 mb-1">送信が完了しました</p>
                  <p className="text-slate-500 text-sm">確認の上、折り返しご連絡いたします。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text" required placeholder="お名前 *"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <input
                    type="tel" placeholder="お電話番号"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <input
                    type="email" required placeholder="メールアドレス *"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <textarea
                    required placeholder="お問い合わせ内容（車種・状態など） *"
                    value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                  />
                  {status === 'err' && (
                    <p className="text-red-600 text-xs">送信に失敗しました。お電話またはLINEでご連絡ください。</p>
                  )}
                  <button
                    type="submit" disabled={status === 'sending'}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                    {status === 'sending' ? '送信中...' : '内容を確認して送信する'}
                  </button>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    <Link href="/privacy" className="underline">プライバシーポリシー</Link>に同意の上、送信してください。<br />
                    <span className="opacity-60">Protected by Google reCAPTCHA.</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-10 bg-slate-950 text-center">
          <Link href="/" className="text-white font-black text-base mb-4 inline-block">
            出張買取サポート<span className="text-blue-400">札幌</span>
          </Link>
          <div className="flex justify-center gap-6 mb-5 text-xs text-slate-500">
            <Link href="/about" className="hover:text-slate-300 transition-colors">会社情報</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">利用規約</Link>
          </div>
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} 出張買取サポート札幌. All Rights Reserved.</p>
        </footer>

        {/* ─── Floating CTA ─── */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[360px]">
          <div className="bg-white shadow-2xl shadow-slate-900/20 rounded-2xl p-3 flex items-center justify-between border border-slate-100 gap-3">
            <a href="tel:050-1724-2478" className="flex-1 text-center">
              <div className="text-[10px] text-slate-400 font-bold leading-none mb-0.5">AI対応・24時間</div>
              <div className="font-black text-slate-900 text-base leading-none">050-1724-2478</div>
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05a849] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors flex-shrink-0 shadow-sm"
            >
              <MessageCircle size={16} />
              LINE査定
            </a>
          </div>
        </div>

      </main>
    </>
  );
}
