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
                'group relative h-[320px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-opacity duration-500 [transform-style:preserve-3d] sm:h-[380px] lg:h-[460px] 2xl:h-[520px]',
                isDimmed && 'opacity-45',
            )}
            animate={{
                y: isActive ? -10 : 0,
                rotateX: isActive ? 1.4 : 0,
                rotateY: isActive ? (index % 2 === 0 ? -1.6 : 1.6) : 0,
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={category.href}
                className="absolute inset-0 z-50"
                aria-label={`View ${category.title}`}
            />

            <motion.div
                className="pointer-events-none absolute -inset-px z-30 border border-[#B89B72]/0 transition duration-500 group-hover:border-[#B89B72]/45"
                animate={{
                    boxShadow: isActive
                        ? '0 0 70px rgba(184, 155, 114, 0.22)'
                        : '0 0 0 rgba(184, 155, 114, 0)',
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
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
                animate={{ scale: isActive ? 1.12 : 1.02 }}
                transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute inset-0 bg-[#0A0A0A]/42 transition duration-500 group-hover:bg-[#0A0A0A]/22" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/30 to-[#0A0A0A]/15" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0A0A]/50 to-transparent" />
            <div className="absolute top-5 right-5 z-40 grid size-10 place-items-center border border-white/15 bg-[#0A0A0A]/20 text-[#F5F5F2] backdrop-blur-sm transition duration-500 group-hover:border-[#B89B72]/70 group-hover:text-[#B89B72]">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </div>

            <div className="pointer-events-none absolute inset-x-5 bottom-6 z-40 sm:inset-x-6 sm:bottom-7">
                <motion.div
                    animate={{ y: isActive ? -8 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="mb-4 block h-px w-10 bg-[#B89B72]" />
                    <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.28em] text-[#B89B72] uppercase">
                        {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="max-w-[13rem] text-4xl leading-[0.92] font-semibold text-[#F8F5EC] sm:text-5xl xl:text-[3.4rem]">
                        {category.title}
                    </h3>
                    <motion.p
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0.72,
                            y: isActive ? 0 : 8,
                        }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="mt-5 text-[0.68rem] font-semibold tracking-[0.22em] text-[#F5F5F2] uppercase"
                    >
                        Explore Collection
                    </motion.p>
                </motion.div>
            </div>
        </motion.article>
    );
}
