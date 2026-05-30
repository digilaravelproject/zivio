import { Link } from '@inertiajs/react';
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/animations/Reveal';
import { catalogueCtaData } from '@/data/catalogueCtaData';

export function CatalogueCtaSection() {
    return (
        <section className="relative overflow-hidden bg-editorial-dark px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-[8rem]">
            <div className="pointer-events-none absolute inset-0 bg-editorial-dark" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.04)_1px,transparent_1px)] bg-[size:22rem_100%] opacity-[0.14]" />
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

                    <h2 className="text-luxury-heading max-w-xl">
                        {catalogueCtaData.heading}
                    </h2>

                    <p className="mt-5 text-luxury-paragraph">
                        {catalogueCtaData.paragraph}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={catalogueCtaData.downloadHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-[#B8945F]/60 bg-[#B8945F]/10 px-5 py-3.5 font-sans text-[0.64rem] font-semibold tracking-[0.17em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                        >
                            {catalogueCtaData.primaryCta}
                            <ArrowDownToLine
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </a>
                        <Link
                            href={catalogueCtaData.secondaryHref}
                            className="inline-flex w-full items-center justify-center gap-2 border border-white/[0.12] px-5 py-3.5 font-sans text-[0.64rem] font-semibold tracking-[0.17em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#B8945F]/60 hover:text-[#D2B276] sm:w-auto"
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
                    <div className="pointer-events-none absolute inset-8 hidden rounded-full bg-[#B8945F]/14 blur-3xl md:block" />
                    
                    {/* CSS tilted GPU-accelerated card replacement for Framer Motion */}
                    <div className="relative overflow-hidden border border-white/[0.1] bg-[#101010] p-3 shadow-[0_34px_100px_rgba(0,0,0,0.42),0_0_60px_rgba(184,148,95,0.08)] [transform-style:preserve-3d] transition-all duration-[600ms] ease-out group-hover:-translate-y-2 group-hover:[transform:rotateX(2deg)_rotateY(-3deg)] sm:p-4">
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
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
