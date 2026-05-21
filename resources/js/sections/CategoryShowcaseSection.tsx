import { motion } from 'framer-motion';
import { useState } from 'react';

import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

export function CategoryShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 pt-16 pb-24 text-[#F5F5F2] sm:px-6 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-24 lg:pb-36">
            <div className="pointer-events-none absolute top-16 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#DA9807]/8 blur-3xl" />
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-10 grid gap-7 border-b border-white/10 pb-8 lg:mb-12 lg:grid-cols-[0.88fr_0.62fr] lg:items-end"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#DA9807]" />
                            <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-[#DA9807] uppercase">
                                Collections
                            </p>
                        </div>
                        <h2 className="max-w-3xl text-[clamp(2.8rem,9vw,4.8rem)] leading-[0.94] font-semibold text-balance text-[#F8F5EC] lg:text-[clamp(4.6rem,5.2vw,6.2rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <div className="relative border-l border-[#DA9807]/35 pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-7 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            Designed for modern architecture, crafted for
                            lasting visual impact.
                        </p>
                        <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.28em] text-[#DA9807] uppercase">
                            Architectural Lighting
                        </p>
                    </div>
                </motion.div>

                <div
                    className="relative grid gap-4 [perspective:1400px] sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={category.title}
                            category={category}
                            index={index}
                            isActive={activeIndex === index}
                            isDimmed={
                                activeIndex !== null && activeIndex !== index
                            }
                            onActivate={setActiveIndex}
                            onClear={() => setActiveIndex(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
