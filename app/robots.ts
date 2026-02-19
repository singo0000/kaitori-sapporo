import { MetadataRoute } from 'next';
import { SITE_INFO } from '@/app/data/config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api/'], // 管理画面やAPIエンドポイントは隠す
        },
        sitemap: `https://${SITE_INFO.domain}/sitemap.xml`,
    };
}
