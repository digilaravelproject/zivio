import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { Category } from '@/data/categoriesData';
import { cn } from '@/lib/utils';

type CategoryCardProps = {
    category: Category;
    index: number;
    isActive: boolean;
    isDimmed: boolean;
    onActivate: (index: number) => void;
    onClear: () => void;
};

export function CategoryCard({
    category,
    index,
    isActive,
    isDimmed,
    onActivate,
    onClear,
}: CategoryCardProps) {
    return (
        <motion.article
            onMouseEnter={() => onActivate(index)}
            onFocus={() => onActivate(index)}
            onMouseLeave={onClear}
            className={cn(
                'group relative h-[260px] overflow-hidden border border-white/[0.08] bg-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-opacity duration-700 sm:h-[370px] md:[transform-style:preserve-3d] lg:h-[450px] 2xl:h-[500px]',
                index % 2 === 1 && 'xl:translate-y-8',
                isDimmed && 'opacity-45',
            )}
            animate={{
                y: isActive ? -4 : 0,
                rotateX: isActive ? 0.8 : 0,
                rotateY: isActive ? (index % 2 === 0 ? -0.9 : 0.9) : 0,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={category.href}
                className="absolute inset-0 z-50"
                aria-label={`View ${category.title}`}
            />

            <motion.div
                className="pointer-events-none absolute -inset-px z-30 border border-[#B88A2A]/0 transition duration-700 group-hover:border-[#B88A2A]/34"
                animate={{
                    boxShadow: isActive
                        ? '0 0 56px rgba(184, 138, 42, 0.14)'
                        : '0 0 0 rgba(184, 138, 42, 0)',
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.img
                src={category.image}
                alt={category.title}
                width={1600}
                height={2100}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                animate={{ scale: isActive ? 1.09 : 1.02 }}
                transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute inset-0 bg-[#0A0A0A]/44 transition duration-700 group-hover:bg-[#0A0A0A]/24" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/30 to-[#0A0A0A]/15" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0A0A]/50 to-transparent" />
            <div className="absolute top-5 right-5 z-40 grid size-10 place-items-center border border-white/[0.12] bg-[#0A0A0A]/22 text-[#F5F5F2] backdrop-blur-sm transition duration-500 group-hover:border-[#B88A2A]/60 group-hover:text-[#D2B276]">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </div>

            <div className="pointer-events-none absolute inset-x-5 bottom-6 z-40 sm:inset-x-6 sm:bottom-7">
                <motion.div
                    animate={{ y: isActive ? -8 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="mb-4 block h-px w-10 bg-[#B88A2A]" />
                    <p className="mb-3 font-sans text-[0.64rem] font-semibold tracking-[0.28em] text-[#B88A2A] uppercase">
                        {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="max-w-[12rem] text-3xl leading-[0.98] font-semibold text-[#F8F5EC] sm:max-w-[13rem] sm:text-5xl xl:text-[3.2rem]">
                        {category.title}
                    </h3>
                    <motion.p
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0.72,
                            y: isActive ? 0 : 8,
                        }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="mt-4 font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase sm:mt-5 sm:text-[0.64rem] sm:tracking-[0.22em]"
                    >
                        Explore Collection
                    </motion.p>
                </motion.div>
            </div>
        </motion.article>
    );
}
