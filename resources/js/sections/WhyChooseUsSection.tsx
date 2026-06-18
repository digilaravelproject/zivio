import { Reveal } from '@/components/animations/Reveal';
import { Shield, Leaf, Sparkles, Users } from 'lucide-react';

const pillars = [
    {
        icon: Shield,
        num: '01',
        title: 'Uncompromising Precision',
        description: 'Every luminaire is designed to withstand extreme environments, utilizing solid machined aluminum, premium brass, and custom-engineered optics that perform exactly as specified.',
    },
    {
        icon: Leaf,
        num: '02',
        title: 'Eco-Conscious Innovation',
        description: 'Dedicated to high-efficiency LED architectures, smart driver technology, and intelligent solar integration that reduces operational energy without compromising visual impact.',
    },
    {
        icon: Sparkles,
        num: '03',
        title: 'Bespoke Spatial Synergy',
        description: 'Our design philosophy ensures fixtures blend seamlessly with structural forms, creating an atmosphere that dictating emotional response and highlighting spatial scale.',
    },
    {
        icon: Users,
        num: '04',
        title: 'End-to-End Collaboration',
        description: 'We partner closely with architects and developers, providing detailed photometric support, DIALux validation, and engineering expertise from blueprint to final commissioning.',
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 sm:px-8 lg:px-12 py-12 text-[#171512] sm:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.02)_1px,transparent_1px)] bg-[size:24rem_100%,100%_9rem] opacity-[0.3]" />
            <div className="pointer-events-none absolute left-[-10rem] top-1/2 -translate-y-1/2 hidden h-[40rem] w-[40rem] rounded-full bg-[#BDA18A]/8 blur-3xl md:block" />
            
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />

            <div className="relative mx-auto max-w-[1440px]">
                <Reveal
                    className="mb-12 grid gap-6 border-b border-[#8E755F]/14 pb-8 sm:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:justify-between"
                    threshold={0.2}
                >
                    <div>
                        <div className="mb-4 flex items-center gap-4 sm:mb-5">
                            <span className="h-[1px] w-10 bg-[#8E755F]" />
                            <p className="text-luxury-label">
                                Why Choose Us
                            </p>
                        </div>
                        <h2 className="max-w-3xl font-montserrat text-[clamp(1.85rem,5.5vw,2.5rem)] leading-[1.15] font-bold text-balance text-[#171512] sm:text-[clamp(2.25rem,5.5vw,3rem)] lg:text-[clamp(2.6rem,3.2vw,3.4rem)]">
                            Lighting designed for durability. Engineered for elegance.
                        </h2>
                    </div>

                    <div className="max-w-md border-l border-[#BDA18A]/24 pl-4 sm:pl-5 lg:justify-self-end">
                        <p className="font-sans text-sm leading-7 text-[#665F53] sm:text-[0.95rem] sm:leading-8">
                            We bridge the gap between creative architectural vision and reliable technical execution, delivering premium illumination systems that stand the test of time.
                        </p>
                    </div>
                </Reveal>

                {/* Pillars Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {pillars.map((pillar, index) => {
                        const IconComponent = pillar.icon;
                        return (
                            <Reveal
                                key={pillar.title}
                                className="group relative overflow-hidden border border-[#8E755F]/12 bg-white/40 p-6 transition-all duration-500 hover:border-[#171512]/60 hover:bg-white/90 sm:p-8"
                                threshold={0.15}
                                y={30}
                                delay={index * 80}
                            >
                                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#BDA18A] transition-all duration-700 group-hover:w-full" />
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex size-12 items-center justify-center rounded-none border border-[#BDA18A]/30 bg-white/60 text-[#8E755F] transition-all duration-500 group-hover:border-[#171512] group-hover:bg-[#171512] group-hover:text-[#FAF7F1]">
                                        <IconComponent className="size-5" strokeWidth={1.5} />
                                    </div>
                                    <span className="font-sans text-[0.62rem] font-bold tracking-[0.2em] text-[#BDA18A]/70 uppercase">
                                        {pillar.num}
                                    </span>
                                </div>

                                <h3 className="mt-8 font-montserrat text-lg font-bold text-[#171512] sm:text-xl">
                                    {pillar.title}
                                </h3>

                                <p className="mt-4 font-sans text-[0.82rem] leading-6 text-[#5A5245] transition-colors duration-500 group-hover:text-[#2A241C]">
                                    {pillar.description}
                                </p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
