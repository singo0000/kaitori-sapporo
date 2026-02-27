'use client';

import { Building2, Target, Heart, MessageSquare, MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">会社情報</h1>
                    <p className="text-slate-400 text-xl font-light tracking-widest uppercase">About Us</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-xl mb-6 shadow-lg shadow-blue-200 text-white">
                            <Target size={32} />
                        </div>
                        <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Mission</h2>
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">クルマの未来をもっと自由に。</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            私たちは、買取・販売・情報発信を通じて、お客様が最適な選択をできる環境を提供します。
                            柔軟なサービスと信頼のネットワークで、カーライフの新しい可能性を創造します。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "柔軟な発想と対応力",
                                desc: "変化を恐れず、常に最適なサービスを追求する。",
                                icon: <MessageSquare className="text-blue-600" />
                            },
                            {
                                title: "誠実な対応と信頼の構築",
                                desc: "お客様・取引先との信頼を第一に、丁寧で誠実な対応を心がける。",
                                icon: <Heart className="text-blue-600" />
                            },
                            {
                                title: "挑戦と成長の継続",
                                desc: "現状に満足せず、新しいことに挑戦し続ける姿勢を大切にする。",
                                icon: <Building2 className="text-blue-600" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="mb-4">{item.icon}</div>
                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Message Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2 text-center">Message</h2>
                    <h3 className="text-3xl font-bold text-slate-900 text-center mb-10">運営からのメッセージ</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 space-y-5 text-slate-600 leading-relaxed">
                        <p>
                            「出張買取サポート札幌」は、一人ひとりのお客様に寄り添い、最適な解決策を提案し続けてきました。車の売却や購入は、人生の中でも大きな決断の一つです。
                        </p>
                        <p>
                            そのため、私たちは単なる買取業者としてだけではなく、お客様の「満足と安心」を最優先に考えたサービスを提供しています。
                        </p>
                        <p>
                            車の知識だけでなく、お客様とのコミュニケーションを大切にし、信頼されるパートナーであり続けるために努力を惜しみません。
                        </p>
                        <p>
                            私たちのサービスは、ただ車を売ったり買ったりするだけにとどまりません。出張買取やアプリを活用した便利な査定など、時代に合わせたサービスを提供することで、お客様にとってより便利で効率的な選択肢をお届けします。
                        </p>
                        <p>
                            今後とも、お客様の信頼に応えるべく、精進してまいりますので、どうぞよろしくお願いいたします。
                        </p>
                        <div className="pt-4">
                            <p className="text-slate-700 font-bold border-l-4 border-blue-600 pl-4">出張買取サポート札幌 スタッフ一同</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Profile Section */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-center">会社概要</h2>
                    <div className="grid grid-cols-1 gap-px bg-slate-800 rounded-2xl overflow-hidden border border-slate-800">
                        {[
                            { label: "会社名", val: "出張買取サポート札幌" },
                            { label: "所在地", val: "北海道札幌市東区北21条東3-1-14-603 第2美香保ローズビラ" },
                            { label: "主な事業内容", val: "車の出張査定買取サービス、中古車販売サービス、自動車総合情報サイトの運営、査定アドバイザー業務" },
                            { label: "関連サービス", val: "くるまど札幌／KURUMADO Sapporo" },
                            { label: "加入団体", val: "札幌商工会議所、発寒北商店街振興組合" },
                            { label: "古物商許可", val: "北海道公安委員会 第101030002184号" }
                        ].map((item, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 bg-slate-900 p-6 gap-2">
                                <div className="text-slate-400 text-sm font-medium">{item.label}</div>
                                <div className="md:col-span-3 text-slate-100">{item.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section Preview */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">お問い合わせ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <Clock className="text-blue-600 mb-4" size={32} />
                            <p className="font-bold">営業時間</p>
                            <p className="text-slate-600">10:00～18:00</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Mail className="text-blue-600 mb-4" size={32} />
                            <p className="font-bold">Email</p>
                            <p className="text-slate-600">support@ansinjp.com</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <MapPin className="text-blue-600 mb-4" size={32} />
                            <p className="font-bold">所在地</p>
                            <p className="text-slate-600 text-sm">札幌市東区北21条東3-1-14-603</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
                <p>© 2025 出張買取サポート札幌. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
