import { useState } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

export function CategoryShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 py-10 text-[#171512] sm:px-6 sm:py-16 sm:pb-20 lg:px-10 lg:pt-[4.5rem] lg:pb-[5.5rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute top-10 left-1/2 hidden h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#B8945F]/4 blur-3xl md:block" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_28%,rgba(184,138,42,0.03),transparent_24%)]" />
            
            <div className="mx-auto max-w-7xl">
                <Reveal
                    className="relative mb-8 grid gap-5 border-b border-[#8D6B38]/16 pb-8 sm:mb-11 sm:gap-6 sm:pb-9 lg:mb-[3.5rem] lg:grid-cols-[1fr_0.46fr] lg:items-end"
                    threshold={0.2}
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-[1px] w-10 bg-[#B88A2A]" />
                            <p className="text-luxury-label">
                                Collections
                            </p>
                        </div>
                        <h2 className="max-w-3xl text-[clamp(1.85rem,6.4vw,2.75rem)] leading-[1.12] font-light text-balance text-[#171512] sm:text-[clamp(2.25rem,6.4vw,3.35rem)] lg:text-[clamp(2.8rem,3.6vw,3.8rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <div className="relative border-l border-[#B8945F]/34 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-7 tracking-[0.005em] text-[#4E483D] sm:text-[0.95rem] sm:leading-8">
                            Designed for modern architecture, crafted for lasting visual impact.
                        </p>
                        <p className="mt-5 font-sans text-[0.58rem] font-medium tracking-[0.18em] text-[#B8945F] uppercase">
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
