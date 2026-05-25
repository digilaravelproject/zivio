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
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(218,152,7,0.1),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(255,255,255,0.055),transparent_24%),linear-gradient(135deg,#070707_0%,#101010_48%,#0A0A0A_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(218,152,7,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:16rem_100%,100%_6.5rem] opacity-18" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DA9807]/35 to-transparent" />
            <div className="pointer-events-none absolute right-0 bottom-12 h-80 w-80 rounded-full bg-[#DA9807]/8 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-9 grid gap-8 border-b border-[#DA9807]/18 pb-8 lg:mb-11 lg:grid-cols-[0.88fr_0.62fr] lg:items-end"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#DA9807]" />
                            <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-[#DA9807] uppercase">
                                Product Collection
                            </p>
                        </div>
                        <h2 className="max-w-2xl text-4xl leading-[1.02] font-semibold text-balance text-[#F8F5EC] sm:text-5xl lg:text-6xl">
                            Our Products.
                        </h2>
                    </div>

                    <div className="max-w-md border-l border-[#DA9807]/35 pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-7 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            ZIVIO lighting that blends performance, design, and
                            brilliance for every space.
                        </p>
                    </div>
                </motion.div>

                <div className="mb-7 flex flex-col gap-4 sm:mb-9 lg:flex-row lg:items-center lg:justify-between">
                    <ProductCategoryTabs
                        categories={productCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <p className="font-sans text-[0.66rem] font-semibold tracking-[0.22em] text-[#DA9807] uppercase">
                        {filteredProducts.length} Products
                    </p>
                </div>

                <div className="grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
