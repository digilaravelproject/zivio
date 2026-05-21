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
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,155,114,0.13),transparent_28%),linear-gradient(135deg,#0A0A0A_0%,#111111_52%,#080808_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,155,114,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(184,155,114,0.045)_1px,transparent_1px)] bg-[size:18rem_100%,100%_7rem] opacity-20" />
            <div className="pointer-events-none absolute top-1/2 right-[-8rem] h-96 w-96 -translate-y-1/2 rounded-full bg-[#DA9807]/12 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#DA9807]/30 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_0.78fr] lg:items-center lg:gap-20"
            >
                <div className="max-w-[640px]">
                    <div className="mb-7 flex items-center gap-5">
                        <span className="h-px w-12 bg-[#DA9807]" />
                        <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-[#DA9807] uppercase">
                            {brandStory.label}
                        </p>
                    </div>

                    <h2 className="text-4xl leading-[1.02] font-semibold text-balance text-[#F8F5EC] sm:text-5xl sm:leading-[0.98] lg:text-6xl xl:text-7xl">
                        {brandStory.heading}
                    </h2>

                    <div className="mt-10 grid max-w-sm grid-cols-[auto_1fr] items-center gap-4 text-[#DA9807]">
                        <span className="grid size-14 place-items-center border border-[#DA9807]/35 text-xs font-semibold tracking-[0.22em] uppercase">
                            01
                        </span>
                        <p className="text-sm tracking-[0.22em] uppercase">
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
                    className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-md sm:p-9 lg:p-10"
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DA9807]/65 to-transparent" />
                    <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#DA9807]/10 blur-3xl" />

                    <p className="font-sans text-base leading-8 text-[#D8D3C8] sm:text-lg sm:leading-9">
                        {brandStory.paragraph}
                    </p>
                </motion.aside>
            </motion.div>
        </section>
    );
}
