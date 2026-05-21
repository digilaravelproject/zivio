import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';

import { Navbar } from '@/components/layout/Navbar';
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
                <Suspense
                    fallback={
                        <div className="h-24 bg-gradient-to-b from-[#0A0A0A] to-[#111111]" />
                    }
                >
                    <BrandStorySection />
                    <CategoryShowcaseSection />
                    <FeaturedApplicationSection />
                    <ProjectsShowcaseSection />
                </Suspense>
            </main>
        </>
    );
}
