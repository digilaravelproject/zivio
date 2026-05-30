import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { AboutHeroSection } from '@/sections/about/AboutHeroSection';

const AboutIntroSection = lazy(() =>
    import('@/sections/about/AboutIntroSection').then((module) => ({
        default: module.AboutIntroSection,
    })),
);

const AboutPhilosophySection = lazy(() =>
    import('@/sections/about/AboutPhilosophySection').then((module) => ({
        default: module.AboutPhilosophySection,
    })),
);

const AboutValuesSection = lazy(() =>
    import('@/sections/about/AboutValuesSection').then((module) => ({
        default: module.AboutValuesSection,
    })),
);

const AboutPartnersSection = lazy(() =>
    import('@/sections/about/AboutPartnersSection').then((module) => ({
        default: module.AboutPartnersSection,
    })),
);

const AboutTeamSection = lazy(() =>
    import('@/sections/about/AboutTeamSection').then((module) => ({
        default: module.AboutTeamSection,
    })),
);

const AboutTestimonialsSection = lazy(() =>
    import('@/sections/about/AboutTestimonialsSection').then((module) => ({
        default: module.AboutTestimonialsSection,
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

const pageTitle = 'ZIVIO LIFE | About Company — Architectural Lighting Benchmarks';
const pageDescription =
    'Discover ZIVIO LIFE’s dedication to precision engineering, sustainable innovation, luxury design, and outstanding architectural outdoor and indoor lighting solutions.';

export default function AboutCompany() {
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
                <AboutHeroSection />

                {/* Lazy-loaded components grouped for progressive render */}
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutIntroSection />
                    </Suspense>
                </LazySection>

                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutPhilosophySection />
                    </Suspense>
                </LazySection>

                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutValuesSection />
                    </Suspense>
                </LazySection>

                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutPartnersSection />
                    </Suspense>
                </LazySection>

                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutTeamSection />
                    </Suspense>
                </LazySection>

                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <AboutTestimonialsSection />
                    </Suspense>
                </LazySection>

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
