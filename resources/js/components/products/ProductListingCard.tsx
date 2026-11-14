import { Link } from '@inertiajs/react';
import type { CatalogProduct } from '@/data/productsCatalogData';
import { Reveal } from '@/components/animations/Reveal';

type ProductListingCardProps = {
    product: CatalogProduct;
    index: number;
};

export function ProductListingCard({ product, index }: ProductListingCardProps) {
    const categoryName = typeof product.category === 'object' && product.category !== null
        ? ((product.category as any).environment?.name || (product.category as any).name || 'Architectural')
        : (product.category || 'Architectural');

    const typeName = product.type || (typeof product.category === 'object' && product.category !== null ? (product.category as any).name : 'Luminaire');
    const shortDesc = product.shortDescription || (product as any).short_description || '';
    const specsList = Array.isArray(product.specs) ? product.specs : [];

    return (
        <Reveal
            className="h-full"
            threshold={0.08}
            y={28}
            delay={index * 50}
        >
            <Link
                href={`/product/${product.slug}`}
                className="group relative flex flex-col h-full border border-white/[0.08] bg-[#121215] p-4 transition-all duration-500 hover:border-[#B5722A]/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm cursor-pointer block select-none"
                aria-label={`View ${product.name}`}
            >
                {/* 1:1 Aspect Ratio Image Frame */}
                <div className="relative w-full aspect-square overflow-hidden border border-white/[0.05] bg-[#0A0A0C] mb-5 rounded-xs">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                    />
                    
                    {/* Corner decorative luxury amber line */}
                    <div className="absolute top-0 right-0 h-[1.5px] w-0 bg-[#B5722A] transition-all duration-500 group-hover:w-1/3 pointer-events-none" />
                    <div className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#B5722A] transition-all duration-500 group-hover:h-1/3 pointer-events-none" />
                </div>

                {/* Category / Subcategory Tag */}
                <div className="flex items-center gap-2 mb-2 pl-0.5">
                    <span className="font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#B5722A] uppercase">
                        {categoryName}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="font-sans text-[0.64rem] font-semibold tracking-[0.12em] text-white/50 uppercase">
                        {typeName}
                    </span>
                </div>

                {/* Product Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white pl-0.5 transition-colors duration-300 group-hover:text-[#C9944A]">
                    {product.name}
                </h3>

                {/* Short Description */}
                {shortDesc && (
                    <p className="mt-2 font-sans text-[0.8rem] leading-6 text-white/60 pl-0.5 line-clamp-2">
                        {shortDesc}
                    </p>
                )}

                {/* Technical Specs Small Pills */}
                {specsList.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pl-0.5">
                        {specsList.slice(0, 2).map((spec, sIdx) => {
                            const specText = typeof spec === 'string' ? spec : (spec as any)?.value || (spec as any)?.label || String(spec);
                            return (
                                <span
                                    key={sIdx}
                                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 font-sans text-[0.62rem] font-semibold tracking-wide text-white/70"
                                >
                                    {specText}
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* View Details Visual CTA */}
                <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between pl-0.5">
                    <span className="inline-flex items-center gap-1.5 text-[0.74rem] font-bold tracking-[0.18em] text-white/90 uppercase transition-all duration-300 group-hover:text-[#B5722A] group-hover:pl-1.5">
                        View Details
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                </div>
            </Link>
        </Reveal>
    );
}
