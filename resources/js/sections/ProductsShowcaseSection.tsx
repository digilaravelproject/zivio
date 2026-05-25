import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { ProductCard } from '@/components/products/ProductCard';
import { ProductCategoryTabs } from '@/components/products/ProductCategoryTabs';
import {
    productCategories,
    productsData,
    type ProductCategory,
} from '@/data/productsData';

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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,138,42,0.075),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(255,255,255,0.045),transparent_24%),linear-gradient(135deg,#070707_0%,#101010_48%,#0A0A0A_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:18rem_100%,100%_7rem] opacity-[0.16]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/22 to-transparent" />
            <div className="pointer-events-none absolute right-0 bottom-12 h-80 w-80 rounded-full bg-[#B88A2A]/6 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6 grid gap-5 border-b border-[#B88A2A]/16 pb-6 sm:mb-9 sm:gap-7 sm:pb-8 lg:mb-11 lg:grid-cols-[0.74fr_0.5fr] lg:items-end lg:justify-between"
                >
                    <div>
                        <div className="mb-4 flex items-center gap-4 sm:mb-5">
                            <span className="h-px w-10 bg-[#B88A2A]" />
                            <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#B88A2A] uppercase">
                                Product Collection
                            </p>
                        </div>
                        <h2 className="max-w-2xl text-[2.25rem] leading-[1.02] font-semibold text-balance text-[#F8F5EC] sm:text-5xl lg:text-[3.6rem]">
                            Our Products.
                        </h2>
                    </div>

                    <div className="max-w-md border-l border-[#B88A2A]/28 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-6 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            ZIVIO lighting that blends performance, design, and
                            brilliance for every space.
                        </p>
                    </div>
                </motion.div>

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
