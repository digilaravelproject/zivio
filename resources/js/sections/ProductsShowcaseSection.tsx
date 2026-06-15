import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCategoryTabs } from '@/components/products/ProductCategoryTabs';
import {
    productCategories,
    productsData,
} from '@/data/productsData';
import type { ProductCategory } from '@/data/productsData';

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
        <section className="relative overflow-hidden bg-editorial-light px-4 py-10 text-[#171512] sm:px-6 sm:py-16 lg:px-10 lg:py-[5.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.03)_1px,transparent_1px)] bg-[size:18rem_100%,100%_8rem] opacity-[0.32]" />
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 bottom-12 hidden h-80 w-80 rounded-full bg-[#B8945F]/12 blur-3xl md:block" />

            <div className="relative mx-auto max-w-7xl">
                <Reveal
                    className="mb-7 grid gap-5 border-b border-[#8D6B38]/14 pb-7 sm:mb-10 sm:gap-7 sm:pb-9 lg:mb-12 lg:grid-cols-[0.74fr_0.5fr] lg:items-end lg:justify-between"
                    threshold={0.25}
                >
                    <div>
                        <div className="mb-4 flex items-center gap-4 sm:mb-5">
                            <span className="h-[1px] w-10 bg-[#B8945F]" />
                            <p className="text-luxury-label">
                                Product Collection
                            </p>
                        </div>
                        <h2 className="text-editorial-heading-dark">
                            Our Products.
                        </h2>
                    </div>

                    <div className="max-w-md border-l border-[#8D6B38]/22 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-6 tracking-[0.02em] text-[#665F53] sm:text-base sm:leading-8">
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
                    <p className="font-sans text-[0.6rem] font-semibold tracking-[0.18em] text-[#8D6B38] uppercase sm:text-[0.64rem]">
                        {filteredProducts.length} Products
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 [perspective:1200px] max-[360px]:grid-cols-1 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
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
