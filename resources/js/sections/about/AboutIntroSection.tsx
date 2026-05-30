import { introData } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutIntroSection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
                {/* Left Cinematic Image with Reveal */}
                <Reveal
                    className="relative overflow-hidden border border-white/[0.08] lg:col-span-6 group"
                    threshold={0.2}
                    y={30}
                >
                    <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
                        <img
                            src={introData.image}
                            alt="Architectural outdoor lighting installation"
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.88]"
                            loading="lazy"
                        />
                    </div>
                    {/* Golden luxury overlay glow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent" />
                </Reveal>

                {/* Right Text Block with Reveal */}
                <Reveal
                    className="flex flex-col lg:col-span-6"
                    threshold={0.2}
                    y={30}
                    delay={100}
                >
                    {/* Gold Divider Line */}
                    <div className="mb-6 h-[1px] w-14 bg-gradient-to-r from-[#B88A2A] to-transparent" />

                    <h2 className="text-3xl leading-[1.08] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                        {introData.heading}
                    </h2>

                    <p className="mt-6 text-luxury-paragraph">
                        {introData.paragraph1}
                    </p>

                    <p className="mt-4 text-luxury-paragraph text-[#A6A6A2]">
                        {introData.paragraph2}
                    </p>

                    {/* Secondary accent detail */}
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-white/[0.06]" />
                        <span className="text-luxury-label tracking-[0.4em] font-bold">
                            ZIVIO ENGINEERING
                        </span>
                        <div className="h-[1px] w-8 bg-white/[0.06]" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
