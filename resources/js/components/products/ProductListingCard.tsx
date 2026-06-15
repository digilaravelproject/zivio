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
            className="group flex flex-col border border-white/[0.05] bg-[#111111]/30 backdrop-blur-md p-4 transition-all duration-500 hover:border-[#BDA18A]/40 hover:bg-[#111111]/70 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            threshold={0.08}
            y={28}
            delay={index * 50}
        >
            {/* 1:1 Aspect Ratio Image Frame */}
            <div className="relative w-full aspect-square overflow-hidden border border-white/[0.08] bg-[#0E0E0E] mb-5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] brightness-[0.88]"
                    loading="lazy"
                    decoding="async"
                />
                
                {/* Soft ambient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                
                {/* Corner decorative luxury gold line */}
                <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#BDA18A] transition-all duration-500 group-hover:w-1/3" />
                <div className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#BDA18A] transition-all duration-500 group-hover:h-1/3" />
            </div>

            {/* Category / Subcategory Tag */}
            <div className="flex items-center gap-2 mb-2 pl-0.5">
                <span className="font-sans text-[0.64rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                    {product.category}
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="font-sans text-[0.64rem] font-semibold tracking-[0.12em] text-[#CFCFCB] uppercase">
                    {product.type}
                </span>
            </div>

            {/* Product Title */}
            <h3 className="text-xl font-bold text-[#F8F5EC] pl-0.5 transition-colors duration-300 group-hover:text-[#D2B276]">
                {product.name}
            </h3>

            {/* Short Description */}
            <p className="mt-2.5 font-sans text-[0.8rem] leading-6 text-[#D8D3C8] pl-0.5 line-clamp-2">
                {product.shortDescription}
            </p>

            {/* Technical Specs Small Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5 pl-0.5">
                {product.specs.slice(0, 2).map((spec) => (
                    <span
                        key={spec}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-sans text-[0.62rem] font-semibold tracking-wide text-[#CFCFCB]"
                    >
                        {spec}
                    </span>
                ))}
            </div>

            {/* View Details Link */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between pl-0.5">
                <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-[0.74rem] font-bold tracking-[0.2em] text-[#F8F5EC] uppercase transition-all duration-300 group-hover:text-[#BDA18A] group-hover:pl-1.5"
                >
                    View Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </Reveal>
    );
}
