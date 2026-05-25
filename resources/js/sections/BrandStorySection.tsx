import { motion } from 'framer-motion';

const brandStory = {
    label: 'Brand Philosophy',
    since: 'Since 2018',
    heading: 'Where light transforms spaces into experiences.',
    paragraph:
        'ZIVIO LIFE creates architectural lighting that blends innovation, sustainability, and timeless design. We believe lighting is more than illumination - it is an art that shapes ambience, emotion, and human connection. Every solution is crafted to enhance residential and commercial spaces with elegance, efficiency, and lasting impact.',
};

export function BrandStorySection() {
    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-12 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-[7.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(184,138,42,0.08),transparent_30%),linear-gradient(150deg,#0A0A0A_0%,#101010_48%,#080808_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22rem_100%,100%_8rem] opacity-[0.16]" />
            <div className="pointer-events-none absolute top-1/2 right-[-10rem] h-96 w-96 -translate-y-1/2 rounded-full bg-[#B88A2A]/8 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#B88A2A]/22 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.72fr] lg:items-end lg:gap-24"
            >
                <div className="max-w-[720px]">
                    <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5">
                        <span className="h-px w-10 bg-[#B88A2A] sm:w-12" />
                        <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#B88A2A] uppercase">
                            {brandStory.label}
                        </p>
                    </div>

                    <h2 className="text-[clamp(2.35rem,9vw,3.6rem)] leading-[1] font-semibold text-balance text-[#F8F5EC] sm:text-[clamp(2.7rem,10vw,4.5rem)] lg:text-[clamp(4.5rem,6vw,6.8rem)]">
                        {brandStory.heading}
                    </h2>

                    <div className="mt-7 grid max-w-sm grid-cols-[auto_1fr] items-center gap-3 text-[#B88A2A] sm:mt-12 sm:gap-4">
                        <span className="grid size-12 place-items-center border border-[#B88A2A]/28 font-sans text-[0.66rem] font-semibold tracking-[0.22em] uppercase sm:size-14">
                            01
                        </span>
                        <p className="font-sans text-xs font-semibold tracking-[0.24em] uppercase sm:text-sm">
                            {brandStory.since}
                        </p>
                    </div>
                </div>

                <motion.aside
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                        delay: 0.1,
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative overflow-hidden border-l border-[#B88A2A]/24 bg-white/[0.022] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-9 lg:translate-y-8 lg:p-10"
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/45 to-transparent" />
                    <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#B88A2A]/7 blur-3xl" />

                    <p className="font-sans text-sm leading-7 tracking-[0.01em] text-[#D8D3C8] sm:text-lg sm:leading-9">
                        {brandStory.paragraph}
                    </p>
                </motion.aside>
            </motion.div>
        </section>
    );
}
