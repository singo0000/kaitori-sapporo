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
    const description = `${area.name}にお住まいで${category.shortName}の処分にお困りではありませんか？輸出直販の強みで高価買取・無料引取いたします。LINEですぐに査定可能！`;

    return {
        title,
        description,
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

    return (
        <>
            <HeroSection
                areaName={area.name}
                categoryName={category.name}
                categoryShortName={category.shortName}
            />
            <TrustSection />
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
