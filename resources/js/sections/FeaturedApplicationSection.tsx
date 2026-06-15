import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { ScrollDepthWrapper } from '@/components/animations/ScrollDepthWrapper';
import { ApplicationAccordion } from '@/components/application/ApplicationAccordion';
import { ApplicationProductCard } from '@/components/application/ApplicationProductCard';
import {
    featuredApplicationIntro,
    featuredProducts,
} from '@/data/featuredApplicationData';

const formatCounter = (number: number) => number.toString().padStart(2, '0');

export function FeaturedApplicationSection() {
    const [activeProductIndex, setActiveProductIndex] = useState(0);
    const activeProduct = featuredProducts[activeProductIndex];
    const totalProducts = featuredProducts.length;
    const handlePrevious = () => {
        setActiveProductIndex((current) =>
            current === 0 ? totalProducts - 1 : current - 1,
        );
    };
    const handleNext = () => {
        setActiveProductIndex((current) =>
            current === totalProducts - 1 ? 0 : current + 1,
        );
    };

    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 pt-10 pb-12 text-[#171512] sm:px-6 sm:pt-16 sm:pb-[4.5rem] lg:px-10 lg:pt-[4.5rem] lg:pb-[5.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.045)_1px,transparent_1px)] bg-[size:20rem_100%] opacity-[0.32]" />
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-8 sm:gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-16"
            >
                <div>
                    <div className="mb-4 flex items-center gap-4 sm:mb-5">
                        <span className="h-px w-9 bg-[#BDA18A]/80" />
                        <p className="font-sans text-[0.58rem] font-medium tracking-[0.2em] text-[#BDA18A] uppercase">
                            {featuredApplicationIntro.label}
                        </p>
                    </div>

                    <h2 className="max-w-lg text-[1.7rem] leading-[1.14] font-light text-balance text-[#171512] sm:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.7rem]">
                        {featuredApplicationIntro.heading}
                    </h2>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <p className="mt-5 max-w-lg font-sans text-sm leading-7 text-[#665F53] sm:mt-6 sm:text-[0.95rem] sm:leading-8">
                                {activeProduct.description}
                            </p>

                            <div className="mt-5 sm:mt-7">
                                <p className="font-sans text-[0.58rem] font-medium tracking-[0.18em] text-[#BDA18A] uppercase">
                                    {activeProduct.category}
                                </p>
                                <h3 className="mt-2 max-w-xl text-[1.25rem] leading-7 font-normal text-[#171512] sm:text-[1.65rem] sm:leading-9">
                                    {activeProduct.name}
                                </h3>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                                {activeProduct.specs.map((spec) => (
                                    <span
                                        key={spec}
                                        className="rounded-full border border-[#BDA18A]/14 bg-[#F8F4EC]/64 px-3 py-1.5 font-sans text-[0.64rem] tracking-[0.06em] text-[#665F53]"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                                <Link
                                    href={activeProduct.href}
                                    className="inline-flex w-full items-center justify-center gap-2 border border-[#BDA18A]/35 bg-[#171512] px-5 py-3 font-sans text-[0.64rem] font-semibold tracking-[0.17em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#171512] hover:bg-[#F8F4EC] hover:text-[#171512] sm:w-auto"
                                >
                                    Explore Product
                                    <ArrowUpRight
                                        className="size-4"
                                        strokeWidth={1.5}
                                    />
                                </Link>
                                <Link
                                    href={activeProduct.collectionHref}
                                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-sans text-[0.64rem] font-semibold tracking-[0.17em] text-[#665F53] uppercase transition duration-500 hover:text-[#BDA18A] sm:w-auto"
                                >
                                    View Collection
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#BDA18A]/14 pt-5 sm:mt-8 sm:justify-start sm:gap-5 sm:pt-6">
                        <div className="flex min-w-24 items-center gap-3 font-sans text-sm font-semibold tracking-[0.18em]">
                            <span>{formatCounter(activeProductIndex + 1)}</span>
                            <span className="h-px w-8 bg-[#BDA18A]/50" />
                            <span className="text-[#665F53]">
                                {formatCounter(totalProducts)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="grid size-12 place-items-center rounded-full border border-[#BDA18A]/16 bg-[#F8F4EC]/58 text-[#171512] transition duration-500 hover:border-[#BDA18A]/50 hover:bg-[#171512] hover:text-[#F8F5EC] sm:size-11"
                                aria-label="Previous featured product"
                            >
                                <ArrowLeft
                                    className="size-5"
                                    strokeWidth={1.5}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="grid size-12 place-items-center rounded-full border border-[#BDA18A]/16 bg-[#F8F4EC]/58 text-[#171512] transition duration-500 hover:border-[#BDA18A]/50 hover:bg-[#171512] hover:text-[#F8F5EC] sm:size-11"
                                aria-label="Next featured product"
                            >
                                <ArrowRight
                                    className="size-5"
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <ScrollDepthWrapper className="relative" intensity="soft">
                    <AnimatePresence mode="wait">
                        <ApplicationAccordion
                            key={activeProduct.id}
                            product={activeProduct}
                            productIndex={activeProductIndex}
                        />
                    </AnimatePresence>

                    <div className="relative z-20 mt-4 flex justify-center sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:justify-end lg:right-8 lg:bottom-8">
                        <ApplicationProductCard product={activeProduct} />
                    </div>
                </ScrollDepthWrapper>
            </motion.div>
        </section>
    );
}
