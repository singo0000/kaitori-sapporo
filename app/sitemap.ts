import { MetadataRoute } from 'next';
import { TARGET_AREAS, TARGET_CATEGORIES, SITE_INFO } from '@/app/data/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = `https://${SITE_INFO.domain}`;

    // 1. トップページ
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
    ];

    // 2. エリア × カテゴリページ (動的生成)
    const areaCategoryRoutes = TARGET_AREAS.flatMap((area) =>
        TARGET_CATEGORIES.map((category) => ({
            url: `${baseUrl}/${area.slug}/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    return [...routes, ...areaCategoryRoutes];
}
