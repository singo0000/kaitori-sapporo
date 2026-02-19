import { MetadataRoute } from 'next';
import { TARGET_AREAS, TARGET_CATEGORIES, TARGET_VEHICLES, SITE_INFO } from '@/app/data/config';

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

    // 3. エリア × カテゴリ × 車種ページ (超大量生成)
    // config.ts から TARGET_VEHICLES をインポートする必要がありますが、
    // ここでは sitemap.ts の冒頭でインポート済みと仮定
    const vehicleRoutes = TARGET_AREAS.flatMap((area) =>
        TARGET_CATEGORIES.flatMap((category) => {
            // このカテゴリに属する車種を抽出
            const vehicles = TARGET_VEHICLES.filter(v => v.categorySlug === category.slug);

            return vehicles.map((vehicle) => ({
                url: `${baseUrl}/${area.slug}/${category.slug}/${vehicle.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
        })
    );

    return [...routes, ...areaCategoryRoutes, ...vehicleRoutes];
}
