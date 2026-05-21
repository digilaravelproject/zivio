import { motion } from 'framer-motion';

import type { FeaturedProduct } from '@/data/featuredApplicationData';

type ApplicationAccordionProps = {
    product: FeaturedProduct;
    productIndex: number;
};

export function ApplicationAccordion({
    product,
    productIndex,
}: ApplicationAccordionProps) {
    const application = product.applications[0];

    return (
        <motion.figure
            key={product.id}
            initial={{ opacity: 0, x: 16, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.985 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            <div className="relative h-[300px] overflow-hidden border border-white/[0.08] bg-[#111111] shadow-[0_28px_80px_rgba(0,0,0,0.36)] sm:h-[380px] md:h-[420px] lg:h-[460px] xl:h-[520px]">
                <img
                    src={application.image}
                    alt={application.title}
                    width={1400}
                    height={1800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/14" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/88 via-[#0A0A0A]/20 to-transparent" />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(184,155,114,0.1)]" />

                <figcaption className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                    <span className="mb-4 block h-px w-12 bg-[#DA9807]/85" />
                    <h3 className="text-3xl leading-none font-semibold text-[#F8F5EC] sm:text-4xl lg:text-5xl">
                        {application.title}
                    </h3>
                    <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-[#D8D3C8] sm:max-w-md sm:leading-7">
                        {application.caption}
                    </p>
                </figcaption>
            </div>
        </motion.figure>
    );
}
