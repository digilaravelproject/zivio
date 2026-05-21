import { Link } from '@inertiajs/react';

import type { FeaturedProduct } from '@/data/featuredApplicationData';

type ApplicationProductCardProps = {
    product: FeaturedProduct;
};

export function ApplicationProductCard({ product }: ApplicationProductCardProps) {
    return (
        <Link
            href={product.href}
            className="group block w-[10.5rem] overflow-hidden border border-white/[0.1] bg-[#0A0A0A]/76 p-2.5 shadow-[0_22px_58px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-300 hover:border-[#B89B72]/55 sm:w-[12rem] sm:p-3 lg:w-[13rem]"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
                <img
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 13rem, (min-width: 640px) 12rem, 10.5rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/42 to-transparent" />
            </div>

            <div className="pt-3 sm:pt-4">
                <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.22em] text-[#B89B72] uppercase">
                    {product.category}
                </p>
                <h3 className="text-xl leading-6 font-semibold text-[#F8F5EC] sm:text-2xl">
                    {product.name}
                </h3>
            </div>
        </Link>
    );
}
