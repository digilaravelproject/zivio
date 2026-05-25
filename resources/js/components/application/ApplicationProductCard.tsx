import { Link } from '@inertiajs/react';

import type { FeaturedProduct } from '@/data/featuredApplicationData';

type ApplicationProductCardProps = {
    product: FeaturedProduct;
};

export function ApplicationProductCard({ product }: ApplicationProductCardProps) {
    return (
        <Link
            href={product.href}
            className="group block w-[9.75rem] overflow-hidden border border-white/[0.08] bg-[#080808]/72 p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#B88A2A]/45 sm:w-[12rem] sm:p-3 lg:w-[13rem]"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
                <img
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 13rem, (min-width: 640px) 12rem, 10.5rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/42 to-transparent" />
            </div>

            <div className="pt-3 sm:pt-4">
                <p className="mb-2 font-sans text-[0.6rem] font-semibold tracking-[0.22em] text-[#B88A2A] uppercase">
                    {product.category}
                </p>
                <h3 className="text-lg leading-5 font-semibold text-[#F8F5EC] sm:text-[1.35rem] sm:leading-6">
                    {product.name}
                </h3>
            </div>
        </Link>
    );
}
