"use client";

import { useState, useEffect } from "react";

const CATEGORIES = ["買取ガイド", "廃車・処分", "北海道特化", "カーライフ", "メンテナンス", "ドライブ・観光"];

const PASSWORD = "ansinjp2025";

export default function BlogAdmin() {
    const [authed, setAuthed] = useState(false);
    const [pw, setPw] = useState("");
    const [pwError, setPwError] = useState(false);
    const [view, setView] = useState<"list" | "edit" | "new">("list");
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editPost, setEditPost] = useState<any | null>(null);

    // 実際のデータを読み込む
    useEffect(() => {
        if (authed) {
            setIsLoading(true);
            fetch('/api/posts')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setPosts(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
    }, [authed]);

    // 新規記事フォームの状態
    const [form, setForm] = useState({
        title: "",
        category: "買取ガイド",
        status: "draft" as "draft" | "published",
        content: "",
        metaTitle: "",
        metaDesc: "",
        keyword: "",
        cta: true,
    });
    const [preview, setPreview] = useState(false);
    const [saved, setSaved] = useState(false);

    if (!authed) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">ブログ管理画面</h1>
                        <p className="text-gray-400 text-sm mt-1">くるまど札幌 CMS</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <label className="block text-sm text-gray-400 mb-2">パスワード</label>
                        <input
                            type="password"
                            value={pw}
                            onChange={e => { setPw(e.target.value); setPwError(false); }}
                            onKeyDown={e => { if (e.key === "Enter") { if (pw === PASSWORD) setAuthed(true); else setPwError(true); } }}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                            placeholder="パスワードを入力"
                        />
                        {pwError && <p className="text-red-400 text-sm mb-3">パスワードが違います</p>}
                        <button
                            onClick={() => { if (pw === PASSWORD) setAuthed(true); else setPwError(true); }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors"
                        >ログイン</button>
                    </div>
                    <p className="text-center text-gray-600 text-xs mt-4">※ デモ用パスワード: ansinjp2025</p>
                </div>
            </div>
        );
    }

    // 記事一覧
    if (view === "list") {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                {/* ヘッダー */}
                <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">K</div>
                        <span className="font-bold text-lg">くるまど札幌 CMS</span>
                        <span className="text-gray-500 text-sm">ブログ管理</span>
                    </div>
                    <button
                        onClick={() => { setForm({ title: "", category: "買取ガイド", status: "draft", content: "", metaTitle: "", metaDesc: "", keyword: "", cta: true }); setSaved(false); setView("new"); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        新規記事を書く
                    </button>
                </header>

                <main className="max-w-5xl mx-auto px-6 py-8">
                    {/* 統計 */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { label: "公開記事", value: posts.filter(p => p.status === "published").length, icon: "📄", color: "blue" },
                            { label: "下書き", value: posts.filter(p => p.status === "draft").length, icon: "✏️", color: "yellow" },
                            { label: "今月の合計閲覧", value: "3,210", icon: "👁️", color: "green" },
                        ].map((s, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                                <div className="text-2xl mb-1">{s.icon}</div>
                                <div className="text-3xl font-bold text-white">{s.value}</div>
                                <div className="text-gray-400 text-sm">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* 記事一覧 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                            <h2 className="font-bold text-lg">記事一覧</h2>
                            <span className="text-gray-400 text-sm">{isLoading ? "読み込み中..." : `${posts.length}件`}</span>
                        </div>
                        <div className="divide-y divide-gray-800 h-[600px] overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 text-center text-gray-500">データを取得しています...</div>
                            ) : posts.map(post => (
                                <div key={post.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-800/50 transition-colors group">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === "published" ? "bg-green-900/50 text-green-400 border border-green-800" : "bg-yellow-900/50 text-yellow-400 border border-yellow-800"}`}>
                                                {post.status === "published" ? "公開中" : "下書き"}
                                            </span>
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{post.category}</span>
                                        </div>
                                        <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">{post.title}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">{post.date} · {post.views.toLocaleString()} 閲覧</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => {
                                            setEditPost(post);
                                            // 編集画面用にフォームにもデータをセット
                                            setForm({
                                                title: post.title || "",
                                                category: post.category || "未分類",
                                                status: post.status || "draft",
                                                content: post.content || "",
                                                metaTitle: post.title || "",
                                                metaDesc: (post.excerpt || "").substring(0, 100).replace(/<[^>]*>?/gm, ''), // HTMLタグ除去
                                                keyword: "",
                                                cta: true,
                                            });
                                            setView("edit");
                                        }} className="text-blue-400 hover:text-blue-300 text-sm px-3 py-1.5 border border-blue-800 hover:border-blue-600 rounded-lg transition-colors">編集</button>
                                        <button className="text-red-400 hover:text-red-300 text-sm px-3 py-1.5 border border-red-900 hover:border-red-700 rounded-lg transition-colors">削除</button>
                                    </div>
                                </div>
                            ))}
                            {posts.length === 0 && !isLoading && (
                                <div className="p-8 text-center text-gray-500">記事がありません</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // 新規・編集共通フォーム
    const currentTitle = view === "new" ? form.title : (editPost?.title ?? "");

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* ヘッダー */}
            <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView("list")} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        一覧に戻る
                    </button>
                    <span className="text-gray-700">|</span>
                    <span className="text-gray-300 font-medium text-sm">{view === "new" ? "新規記事" : "記事を編集"}</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPreview(!preview)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${preview ? "bg-gray-700 border-gray-600 text-white" : "border-gray-700 text-gray-400 hover:text-white"}`}
                    >{preview ? "✏️ 編集に戻る" : "👁️ プレビュー"}</button>
                    <button className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                        下書き保存
                    </button>
                    <button
                        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                    >
                        {saved ? "✅ 公開しました！" : "🚀 公開する"}
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-6">
                {/* メインエリア */}
                <div className="col-span-2 space-y-4">
                    {/* タイトル */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <input
                            type="text"
                            value={view === "new" ? form.title : form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="記事タイトルを入力…（例：札幌市南区で車を高く売る方法）"
                            className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-600 focus:outline-none"
                        />
                    </div>

                    {/* AIアシスタントエリア追加 */}
                    <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🤖</span>
                            <div>
                                <h3 className="text-blue-400 font-bold text-sm">AI アシスタント</h3>
                                <p className="text-blue-300/70 text-xs">本文の入力からSEO設定、アイキャッチ画像を自動生成できます。</p>
                            </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                            ✨ フル装備で自動生成（デモ）
                        </button>
                    </div>

                    {/* 本文エディタ */}
                    {!preview ? (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                            <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                                {["太字", "見出し", "リスト", "リンク", "画像"].map(t => (
                                    <button key={t} className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-800 transition-colors">{t}</button>
                                ))}
                            </div>
                            <textarea
                                value={form.content}
                                onChange={e => setForm({ ...form, content: e.target.value })}
                                placeholder={`# 見出し\n\n記事の本文をここに入力…\n\nマークダウン形式で書けます。\n\n---\n\n## よくある質問\n\n**Q. 動かない車でも買取できますか？**\n\nA. はい、不動車・廃車・事故車でも対応可能です…`}
                                rows={25}
                                className="w-full bg-transparent text-gray-300 p-5 focus:outline-none text-sm leading-relaxed resize-none"
                            // dangerouslySetInnerHTMLを模倣せずにそのままテキスト編集できるようにするデモ
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 prose prose-invert max-w-none">
                            <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: form.content }} />
                        </div>
                    )}
                </div>

                {/* サイドバー */}
                <div className="space-y-4">
                    {/* 公開設定 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-4">公開設定</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">ステータス</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="draft">下書き</option>
                                    <option value="published">公開</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">カテゴリ</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[...new Set([...CATEGORIES, form.category])].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* アイキャッチ画像 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">アイキャッチ画像</h3>
                            <button className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 border border-blue-900/50 hover:bg-blue-900/30 rounded transition-colors flex items-center gap-1">
                                <span>✨</span> AIで生成
                            </button>
                        </div>

                        {view === "edit" && editPost?.featuredImage ? (
                            <div className="relative group rounded-xl overflow-hidden border border-gray-700">
                                <img src={editPost.featuredImage} alt="アイキャッチ" className="w-full h-auto object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-700">変更する</button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-blue-600 transition-colors cursor-pointer bg-gray-800/50">
                                <div className="text-3xl mb-2">🖼️</div>
                                <p className="text-gray-400 text-sm">クリックして画像をアップロード</p>
                                <p className="text-gray-600 text-xs mt-1">推奨: 1200×630px</p>
                            </div>
                        )}
                    </div>

                    {/* SEO設定 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-4">SEO設定</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">フォーカスキーワード</label>
                                <input
                                    type="text"
                                    value={form.keyword}
                                    onChange={e => setForm({ ...form, keyword: e.target.value })}
                                    placeholder="例: 札幌 車買取"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">SEOタイトル</label>
                                <input
                                    type="text"
                                    value={form.metaTitle}
                                    onChange={e => setForm({ ...form, metaTitle: e.target.value })}
                                    placeholder="検索結果に表示されるタイトル"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">メタ説明</label>
                                <textarea
                                    rows={3}
                                    value={form.metaDesc}
                                    onChange={e => setForm({ ...form, metaDesc: e.target.value })}
                                    placeholder="検索結果に表示される説明文（120文字以内）"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 買取LP誘導 */}
                    <div className="bg-blue-950/50 border border-blue-900/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-sm text-blue-300">買取LP誘導バナー</h3>
                            <button
                                onClick={() => setForm({ ...form, cta: !form.cta })}
                                className={`w-10 h-6 rounded-full transition-colors relative ${form.cta ? "bg-blue-600" : "bg-gray-700"}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.cta ? "left-5" : "left-1"}`} />
                            </button>
                        </div>
                        <p className="text-blue-400 text-xs">ONにすると記事末尾に<br />「無料査定はこちら」が自動挿入されます</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
