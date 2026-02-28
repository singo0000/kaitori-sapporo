import Link from 'next/link';

export default function MobileBlogNav({ recentPosts, categories }: { recentPosts: any[], categories: any[] }) {
    return (
        <div className="block lg:hidden w-full overflow-hidden bg-white mb-6 p-4 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                人気の記事・カテゴリー
            </h3>

            {/* Category horizontal slide */}
            <div className="flex gap-2 overflow-x-auto pb-3 snap-x no-scrollbar">
                {categories.map(([name, count]) => (
                    <Link href={`/blog?category=${encodeURIComponent(name)}`} key={name} className="shrink-0 snap-start bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        {name} <span className="text-gray-400 ml-1">({count})</span>
                    </Link>
                ))}
            </div>

            {/* Recent posts horizontal slide */}
            <div className="flex gap-4 overflow-x-auto pb-2 pt-2 snap-x no-scrollbar">
                {recentPosts.slice(0, 4).map((post) => (
                    <Link href={`/blog/${decodeURI(post.slug)}`} key={post.id} className="shrink-0 snap-start w-48 text-decoration-none group">
                        <div className="w-48 h-28 rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100 relative">
                            <img
                                src={post.localFeaturedImage || post.featuredImage || "/about-hero.jpg"}
                                alt={post.title.replace(/<[^>]*>?/gm, '')}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600">
                            {post.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}
