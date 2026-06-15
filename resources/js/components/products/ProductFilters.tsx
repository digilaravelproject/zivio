import type { CatalogCategory } from '@/data/productsCatalogData';
import { cn } from '@/lib/utils';

type ProductFiltersProps = {
    selectedCategory: CatalogCategory | 'All';
    onSelectCategory: (category: CatalogCategory | 'All') => void;
    categories: readonly CatalogCategory[];
};

export function ProductFilters({
    selectedCategory,
    onSelectCategory,
    categories,
}: ProductFiltersProps) {
    const list: (CatalogCategory | 'All')[] = ['All', ...categories];

    return (
        <div className="relative border-b border-white/[0.06] pb-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {list.map((cat) => {
                    const isActive = selectedCategory === cat;

                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => onSelectCategory(cat)}
                            className={cn(
                                'group relative overflow-hidden rounded-full border px-4.5 py-2 font-sans text-[0.7rem] font-bold tracking-[0.18em] uppercase transition duration-500 sm:px-5.5 sm:py-2.5 sm:text-[0.74rem]',
                                isActive
                                    ? 'border-[#BDA18A]/80 bg-[#BDA18A]/14 text-[#F8F5EC] shadow-[0_0_24px_rgba(184,138,42,0.12)]'
                                    : 'border-white/10 bg-white/[0.022] text-[#CFCFCB] hover:border-[#BDA18A]/50 hover:bg-[#BDA18A]/8 hover:text-[#F8F5EC]',
                            )}
                            aria-pressed={isActive}
                        >
                            <span className="relative z-10">{cat}</span>
                            <span
                                className={cn(
                                    'pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[#BDA18A] transition duration-500',
                                    isActive && 'scale-x-100',
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
