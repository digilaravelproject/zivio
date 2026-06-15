import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/animations/Reveal';
import { precisionData } from '@/data/precisionData';

export function PrecisionCraftsmanshipSection() {
    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 py-10 text-[#171512] sm:px-6 sm:py-16 lg:px-10 lg:py-[5.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-editorial-light" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_42%,rgba(184,148,95,0.06),transparent_28%),radial-gradient(circle_at_74%_22%,rgba(184,148,95,0.08),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.022)_1px,transparent_1px)] bg-[size:20rem_100%,100%_7rem] opacity-[0.34]" />
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.02fr_0.78fr] lg:items-center lg:gap-16"
                threshold={0.15}
            >
                <div className="relative order-1 lg:order-none">
                    <div className="editorial-image-frame ambient-light-warm group relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4]">
                        <img
                             src={precisionData.mainImage}
                             alt="Architectural lighting detail"
                             width={1600}
                             height={1280}
                             loading="lazy"
                             decoding="async"
                             className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
                             sizes="(min-width: 1024px) 54vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-[#3D3325]/4" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFD]/45 via-transparent to-transparent" />
                        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(184,148,95,0.06)]" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(184,148,95,0.04),transparent_28%)]" />
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8D6B38]/20 to-transparent" />
                    </div>

                    <Reveal
                        delay={120}
                        duration={780}
                        className="relative z-10 mx-4 -mt-12 max-w-[18rem] overflow-hidden border border-[#8D6B38]/16 bg-[#FAF7F1]/88 p-3 shadow-[0_28px_86px_rgba(40,32,20,0.12),0_0_40px_rgba(184,148,95,0.05)] backdrop-blur-xl sm:mx-8 sm:-mt-16 sm:max-w-[20rem] sm:p-4 lg:absolute lg:right-8 lg:bottom-8 lg:mx-0 lg:mt-0"
                    >
                        <div className="relative aspect-[5/3] overflow-hidden bg-[#E2DACD]">
                            <img
                                src={precisionData.detailImage}
                                alt="Premium lighting finish close up"
                                width={900}
                                height={540}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                                sizes="(min-width: 1024px) 20rem, 18rem"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFD]/30 to-transparent" />
                        </div>
                        <p className="mt-3 text-luxury-label sm:text-[0.62rem] text-[#8D6B38]">
                            Premium Finish
                        </p>
                    </Reveal>
                </div>

                <div className="relative order-2">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-[1px] w-10 bg-[#B8945F]" />
                        <p className="text-luxury-label">
                            {precisionData.label}
                        </p>
                    </div>

                    <h2 className="text-editorial-heading-dark max-w-lg">
                        {precisionData.heading}
                    </h2>

                    <p className="mt-6 max-w-xl text-editorial-paragraph">
                        {precisionData.paragraph}
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
                        {precisionData.features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="relative border border-[#8D6B38]/18 bg-white/[0.4] p-3 sm:p-4"
                            >
                                <span className="mb-3 block h-px w-8 bg-[#B88A2A]/80" />
                                <p className="mb-2 font-sans text-[0.56rem] font-medium tracking-[0.16em] text-[#B8945F] uppercase">
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                                <h3 className="text-base leading-5 font-normal text-[#171512] sm:text-lg sm:leading-6">
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <Link
                        href={precisionData.ctaHref}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 border border-[#8D6B38]/50 px-5 py-3.5 font-sans text-[0.62rem] font-medium tracking-[0.16em] text-[#171512] uppercase transition duration-500 hover:border-[#171512] hover:bg-[#171512] hover:text-[#FAF7F1] sm:w-auto"
                    >
                        {precisionData.ctaLabel}
                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}
