import { Head } from '@inertiajs/react';
import { useEffect, useState, useMemo, lazy, Suspense } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { LazySection } from '@/components/site/LazySection';
import { ProductListingCard } from '@/components/products/ProductListingCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductTypeFilters } from '@/components/products/ProductTypeFilters';
import {
    productsCatalogData,
    catalogCategories,
    categorySubcategories,
    type CatalogCategory,
} from '@/data/productsCatalogData';
import { Reveal } from '@/components/animations/Reveal';

type ProductsPageProps = {
    initialCategory?: string;
};

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

export default function ProductsPage({ initialCategory }: ProductsPageProps) {
    // Map initialCategory string to strict CatalogCategory type or 'All'
    const defaultCategory = useMemo(() => {
        if (!initialCategory) return 'All';
        const found = catalogCategories.find(
            (c) => c.toLowerCase() === initialCategory.toLowerCase()
        );
        return found || 'All';
    }, [initialCategory]);

    const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | 'All'>(defaultCategory);
    const [selectedType, setSelectedType] = useState<string | 'All'>('All');

    // Reset subcategory filter whenever the main category changes
    useEffect(() => {
        setSelectedType('All');

        // Dynamically update browser URL without triggering full page reloads
        if (typeof window !== 'undefined') {
            const path =
                selectedCategory === 'All'
                    ? '/products'
                    : `/products/${selectedCategory.toLowerCase()}`;
            window.history.pushState(null, '', path);
        }
    }, [selectedCategory]);

    // Handle updates if the initialCategory prop changes (e.g. on direct Inertia link transitions)
    useEffect(() => {
        setSelectedCategory(defaultCategory);
    }, [defaultCategory]);

    // Get subcategories for the currently selected category
    const availableSubcategories = useMemo(() => {
        if (selectedCategory === 'All') return [];
        return categorySubcategories[selectedCategory] || [];
    }, [selectedCategory]);

    // Filter products catalog dynamically
    const filteredProducts = useMemo(() => {
        return productsCatalogData.filter((product) => {
            const matchesCategory =
                selectedCategory === 'All' || product.category === selectedCategory;
            const matchesType =
                selectedType === 'All' || product.type === selectedType;
            return matchesCategory && matchesType;
        });
    }, [selectedCategory, selectedType]);

    const pageTitle = 'ZIVIO LIFE | Products Showroom';
    const pageDescription =
        'Explore premium indoor, outdoor, solar, pole, decorative, and high-mast lighting products by ZIVIO LIFE.';

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

                {/* Showroom Header */}
                <section className="relative px-4 pt-32 pb-16 sm:px-6 lg:px-10 lg:pt-40">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(184,138,42,0.04),transparent_50%)]" />
                    
                    <div className="relative z-10 mx-auto max-w-7xl text-center">
                        <Reveal threshold={0.1}>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="h-[1px] w-6 bg-[#B88A2A]" />
                                <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                    PRODUCT COLLECTION
                                </span>
                                <span className="h-[1px] w-6 bg-[#B88A2A]" />
                            </div>
                            
                            <h1 className="text-luxury-heading max-w-3xl mx-auto mb-6 leading-tight">
                                Lighting solutions crafted for every architectural space.
                            </h1>
                            
                            <p className="font-sans text-sm sm:text-base leading-8 text-[#CFCFCB] max-w-2xl mx-auto">
                                Explore ZIVIO LIFE products across indoor, outdoor, solar, pole, decorative, and high-mast lighting categories. Engineered for maximum visual performance.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Showroom Filters & Interactive Grid */}
                <section className="relative px-4 pb-24 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-7xl">
                        {/* Main Category Selector */}
                        <Reveal threshold={0.05}>
                            <ProductFilters
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                categories={catalogCategories}
                            />
                        </Reveal>

                        {/* Subcategory Selector (dynamic) */}
                        <Reveal threshold={0.05} delay={50}>
                            <ProductTypeFilters
                                selectedType={selectedType}
                                onSelectType={setSelectedType}
                                types={availableSubcategories}
                            />
                        </Reveal>

                        {/* Product Grid */}
                        <div className="mt-12">
                            {filteredProducts.length > 0 ? (
                                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredProducts.map((product, idx) => (
                                        <ProductListingCard
                                            key={product.id}
                                            product={product}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="border border-white/[0.04] bg-[#111111]/20 p-20 text-center flex flex-col items-center justify-center rounded-sm">
                                    <div className="h-[1px] w-12 bg-[#B88A2A] mb-4" />
                                    <span className="font-sans text-sm tracking-wide text-[#A6A6A2]">
                                        No architectural systems found under this configuration.
                                    </span>
                                </div>
                            )}
                        </div>
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
