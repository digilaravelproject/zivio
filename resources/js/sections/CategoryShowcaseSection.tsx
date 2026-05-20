import { motion } from 'framer-motion';
import { useState } from 'react';

import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

export function CategoryShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 pt-16 pb-24 text-[#F5F5F2] sm:px-6 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-24 lg:pb-36">
            <div className="pointer-events-none absolute top-16 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#B89B72]/8 blur-3xl" />
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-12 grid gap-7 border-b border-white/10 pb-10 lg:mb-14 lg:grid-cols-[1fr_0.72fr] lg:items-end"
                >
                    <div>
                        <p className="mb-5 text-[0.68rem] font-semibold tracking-[0.34em] text-[#B89B72] uppercase">
                            Collections
                        </p>
                        <h2 className="max-w-4xl text-[clamp(3.7rem,12vw,6rem)] leading-[0.88] font-semibold text-[#F8F5EC] lg:text-[clamp(5.6rem,6.6vw,7.8rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <p className="max-w-xl text-xl leading-8 text-[#CFCFCB] sm:text-2xl sm:leading-9 lg:justify-self-end">
                        Designed for modern architecture, crafted for lasting
                        visual impact.
                    </p>
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
