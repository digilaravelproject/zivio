import { partnersData } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutPartnersSection() {
    return (
        <section className="relative overflow-hidden bg-[#080808] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-luxury-divider" />

            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-12 text-center md:mb-16">
                    <span className="text-luxury-label">
                        COLLABORATIVE TRUST
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                        Our Partners
                    </h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 border-t border-l border-white/[0.06] sm:grid-cols-3 lg:grid-cols-4">
                    {partnersData.map((partner, index) => (
                        <Reveal
                            key={partner.name}
                            className="group flex flex-col items-center justify-center p-8 border-r border-b border-white/[0.06] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-[#0A0A0A]/30 transition-all duration-500 hover:bg-white/[0.01]"
                            threshold={0.1}
                            y={15}
                            delay={index * 40}
                        >
                            {/* Stylish text-based representation mimicking luxury logos */}
                            <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#A6A6A2] uppercase transition-all duration-500 group-hover:text-[#BDA18A] group-hover:scale-105">
                                {partner.logoPlaceholder}
                            </span>
                            
                            <span className="mt-2.5 font-sans text-[0.62rem] font-medium tracking-[0.1em] text-[#55534F] uppercase transition-colors duration-500 group-hover:text-[#807D77]">
                                {partner.name}
                            </span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
