import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';

import { catalogueCtaData } from '@/data/catalogueCtaData';

export function CatalogueCtaSection() {
    return (
        <section className="relative overflow-hidden bg-[#070707] px-4 py-14 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-[7rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(184,138,42,0.1),transparent_27%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_24%),linear-gradient(140deg,#070707_0%,#101010_52%,#080808_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.04)_1px,transparent_1px)] bg-[size:22rem_100%] opacity-[0.14]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/24 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.78fr] lg:items-center lg:gap-16"
            >
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-px w-10 bg-[#B88A2A]" />
                        <p className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] text-[#B88A2A] uppercase sm:text-[0.64rem]">
                            {catalogueCtaData.label}
                        </p>
                    </div>

                    <h2 className="max-w-2xl text-[2.3rem] leading-[1.02] font-semibold text-balance text-[#F8F5EC] sm:text-5xl lg:text-[3.8rem]">
                        {catalogueCtaData.heading}
                    </h2>

                    <p className="mt-5 max-w-xl font-sans text-sm leading-7 tracking-[0.01em] text-[#CFCFCB] sm:mt-6 sm:text-base sm:leading-8">
                        {catalogueCtaData.paragraph}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={catalogueCtaData.downloadHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-[#B88A2A]/60 bg-[#B88A2A]/10 px-5 py-3.5 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                        >
                            {catalogueCtaData.primaryCta}
                            <ArrowDownToLine
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </a>
                        <Link
                            href={catalogueCtaData.secondaryHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-white/[0.12] px-5 py-3.5 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#B88A2A]/60 hover:text-[#D2B276] sm:w-auto"
                        >
                            {catalogueCtaData.secondaryCta}
                            <ArrowUpRight
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[25rem] lg:max-w-[30rem]">
                    <div className="pointer-events-none absolute inset-8 rounded-full bg-[#B88A2A]/12 blur-3xl" />
                    <motion.div
                        initial={{ opacity: 0, y: 24, rotateX: 0, rotateY: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{
                            y: -8,
                            rotateX: 2,
                            rotateY: -3,
                            transition: { duration: 0.55 },
                        }}
                        transition={{
                            delay: 0.08,
                            duration: 0.82,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative overflow-hidden border border-white/[0.1] bg-[#101010] p-3 shadow-[0_34px_100px_rgba(0,0,0,0.42)] [transform-style:preserve-3d] sm:p-4"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#151515]">
                            <img
                                src={catalogueCtaData.catalogueImage}
                                alt="ZIVIO LIFE lighting catalogue preview"
                                width={1100}
                                height={1467}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.035]"
                                sizes="(min-width: 1024px) 30rem, 90vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-[#080808]/10" />
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                        </div>

                        <div className="absolute inset-x-6 bottom-7">
                            <span className="mb-3 block h-px w-12 bg-[#B88A2A]/80" />
                            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.24em] text-[#B88A2A] uppercase">
                                ZIVIO LIFE
                            </p>
                            <h3 className="mt-2 text-2xl leading-6 font-semibold text-[#F8F5EC] sm:text-3xl">
                                Lighting Catalogue
                            </h3>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
