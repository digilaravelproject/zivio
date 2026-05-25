import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { Product } from '@/data/productsData';
import { cn } from '@/lib/utils';

type ProductCardProps = {
    product: Product;
    index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
    const productNumber = String(index + 1).padStart(2, '0');

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{
                delay: Math.min(index * 0.04, 0.18),
                duration: 0.56,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-[8px] border border-white/[0.09] bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-700 hover:-translate-y-2 hover:border-[#DA9807]/55 hover:shadow-[0_34px_95px_rgba(0,0,0,0.45),0_0_42px_rgba(218,152,7,0.13)] md:[transform-style:preserve-3d] md:hover:[transform:rotateX(2deg)_rotateY(-2deg)_translateY(-8px)]"
        >
            <Link
                href={product.href}
                className="absolute inset-0 z-40"
                aria-label={`View ${product.name}`}
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_50%_0%,rgba(218,152,7,0.13),transparent_36%)] opacity-60 transition duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-px rounded-[7px] border border-white/[0.04]" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#171717] via-[#101010] to-[#080808]">
                <div className="pointer-events-none absolute inset-5 rounded-full bg-[#DA9807]/8 blur-2xl transition duration-700 group-hover:bg-[#DA9807]/14" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.09)_48%,transparent_64%)] opacity-0 transition duration-700 group-hover:translate-x-8 group-hover:opacity-70" />

                <img
                    src={product.image}
                    alt={product.name}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                        'relative z-10 h-full w-full p-4 transition duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] sm:p-5',
                        product.imageFit === 'contain'
                            ? 'object-contain'
                            : 'object-cover',
                    )}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/64 via-transparent to-[#0A0A0A]/16" />

                <div className="absolute top-4 left-4 z-20 font-sans text-[0.68rem] font-semibold tracking-[0.24em] text-[#DA9807]">
                    {productNumber}
                </div>
                <p className="absolute right-4 bottom-4 z-20 rounded-full border border-[#DA9807]/30 bg-[#0A0A0A]/45 px-3 py-1.5 font-sans text-[0.58rem] font-semibold tracking-[0.18em] text-[#DA9807] uppercase backdrop-blur-sm">
                    {product.categories[0]}
                </p>
            </div>

            <div className="relative p-5 sm:p-6">
                <span className="mb-4 block h-px w-12 bg-gradient-to-r from-[#DA9807] to-transparent" />
                <h3 className="text-[1.45rem] leading-7 font-semibold text-[#F8F5EC]">
                    {product.name}
                </h3>
                <p className="mt-3 min-h-12 font-sans text-sm leading-6 text-[#CFCFCB]">
                    {product.subtitle}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F8F5EC] uppercase opacity-90 transition duration-500 group-hover:translate-x-1 group-hover:text-[#DA9807] group-hover:opacity-100">
                    Details
                    <ArrowUpRight
                        className="size-4 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </motion.article>
    );
}
