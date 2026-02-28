import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
    title: '車買取・廃車ガイド｜くるまど札幌',
    description: '札幌や北海道に特化した車の高価買取、廃車、メンテナンスに関する専門ガイド記事一覧です。',
};

// データの読み込み
async function getPosts() {
    const filePath = path.join(process.cwd(), 'data', 'wp-posts.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContents);
    // ソート（新しい順）
    return posts.sort((a: any, b: any) => b.id - a.id);
}

export default async function BlogIndex() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">クルマの買取・お役立ちガイド</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        札幌での高価買取のコツや、廃車手続き、北海道ならではの冬道メンテナンスなど、プロの視点で徹底解説します。
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">記事が見つかりません</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link href={`/blog/${decodeURI(post.slug)}`} key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={post.localFeaturedImage || post.featuredImage || "/about-hero.jpg"}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {post.categories && post.categories[0] && (
                                        <div className="absolute top-4 outline-none left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                            {post.categories[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="text-gray-400 text-sm mb-2">{post.date.split('T')[0]}</div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h2>
                                    <div
                                        className="text-gray-600 text-sm line-clamp-3 mt-auto"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
