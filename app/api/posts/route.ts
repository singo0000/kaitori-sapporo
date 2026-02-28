import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'wp-posts.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json([]);
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const posts = JSON.parse(fileContents);

        // パフォーマンスのため、一覧表示に必要なデータだけを抽出して成形
        const formattedPosts = posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            category: post.categories && post.categories.length > 0 ? post.categories[0] : "未分類",
            status: "published",
            date: post.date.split('T')[0],
            views: Math.floor(Math.random() * (1500 - 100) + 100), // テスト用のダミー閲覧数
            content: post.content, // 詳細画面用
            excerpt: post.excerpt,
            slug: post.slug,
            featuredImage: post.localFeaturedImage || post.featuredImage || ""
        }));

        // 日付の新しい順にソート (ID順＝日付順と仮定)
        formattedPosts.sort((a: any, b: any) => b.id - a.id);

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error("Failed to read posts API:", error);
        return NextResponse.json({ error: 'Failed to read posts data' }, { status: 500 });
    }
}
