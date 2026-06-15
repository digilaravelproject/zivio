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
            className="group relative overflow-hidden rounded-[8px] border border-[#BDA18A]/14 bg-[#F8F4EC]/62 shadow-[0_18px_52px_rgba(42,34,24,0.12)] backdrop-blur-md transition duration-700 hover:-translate-y-1 hover:border-[#BDA18A]/42 sm:shadow-[0_24px_70px_rgba(42,34,24,0.14)] md:hover:-translate-y-2 md:hover:border-[#BDA18A]/48 md:hover:shadow-[0_34px_95px_rgba(42,34,24,0.18),0_0_34px_rgba(184,148,95,0.12)] md:[transform-style:preserve-3d] md:hover:[transform:rotateX(1deg)_rotateY(-1deg)_translateY(-8px)]"
        >
            <Link
                href={product.href}
                className="absolute inset-0 z-40"
                aria-label={`View ${product.name}`}
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),transparent_34%),radial-gradient(circle_at_50%_0%,rgba(184,148,95,0.14),transparent_36%)] opacity-70 transition duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-px rounded-[7px] border border-white/35" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="relative aspect-[1/1.08] overflow-hidden bg-gradient-to-br from-[#EFE4D4] via-[#F8F4EC] to-[#D8CCBB]">
                <div className="pointer-events-none absolute inset-5 rounded-full bg-[#BDA18A]/14 blur-2xl transition duration-700 group-hover:bg-[#BDA18A]/18" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.45)_48%,transparent_64%)] opacity-0 transition duration-700 group-hover:translate-x-8 group-hover:opacity-70" />

                <img
                    src={product.image}
                    alt={product.name}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                        'relative z-10 h-full w-full p-2.5 transition duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] sm:p-4 sm:group-hover:-translate-y-1.5 sm:group-hover:scale-[1.04]',
                        product.imageFit === 'contain'
                            ? 'object-contain'
                            : 'object-cover',
                    )}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171512]/12 via-transparent to-white/20" />

                <div className="absolute top-3 left-3 z-20 font-sans text-[0.56rem] font-semibold tracking-[0.18em] text-[#BDA18A] sm:top-4 sm:left-4 sm:text-[0.62rem] sm:tracking-[0.2em]">
                    {productNumber}
                </div>
                <p className="absolute right-2 bottom-2 z-20 rounded-full border border-[#BDA18A]/20 bg-[#F8F4EC]/72 px-2 py-1 font-sans text-[0.5rem] font-semibold tracking-[0.1em] text-[#BDA18A] uppercase backdrop-blur-sm sm:right-4 sm:bottom-4 sm:px-3 sm:py-1.5 sm:text-[0.56rem] sm:tracking-[0.14em]">
                    {product.categories[0]}
                </p>
            </div>

            <div className="relative p-3 sm:p-6">
                <span className="mb-3 block h-px w-9 bg-gradient-to-r from-[#BDA18A] to-transparent sm:mb-4 sm:w-12" />
                <h3 className="text-[1rem] leading-5 font-medium text-[#171512] sm:text-[1.32rem] sm:leading-7">
                    {product.name}
                </h3>
                <p className="mt-2 min-h-10 font-sans text-[0.72rem] leading-5 text-[#665F53] sm:mt-3 sm:min-h-12 sm:text-sm sm:leading-6">
                    {product.subtitle}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 font-sans text-[0.56rem] font-semibold tracking-[0.14em] text-[#171512] uppercase opacity-80 transition duration-500 group-hover:translate-x-1 group-hover:text-[#BDA18A] group-hover:opacity-100 sm:mt-5 sm:gap-2 sm:text-[0.62rem] sm:tracking-[0.17em]">
                    Details
                    <ArrowUpRight
                        className="size-3.5 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4"
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </motion.article>
    );
}
