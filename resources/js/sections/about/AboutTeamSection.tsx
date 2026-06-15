import { teamData } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutTeamSection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-luxury-divider" />

            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-14 text-center sm:mb-20">
                    <span className="text-luxury-label">
                        OUR LEADERSHIP & TECHNICAL EXPERTISE
                    </span>
                    <h2 className="mt-3 text-3xl leading-[1.1] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                        Meet the people who make it possible
                    </h2>
                </div>

                {/* Team Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {teamData.map((member, index) => (
                        <Reveal
                            key={member.name}
                            className="group flex flex-col"
                            threshold={0.15}
                            y={24}
                            delay={index * 50}
                        >
                            {/* Member Photo Frame */}
                            <div className="relative overflow-hidden border border-white/[0.08] aspect-[3/4] bg-[#0E0E0E]">
                                <img
                                    src={member.image}
                                    alt={`${member.name} — ${member.role}`}
                                    className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0 brightness-[0.88]"
                                    loading="lazy"
                                />
                                {/* Soft ambient bottom overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                                
                                {/* Corner decorative luxury gold line */}
                                <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#BDA18A] transition-all duration-500 group-hover:w-1/3" />
                                <div className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#BDA18A] transition-all duration-500 group-hover:h-1/3" />
                            </div>

                            {/* Bio details */}
                            <div className="pt-5 pl-1 flex flex-col">
                                <h3 className="text-lg font-semibold text-[#F8F5EC] transition-colors duration-300 group-hover:text-[#BDA18A]">
                                    {member.name}
                                </h3>
                                <p className="mt-1 font-sans text-xs font-medium tracking-[0.08em] text-[#A6A6A2] uppercase">
                                    {member.role}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
