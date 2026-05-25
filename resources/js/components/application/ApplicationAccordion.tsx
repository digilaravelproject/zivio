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
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            <div className="relative h-[260px] overflow-hidden border border-white/[0.07] bg-[#101010] shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:h-[380px] md:h-[430px] lg:h-[500px] xl:h-[560px]">
                <img
                    src={application.image}
                    alt={application.title}
                    width={1400}
                    height={1800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-[1800ms] ease-out hover:scale-[1.025]"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/12" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/86 via-[#0A0A0A]/18 to-transparent" />
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(184,138,42,0.08)]" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />

                <figcaption className="absolute inset-x-4 bottom-4 sm:inset-x-7 sm:bottom-7">
                    <span className="mb-3 block h-px w-10 bg-[#B88A2A]/80 sm:mb-4 sm:w-12" />
                    <h3 className="text-2xl leading-none font-semibold text-[#F8F5EC] sm:text-4xl lg:text-[3.2rem]">
                        {application.title}
                    </h3>
                    <p className="mt-2 max-w-sm font-sans text-xs leading-5 text-[#D8D3C8] sm:mt-3 sm:max-w-md sm:text-sm sm:leading-7">
                        {application.caption}
                    </p>
                </figcaption>
            </div>
        </motion.figure>
    );
}
