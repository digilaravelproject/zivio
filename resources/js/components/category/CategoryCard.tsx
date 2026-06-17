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
                'cinematic-image-frame group relative h-[220px] overflow-hidden bg-white transition-opacity duration-700 sm:h-[260px] md:[transform-style:preserve-3d] lg:h-[280px] 2xl:h-[300px]',
                isDimmed && 'opacity-45',
            )}
            animate={{
                y: isActive ? -7 : 0,
                rotateX: isActive ? 0.7 : 0,
                rotateY: isActive ? (index % 2 === 0 ? -0.8 : 0.8) : 0,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={category.href}
                className="absolute inset-0 z-50"
                aria-label={`View ${category.title}`}
            />

            <motion.div
                className="pointer-events-none absolute -inset-px z-30 border border-[#BDA18A]/0 transition duration-700 group-hover:border-[#BDA18A]/50"
                animate={{
                    boxShadow: isActive
                        ? '0 0 70px rgba(184, 148, 95, 0.18)'
                        : '0 0 0 rgba(184, 148, 95, 0)',
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className={cn(
                "absolute inset-0 transition duration-700 z-10",
                isActive ? "bg-black/88" : "bg-transparent"
            )} />

            {/* Spotlight Radial Glow behind the product image */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-700 z-[15] pointer-events-none",
                isActive ? "opacity-100" : "opacity-0"
            )}
            style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 68%)'
            }} />

            <div className={cn(
                "absolute inset-0 bg-gradient-to-t transition-opacity duration-700 z-20 pointer-events-none",
                isActive ? "from-black/65 via-transparent to-transparent opacity-100" : "from-black/10 via-transparent to-transparent opacity-40"
            )} />
            <div className="pointer-events-none absolute inset-0 z-[22] -translate-x-full bg-[linear-gradient(105deg,transparent_0%,rgba(255,239,205,0.1)_46%,transparent_62%)] opacity-0 transition duration-[1400ms] ease-out group-hover:translate-x-full group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 z-[22] bg-[radial-gradient(circle_at_50%_18%,rgba(255,223,176,0.04),transparent_34%)] opacity-0 transition duration-700 group-hover:opacity-100" />

            <motion.img
                src={category.image}
                alt={category.title}
                width={1600}
                height={2100}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-contain p-4 z-[25]"
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                animate={{
                    scale: isActive ? [1.02, 1.12] : 1.02,
                    y: isActive ? -8 : 0,
                }}
                transition={{
                    scale: isActive
                        ? { duration: 8.5, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
                        : { duration: 1.45, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 1.45, ease: [0.22, 1, 0.36, 1] }
                }}
            />

            <div className={cn(
                "absolute top-4 right-4 z-40 grid size-9 place-items-center border backdrop-blur-sm transition-all duration-500",
                isActive
                    ? "border-white bg-white text-black"
                    : "border-black/12 bg-black/5 text-[#0A0A0A]"
            )}>
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-40 sm:inset-x-5 sm:bottom-5">
                <motion.div
                    animate={{ y: isActive ? -8 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="mb-3 block h-px w-8 bg-[#BDA18A]" />
                    <p className={cn(
                        "mb-2 font-sans text-[0.58rem] font-medium tracking-[0.18em] uppercase transition-colors duration-500",
                        isActive ? "text-[#BDA18A]" : "text-[#BDA18A]/80"
                    )}>
                        {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className={cn(
                        "max-w-[12rem] font-montserrat text-[1.15rem] leading-[1.12] font-bold sm:max-w-[14rem] sm:text-[1.45rem] xl:text-[1.65rem] transition-colors duration-500",
                        isActive ? "text-[#F8F5EC]" : "text-[#0A0A0A]"
                    )}>
                        {category.title}
                    </h3>
                    <motion.p
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0.72,
                            y: isActive ? 0 : 8,
                        }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className={cn(
                            "mt-3 font-sans text-[0.54rem] font-medium tracking-[0.14em] uppercase sm:mt-4 group-hover:underline underline-offset-4 decoration-[#BDA18A] transition-colors duration-500",
                            isActive ? "text-[#F5F5F2]" : "text-[#555555]"
                        )}
                    >
                        Explore Collection
                    </motion.p>
                </motion.div>
            </div>
        </motion.article>
    );
}
