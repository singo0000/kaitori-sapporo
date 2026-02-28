import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import PostCTA from '@/app/components/PostCTA';
import BlogSidebar from '@/app/components/BlogSidebar';
import Link from 'next/link';

// データの読み込み
async function getPosts() {
    const filePath = path.join(process.cwd(), 'data', 'wp-posts.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// 内部リンクを新サイト（Vercel側）の/blogに書き換えるスーパー機能
function rewriteInternalLinks(html: string) {
    if (!html) return "";
    // ansinjp.net という旧ドメイン宛てのリンクを探す（wp-contentなどの画像パスは除く）
    return html.replace(/href="https?:\/\/(?:www\.)?ansinjp\.net\/(?!wp-content\/)([^"\/]+)\/?([^"]*)"/g, (match, p1, p2) => {
        // パスを解析して一番最後の部分（スラッグ）を取り出して /blog/スラッグ に変換
        const parts = [p1, p2].filter(Boolean).join('/').split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        if (slug) {
            return `href="/blog/${slug}"`;
        }
        return `href="/blog"`; // トップへのリンクだった場合などは一覧へ
    });
}

// 静的パスの生成（ビルド時に全ページを作っておくことで爆速にする）
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post: any) => ({
        slug: decodeURI(post.slug), // 日本語スラッグ対策
    }));
}

// 動的メタデータ生成（SEO強化）
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const posts = await getPosts();
    const post = posts.find((p: any) => decodeURI(p.slug) === decodeURI(resolvedParams.slug));

    if (!post) {
        return { title: 'Not Found | くるまど札幌' };
    }

    const title = post.title.replace(/<[^>]*>?/gm, ''); // タグ除去
    const excerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>?/gm, '').substring(0, 120) : '';

    return {
        title: `${title} | くるまど札幌ブログ`,
        description: excerpt,
        openGraph: {
            title: title,
            description: excerpt,
            images: [post.localFeaturedImage || post.featuredImage || '/about-hero.jpg'],
            type: 'article',
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const posts = await getPosts();
    const post = posts.find((p: any) => decodeURI(p.slug) === decodeURI(resolvedParams.slug));

    if (!post) {
        notFound();
    }

    // 内部リンクをスマートに置換
    const rewrittenContent = rewriteInternalLinks(post.content);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            {/* ヒーロー画像エリア */}
            <div className="w-full h-[40vh] md:h-[50vh] relative bg-gray-900 border-b border-gray-200">
                <img
                    src={post.localFeaturedImage || post.featuredImage || "/about-hero.jpg"}
                    alt={post.title.replace(/<[^>]*>?/gm, '')}
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
                        {post.categories && post.categories[0] && (
                            <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm border border-blue-500/30">
                                {post.categories[0]}
                            </span>
                        )}
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                        <div className="flex items-center gap-4 mt-6 text-gray-300 font-medium">
                            <span className="flex items-center gap-1.5 text-sm bg-gray-800/80 px-3 py-1 rounded-lg backdrop-blur-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                公開日: {post.date.split('T')[0]}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm bg-gray-800/80 px-3 py-1 rounded-lg backdrop-blur-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                最終更新: {post.modified.split('T')[0]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* コンテンツエリア */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                <article className="lg:w-2/3 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 md:p-14 mb-8 lg:mb-0">

                    {/* 記事の本文 (Tailwind Typography pluginが綺麗に直してくれる) */}
                    <div
                        className="prose prose-blue prose-lg max-w-none text-gray-700 leading-loose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-headings:text-gray-900 prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: rewrittenContent }}
                    />

                    <hr className="my-12 border-gray-200" />

                    {/* 超強力コンバージョンCTA（毎回下に出る） */}
                    <PostCTA />

                    {/* ナビゲーション */}
                    <div className="mt-12 flex items-center justify-between">
                        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 group">
                            <span className="bg-blue-50 text-blue-600 rounded-full p-2 group-hover:bg-blue-100 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </span>
                            ブログ一覧へ戻る
                        </Link>
                    </div>
                </article>

                {/* 右側サイドバー */}
                <div className="lg:w-1/3 w-full sticky top-24">
                    <BlogSidebar currentPostId={post.id} />
                </div>
            </div>
        </div>
    );
}
