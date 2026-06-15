import { philosophyBlocks } from '@/data/aboutPageData';
import { Reveal } from '@/components/animations/Reveal';

export function AboutPhilosophySection() {
    const [philosophy, sustainability, vision] = philosophyBlocks;

    return (
        <section className="relative overflow-hidden bg-[#080808] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            {/* Subtle glow accents in background: scaled down on mobile */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(184,138,42,0.04),transparent_40%),radial-gradient(circle_at_90%_70%,rgba(255,255,255,0.02),transparent_40%)] hidden md:block" />

            <div className="mx-auto max-w-7xl space-y-24 sm:space-y-36 lg:space-y-48">
                {/* 1. Our Philosophy - Left Image, Right Text Card */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <Reveal
                        className="relative overflow-hidden border border-white/[0.08] lg:col-span-7"
                        threshold={0.2}
                        y={30}
                    >
                        <div className="aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/10] w-full overflow-hidden">
                            <img
                                src={philosophy.image}
                                alt={philosophy.title}
                                className="h-full w-full object-cover brightness-[0.78]"
                                loading="lazy"
                            />
                        </div>
                    </Reveal>

                    <Reveal
                        className="relative -mt-12 bg-[#0C0C0C] border border-white/[0.08] p-6 shadow-2xl sm:p-10 lg:col-span-5 lg:col-start-8 lg:-ml-20 lg:mt-0 lg:p-12 z-10"
                        threshold={0.2}
                        y={40}
                        delay={100}
                    >
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDA18A]/40 to-transparent" />
                        <span className="text-luxury-label">
                            01 / CONVICTION
                        </span>
                        <h3 className="mt-3 text-2xl font-semibold text-[#F8F5EC] sm:text-3xl">
                            {philosophy.title}
                        </h3>
                        <p className="mt-5 text-luxury-paragraph">
                            {philosophy.description}
                        </p>
                    </Reveal>
                </div>

                {/* 2. Commitment to Sustainability - Right Image, Left Text Card */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <Reveal
                        className="relative overflow-hidden border border-white/[0.08] lg:col-span-7 lg:col-start-6 lg:order-2"
                        threshold={0.2}
                        y={30}
                    >
                        <div className="aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/10] w-full overflow-hidden">
                            <img
                                src={sustainability.image}
                                alt={sustainability.title}
                                className="h-full w-full object-cover brightness-[0.78]"
                                loading="lazy"
                            />
                        </div>
                    </Reveal>

                    <Reveal
                        className="relative -mt-12 bg-[#0C0C0C] border border-white/[0.08] p-6 shadow-2xl sm:p-10 lg:col-span-5 lg:col-start-1 lg:-mr-20 lg:mt-0 lg:order-1 lg:p-12 z-10"
                        threshold={0.2}
                        y={40}
                        delay={100}
                    >
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDA18A]/40 to-transparent" />
                        <span className="text-luxury-label">
                            02 / STEWARDSHIP
                        </span>
                        <h3 className="mt-3 text-2xl font-semibold text-[#F8F5EC] sm:text-3xl">
                            {sustainability.title}
                        </h3>
                        <p className="mt-5 text-luxury-paragraph">
                            {sustainability.description}
                        </p>
                    </Reveal>
                </div>

                {/* 3. Our Vision - Full-bleed / Large Visual Framing */}
                <Reveal
                    className="relative overflow-hidden border border-white/[0.08] p-6 sm:p-12 lg:p-20 min-h-[450px] lg:min-h-[520px] flex items-center justify-start"
                    threshold={0.2}
                    y={30}
                >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={vision.image}
                            alt={vision.title}
                            className="h-full w-full object-cover brightness-[0.25]"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/86 via-[#080808]/50 to-transparent" />
                    </div>

                    {/* Floating Overlay text box */}
                    <Reveal
                        className="relative z-10 max-w-xl"
                        threshold={0.25}
                        y={30}
                        delay={100}
                    >
                        <span className="text-luxury-label">
                            03 / PURPOSE
                        </span>
                        <h3 className="mt-3 text-3xl font-semibold text-[#F8F5EC] sm:text-4xl">
                            {vision.title}
                        </h3>
                        <p className="mt-5 text-luxury-paragraph text-[#D8D3C8]">
                            {vision.description}
                        </p>
                    </Reveal>
                </Reveal>
            </div>
        </section>
    );
}
