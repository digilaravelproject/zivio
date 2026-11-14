import { Head, Link, router } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Check, ChevronRight, Home, ArrowLeft, ArrowUpRight, Layers } from 'lucide-react';
import { useEffect, useState, useMemo, lazy, Suspense } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { SplashScreen } from '@/components/common/SplashScreen';
import { Navbar } from '@/components/layout/Navbar';
import { ProductListingCard } from '@/components/products/ProductListingCard';

interface Category {
    id: number;
    environment_id: number;
    name: string;
    slug: string;
    image: string | null;
    products_count?: number;
}

interface Environment {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    categories: Category[];
}

interface AttributeValue {
    id: number;
    value: string;
}

interface Attribute {
    id: number;
    name: string;
    slug: string;
    unit: string | null;
    values: AttributeValue[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    gallery: string[];
    short_description: string;
    shortDescription?: string;
    description: string;
    specs: string[];
    technical_specs: any[];
    applications: string[];
    category?: {
        name: string;
        environment?: {
            name: string;
        };
    };
    variants?: any[];
}

type ProductsPageProps = {
    environments?: Environment[];
    currentEnvironment?: Environment | null;
    currentCategory?: Category | null;
    filterableAttributes?: Attribute[];
    selectedFilters?: Record<string, string[]>;
    products?: Product[];
    initialCategory?: string;
};

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

export default function ProductsPage({
    environments = [],
    currentEnvironment = null,
    currentCategory = null,
    filterableAttributes = [],
    selectedFilters = {},
    products = [],
}: ProductsPageProps) {
    const [selectedEnv, setSelectedEnv] = useState<string>(currentEnvironment?.slug || 'all');
    const [selectedCat, setSelectedCat] = useState<string>(currentCategory?.slug || 'all');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [splash, setSplash] = useState(true);

    // Active categories based on selected environment
    const availableCategories = useMemo(() => {
        if (selectedEnv === 'all') {
            return environments.flatMap((e) => e.categories);
        }

        const env = environments.find((e) => e.slug === selectedEnv);

        return env ? env.categories : [];
    }, [environments, selectedEnv]);

    const handleEnvSelect = (envSlug: string) => {
        setSelectedEnv(envSlug);
        setSelectedCat('all');

        if (envSlug === 'all') {
            router.get('/products', {}, { preserveState: true });
        } else {
            router.get(`/products/${envSlug}`, {}, { preserveState: true });
        }
    };

    const handleCatSelect = (catSlug: string) => {
        setSelectedCat(catSlug);

        if (catSlug === 'all') {
            if (selectedEnv === 'all') {
                router.get('/products', {}, { preserveState: true });
            } else {
                router.get(`/products/${selectedEnv}`, {}, { preserveState: true });
            }
        } else {
            const envSlug = selectedEnv === 'all' ? (currentEnvironment?.slug || 'all') : selectedEnv;
            router.get(`/products/${envSlug}/${catSlug}`, {}, { preserveState: true });
        }
    };

    const handleFilterToggle = (attrSlug: string, value: string) => {
        const currentVals = selectedFilters[attrSlug] || [];
        let newVals: string[];

        if (currentVals.includes(value)) {
            newVals = currentVals.filter((v) => v !== value);
        } else {
            newVals = [...currentVals, value];
        }

        const queryParams: Record<string, any> = { ...selectedFilters };

        if (newVals.length > 0) {
            queryParams[attrSlug] = newVals.join(',');
        } else {
            delete queryParams[attrSlug];
        }

        const currentPath = window.location.pathname;
        router.get(currentPath, queryParams, { preserveState: true });
    };

    const pageTitle = 'ZIVIO LIFE | Architectural Lighting Showroom';
    const pageDescription =
        'Explore architectural indoor, outdoor, solar, pole, decorative, and high-mast luminaires engineered by ZIVIO LIFE.';

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
            </Head>

            <AnimatePresence>
                {splash && <SplashScreen onDone={() => setSplash(false)} fast />}
            </AnimatePresence>

            <main className="min-h-screen bg-[#FBFBFA] text-[#141414] antialiased">
                <Navbar theme="light" />

                {/* Compact Luxury Header & Breadcrumbs (Light Theme) */}
                <section className="relative px-4 py-2.5 sm:py-3 sm:px-6 lg:px-10 border-b border-black/[0.08] bg-white">
                    <div className="mx-auto max-w-7xl">
                        {/* Short Breadcrumbs */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-black/50">
                                <Link href="/" className="hover:text-black flex items-center gap-1 transition">
                                    <Home className="size-3 text-[#B5722A]" /> Home
                                </Link>
                                <ChevronRight className="size-3 text-black/20" />
                                <Link
                                    href="/products"
                                    className={`hover:text-black transition ${selectedEnv === 'all' && !currentCategory ? 'text-[#B5722A] font-semibold' : ''}`}
                                >
                                    Catalogue
                                </Link>
                                {currentEnvironment && (
                                    <>
                                        <ChevronRight className="size-3 text-black/20" />
                                        <Link
                                            href={`/products/${currentEnvironment.slug}`}
                                            className={`hover:text-black transition ${!currentCategory ? 'text-[#B5722A] font-semibold' : ''}`}
                                        >
                                            {currentEnvironment.name}
                                        </Link>
                                    </>
                                )}
                                {currentCategory && (
                                    <>
                                        <ChevronRight className="size-3 text-black/20" />
                                        <span className="text-[#B5722A] font-semibold">
                                            {currentCategory.name}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Back to Categories Link when viewing specific category */}
                            {currentCategory && (
                                <Link
                                    href={currentEnvironment ? `/products/${currentEnvironment.slug}` : '/products'}
                                    className="inline-flex items-center gap-1 text-xs text-[#B5722A] font-semibold hover:underline"
                                >
                                    <ArrowLeft className="size-3" /> Back to Categories
                                </Link>
                            )}
                        </div>

                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                                {currentCategory
                                    ? currentCategory.name
                                    : currentEnvironment
                                      ? `${currentEnvironment.name} Luminaires`
                                      : 'Architectural Lighting Collection'}
                            </h1>
                            <div className="text-xs text-black/60">
                                {currentCategory ? (
                                    <>Showing <span className="text-[#111111] font-bold">{products.length}</span> systems</>
                                ) : (
                                    <>Select a category below to explore technical models</>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <section className="relative px-4 py-6 pb-24 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-7xl space-y-6">

                        {/* ============================================================== */}
                        {/* VIEW 1: CATEGORY PRODUCTS VIEW (When user clicked a Category)  */}
                        {/* ============================================================== */}
                        {currentCategory ? (
                            <div className="space-y-5">
                                {/* Technical Filters Bar */}
                                {filterableAttributes.length > 0 && (
                                    <div className="bg-white border border-black/[0.08] shadow-xs px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <span className="font-semibold uppercase tracking-wider text-[#B5722A] flex items-center gap-1.5 text-[11px]">
                                                <SlidersHorizontal className="size-3.5" /> Filters:
                                            </span>

                                            {filterableAttributes.slice(0, 5).map((attr) => (
                                                <div key={attr.id} className="relative">
                                                    <select
                                                        value={(selectedFilters[attr.slug] && selectedFilters[attr.slug][0]) || ''}
                                                        onChange={(e) => handleFilterToggle(attr.slug, e.target.value)}
                                                        className="bg-[#F7F6F2] border border-black/[0.12] rounded px-2.5 py-1 text-xs text-[#111111] focus:border-[#B5722A] focus:outline-none"
                                                    >
                                                        <option value="">{attr.name}</option>
                                                        {attr.values.map((v) => (
                                                            <option key={v.id} value={v.value} className="bg-white text-[#111111]">
                                                                {v.value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}

                                            {Object.keys(selectedFilters).length > 0 && (
                                                <button
                                                    onClick={() => router.get(window.location.pathname, {}, { preserveState: true })}
                                                    className="text-[11px] text-[#B5722A] hover:underline uppercase tracking-wider font-semibold ml-1"
                                                >
                                                    Reset Filters
                                                </button>
                                            )}
                                        </div>

                                        <span className="text-xs text-black/60">
                                            <span className="text-[#111111] font-bold">{products.length}</span> Products
                                        </span>
                                    </div>
                                )}

                                {/* Category Products Grid */}
                                {products.length > 0 ? (
                                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {products.map((product, idx) => (
                                            <ProductListingCard
                                                key={product.id}
                                                product={{
                                                    id: String(product.id),
                                                    slug: product.slug,
                                                    name: product.name,
                                                    category: (product.category?.environment?.name || 'Architectural') as any,
                                                    type: product.category?.name || 'Luminaire',
                                                    image: product.image,
                                                    gallery: product.gallery || [product.image],
                                                    shortDescription: product.short_description || product.shortDescription || '',
                                                    description: product.description,
                                                    specs: product.specs || [],
                                                    technicalSpecs: product.technical_specs || [],
                                                    applications: product.applications || [],
                                                }}
                                                index={idx}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="border border-black/[0.08] bg-white p-20 text-center flex flex-col items-center justify-center rounded-sm shadow-xs">
                                        <div className="h-[1px] w-12 bg-[#B5722A] mb-4" />
                                        <span className="font-sans text-sm tracking-wide text-[#555555]">
                                            No products found in this category matching your filter criteria.
                                        </span>
                                        <Link
                                            href={currentEnvironment ? `/products/${currentEnvironment.slug}` : '/products'}
                                            className="mt-5 text-xs text-[#B5722A] font-bold uppercase tracking-wider hover:underline"
                                        >
                                            View Other Categories
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ============================================================== */
                            /* VIEW 2: ENVIRONMENTS & CATEGORIES GRID (Overview Mode)         */
                            /* ============================================================== */
                            <div className="space-y-8">
                                {/* Environment Navigation Tabs */}
                                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs border-b border-black/[0.08] pb-4">
                                    <button
                                        onClick={() => handleEnvSelect('all')}
                                        className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition ${
                                            selectedEnv === 'all'
                                                ? 'bg-[#B5722A] text-white shadow-[0_4px_16px_rgba(181,114,42,0.25)]'
                                                : 'bg-white border border-black/[0.1] text-black/70 hover:border-[#B5722A] hover:text-[#B5722A]'
                                        }`}
                                    >
                                        All Environments
                                    </button>
                                    {environments.map((env) => (
                                        <button
                                            key={env.id}
                                            onClick={() => handleEnvSelect(env.slug)}
                                            className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition ${
                                                selectedEnv === env.slug
                                                    ? 'bg-[#B5722A] text-white shadow-[0_4px_16px_rgba(181,114,42,0.25)]'
                                                    : 'bg-white border border-black/[0.1] text-black/70 hover:border-[#B5722A] hover:text-[#B5722A]'
                                            }`}
                                        >
                                            {env.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Environments with Categories Grid */}
                                {selectedEnv === 'all' ? (
                                    // All environments grouped
                                    <div className="space-y-12">
                                        {environments.map((env) => {
                                            if (!env.categories || env.categories.length === 0) {
                                                return null;
                                            }

                                            return (
                                                <div key={env.id} className="space-y-4">
                                                    <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <span className="h-4 w-1.5 bg-[#B5722A] rounded-full" />
                                                            <h2 className="text-lg font-bold uppercase tracking-wider text-[#111111]">
                                                                {env.name}
                                                            </h2>
                                                            <span className="text-xs text-black/50 font-medium">
                                                                ({env.categories.length} Categories)
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleEnvSelect(env.slug)}
                                                            className="text-xs text-[#B5722A] font-semibold hover:underline flex items-center gap-1"
                                                        >
                                                            Filter {env.name} →
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                                        {env.categories.map((cat) => (
                                                            <Link
                                                                key={cat.id}
                                                                href={`/products/${env.slug}/${cat.slug}`}
                                                                className="group flex flex-col border border-black/[0.08] bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-[#B5722A] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] rounded-sm"
                                                            >
                                                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F7F6F2] border border-black/[0.04] mb-3 rounded-xs">
                                                                    <img
                                                                        src={cat.image || '/images/products-uses-images/archis/archis-product.jpg'}
                                                                        alt={cat.name}
                                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                                        loading="lazy"
                                                                    />
                                                                    <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#B5722A] transition-all duration-500 group-hover:w-1/3" />
                                                                </div>

                                                                <div className="flex items-baseline justify-between pt-1">
                                                                    <h3 className="font-bold text-sm text-[#111111] group-hover:text-[#B5722A] transition-colors line-clamp-1">
                                                                        {cat.name}
                                                                    </h3>
                                                                </div>

                                                                <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-black/50">
                                                                    <span>{cat.products_count ?? 0} Systems</span>
                                                                    <span className="text-[#B5722A] font-semibold flex items-center gap-0.5 group-hover:underline">
                                                                        Explore <ArrowUpRight className="size-3" />
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Single environment categories grid
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="h-4 w-1.5 bg-[#B5722A] rounded-full" />
                                                <h2 className="text-lg font-bold uppercase tracking-wider text-[#111111]">
                                                    {currentEnvironment?.name || selectedEnv} Categories
                                                </h2>
                                                <span className="text-xs text-black/50 font-medium">
                                                    ({availableCategories.length} Categories)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                            {availableCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/products/${selectedEnv}/${cat.slug}`}
                                                    className="group flex flex-col border border-black/[0.08] bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-[#B5722A] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] rounded-sm"
                                                >
                                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F7F6F2] border border-black/[0.04] mb-3 rounded-xs">
                                                        <img
                                                            src={cat.image || '/images/products-uses-images/archis/archis-product.jpg'}
                                                            alt={cat.name}
                                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#B5722A] transition-all duration-500 group-hover:w-1/3" />
                                                    </div>

                                                    <div className="flex items-baseline justify-between pt-1">
                                                        <h3 className="font-bold text-sm text-[#111111] group-hover:text-[#B5722A] transition-colors line-clamp-1">
                                                            {cat.name}
                                                        </h3>
                                                    </div>

                                                    <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-black/50">
                                                        <span>{cat.products_count ?? 0} Systems</span>
                                                        <span className="text-[#B5722A] font-semibold flex items-center gap-0.5 group-hover:underline">
                                                            Explore <ArrowUpRight className="size-3" />
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                <Suspense fallback={<div className="min-h-32 bg-[#FAF9F6]" />}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
