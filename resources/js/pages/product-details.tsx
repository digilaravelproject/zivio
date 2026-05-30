import { Head, Link } from '@inertiajs/react';
import { useMemo, useEffect, lazy, Suspense } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { ProductDetailGallery } from '@/components/products/ProductDetailGallery';
import { ProductListingCard } from '@/components/products/ProductListingCard';
import { productsCatalogData } from '@/data/productsCatalogData';
import { Reveal } from '@/components/animations/Reveal';

type ProductDetailsPageProps = {
    slug: string;
};

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

export default function ProductDetailsPage({ slug }: ProductDetailsPageProps) {
    // Scroll to top instantly on slug change/mount
    useEffect(() => {
        const originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

        return () => {
            window.history.scrollRestoration = originalScrollRestoration;
        };
    }, [slug]);

    // Find active product
    const product = useMemo(() => {
        return productsCatalogData.find((p) => p.slug === slug);
    }, [slug]);

    // Find related products (same category/type, max 4, excluding current product)
    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return productsCatalogData
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product]);

    if (!product) {
        return (
            <>
                <Head title="Product Not Found | ZIVIO LIFE" />
                <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F2] flex flex-col justify-between antialiased">
                    <Navbar />
                    <div className="flex-1 flex flex-col items-center justify-center py-40 px-4 text-center">
                        <div className="h-[1.5px] w-16 bg-[#B88A2A] mb-6" />
                        <h1 className="text-3xl font-semibold mb-4 text-[#F8F5EC]">Product Not Found</h1>
                        <p className="font-sans text-sm text-[#A6A6A2] max-w-md mb-8">
                            The architectural lighting system you are looking for has been relocated or is currently catalogued under a different identifier.
                        </p>
                        <Link
                            href="/products"
                            className="border border-[#B88A2A] bg-[#B88A2A]/10 px-6 py-3 font-sans text-xs font-bold tracking-[0.2em] text-[#F8F5EC] uppercase transition-all duration-300 hover:bg-[#B88A2A] hover:text-[#0A0A0A]"
                        >
                            Return to Collection
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const pageTitle = `${product.name} | ZIVIO LIFE`;
    const pageDescription = product.shortDescription;

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

                {/* Breadcrumbs & Navigation Back */}
                <section className="relative px-4 pt-28 pb-6 sm:px-6 lg:px-10 lg:pt-36">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.05] pb-4">
                            <div className="flex items-center gap-2 font-sans text-[0.72rem] font-bold tracking-[0.22em] text-[#D8D3C8] uppercase">
                                <Link href="/" className="transition hover:text-[#B88A2A]">Home</Link>
                                <span className="text-white/25">/</span>
                                <Link href="/products" className="transition hover:text-[#B88A2A]">Collection</Link>
                                <span className="text-white/25">/</span>
                                <Link href={`/products/${product.category.toLowerCase()}`} className="transition hover:text-[#B88A2A]">{product.category}</Link>
                                <span className="text-white/25">/</span>
                                <span className="text-[#DA9807]">{product.name}</span>
                            </div>

                            <Link
                                href="/products"
                                className="font-sans text-[0.68rem] font-bold tracking-[0.16em] text-[#CFCFCB] uppercase transition hover:text-[#F8F5EC]"
                            >
                                ← Back to Collection
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Main Product Details Layout */}
                <section className="px-4 pb-20 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Left Column: Image Gallery */}
                            <div className="lg:col-span-6">
                                <Reveal threshold={0.1}>
                                    <ProductDetailGallery images={product.gallery} name={product.name} />
                                </Reveal>
                            </div>

                            {/* Right Column: Specifications & Content */}
                            <div className="lg:col-span-6 flex flex-col justify-start">
                                <Reveal threshold={0.1} delay={80}>
                                    {/* Labels */}
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span className="text-luxury-label">
                                            {product.category}
                                        </span>
                                        <span className="text-white/25 text-xs">•</span>
                                        <span className="font-sans text-[0.74rem] font-bold tracking-[0.2em] text-[#D8D3C8] uppercase">
                                            {product.type}
                                        </span>
                                    </div>

                                    {/* Product Title */}
                                    <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl text-[#F8F5EC] mb-5 tracking-wide">
                                        {product.name}
                                    </h1>

                                    {/* Short Description */}
                                    <p className="font-sans text-lg leading-9 text-[#F8F5EC] mb-6 tracking-wide">
                                        {product.shortDescription}
                                    </p>

                                    {/* Detailed Description */}
                                    <p className="font-sans text-[0.92rem] leading-8 text-[#D8D3C8] mb-8">
                                        {product.description}
                                    </p>

                                    {/* Key Highlight Specs */}
                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {product.specs.map((spec) => (
                                            <span
                                                key={spec}
                                                className="rounded-full border border-[#B88A2A]/40 bg-[#B88A2A]/6 px-3 py-1 font-sans text-xs font-semibold tracking-wide text-[#D2B276]"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Box */}
                                    <div className="border border-white/[0.08] bg-[#111111]/40 backdrop-blur-md p-6 sm:p-8 rounded-sm relative overflow-hidden mb-10">
                                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B88A2A]/40 to-transparent" />
                                        <h3 className="text-lg font-semibold text-[#F8F5EC] mb-2">Request Specification Sheet</h3>
                                        <p className="font-sans text-xs leading-5 text-[#A6A6A2] mb-5">
                                            Contact our lighting consultants to receive detailed technical drawings, photometric files (.IES/.LDT), and customized pricing models for your project scope.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={`/contact?product=${encodeURIComponent(product.name)}`}
                                                className="flex-1 inline-flex items-center justify-center border border-[#DA9807]/70 bg-[#DA9807]/10 px-5 py-3 text-center text-xs font-semibold tracking-[0.18em] text-[#F5F5F2] uppercase backdrop-blur-sm transition duration-300 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
                                            >
                                                Send Inquiry
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="flex-1 inline-flex items-center justify-center border border-white/10 bg-white/[0.015] px-5 py-3 text-center text-xs font-semibold tracking-[0.18em] text-[#F5F5F2] uppercase transition duration-300 hover:border-[#DA9807] hover:bg-[#DA9807]/5 hover:text-[#DA9807]"
                                            >
                                                View Similar Systems
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* Technical Specifications Table */}
                        <div className="mt-20 border-t border-white/[0.06] pt-16">
                            <div className="grid gap-12 lg:grid-cols-12">
                                <div className="lg:col-span-4">
                                    <Reveal threshold={0.15}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="h-[1px] w-6 bg-[#B88A2A]" />
                                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                                DETAILS
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-[#F8F5EC] sm:text-3xl leading-tight">
                                            Technical Specifications
                                        </h2>
                                        <p className="mt-4 font-sans text-xs leading-5 text-[#A6A6A2]">
                                            Engineered compliance standards, physical tolerances, and photometric configurations for architectural consistency.
                                        </p>
                                    </Reveal>
                                </div>
                                <div className="lg:col-span-8">
                                    <Reveal threshold={0.15} delay={80}>
                                        <div className="border border-white/[0.06] bg-[#111111]/10 overflow-hidden">
                                            <table className="w-full text-left font-sans text-[0.78rem] border-collapse">
                                                <tbody>
                                                    {product.technicalSpecs.map((spec, idx) => (
                                                        <tr
                                                            key={spec.label}
                                                            className={`border-b border-white/[0.04] transition-colors duration-300 hover:bg-white/[0.01] ${idx % 2 === 0 ? 'bg-white/[0.005]' : ''}`}
                                                        >
                                                            <td className="px-5 py-4 font-bold text-[#F8F5EC] w-1/3">
                                                                {spec.label}
                                                            </td>
                                                            <td className="px-5 py-4 text-[#D8D3C8]">
                                                                {spec.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Reveal>
                                </div>
                            </div>
                        </div>

                        {/* Application Area Specs */}
                        <div className="mt-16 border-t border-white/[0.06] pt-16">
                            <div className="grid gap-12 lg:grid-cols-12">
                                <div className="lg:col-span-4">
                                    <Reveal threshold={0.15}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="h-[1px] w-6 bg-[#B88A2A]" />
                                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                                SPATIAL PLANNING
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-[#F8F5EC] sm:text-3xl leading-tight">
                                            Application Environments
                                        </h2>
                                        <p className="mt-4 font-sans text-xs leading-5 text-[#A6A6A2]">
                                            Optimized output configurations for precise landscape and internal geometric illumination coverage.
                                        </p>
                                    </Reveal>
                                </div>
                                <div className="lg:col-span-8">
                                    <Reveal threshold={0.15} delay={80}>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {product.applications.map((app) => (
                                                <div
                                                    key={app}
                                                    className="flex items-center gap-3.5 border border-white/[0.05] bg-[#111111]/30 p-5 rounded-sm transition-all duration-300 hover:border-[#B88A2A]/40"
                                                >
                                                    <span className="size-1.5 rounded-full bg-[#B88A2A]" />
                                                    <span className="font-sans text-sm font-bold text-[#F8F5EC]">
                                                        {app}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Reveal>
                                </div>
                            </div>
                        </div>

                        {/* Related Products Showcase */}
                        {relatedProducts.length > 0 && (
                            <div className="mt-24 border-t border-white/[0.06] pt-20">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="h-[1px] w-6 bg-[#B88A2A]" />
                                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                                SHOWCASE
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-[#F8F5EC] sm:text-3xl tracking-wide">
                                            Related Lighting Systems
                                        </h2>
                                    </div>
                                    <Link
                                        href="/products"
                                        className="font-sans text-[0.74rem] font-bold tracking-[0.14em] text-[#DA9807] uppercase transition hover:text-[#F8F5EC]"
                                    >
                                        View Full Collection →
                                    </Link>
                                </div>

                                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {relatedProducts.map((p, idx) => (
                                        <ProductListingCard key={p.id} product={p} index={idx} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Lazy footer */}
                <Suspense fallback={<div className="min-h-32 bg-[#0A0A0A]" />}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
