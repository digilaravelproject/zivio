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
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 pt-12 pb-16 text-[#F5F5F2] sm:px-6 sm:pt-14 sm:pb-20 lg:px-10 lg:pt-16 lg:pb-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(184,155,114,0.1),transparent_31%),linear-gradient(135deg,#0A0A0A_0%,#101010_52%,#080808_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,155,114,0.04)_1px,transparent_1px)] bg-[size:16rem_100%] opacity-15" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14"
            >
                <div>
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-px w-9 bg-[#DA9807]/80" />
                        <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-[#DA9807] uppercase">
                            {featuredApplicationIntro.label}
                        </p>
                    </div>

                    <h2 className="max-w-2xl text-[2rem] leading-[1.08] font-semibold text-balance text-[#F8F5EC] sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                        {featuredApplicationIntro.heading}
                    </h2>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <p className="mt-5 max-w-lg font-sans text-sm leading-7 text-[#CFCFCB] sm:text-base sm:leading-8">
                                {activeProduct.description}
                            </p>

                            <div className="mt-7">
                                <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[#DA9807] uppercase">
                                    {activeProduct.category}
                                </p>
                                <h3 className="mt-2 max-w-xl text-2xl leading-8 font-semibold text-[#F8F5EC] sm:text-3xl sm:leading-9">
                                    {activeProduct.name}
                                </h3>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {activeProduct.specs.map((spec) => (
                                    <span
                                        key={spec}
                                        className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-sans text-[0.68rem] tracking-[0.08em] text-[#D8D3C8]"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={activeProduct.href}
                                    className="inline-flex w-full items-center justify-center gap-2 border border-[#DA9807]/60 px-5 py-3 text-[0.68rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase transition duration-300 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                                >
                                    Explore Product
                                    <ArrowUpRight
                                        className="size-4"
                                        strokeWidth={1.5}
                                    />
                                </Link>
                                <Link
                                    href={activeProduct.collectionHref}
                                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[0.68rem] font-semibold tracking-[0.2em] text-[#CFCFCB] uppercase transition duration-300 hover:text-[#DA9807] sm:w-auto"
                                >
                                    View Collection
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex items-center justify-between gap-5 border-t border-white/[0.08] pt-6 sm:justify-start">
                        <div className="flex min-w-24 items-center gap-3 text-sm font-semibold tracking-[0.18em]">
                            <span>{formatCounter(activeProductIndex + 1)}</span>
                            <span className="h-px w-8 bg-[#DA9807]/80" />
                            <span className="text-[#CFCFCB]">
                                {formatCounter(totalProducts)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="grid size-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-[#F5F5F2] transition duration-300 hover:border-[#DA9807]/70 hover:bg-[#DA9807]/10 hover:text-[#DA9807] sm:size-11"
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
                                className="grid size-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-[#F5F5F2] transition duration-300 hover:border-[#DA9807]/70 hover:bg-[#DA9807]/10 hover:text-[#DA9807] sm:size-11"
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

                    <div className="relative z-20 mt-4 flex justify-end sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 lg:right-8 lg:bottom-8">
                        <ApplicationProductCard product={activeProduct} />
                    </div>
                </ScrollDepthWrapper>
            </motion.div>
        </section>
    );
}
