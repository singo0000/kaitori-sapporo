import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import BlogSidebar from '@/app/components/BlogSidebar';

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
    return posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogIndex(props: { searchParams: Promise<{ category?: string, page?: string }> }) {
    const searchParams = await props.searchParams;
    let posts = await getPosts();

    const category = searchParams?.category ? decodeURIComponent(searchParams.category) : null;
    if (category) {
        posts = posts.filter((p: any) => p.categories && p.categories.includes(category));
    }

    const pageParam = searchParams?.page || '1';
    let currentPage = parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10);
    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

    const PER_PAGE = 12;
    const totalPages = Math.ceil(posts.length / PER_PAGE);

    // トップページ（1ページ目＆カテゴリ指定なし）の場合、最新の1件をヒーロー記事として大きく表示
    const featuredPost = (!category && currentPage === 1 && posts.length > 0) ? posts[0] : null;

    // ヒーロー記事がある場合は、一覧には2件目以降を表示
    const startIndex = featuredPost ? 1 : (currentPage - 1) * PER_PAGE;
    const endIndex = featuredPost ? 1 + PER_PAGE : currentPage * PER_PAGE;
    const displayPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {category ? `「${category}」の記事一覧` : 'クルマの買取・お役立ちガイド'}
                    </h1>
                    {!category && (
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            札幌での高価買取のコツや、廃車手続き、北海道ならではの冬道メンテナンスなど、プロの視点で徹底解説します。
                        </p>
                    )}
                </div>

                {/* ヒーロー記事（トップページ最新時のみ） */}
                {featuredPost && (
                    <Link href={`/blog/${decodeURI(featuredPost.slug)}`} className="group flex flex-col md:flex-row mb-12 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-decoration-none">
                        <div className="w-full md:w-3/5 aspect-video md:aspect-auto h-64 md:h-96 bg-gray-100 overflow-hidden relative">
                            <img
                                src={featuredPost.localFeaturedImage || featuredPost.featuredImage || "/about-hero.jpg"}
                                alt={featuredPost.title.replace(/<[^>]*>?/gm, '')}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                            {featuredPost.categories && featuredPost.categories[0] && (
                                <div className="absolute top-4 outline-none left-4 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md z-10">
                                    {featuredPost.categories[0]}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                            <div className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {featuredPost.date.split('T')[0]}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight" dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                            <div
                                className="text-gray-600 text-base line-clamp-3 mb-6"
                                dangerouslySetInnerHTML={{ __html: featuredPost.excerpt || '' }}
                            />
                            <div className="mt-auto text-blue-600 font-bold flex items-center gap-2 inline-flex group-hover:gap-3 transition-all">
                                記事を読む <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </Link>
                )}

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* メイン記事一覧 */}
                    <div className="lg:w-2/3 w-full">
                        {posts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-500">
                                記事が見つかりません
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {displayPosts.map((post: any) => (
                                        <Link href={`/blog/${decodeURI(post.slug)}`} key={post.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-decoration-none">
                                            <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                                                <img
                                                    src={post.localFeaturedImage || post.featuredImage || "/about-hero.jpg"}
                                                    alt={post.title.replace(/<[^>]*>?/gm, '')}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                {post.categories && post.categories[0] && (
                                                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
                                                        {post.categories[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="text-gray-400 text-xs mb-2 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {post.date.split('T')[0]}
                                                </div>
                                                <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug" dangerouslySetInnerHTML={{ __html: post.title }} />
                                                <div
                                                    className="text-gray-500 text-sm line-clamp-2 mt-auto"
                                                    dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* ページネーション */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-2">
                                        {currentPage > 1 && (
                                            <Link href={`/blog?page=${currentPage - 1}${category ? `&category=${encodeURIComponent(category)}` : ''}`} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm">
                                                前のページ
                                            </Link>
                                        )}
                                        <div className="px-4 py-2 text-gray-500 font-medium text-sm">
                                            {currentPage} / {totalPages}
                                        </div>
                                        {currentPage < totalPages && (
                                            <Link href={`/blog?page=${currentPage + 1}${category ? `&category=${encodeURIComponent(category)}` : ''}`} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm">
                                                次のページ
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* 右側サイドバー */}
                    <div className="lg:w-1/3 w-full sticky top-24">
                        <BlogSidebar />
                    </div>

                </div>
            </div>
        </div>
    );
}
