import { Head } from '@inertiajs/react';

import { Navbar } from '@/components/layout/Navbar';
import { heroSlides } from '@/data/heroSlides';
import { HeroSection } from '@/sections/HeroSection';

const pageTitle = 'ZIVIO LIFE | Architectural & Modern Lighting Solutions';
const pageDescription =
    'ZIVIO LIFE creates premium architectural, indoor, outdoor, pole, and solar lighting solutions for residential, commercial, and modern spaces.';

export default function Welcome() {
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
            </main>
        </>
    );
}
