import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { TeamHeroSection } from '@/sections/company/TeamHeroSection';

const TeamGridSection = lazy(() =>
    import('@/sections/company/TeamGridSection').then((module) => ({
        default: module.TeamGridSection,
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

const pageTitle = 'ZIVIO LIFE | Our Team';
const pageDescription =
    'Meet the ZIVIO LIFE team behind premium architectural and modern lighting solutions.';

export default function TeamsPage() {
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
                <TeamHeroSection />

                {/* Lazy-loaded grid section */}
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <TeamGridSection />
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
