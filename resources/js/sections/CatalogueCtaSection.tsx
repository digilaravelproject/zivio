import { Link } from '@inertiajs/react';
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/animations/Reveal';
import { catalogueCtaData } from '@/data/catalogueCtaData';

export function CatalogueCtaSection() {
    return (
        <section className="relative overflow-hidden bg-editorial-dark px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-[8rem]">
            <div className="pointer-events-none absolute inset-0 bg-editorial-dark" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_38%,rgba(255,226,181,0.075),transparent_27%),radial-gradient(circle_at_72%_46%,rgba(184,148,95,0.14),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,148,95,0.034)_1px,transparent_1px)] bg-[size:22rem_100%] opacity-[0.12]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-luxury-divider" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.78fr] lg:items-center lg:gap-16"
                threshold={0.2}
            >
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-[1px] w-10 bg-[#B88A2A]" />
                        <p className="text-luxury-label">
                            {catalogueCtaData.label}
                        </p>
                    </div>

                    <h2 className="text-luxury-heading max-w-lg">
                        {catalogueCtaData.heading}
                    </h2>

                    <p className="mt-6 max-w-xl text-luxury-paragraph">
                        {catalogueCtaData.paragraph}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={catalogueCtaData.downloadHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-[#B8945F]/56 bg-[#B8945F]/10 px-5 py-3.5 font-sans text-[0.62rem] font-medium tracking-[0.15em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                        >
                            {catalogueCtaData.primaryCta}
                            <ArrowDownToLine
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </a>
                        <Link
                            href={catalogueCtaData.secondaryHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-white/[0.12] px-5 py-3.5 font-sans text-[0.62rem] font-medium tracking-[0.15em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#B8945F]/60 hover:text-[#D2B276] sm:w-auto"
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
                    <div className="pointer-events-none absolute inset-8 hidden rounded-full bg-[#B8945F]/18 blur-3xl md:block" />
                    <div className="pointer-events-none absolute -right-8 top-8 hidden h-72 w-20 rotate-6 bg-[#F8F5EC]/10 blur-2xl lg:block" />
                    
                    {/* CSS tilted GPU-accelerated card replacement for Framer Motion */}
                    <div className="ambient-light-cinematic relative overflow-hidden border border-white/[0.11] bg-[#101010] p-3 [transform-style:preserve-3d] transition-all duration-[700ms] ease-out group-hover:-translate-y-2 group-hover:[transform:rotateX(2deg)_rotateY(-3deg)] sm:p-4">
                        <div className="pointer-events-none absolute top-6 bottom-6 left-3 z-20 w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
                        <div className="pointer-events-none absolute top-5 right-2 bottom-5 z-20 w-4 bg-gradient-to-l from-black/34 to-transparent" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/62 via-transparent to-[#080808]/8" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(255,236,200,0.12),transparent_28%)]" />
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                        </div>

                        <div className="absolute inset-x-6 bottom-7">
                            <span className="mb-3 block h-px w-12 bg-[#B88A2A]/80" />
                            <p className="font-sans text-[0.56rem] font-medium tracking-[0.18em] text-[#D2B276] uppercase">
                                ZIVIO LIFE
                            </p>
                            <h3 className="mt-2 text-xl leading-6 font-light text-[#F8F5EC] sm:text-2xl">
                                Lighting Catalogue
                            </h3>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
