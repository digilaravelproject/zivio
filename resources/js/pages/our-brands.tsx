import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { BrandsHeroSection } from '@/sections/company/BrandsHeroSection';

const BrandsGridSection = lazy(() =>
    import('@/sections/company/BrandsGridSection').then((module) => ({
        default: module.BrandsGridSection,
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

const pageTitle = 'ZIVIO LIFE | Our Brands';
const pageDescription =
    'Explore ZIVIO LIFE lighting brands for architectural, outdoor, solar, and pole lighting solutions.';

export default function OurBrandsPage() {
    useEffect(() => {
        const originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

        return () => {
            window.history.scrollRestoration = originalScrollRestoration;
        };
    }, []);

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
            </Head>

            <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F2] antialiased">
                {/* Refined Luxury Navbar */}
                <Navbar />

                {/* Eager loaded Hero section for instant visual response */}
                <BrandsHeroSection />

                {/* Lazy-loaded grid section */}
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <BrandsGridSection />
                    </Suspense>
                </LazySection>

                {/* Lazy-loaded Contact form section */}
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <ContactSection />
                    </Suspense>
                </LazySection>

                {/* Footer Section */}
                <Suspense fallback={sectionFallback}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
