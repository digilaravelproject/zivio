import { trustData, valuesData } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutValuesSection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            {/* Ambient gold highlights in background: scaled down on mobile */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,138,42,0.05),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.02),transparent_40%)] hidden md:block" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-luxury-divider" />

            <div className="mx-auto max-w-7xl">
                {/* 4. Why Thousands Trust ZIVIO (Dark Immersive Banner) */}
                <Reveal
                    className="relative overflow-hidden border border-white/[0.08] bg-[#0E0E0E] p-8 sm:p-14 lg:p-20 shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                    threshold={0.2}
                    y={28}
                >
                    {/* Architectural glow border overlay */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#BDA18A]/50 to-transparent" />
                    
                    <div className="max-w-3xl">
                        <span className="text-luxury-label">
                            TRUSTED BENCHMARK
                        </span>
                        <h2 className="mt-4 text-3xl leading-[1.08] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                            {trustData.heading}
                        </h2>
                        <p className="mt-6 text-luxury-paragraph">
                            {trustData.paragraph}
                        </p>
                    </div>
                </Reveal>

                {/* 5. Values Section (Heading & Premium Image Cards) */}
                <div className="mt-24 sm:mt-36">
                    <div className="mb-12 md:mb-16">
                        <span className="h-[1px] w-12 bg-[#BDA18A] block mb-4" />
                        <h2 className="text-3xl leading-[1.1] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl max-w-2xl">
                            What defines the way we light the future.
                        </h2>
                    </div>

                    {/* Premium Image Card Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {valuesData.map((value, index) => (
                            <Reveal
                                key={value.title}
                                className="group relative overflow-hidden border border-white/[0.08] aspect-[3/4] flex items-end p-6 sm:p-8"
                                threshold={0.15}
                                y={30}
                                delay={index * 80}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={value.image}
                                        alt={value.title}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.32] group-hover:brightness-[0.4]"
                                        loading="lazy"
                                    />
                                    {/* Rich luxury linear overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/52 to-transparent" />
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 w-full">
                                    {/* Gold line transition */}
                                    <div className="h-[1px] w-0 bg-[#BDA18A] mb-4 transition-all duration-700 group-hover:w-full" />
                                    
                                    <h3 className="text-xl font-semibold text-[#F8F5EC]">
                                        {value.title}
                                    </h3>
                                    <p className="mt-3 font-sans text-xs leading-6 text-[#A6A6A2] transition-colors duration-500 group-hover:text-[#CFCFCB]">
                                        {value.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
