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
            className="group relative overflow-hidden rounded-[8px] border border-[#BDA18A]/14 bg-white shadow-[0_12px_42px_rgba(42,34,24,0.08)] transition duration-700 hover:-translate-y-1 hover:border-[#BDA18A]/42 sm:shadow-[0_16px_56px_rgba(42,34,24,0.1)] md:hover:-translate-y-2 md:hover:border-[#BDA18A]/48 md:hover:shadow-[0_24px_76px_rgba(42,34,24,0.14)]"
        >
            <Link
                href={product.href}
                className="absolute inset-0 z-40"
                aria-label={`View ${product.name}`}
            />

            <div className="relative aspect-[1/1.08] overflow-hidden bg-white">
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

                <div className="absolute top-3 left-3 z-20 font-sans text-[0.56rem] font-semibold tracking-[0.18em] text-[#BDA18A] sm:top-4 sm:left-4 sm:text-[0.62rem] sm:tracking-[0.2em]">
                    {productNumber}
                </div>
                <p className="absolute right-2 bottom-2 z-20 rounded-full border border-[#BDA18A]/20 bg-[#F8F4EC]/72 px-2 py-1 font-sans text-[0.5rem] font-semibold tracking-[0.1em] text-[#BDA18A] backdrop-blur-sm sm:right-4 sm:bottom-4 sm:px-3 sm:py-1.5 sm:text-[0.56rem] sm:tracking-[0.14em]">
                    {product.categories[0]}
                </p>
            </div>

            <div className="relative p-3 bg-white sm:p-6">
                <h3 className="text-[1rem] leading-5 font-medium text-[#171512] uppercase tracking-wider sm:text-[1.32rem] sm:leading-7">
                    {product.name}
                </h3>
                <p className="mt-2 min-h-10 font-sans text-[0.72rem] leading-5 text-[#665F53] sm:mt-3 sm:min-h-12 sm:text-sm sm:leading-6">
                    {product.subtitle}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 font-sans text-[0.56rem] font-semibold tracking-[0.14em] text-[#171512] uppercase opacity-80 transition duration-500 group-hover:translate-x-1 group-hover:text-[#BDA18A] group-hover:opacity-100 group-hover:underline underline-offset-4 decoration-[#BDA18A] sm:mt-5 sm:gap-2 sm:text-[0.62rem] sm:tracking-[0.17em]">
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
