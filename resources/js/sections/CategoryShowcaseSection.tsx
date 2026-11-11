import { useState } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { CategoryCard } from '@/components/category/CategoryCard';
import { categories } from '@/data/categoriesData';

type CategoryShowcaseSectionProps = {
    environments?: any[];
};

export function CategoryShowcaseSection({ environments = [] }: CategoryShowcaseSectionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const categoriesList = useMemo(() => {
        if (environments && environments.length > 0) {
            return environments.map((env) => ({
                title: `${env.name} Lighting`,
                image: env.image || `/images/category/${env.slug}.png` || '/images/category/outdoor.png',
                href: `/products/${env.slug}`,
            }));
        }
        return categories;
    }, [environments]);

    return (
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-10 text-[#171512] sm:py-16 sm:pb-20 lg:pt-[4.5rem] lg:pb-[5.5rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute top-10 left-1/2 hidden h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#BDA18A]/4 blur-3xl md:block" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_28%,rgba(184,138,42,0.03),transparent_24%)]" />
            
            <div className="mx-auto max-w-[1440px]">
                <Reveal
                    className="relative mb-8 grid gap-5 border-b border-[#8E755F]/20 pb-8 sm:mb-11 sm:gap-6 sm:pb-9 lg:mb-[3.5rem] lg:grid-cols-[1fr_0.46fr] lg:items-end"
                    threshold={0.2}
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-[1px] w-10 bg-[#8E755F]" />
                            <p className="text-luxury-label">
                                Collections
                            </p>
                        </div>
                        <h2 className="max-w-3xl font-montserrat text-[clamp(1.85rem,6.4vw,2.75rem)] leading-[1.12] font-bold text-balance text-[#171512] sm:text-[clamp(2.25rem,6.4vw,3.35rem)] lg:text-[clamp(2.8rem,3.6vw,3.8rem)]">
                            Explore Our Lighting Collections
                        </h2>
                    </div>

                    <div className="relative border-l border-[#8E755F]/34 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="max-w-md font-sans text-sm leading-7 tracking-[0.005em] text-[#4E483D] sm:text-[0.95rem] sm:leading-8">
                            Designed for modern architecture, crafted for lasting visual impact.
                        </p>
                        <p className="mt-5 font-sans text-[0.58rem] font-medium tracking-[0.18em] text-[#BDA18A] uppercase">
                            Architectural Lighting
                        </p>
                    </div>
                </Reveal>

                <div
                    className="relative grid gap-4 [perspective:1400px] sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:items-end"
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

                {/* Subtle Accent Banner for Smart Connect */}
                <Reveal className="mt-12 sm:mt-16" threshold={0.15}>
                    <div className="relative overflow-hidden rounded bg-gradient-to-r from-[#171512] to-[#2E2820] p-8 text-[#FAFAFD] sm:p-10 lg:p-12">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(189,161,138,0.18),transparent_50%)]" />
                        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                            <div>
                                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase mb-2">
                                    Next-Gen IoT Systems
                                </p>
                                <h3 className="font-montserrat text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                                    ZIVIO Smart Connect
                                </h3>
                                <p className="max-w-2xl font-sans text-xs sm:text-sm text-[#BDA18A]/80 leading-relaxed">
                                    Control your architectural ambiance effortlessly. Motion-sensor activation, remote precision, and Wi-Fi-controlled intelligent lighting setups.
                                </p>
                            </div>
                            <a
                                href="/products/smart-connect"
                                className="inline-flex items-center gap-2 border border-[#BDA18A]/40 bg-transparent px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-white transition-all hover:bg-[#FAFAFD] hover:text-[#171512] hover:border-white"
                            >
                                Explore Smart Connect &rarr;
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
