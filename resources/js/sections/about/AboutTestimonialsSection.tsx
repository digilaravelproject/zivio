import { testimonialsData } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutTestimonialsSection() {
    return (
        <section className="relative overflow-hidden bg-[#080808] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            {/* Ambient subtle glow background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(184,138,42,0.03),transparent_38%)]" />

            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-14 text-center sm:mb-20">
                    <span className="text-luxury-label">
                        CLIENT CONVICTION
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                        Our Testimonials
                    </h2>
                </div>

                {/* Grid layout for testimonials */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialsData.map((item, index) => (
                        <Reveal
                            key={item.author}
                            className="relative flex flex-col justify-between overflow-hidden border border-white/[0.08] bg-[#0A0A0A]/40 p-6 sm:p-8 hover:bg-[#0A0A0A] hover:border-white/[0.12] transition-all duration-500 shadow-xl group"
                            threshold={0.15}
                            y={24}
                            delay={index * 40}
                        >
                            {/* Decorative Gold Accent line top */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#B88A2A]/40 via-transparent to-transparent group-hover:via-[#B88A2A]/20 transition-all duration-700" />

                            <div>
                                {/* Double quote aesthetic */}
                                <span className="font-serif text-[4.8rem] leading-[0.1] font-bold text-[#B88A2A]/22 select-none pointer-events-none">
                                    “
                                </span>
                                
                                <p className="mt-4 font-sans text-sm leading-8 text-[#CFCFCB] tracking-[0.01em] italic">
                                    {item.quote}
                                </p>
                            </div>

                            <div className="mt-8 border-t border-white/[0.06] pt-5">
                                <h4 className="text-sm font-semibold text-[#F8F5EC]">
                                    {item.author}
                                </h4>
                                <p className="mt-0.5 font-sans text-[0.68rem] tracking-[0.06em] text-[#A6A6A2] uppercase">
                                    {item.role}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
