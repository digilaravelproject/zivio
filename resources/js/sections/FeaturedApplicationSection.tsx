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
        <section className="relative overflow-hidden bg-[#090909] px-4 pt-12 pb-16 text-[#F5F5F2] sm:px-6 sm:pt-16 sm:pb-[5.5rem] lg:px-10 lg:pt-20 lg:pb-[7.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(184,138,42,0.075),transparent_31%),linear-gradient(145deg,#090909_0%,#101010_48%,#070707_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.035)_1px,transparent_1px)] bg-[size:18rem_100%] opacity-[0.14]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/18 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-7 sm:gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16"
            >
                <div>
                    <div className="mb-4 flex items-center gap-4 sm:mb-5">
                        <span className="h-px w-9 bg-[#B88A2A]/80" />
                        <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#B88A2A] uppercase">
                            {featuredApplicationIntro.label}
                        </p>
                    </div>

                    <h2 className="max-w-xl text-[1.8rem] leading-[1.08] font-semibold text-balance text-[#F8F5EC] sm:text-4xl lg:text-[3.15rem] xl:text-[3.55rem]">
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
                            <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-[#CFCFCB] sm:mt-5 sm:text-base sm:leading-8">
                                {activeProduct.description}
                            </p>

                            <div className="mt-5 sm:mt-7">
                                <p className="font-sans text-[0.64rem] font-semibold tracking-[0.28em] text-[#B88A2A] uppercase">
                                    {activeProduct.category}
                                </p>
                                <h3 className="mt-2 max-w-xl text-[1.35rem] leading-7 font-semibold text-[#F8F5EC] sm:text-3xl sm:leading-9">
                                    {activeProduct.name}
                                </h3>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                                {activeProduct.specs.map((spec) => (
                                    <span
                                        key={spec}
                                        className="rounded-full border border-white/[0.07] bg-white/[0.022] px-3 py-1.5 font-sans text-[0.66rem] tracking-[0.08em] text-[#D8D3C8]"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                                <Link
                                    href={activeProduct.href}
                                    className="inline-flex w-full items-center justify-center gap-2 border border-[#B88A2A]/55 px-5 py-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                                >
                                    Explore Product
                                    <ArrowUpRight
                                        className="size-4"
                                        strokeWidth={1.5}
                                    />
                                </Link>
                                <Link
                                    href={activeProduct.collectionHref}
                                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#CFCFCB] uppercase transition duration-500 hover:text-[#B88A2A] sm:w-auto"
                                >
                                    View Collection
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5 sm:mt-8 sm:gap-5 sm:pt-6 sm:justify-start">
                        <div className="flex min-w-24 items-center gap-3 font-sans text-sm font-semibold tracking-[0.18em]">
                            <span>{formatCounter(activeProductIndex + 1)}</span>
                            <span className="h-px w-8 bg-[#B88A2A]/80" />
                            <span className="text-[#CFCFCB]">
                                {formatCounter(totalProducts)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="grid size-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.022] text-[#F5F5F2] transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276] sm:size-11"
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
                                className="grid size-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.022] text-[#F5F5F2] transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276] sm:size-11"
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
