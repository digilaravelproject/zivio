import { Link } from '@inertiajs/react';
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/animations/Reveal';
import { catalogueCtaData } from '@/data/catalogueCtaData';

export function CatalogueCtaSection() {
    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 py-10 text-[#171512] sm:px-6 sm:py-16 lg:px-10 lg:py-[5.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-editorial-light" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_38%,rgba(184,148,95,0.06),transparent_27%),radial-gradient(circle_at_72%_46%,rgba(184,148,95,0.1),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.035)_1px,transparent_1px)] bg-[size:22rem_100%] opacity-[0.28]" />
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.78fr] lg:items-center lg:gap-16"
                threshold={0.2}
            >
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-[1px] w-10 bg-[#BDA18A]" />
                        <p className="text-luxury-label">
                            {catalogueCtaData.label}
                        </p>
                    </div>

                    <h2 className="text-editorial-heading-dark max-w-lg">
                        {catalogueCtaData.heading}
                    </h2>

                    <p className="mt-6 max-w-xl text-editorial-paragraph">
                        {catalogueCtaData.paragraph}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={catalogueCtaData.downloadHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 border border-[#BDA18A]/56 bg-[#BDA18A]/10 px-5 py-3.5 font-sans text-[0.62rem] font-medium tracking-[0.15em] text-[#171512] uppercase transition duration-500 hover:border-[#171512] hover:bg-[#171512] hover:text-[#FAF7F1] sm:w-auto"
                        >
                            {catalogueCtaData.primaryCta}
                            <ArrowUpRight
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </a>
                        <Link
                            href={catalogueCtaData.secondaryHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-[#BDA18A]/20 px-5 py-3.5 font-sans text-[0.62rem] font-medium tracking-[0.15em] text-[#171512] uppercase transition duration-500 hover:border-[#171512]/60 hover:text-[#BDA18A] sm:w-auto"
                        >
                            {catalogueCtaData.secondaryCta}
                            <ArrowUpRight
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[25rem] lg:max-w-[30rem] group">
                    {/* Glow blurred background node: hidden on mobile */}
                    <div className="pointer-events-none absolute inset-8 hidden rounded-full bg-[#BDA18A]/10 blur-3xl md:block" />
                    <div className="pointer-events-none absolute -right-8 top-8 hidden h-72 w-20 rotate-6 bg-[#FAF7F1]/20 blur-2xl lg:block" />

                    {/* CSS tilted GPU-accelerated card replacement for Framer Motion */}
                    <div className="ambient-light-warm relative overflow-hidden border border-[#BDA18A]/16 bg-white/[0.4] p-3 [transform-style:preserve-3d] transition-all duration-[700ms] ease-out group-hover:-translate-y-2 group-hover:[transform:rotateX(2deg)_rotateY(-3deg)] sm:p-4">
                        <div className="pointer-events-none absolute top-6 bottom-6 left-3 z-20 w-px bg-gradient-to-b from-transparent via-[#BDA18A]/12 to-transparent" />
                        <div className="pointer-events-none absolute top-5 right-2 bottom-5 z-20 w-4 bg-gradient-to-l from-[#FAF7F1]/30 to-transparent" />
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#E2DACD]">
                            <img
                                src={catalogueCtaData.catalogueImage}
                                alt="ZIVIO LIFE lighting catalogue preview"
                                width={1100}
                                height={1467}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain mix-blend-multiply transition duration-[1200ms] ease-out group-hover:scale-[1.035]"
                                sizes="(min-width: 1024px) 30rem, 90vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F1]/62 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(184,148,95,0.06),transparent_28%)]" />
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#BDA18A]/20 to-transparent" />
                        </div>

                    </div>
                </div>
            </Reveal>
        </section>
    );
}
