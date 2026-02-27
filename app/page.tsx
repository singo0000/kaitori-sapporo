'use client';

import { useState } from 'react';
import Link from "next/link";
import {
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  Car,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  ChevronRight,
  AlertCircle,
  Truck,
  History,
  Smartphone,
  MessageSquare,
  Zap,
  Star
} from "lucide-react";
import {
  SITE_INFO,
  LINE_URL,
} from "@/app/data/config";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* --- Global Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl text-blue-900 tracking-tighter hover:opacity-80 transition-opacity">
            {SITE_INFO.name.toUpperCase()}
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">会社情報</Link>
            <Link href="/privacy" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">プライバシー</Link>
            <Link href="/terms" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">利用規約</Link>
            <a href="#contact" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">お問い合わせ</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full mb-8">
              <Zap size={12} className="fill-current" />
              Highest Price Selection
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tighter">
              買取内容も<span className="text-blue-400 italic">あんしん</span><br />
              ライフサポート付<br />
              クルマ買取サービス
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-medium max-w-xl">
              【安心リリース買取】<br />
              「買取」と「出品」をプロが診断。<br />
              あなたにとって最高の売却体験を札幌から。
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href={LINE_URL} target="_blank" rel="noopener" className="flex items-center justify-center gap-3 bg-[#06C755] text-white px-10 py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:-translate-y-1 active:scale-95">
                <MessageCircle size={28} />
                LINEで無料査定
              </a>
              <a href="#contact" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95">
                WEBから予約
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK FEATURES --- */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "出張無料", desc: "ご自宅までスタッフがお伺いします", icon: <MapPin className="text-blue-600" /> },
            { title: "査定無料", desc: "査定自体も完全無料。費用は0円です", icon: <CheckCircle2 className="text-blue-600" /> },
            { title: "手続き無料", desc: "名義変更や引取りもすべて代行", icon: <Truck className="text-blue-600" /> },
          ].map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-900/10 border border-slate-100 flex items-center gap-6 group hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-tight mt-1">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 text-[10px] mt-8 tracking-[0.2em] font-bold">
          ※無料サービスは現在、札幌市内のお取引限定で提供しております
        </p>
      </section>

      {/* --- PLAN SELECTION (The Core) --- */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-blue-600 tracking-[0.3em] uppercase mb-4">Dual Strategy</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
              「買取」と「出品」<br className="md:hidden" />
              どちらが高く売れるか診断
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              札幌の相場を知り尽くしたプロが、お客様の車種や状況に合わせて<br className="hidden md:block" />
              「買取」と「オークション出品」の最適な売却方法をご提案します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto lg:gap-16">
            {/* Plan A: Kaitori */}
            <div className="bg-slate-50 border border-slate-200 p-10 rounded-[48px] relative group hover:border-blue-500/30 transition-all flex flex-col">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 font-black mb-8 border border-slate-200 shadow-sm">01</div>
              <h4 className="text-3xl font-black mb-3 text-slate-900">買取プラン</h4>
              <p className="text-blue-600 text-sm mb-8 font-black uppercase tracking-widest">Speed & Cash</p>
              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  "最短即日査定・即日の引取りが可能",
                  "不動車・故障車もその場で適正買取",
                  "面倒な駆け引きなしの最終価格提示",
                  "名義変更などはすべて無料で代行"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-700 font-bold leading-snug">
                    <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-slate-200/60">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  ※すぐに現金化したい、手続きを楽に済ませたい方に最適です。
                </p>
              </div>
            </div>

            {/* Plan B: Auction */}
            <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl relative group hover:scale-[1.02] transition-all flex flex-col text-white">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black mb-8 shadow-lg shadow-blue-500/40">02</div>
              <h4 className="text-3xl font-black mb-3">オークション出品</h4>
              <p className="text-orange-400 text-sm mb-8 font-black uppercase tracking-widest">High Price & Global</p>
              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  "全国数千社のバイヤーが競り合い高値実現",
                  "最低希望価格を自分で設定できるので安心",
                  "海外輸出ルート直結だから低年式でも高価",
                  "成約するまで愛車は自宅に置いたままでOK"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-200 font-bold leading-snug">
                    <CheckCircle2 size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-white/10">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  ※時間をかけても相場以上の最高値で売りたい方に最適です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ANY CAR OK SECTION --- */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">どんなクルマもお任せください！</h2>
              <p className="text-slate-500 font-medium">他店で断られたお車、古いお車、動かないお車。私たちは誠実に査定いたします。</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <Star className="text-orange-400 fill-current" />
              <span className="font-black text-slate-900">0円以上買取保証あり</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "キズや凹みがある", desc: "キズや凹みのあるお車でも、しっかりと査定。自信を持って買取らせていただきます。" },
              { title: "故障して動かない", desc: "レッカー費用は一切無料。お車が動かない状態でも、適正な価値を見出します。" },
              { title: "走行距離が多い", desc: "10万km、20万km超えの大切に乗られた相棒。海外販路があるからこその高価査定。" },
              { title: "車検が切れている", desc: "車検切れで放置しているお車もOK。思い出と共に新たな道を歩むお手伝いをします。" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full">
                <h4 className="text-lg font-black mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR PROMISE (Honesty) --- */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto border-[3px] border-slate-900 rounded-[56px] p-12 md:p-20 text-center relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-2 rounded-full font-black tracking-widest uppercase text-xs">
            Our Promise
          </div>
          <h2 className="text-3xl font-black mb-16">誠実買取・3つの約束</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "しつこい営業なし",
                desc: "「今すぐ決めないと帰らない」といった強引な営業は一切行いません。",
                icon: <MessageSquare size={32} />
              },
              {
                title: "価格の根拠を提示",
                desc: "市場データに基づき「なぜこの金額なのか」を誠実にご説明いたします。",
                icon: <ShieldCheck size={32} />
              },
              {
                title: "手続き完全代行",
                desc: "名義変更や廃車など、面倒な役所手続きはすべて無料で代行いたします。",
                icon: <History size={32} />
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-blue-600 mb-6">{item.icon}</div>
                <h4 className="text-xl font-black mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICE FLOW --- */}
      <section className="py-24 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">出張査定・買取の流れ</h2>
            <p className="text-slate-500 font-bold">最短即日の対応。スムーズな体験をお約束します。</p>
          </div>

          <div className="space-y-10">
            {[
              { step: "01", title: "まずはご予約", desc: "お電話やWEB、公式LINEから24時間受付。お忙しい方でもスムーズにご予約いただけます。" },
              { step: "02", title: "無料出張査定", desc: "プロの査定士がご自宅まで無料で伺います。査定料は一切かかりません。" },
              { step: "03", title: "お車の査定", desc: "その場の市場データを反映し、スピーディーかつ丁寧に査定金額を提示します。" },
              { step: "04", title: "お取引の確認", desc: "金額にご納得いただければ、引取り日や代金のお支払い日をその場で決定。" },
              { step: "05", title: "書類とお支払い", desc: "書類と引き換えに代金をお支払い。お車を大切にお引取りいたします。" },
              { step: "06", title: "車内の最終確認", desc: "忘れ物がないか一緒にチェック。心から安心してお引渡しいただけます。" },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-8 group">
                {i !== 5 && <div className="absolute left-[27px] top-16 bottom-[-40px] w-px bg-slate-300 group-hover:bg-blue-300 transition-colors" />}
                <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center font-black text-slate-800 text-xl flex-shrink-0 z-10 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-all">
                  {item.step}
                </div>
                <div className="pt-3">
                  <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-bold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEO GRID --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4 uppercase tracking-widest">Target Area</h2>
            <Link href="/about" className="text-blue-600 text-sm font-bold hover:underline italic">View all areas →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              "札幌市中央区", "札幌市北区", "札幌市東区", "札幌市白石区", "札幌市豊平区",
              "札幌市南区", "札幌市西区", "札幌市厚別区", "札幌市手稲区", "札幌市清田区",
              "江別市", "北広島市", "小樽市", "千歳市", "石狩市"
            ].map((area) => (
              <div key={area} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 text-center text-xs font-black text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all cursor-default">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT / ACCESS --- */}
      <section className="py-32 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-4xl font-black mb-12 tracking-tighter">お問い合わせ</h3>
            <div className="space-y-12">
              <div className="flex gap-8">
                <Clock className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">営業時間</h4>
                  <p className="text-slate-500 font-bold">10:00～18:00 (平日)</p>
                </div>
              </div>
              <div className="flex gap-8">
                <MapPin className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">所在地</h4>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    〒065-0021<br />
                    北海道札幌市東区北21条東3-1-14-603<br />
                    第2美香保ローズビラ
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <Phone className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">電話番号</h4>
                  <a href="tel:050-1724-2478" className="text-3xl font-black text-blue-900 tabular-nums">050-1724-2478</a>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="bg-white p-10 md:p-14 rounded-[56px] shadow-2xl shadow-slate-900/10">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase text-slate-400 tracking-widest pl-2">
                <span>Last Name</span>
                <span>First Name</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="大渕" className="bg-slate-50 border-transparent rounded-[20px] px-6 py-4 text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" />
                <input type="text" placeholder="新吾" className="bg-slate-50 border-transparent rounded-[20px] px-6 py-4 text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Phone Number</label>
                <input type="tel" placeholder="080-0000-0000" className="w-full bg-slate-50 border-transparent rounded-[20px] px-6 py-4 text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Message</label>
                <textarea placeholder="お車の情報や、ご相談内容を記入してください" className="w-full h-32 bg-slate-50 border-transparent rounded-[20px] px-6 py-4 text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none resize-none"></textarea>
              </div>
              <button disabled className="w-full bg-slate-900 text-white font-black py-5 rounded-[20px] shadow-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 bg-slate-900 text-white text-center">
        <div className="flex gap-8 justify-center mb-12">
          <Link href="/about" className="text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-opacity">ABOUT</Link>
          <Link href="/privacy" className="text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-opacity">PRIVACY</Link>
          <Link href="/terms" className="text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-opacity">TERMS</Link>
        </div>
        <div className="w-12 h-px bg-white/10 mx-auto mb-10" />
        <p className="text-[10px] font-black tracking-[0.5em] opacity-20">
          © {new Date().getFullYear()} {SITE_INFO.name.toUpperCase()}
        </p>
      </footer>

      {/* --- FLOATING CTC --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-[32px] p-4 flex items-center justify-between border border-white/20">
          <div className="flex flex-col pl-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5 opacity-60">Phone Support</span>
            <a href={`tel:${SITE_INFO.phone}`} className="text-xl font-black text-slate-900 leading-none">050-1724-2478</a>
          </div>
          <a href={LINE_URL} target="_blank" rel="noopener" className="bg-[#06C755] text-white px-8 py-4 rounded-[24px] flex items-center gap-3 font-black text-sm shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-[1.03] active:scale-95">
            <MessageCircle size={24} />
            LINE無料査定
          </a>
        </div>
      </div>

    </main>
  );
}
