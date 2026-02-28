import fs from 'fs';
import path from 'path';
import Link from 'next/link';

async function getSidebarData() {
    const filePath = path.join(process.cwd(), 'data', 'wp-posts.json');
    if (!fs.existsSync(filePath)) return { recentPosts: [], categories: [] };
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf8')).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const categoryCount: Record<string, number> = {};
    posts.forEach((p: any) => {
        if (p.categories) {
            p.categories.forEach((c: string) => {
                categoryCount[c] = (categoryCount[c] || 0) + 1;
            });
        }
    });

    const categories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
    return { recentPosts: posts.slice(0, 10), categories };
}

export default async function BlogSidebar({ currentPostId }: { currentPostId?: number }) {
    const { recentPosts, categories } = await getSidebarData();
    const displayPosts = currentPostId ? recentPosts.filter((p: any) => p.id !== currentPostId).slice(0, 5) : recentPosts.slice(0, 5);

    return (
        <aside className="w-full space-y-8 mt-8 lg:mt-0">
            {/* 新着記事セクション */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    最新の記事
                </h3>
                <div className="space-y-5">
                    {displayPosts.map((post: any) => (
                        <Link href={`/blog/${decodeURI(post.slug)}`} key={post.id} className="group flex gap-4 text-decoration-none h-auto">
                            <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={post.localFeaturedImage || post.featuredImage || "/about-hero.jpg"}
                                    alt={post.title.replace(/<[^>]*>?/gm, '')}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h4>
                                <div className="text-xs text-gray-500 mt-1">{post.date.split('T')[0]}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* カテゴリーセクション */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    カテゴリー
                </h3>
                <ul className="space-y-3">
                    {categories.map(([name, count]) => (
                        <li key={name}>
                            <Link href={`/blog?category=${encodeURIComponent(name)}`} className="group flex items-center justify-between py-1 text-gray-600 hover:text-blue-600 transition-colors">
                                <span className="font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></span>
                                    {name}
                                </span>
                                <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    {count}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* PRエリア */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-sm border border-blue-700 p-6 text-center text-white">
                <h3 className="font-bold text-lg mb-2">もう乗らない車、ありませんか？</h3>
                <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                    札幌市内・近郊なら出張査定無料！<br />動かない車でも0円以上買取保証。
                </p>
                <a href="https://ansinjp.com/" target="_blank" rel="noopener noreferrer" className="inline-block w-full bg-white text-blue-700 font-bold py-3 px-6 rounded-full hover:bg-gray-50 transition shadow-lg transform hover:-translate-y-0.5">
                    無料査定を申し込む
                </a>
            </div>
        </aside>
    );
}
