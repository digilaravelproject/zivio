import type { ProductCategory } from '@/data/productsData';
import { cn } from '@/lib/utils';

type ProductCategoryTabsProps = {
    categories: ProductCategory[];
    activeCategory: ProductCategory;
    onCategoryChange: (category: ProductCategory) => void;
};

export function ProductCategoryTabs({
    categories,
    activeCategory,
    onCategoryChange,
}: ProductCategoryTabsProps) {
    return (
        <div
            className="-mx-4 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Product categories"
        >
            <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0 sm:gap-3">
                {categories.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                'group relative shrink-0 overflow-hidden rounded-full border px-4 py-2.5 font-sans text-[0.64rem] font-semibold tracking-[0.18em] uppercase transition duration-500 sm:px-5',
                                isActive
                                    ? 'border-[#DA9807]/80 bg-[#DA9807]/16 text-[#F8F5EC] shadow-[0_0_32px_rgba(218,152,7,0.16)]'
                                    : 'border-white/10 bg-white/[0.025] text-[#BDB7AA] hover:border-[#DA9807]/55 hover:bg-[#DA9807]/8 hover:text-[#F8F5EC]',
                            )}
                            aria-pressed={isActive}
                        >
                            <span className="relative z-10">{category}</span>
                            <span
                                className={cn(
                                    'pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[#DA9807] transition duration-500',
                                    isActive && 'scale-x-100',
                                )}
                            />
                            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.08] via-transparent to-[#DA9807]/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
