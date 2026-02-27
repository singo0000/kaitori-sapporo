'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
  Clock,
  ShieldCheck,
  MessageSquare,
  History,
  Star,
  Car,
  Loader2,
} from "lucide-react";
import {
  TARGET_AREAS,
  TARGET_CATEGORIES,
  SITE_INFO,
  LINE_URL,
} from "@/app/data/config";

export default function HomePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // reCAPTCHA v3 トークン取得
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
      if (data.success) {
        setStatus('ok');
      } else {
        setStatus('err');
        alert(`エラー: ${data.message}`); // 原因をポップアップで表示
      }
    } catch (e: any) {
      setStatus('err');
      alert(`通信エラーが発生しました: ${e.message}`);
    }
  };

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}`} />
      <main className="min-h-screen bg-white font-sans text-slate-800">

        {/* ─── Navigation ─── */}
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-blue-800 text-lg leading-tight">
              出張買取サポート札幌
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
        <section className="relative bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-inspection.png"
              alt="札幌 出張車査定の様子"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-blue-200 text-sm font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
                北海道札幌近郊 出張査定無料
              </p>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                どんな車でも<br />
                <span className="text-blue-300">誠実に高価買取</span><br />
                出張・査定・手続き無料
              </h1>
              <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-xl">
                故障車・不動車・過走行車もOK。海外輸出直販ルートだからできる高価査定。
                スタッフがご自宅まで出張し、その場で金額を提示します。
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
                  お問い合わせフォームへ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3つの無料バッジ ─── */}
        <section className="bg-blue-800 text-white py-4 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold">
            {[
              "出張費ゼロ円",
              "査定費ゼロ円",
              "手続き費ゼロ円",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" />
                <span>{item}</span>
              </div>
            ))}
            <span className="text-blue-300 text-xs">※無料サービスは現在、札幌市内限定</span>
          </div>
        </section>

        {/* ─── こんな車もOK ─── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-2">こんなクルマもお任せください</h2>
            <p className="text-slate-500 text-center text-sm mb-10">他店で断られたお車もぜひご相談ください。</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { title: "キズ・凹みあり", desc: "状態に関わらず適正に査定します" },
                { title: "故障・不動車", desc: "レッカー無料でお引取りします" },
                { title: "過走行車", desc: "海外ルートで高くお伝えします" },
                { title: "車検切れ", desc: "そのまま買取対応できます" },
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
            {/* 車の画像 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/various-cars.png"
                alt="買取対象となる様々な車種"
                width={1200}
                height={500}
                className="w-full object-cover max-h-72"
              />
            </div>
          </div>
        </section>

        {/* ─── 買取 vs オークション ─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-2">「買取」と「オークション出品」どちらが高く売れる？</h2>
            <p className="text-slate-500 text-center mb-10 text-sm">お客様の状況に合わせて、プロが最適な売却方法をご提案します。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 買取 */}
              <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50">
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
                    "根拠を明確にした上で金額を提示",
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
              <div className="border border-blue-700 bg-blue-900 text-white rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star size={20} className="text-blue-200" />
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
                  desc: "「なぜこの金額なのか」を市場データに基づいて丁寧に説明します。不当な減額・不透明な交渉はいたしません。",
                },
                {
                  icon: <History size={24} className="text-blue-600" />,
                  title: "手続き完全代行",
                  desc: "名義変更・廃車手続きなど、面倒な役所手続きはすべて無料で代行いたします。",
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

        {/* ─── 買取の流れ（画像入り） ─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black mb-10">出張査定・買取の流れ</h2>
              <div className="space-y-8">
                {[
                  { step: "Step 1", title: "まずはご予約", desc: "お電話・WEB・公式LINEから24時間受け付けています。" },
                  { step: "Step 2", title: "無料出張査定", desc: "スタッフがご自宅まで無料でお伺いします。" },
                  { step: "Step 3", title: "お車の査定", desc: "その場でスピーディーかつ丁寧に金額をご提示します。" },
                  { step: "Step 4", title: "お取引の確認", desc: "ご納得いただければ引取り日・お支払い日を決定します。" },
                  { step: "Step 5", title: "書類とお支払い", desc: "書類と代金をお支払いし、お車をお引取りします。" },
                  { step: "Step 6", title: "車内の最終確認", desc: "忘れ物がないかを一緒にチェックして完了です。" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg whitespace-nowrap block text-center">{item.step}</span>
                    </div>
                    <div className="border-l-2 border-slate-200 pl-6 pb-2 flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 画像 */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/kaitori-payment.png"
                  alt="出張買取で代金を受け取る様子"
                  width={600}
                  height={700}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">
                お客様のご自宅でのスムーズなお取引イメージ
              </p>
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
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="font-bold text-slate-800 text-sm">{category.shortName}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                    {TARGET_AREAS.map((area) => (
                      <Link
                        key={`${area.slug}-${category.slug}`}
                        href={`/${area.slug}/${category.slug}`}
                        className="bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-lg px-3 py-2 text-center text-xs font-medium text-slate-600 transition-all shadow-sm"
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
            {/* 電話・LINE案内 */}
            <div>
              <h2 className="text-2xl font-black mb-8">お気軽にご連絡ください</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <Phone size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-black text-slate-900 mb-1">お電話（AI対応・24時間）</p>
                      <a href="tel:050-1724-2478" className="font-black text-blue-700 text-2xl">050-1724-2478</a>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        音声ガイダンスに従ってお問い合わせ内容をお選びください。<br />
                        AIが24時間対応いたします。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <MessageCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-black text-slate-900 mb-1">LINE（おすすめ・一番簡単）</p>
                      <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener"
                        className="inline-block bg-[#06C755] hover:bg-[#05b049] text-white font-bold px-6 py-2 rounded-lg transition-colors mt-2 text-sm"
                      >
                        LINEで無料査定を始める
                      </a>
                      <p className="text-slate-500 text-xs mt-2">写真を送るだけで査定内容を確認できます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* お問い合わせフォーム */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <h2 className="text-xl font-black mb-6">メールでのお問い合わせ</h2>
              {status === 'ok' ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                  <p className="font-bold text-slate-900 text-lg mb-2">送信が完了しました</p>
                  <p className="text-slate-500 text-sm">内容を確認の上、折り返しご連絡いたします。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="お名前"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <input
                    type="tel"
                    placeholder="お電話番号"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="メールアドレス"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <textarea
                    required
                    placeholder="お問い合わせ内容（お車の情報など）"
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    className="w-full h-28 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                  />
                  {status === 'err' && (
                    <p className="text-red-600 text-xs">送信に失敗しました。お電話またはLINEでご連絡ください。</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                    {status === 'sending' ? '送信中...' : '内容を確認して送信'}
                  </button>
                  <p className="text-xs text-slate-400 text-center">
                    <Link href="/privacy" className="underline">プライバシーポリシー</Link>にご同意の上、送信してください。<br />
                    <span className="opacity-60">This site is protected by reCAPTCHA.</span>
                  </p>
                </form>
              )}
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
              <p className="text-xs text-slate-400 font-bold">AI対応・24時間</p>
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
    </>
  );
}
