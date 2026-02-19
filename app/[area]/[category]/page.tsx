import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    TARGET_AREAS,
    TARGET_CATEGORIES,
    SITE_INFO,
} from "@/app/data/config";
import HeroSection from "@/app/components/HeroSection";
import TrustSection from "@/app/components/TrustSection";
import PainPointsSection from "@/app/components/PainPointsSection";
import ProcessSection from "@/app/components/ProcessSection";
import FAQSection from "@/app/components/FAQSection";
import Footer from "@/app/components/Footer";
import StickyFooter from "@/app/components/StickyFooter";
import AreaContent from "@/app/components/AreaContent";
import TargetVehiclesSection from "@/app/components/TargetVehiclesSection";

interface PageProps {
    params: Promise<{
        area: string;
        category: string;
    }>;
}

// 静的パスの生成
export async function generateStaticParams() {
    const paths: { area: string; category: string }[] = [];
    for (const area of TARGET_AREAS) {
        for (const category of TARGET_CATEGORIES) {
            paths.push({
                area: area.slug,
                category: category.slug,
            });
        }
    }
    return paths;
}

// 動的メタデータ生成
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { area: areaSlug, category: categorySlug } = await params;

    const area = TARGET_AREAS.find((a) => a.slug === areaSlug);
    const category = TARGET_CATEGORIES.find((c) => c.slug === categorySlug);

    if (!area || !category) {
        return {};
    }

    const title = `${area.name}で${category.shortName}の高価買取なら${SITE_INFO.name} | 査定無料`;
    const description = `${area.name}にお住まいで${category.shortName}の処分にお困りではありませんか？輸出直販の強みで高価買取・無料引取いたします。${area.description}`;
    const keywords = [area.name, category.shortName, "買取", "査定", "廃車", ...(area.keywords || [])];

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            locale: "ja_JP",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `/${area.slug}/${category.slug}`,
        },
    };
}

export default async function AreaCategoryPage({ params }: PageProps) {
    const { area: areaSlug, category: categorySlug } = await params;

    const area = TARGET_AREAS.find((a) => a.slug === areaSlug);
    const category = TARGET_CATEGORIES.find((c) => c.slug === categorySlug);

    if (!area || !category) {
        notFound();
    }

    // 構造化データ (BreadcrumbList)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "TOP",
                "item": "https://kaitori-sapporo.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `${area.name} ${category.shortName}買取`,
                "item": `https://kaitori-sapporo.com/${area.slug}/${category.slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection
                areaName={area.name}
                categoryName={category.name}
                categoryShortName={category.shortName}
                heroImage={category.heroImage}
            />
            <TrustSection />
            <AreaContent
                areaName={area.name}
                categoryShortName={category.shortName}
                areaDescription={area.description}
                keywords={area.keywords}
            />
            <TargetVehiclesSection
                categoryShortName={category.shortName}
                targetVehicles={category.targetVehicles}
            />
            <PainPointsSection
                areaName={area.name}
                categoryShortName={category.shortName}
                painPoints={category.painPoints}
                features={category.features}
            />
            <ProcessSection />
            <FAQSection
                areaName={area.name}
                categoryShortName={category.shortName}
            />
            <Footer
                areaName={area.name}
                categoryShortName={category.shortName}
            />
            <StickyFooter />
        </>
    );
}
