import fs from 'fs';
import path from 'path';

// URL
const API_URL = 'https://ansinjp.net/wp-json/wp/v2';
const OUTPUT_DIR = path.join(process.cwd(), 'data');

async function fetchPosts() {
    try {
        console.log('Fetching total number of posts...');
        const initRes = await fetch(`${API_URL}/posts?per_page=1`);
        const totalPosts = parseInt(initRes.headers.get('x-wp-total') || '0', 10);
        console.log(`Found ${totalPosts} posts.`);

        if (totalPosts === 0) return;

        let allPosts = [];
        let page = 1;

        while (allPosts.length < totalPosts) {
            console.log(`Fetching page ${page}...`);
            const res = await fetch(`${API_URL}/posts?per_page=100&page=${page}&_embed`);
            const posts = await res.json();

            if (!posts || posts.length === 0) break;

            for (const post of posts) {
                // アイキャッチ画像のURLを取得
                let featuredImageUrl = '';
                if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                    featuredImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
                }

                // カテゴリ名の取得
                let categories = [];
                if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
                    categories = post._embedded['wp:term'][0].map((term: any) => term.name);
                }

                allPosts.push({
                    id: post.id,
                    title: post.title.rendered,
                    slug: post.slug,
                    date: post.date,
                    modified: post.modified,
                    content: post.content.rendered,
                    excerpt: post.excerpt.rendered,
                    featuredImage: featuredImageUrl,
                    categories: categories,
                });
            }
            page++;
        }

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        fs.writeFileSync(
            path.join(OUTPUT_DIR, 'wp-posts.json'),
            JSON.stringify(allPosts, null, 2),
            'utf-8'
        );

        console.log(`Success: Extracted ${allPosts.length} posts and saved to data/wp-posts.json`);
    } catch (error) {
        console.error('Error extracting posts:', error);
    }
}

fetchPosts();
