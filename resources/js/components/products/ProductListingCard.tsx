import { Link } from '@inertiajs/react';
import type { CatalogProduct } from '@/data/productsCatalogData';
import { Reveal } from '@/components/animations/Reveal';

type ProductListingCardProps = {
    product: CatalogProduct;
    index: number;
};

export function ProductListingCard({ product, index }: ProductListingCardProps) {
    return (
        <Reveal
            className="h-full"
            threshold={0.08}
            y={28}
            delay={index * 50}
        >
            <Link
                href={`/products/${product.slug}`}
                className="group relative flex flex-col h-full border border-black/[0.06] bg-white p-4 transition-all duration-500 hover:border-[#BDA18A]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-sm cursor-pointer block select-none"
                aria-label={`View ${product.name}`}
            >
                {/* 1:1 Aspect Ratio Image Frame */}
                <div className="relative w-full aspect-square overflow-hidden border border-black/[0.04] bg-[#F7F7F6] mb-5 rounded-xs">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        loading="lazy"
                        decoding="async"
                    />
                    
                    {/* Corner decorative luxury gold line */}
                    <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#BDA18A] transition-all duration-500 group-hover:w-1/3 pointer-events-none" />
                    <div className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#BDA18A] transition-all duration-500 group-hover:h-1/3 pointer-events-none" />
                </div>

                {/* Category / Subcategory Tag */}
                <div className="flex items-center gap-2 mb-2 pl-0.5">
                    <span className="font-sans text-[0.64rem] font-bold tracking-[0.16em] text-[#8E755F] uppercase">
                        {product.category}
                    </span>
                    <span className="text-black/20 text-xs">•</span>
                    <span className="font-sans text-[0.64rem] font-semibold tracking-[0.12em] text-[#716C64] uppercase">
                        {product.type}
                    </span>
                </div>

                {/* Product Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#171512] pl-0.5 transition-colors duration-300 group-hover:text-[#8E755F]">
                    {product.name}
                </h3>

                {/* Short Description */}
                <p className="mt-2 font-sans text-[0.8rem] leading-6 text-[#5C564C] pl-0.5 line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* Technical Specs Small Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 pl-0.5">
                    {product.specs.slice(0, 2).map((spec) => (
                        <span
                            key={spec}
                            className="rounded-full border border-black/[0.08] bg-black/[0.03] px-2.5 py-0.5 font-sans text-[0.62rem] font-semibold tracking-wide text-[#5C564C]"
                        >
                            {spec}
                        </span>
                    ))}
                </div>

                {/* View Details Visual CTA */}
                <div className="mt-auto pt-4 border-t border-black/[0.05] flex items-center justify-between pl-0.5">
                    <span className="inline-flex items-center gap-1.5 text-[0.74rem] font-bold tracking-[0.18em] text-[#171512] uppercase transition-all duration-300 group-hover:text-[#8E755F] group-hover:pl-1.5">
                        View Details
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                </div>
            </Link>
        </Reveal>
    );
}
