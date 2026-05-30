import { cn } from '@/lib/utils';

type ProductTypeFiltersProps = {
    selectedType: string | 'All';
    onSelectType: (type: string | 'All') => void;
    types: string[];
};

export function ProductTypeFilters({
    selectedType,
    onSelectType,
    types,
}: ProductTypeFiltersProps) {
    if (types.length === 0) {
        return null;
    }

    const list = ['All', ...types];

    return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
            {list.map((type) => {
                const isActive = selectedType === type;

                return (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onSelectType(type)}
                        className={cn(
                            'rounded-full border px-4 py-1.8 font-sans text-[0.66rem] font-bold tracking-[0.12em] uppercase transition duration-300',
                            isActive
                                ? 'border-[#B88A2A]/50 bg-[#B88A2A]/8 text-[#DA9807]'
                                : 'border-white/[0.08] bg-white/[0.015] text-[#CFCFCB] hover:border-white/20 hover:text-[#F8F5EC]',
                        )}
                        aria-pressed={isActive}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
}
