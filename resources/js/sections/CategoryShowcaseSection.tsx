import { motion } from 'framer-motion';
import { useState } from 'react';

import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

export function CategoryShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 pt-12 pb-16 text-[#F5F5F2] sm:px-6 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-[6.5rem] lg:pb-[8.5rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808]/70 to-transparent" />
            <div className="pointer-events-none absolute top-10 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#B88A2A]/6 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_28%,rgba(255,255,255,0.035),transparent_24%)]" />
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-7 grid gap-5 border-b border-white/[0.08] pb-7 sm:mb-9 sm:gap-6 sm:pb-8 lg:mb-[3.25rem] lg:grid-cols-[1fr_0.5fr] lg:items-end"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#B88A2A]" />
                            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-[#B88A2A] uppercase sm:text-[0.64rem] sm:tracking-[0.34em]">
                                Collections
                            </p>
                        </div>
                        <h2 className="max-w-4xl text-[clamp(2.25rem,8vw,3.45rem)] leading-[1] font-semibold text-balance text-[#F8F5EC] sm:text-[clamp(2.7rem,9vw,4.6rem)] lg:text-[clamp(4.2rem,5vw,5.9rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <div className="relative border-l border-[#B88A2A]/28 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-6 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            Designed for modern architecture, crafted for
                            lasting visual impact.
                        </p>
                        <p className="mt-5 font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-[#B88A2A] uppercase">
                            Architectural Lighting
                        </p>
                    </div>
                </motion.div>

                <div
                    className="relative grid gap-4 [perspective:1400px] sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:items-end"
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
