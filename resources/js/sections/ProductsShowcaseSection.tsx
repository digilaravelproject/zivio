import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCategoryTabs } from '@/components/products/ProductCategoryTabs';
import {
    productCategories,
    productsData,
    type ProductCategory,
} from '@/data/productsData';
import { Reveal } from '@/components/animations/Reveal';

export function ProductsShowcaseSection() {
    const [activeCategory, setActiveCategory] =
        useState<ProductCategory>('All');

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') {
            return productsData;
        }

        return productsData.filter((product) =>
            product.categories.includes(activeCategory),
        );
    }, [activeCategory]);

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-14 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-[7rem]">
            {/* Adopting clean, single CSS utility for luxury section backgrounds */}
            <div className="pointer-events-none absolute inset-0 bg-luxury-glow-1" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:18rem_100%,100%_7rem] opacity-[0.16]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-luxury-divider" />
            
            {/* Mobile GPU Optimization: Hide large blur on small screens */}
            <div className="pointer-events-none absolute right-0 bottom-12 h-80 w-80 rounded-full bg-[#B88A2A]/6 blur-3xl hidden md:block" />

            <div className="relative mx-auto max-w-7xl">
                <Reveal
                    className="mb-6 grid gap-5 border-b border-[#B88A2A]/16 pb-6 sm:mb-9 sm:gap-7 sm:pb-8 lg:mb-11 lg:grid-cols-[0.74fr_0.5fr] lg:items-end lg:justify-between"
                    threshold={0.25}
                >
                    <div>
                        <div className="mb-4 flex items-center gap-4 sm:mb-5">
                            <span className="h-[1px] w-10 bg-[#B88A2A]" />
                            <p className="text-luxury-label">
                                Product Collection
                            </p>
                        </div>
                        <h2 className="text-luxury-heading">
                            Our Products.
                        </h2>
                    </div>

                    <div className="max-w-md border-l border-[#B88A2A]/28 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-6 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            ZIVIO lighting that blends performance, design, and brilliance for every space.
                        </p>
                    </div>
                </Reveal>

                <div className="mb-5 flex flex-col gap-3 sm:mb-9 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <ProductCategoryTabs
                        categories={productCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <p className="font-sans text-[0.62rem] font-semibold tracking-[0.22em] text-[#B88A2A] uppercase sm:text-[0.66rem]">
                        {filteredProducts.length} Products
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 [perspective:1200px] max-[360px]:grid-cols-1 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
