import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { heroSlides } from '@/data/heroSlides';
import {
    homepageSeo,
    homepageStructuredData,
} from '@/lib/homepage-seo';
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

export default function Welcome() {
    useEffect(() => {
        const originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

        return () => {
            window.history.scrollRestoration = originalScrollRestoration;
        };
    }, []);

    const sectionFallback = <div className="min-h-32 bg-[#F1EADF]" />;

    return (
        <>
            <Head title={homepageSeo.title}>
                <meta name="description" content={homepageSeo.description} />
                <meta name="keywords" content={homepageSeo.keywords} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={homepageSeo.url} />

                <meta property="og:title" content={homepageSeo.title} />
                <meta
                    property="og:description"
                    content={homepageSeo.description}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={homepageSeo.url} />
                <meta property="og:image" content={homepageSeo.imageUrl} />
                <meta
                    property="og:image:secure_url"
                    content={homepageSeo.imageUrl}
                />
                <meta property="og:image:width" content={homepageSeo.imageWidth} />
                <meta
                    property="og:image:height"
                    content={homepageSeo.imageHeight}
                />
                <meta
                    property="og:image:alt"
                    content="ZIVIO LIFE premium architectural lighting solutions"
                />
                <meta property="og:site_name" content={homepageSeo.siteName} />
                <meta property="og:locale" content={homepageSeo.locale} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={homepageSeo.title} />
                <meta
                    name="twitter:description"
                    content={homepageSeo.description}
                />
                <meta name="twitter:image" content={homepageSeo.imageUrl} />
                <meta
                    name="twitter:image:alt"
                    content="ZIVIO LIFE premium architectural lighting solutions"
                />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link
                    rel="preload"
                    as="image"
                    href={heroSlides[0].image}
                    fetchPriority="high"
                />
                <script type="application/ld+json">
                    {JSON.stringify(homepageStructuredData)}
                </script>
            </Head>

            <main className="min-h-screen bg-[#F1EADF] text-[#171512]">
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
