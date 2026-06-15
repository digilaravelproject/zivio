import { Link } from '@inertiajs/react';
import { brandsPageData } from '@/data/companyPagesData';
import { Reveal } from '@/components/animations/Reveal';
import { SiteButton } from '@/components/site/SiteButton';

export function BrandsGridSection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="mx-auto max-w-7xl">
                {/* Brands Alternating / Luxury Card Layout */}
                <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
                    {brandsPageData.brands.map((brand, index) => (
                        <Reveal
                            key={brand.id}
                            className="group relative overflow-hidden border border-white/[0.06] bg-[#111111]/30 aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] flex flex-col justify-end p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-700 hover:border-[#BDA18A]/40 hover:shadow-[0_24px_60px_rgba(184,138,42,0.06)]"
                            threshold={0.1}
                            y={32}
                            delay={index * 80}
                        >
                            {/* Background Image with zoom & overlay */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={brand.image}
                                    alt={`${brand.name} collection`}
                                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] brightness-[0.44] group-hover:brightness-[0.48]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/68 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(184,138,42,0.08),transparent_48%)]" />
                            </div>

                            {/* Brand Details */}
                            <div className="relative z-10 flex flex-col items-start">
                                {/* Gold Decorative Divider */}
                                <div className="h-[1.5px] w-10 bg-[#BDA18A] mb-4 transition-all duration-500 group-hover:w-20" />
                                
                                <h3 className="text-2xl font-semibold tracking-wide text-[#F8F5EC] sm:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-[#BDA18A]">
                                    {brand.name}
                                </h3>
                                <p className="mt-2.5 font-sans text-sm tracking-wide text-[#D8D3C8] max-w-sm">
                                    {brand.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-24 border-t border-white/[0.06] pt-20 text-center sm:mt-32 sm:pt-28">
                    <Reveal threshold={0.15}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="h-[1px] w-6 bg-[#BDA18A]" />
                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase">
                                COLLECTION ACCESS
                            </span>
                            <span className="h-[1px] w-6 bg-[#BDA18A]" />
                        </div>
                        <h2 className="text-3xl leading-[1.15] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl max-w-2xl mx-auto text-balance">
                            {brandsPageData.cta.heading}
                        </h2>
                    </Reveal>

                    <Reveal threshold={0.15} delay={120} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SiteButton href="/products">
                            View Products
                        </SiteButton>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/10 bg-white/[0.018] px-5 py-3 sm:px-7 sm:py-3.5 text-center text-[0.68rem] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.24em] text-[#F5F5F2] uppercase transition duration-300 hover:border-[#BDA18A] hover:bg-[#BDA18A]/5 hover:text-[#BDA18A]"
                        >
                            Contact Us
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
