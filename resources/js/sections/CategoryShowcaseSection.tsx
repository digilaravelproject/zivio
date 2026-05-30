import { useState } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

export function CategoryShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-editorial-dark px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 sm:pb-32 lg:px-10 lg:pt-[7rem] lg:pb-[9rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#090909]/76 to-transparent" />
            <div className="pointer-events-none absolute top-10 left-1/2 hidden h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#B8945F]/8 blur-3xl md:block" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_28%,rgba(255,244,220,0.04),transparent_24%)]" />
            
            <div className="mx-auto max-w-7xl">
                <Reveal
                    className="relative mb-8 grid gap-5 border-b border-white/[0.07] pb-8 sm:mb-11 sm:gap-6 sm:pb-9 lg:mb-[3.5rem] lg:grid-cols-[1fr_0.46fr] lg:items-end"
                    threshold={0.2}
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-[1px] w-10 bg-[#B88A2A]" />
                            <p className="text-luxury-label">
                                Collections
                            </p>
                        </div>
                        <h2 className="max-w-3xl text-[clamp(2rem,7vw,3rem)] leading-[1.08] font-medium text-balance text-[#F8F5EC] sm:text-[clamp(2.45rem,7vw,3.7rem)] lg:text-[clamp(3.15rem,4vw,4.25rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <div className="relative border-l border-[#B8945F]/24 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-6 tracking-[0.02em] text-[#CFCFCB] sm:text-base sm:leading-8">
                            Designed for modern architecture, crafted for lasting visual impact.
                        </p>
                        <p className="mt-5 font-sans text-[0.6rem] font-semibold tracking-[0.22em] text-[#B8945F] uppercase">
                            Architectural Lighting
                        </p>
                    </div>
                </Reveal>

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
