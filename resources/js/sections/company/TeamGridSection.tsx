import { teamsPageData } from '@/data/companyPagesData';
import { Reveal } from '@/components/animations/Reveal';

export function TeamGridSection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="mx-auto max-w-7xl">
                {/* Team Grid */}
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                    {teamsPageData.members.map((member, index) => (
                        <Reveal
                            key={member.id}
                            className="group flex flex-col border border-white/[0.04] bg-[#111111]/40 backdrop-blur-md p-4 transition-all duration-500 hover:border-[#B88A2A]/40 hover:bg-[#111111]/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                            threshold={0.1}
                            y={24}
                            delay={index * 50}
                        >
                            {/* Member Photo Frame */}
                            <div className="relative overflow-hidden border border-white/[0.08] aspect-[4/5] bg-[#0E0E0E] mb-5">
                                <img
                                    src={member.image}
                                    alt={`${member.name} — ${member.role}`}
                                    className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0 brightness-[0.88]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Soft ambient bottom overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                                
                                {/* Corner decorative luxury gold line */}
                                <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#B88A2A] transition-all duration-500 group-hover:w-1/3" />
                                <div className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#B88A2A] transition-all duration-500 group-hover:h-1/3" />
                            </div>

                            {/* Bio details */}
                            <div className="flex flex-col pl-1 pb-1">
                                <h3 className="text-lg font-semibold text-[#F8F5EC] transition-colors duration-300 group-hover:text-[#D2B276]">
                                    {member.name}
                                </h3>
                                <p className="mt-1.5 font-sans text-xs font-semibold tracking-[0.1em] text-[#A6A6A2] uppercase sm:tracking-[0.14em]">
                                    {member.role}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Collaboration Section */}
                <div className="mt-20 border-t border-white/[0.06] pt-16 sm:mt-28">
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                        <div className="lg:col-span-5">
                            <Reveal threshold={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="h-[1px] w-6 bg-[#B88A2A]" />
                                    <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                        OUR PHILOSOPHY
                                    </span>
                                </div>
                                <h2 className="text-3xl leading-[1.1] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                                    {teamsPageData.collaboration.heading}
                                </h2>
                            </Reveal>
                        </div>
                        <div className="lg:col-span-7">
                            <Reveal threshold={0.15} delay={100}>
                                <p className="font-sans text-base leading-9 text-[#D8D3C8] sm:text-lg sm:leading-10">
                                    {teamsPageData.collaboration.text}
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
