import { Head } from '@inertiajs/react';
import { lazy, Suspense, useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { ContactHeroSection } from '@/sections/contact/ContactHeroSection';

const ContactFormSection = lazy(() =>
    import('@/sections/contact/ContactFormSection').then((module) => ({
        default: module.ContactFormSection,
    })),
);

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

const pageTitle = 'ZIVIO LIFE | Contact Us';
const pageDescription =
    'Contact ZIVIO LIFE for architectural, indoor, outdoor, pole, and solar lighting solutions.';

export default function ContactPage() {
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
                {/* Navbar */}
                <Navbar />

                {/* Eager loaded Hero */}
                <ContactHeroSection />

                {/* Lazy loaded Form & Studio maps */}
                <LazySection minHeight="min-h-40">
                    <Suspense fallback={sectionFallback}>
                        <ContactFormSection />
                    </Suspense>
                </LazySection>

                {/* Lazy footer */}
                <Suspense fallback={sectionFallback}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
