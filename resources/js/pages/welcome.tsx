import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { heroSlides } from '@/data/heroSlides';
import { HeroSection } from '@/sections/HeroSection';

const BrandStorySection = lazy(() =>
    import('@/sections/BrandStorySection').then((module) => ({
        default: module.BrandStorySection,
    })),
);

const CategoryShowcaseSection = lazy(() =>
    import('@/sections/CategoryShowcaseSection').then((module) => ({
        default: module.CategoryShowcaseSection,
    })),
);

const FeaturedApplicationSection = lazy(() =>
    import('@/sections/FeaturedApplicationSection').then((module) => ({
        default: module.FeaturedApplicationSection,
    })),
);

const ProjectsShowcaseSection = lazy(() =>
    import('@/sections/ProjectsShowcaseSection').then((module) => ({
        default: module.ProjectsShowcaseSection,
    })),
);

const ProductsShowcaseSection = lazy(() =>
    import('@/sections/ProductsShowcaseSection').then((module) => ({
        default: module.ProductsShowcaseSection,
    })),
);

const PrecisionCraftsmanshipSection = lazy(() =>
    import('@/sections/PrecisionCraftsmanshipSection').then((module) => ({
        default: module.PrecisionCraftsmanshipSection,
    })),
);

const CatalogueCtaSection = lazy(() =>
    import('@/sections/CatalogueCtaSection').then((module) => ({
        default: module.CatalogueCtaSection,
    })),
);

const pageTitle = 'ZIVIO LIFE | Architectural & Modern Lighting Solutions';
const pageDescription =
    'ZIVIO LIFE creates premium architectural, indoor, outdoor, pole, and solar lighting solutions for residential, commercial, and modern spaces.';

export default function Welcome() {
    const sectionFallback = (
        <div className="min-h-32 bg-gradient-to-b from-[#0A0A0A] to-[#080808]" />
    );

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <link
                    rel="preload"
                    as="image"
                    href={heroSlides[0].image}
                    fetchPriority="high"
                />
            </Head>

            <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F2]">
                <Navbar />
                <HeroSection />
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <BrandStorySection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <CategoryShowcaseSection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <FeaturedApplicationSection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <ProjectsShowcaseSection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <ProductsShowcaseSection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <PrecisionCraftsmanshipSection />
                    </Suspense>
                </LazySection>
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <CatalogueCtaSection />
                    </Suspense>
                </LazySection>
            </main>
        </>
    );
}
