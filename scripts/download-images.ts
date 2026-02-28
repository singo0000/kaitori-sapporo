import fs from 'fs';
import path from 'path';
import https from 'https';

const POSTS_FILE = path.join(process.cwd(), 'data', 'wp-posts.json');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'blog-images');

async function downloadImage(url: string, filepath: string) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                // Handle redirect
                if (res.headers.location) {
                    downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                } else {
                    reject(new Error("Redirect with no location header"));
                }
            } else {
                res.resume();
                reject(new Error(`Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function run() {
    if (!fs.existsSync(IMAGE_DIR)) {
        fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }

    const rawData = fs.readFileSync(POSTS_FILE, 'utf-8');
    const posts = JSON.parse(rawData);

    let downloadedCount = 0;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.featuredImage && post.featuredImage.startsWith('https://')) {
            const ext = path.extname(post.featuredImage).split('?')[0] || '.jpg';
            const filename = `featured-${post.id}${ext}`;
            const filepath = path.join(IMAGE_DIR, filename);
            const localUrl = `/blog-images/${filename}`;

            try {
                if (!fs.existsSync(filepath)) {
                    console.log(`Downloading [${i + 1}/${posts.length}]: ${post.featuredImage}`);

                    const urlObj = new URL(post.featuredImage);
                    // Decode first in case it's partially encoded, then encode fully
                    const decodedPathname = decodeURI(urlObj.pathname);
                    const encodedUrl = urlObj.origin + encodeURI(decodedPathname) + urlObj.search;

                    await downloadImage(encodedUrl, filepath);
                    downloadedCount++;
                    // Small delay to avoid hammering the server
                    await new Promise(r => setTimeout(r, 100));
                } else {
                    // Already downloaded
                }
                post.localFeaturedImage = localUrl;
            } catch (err: any) {
                console.error(`Failed to download (ID: ${post.id}): ${post.featuredImage}`, err.message || err);
            }
        }
    }

    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`\nFinished! Downloaded ${downloadedCount} new images. JSON updated.`);
}

run();
