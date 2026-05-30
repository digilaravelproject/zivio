import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

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

const ContactSection = lazy(() =>
    import('@/sections/ContactSection').then((module) => ({
        default: module.ContactSection,
    })),
);

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

const pageTitle = 'ZIVIO LIFE | Light Homepage Preview';
const pageDescription =
    'Light luxury preview of the ZIVIO LIFE homepage for client review.';

export default function LightPreview() {
    useEffect(() => {
        const originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

        return () => {
            window.history.scrollRestoration = originalScrollRestoration;
        };
    }, []);

    const sectionFallback = (
        <div className="min-h-32 bg-gradient-to-b from-[#FAF7F1] to-[#F2EDE4]" />
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

            <main className="home-light-preview min-h-screen bg-[#FAF7F1] text-[#141414]">
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
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <ContactSection />
                    </Suspense>
                </LazySection>
                <Suspense fallback={sectionFallback}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
