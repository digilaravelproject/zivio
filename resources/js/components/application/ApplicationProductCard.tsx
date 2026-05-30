import { Link } from '@inertiajs/react';

import type { FeaturedProduct } from '@/data/featuredApplicationData';

type ApplicationProductCardProps = {
    product: FeaturedProduct;
};

export function ApplicationProductCard({ product }: ApplicationProductCardProps) {
    return (
        <Link
            href={product.href}
            className="group block w-[10.5rem] overflow-hidden border border-white/[0.1] bg-[#080808]/78 p-2.5 shadow-[0_28px_78px_rgba(0,0,0,0.42),0_0_42px_rgba(184,148,95,0.1)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#B8945F]/50 sm:w-[12.75rem] sm:p-3 lg:w-[14rem]"
        >
            <div className="relative aspect-square overflow-hidden bg-[#111111]">
                <img
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.045]"
                    sizes="(min-width: 1024px) 14rem, (min-width: 640px) 12.75rem, 10.5rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/34 via-transparent to-white/8" />
                <div className="absolute inset-0 shadow-[inset_0_0_70px_rgba(184,148,95,0.12)]" />
            </div>

            <div className="pt-3 sm:pt-4">
                <p className="mb-2 font-sans text-[0.56rem] font-medium tracking-[0.18em] text-[#B8945F] uppercase">
                    {product.category}
                </p>
                <h3 className="text-base leading-5 font-normal text-[#F8F5EC] sm:text-[1.18rem] sm:leading-6">
                    {product.name}
                </h3>
            </div>
        </Link>
    );
}
