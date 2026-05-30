import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const activeButtonRef = useRef<HTMLButtonElement | null>(null);
    const isFirstRender = useRef(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const element = scrollRef.current;

        if (!element) {
            return;
        }

        const maxScrollLeft = element.scrollWidth - element.clientWidth;

        setCanScrollLeft(element.scrollLeft > 4);
        setCanScrollRight(element.scrollLeft < maxScrollLeft - 4);
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        const element = scrollRef.current;

        if (!element) {
            return;
        }

        element.scrollBy({
            left: element.clientWidth * 0.72 * (direction === 'right' ? 1 : -1),
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const element = scrollRef.current;

        if (!element) {
            return;
        }

        updateScrollState();
        element.addEventListener('scroll', updateScrollState, {
            passive: true,
        });
        window.addEventListener('resize', updateScrollState);

        return () => {
            element.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const container = scrollRef.current;
        const button = activeButtonRef.current;

        if (container && button) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            if (containerRect.width > 0) {
                const targetScrollLeft =
                    container.scrollLeft +
                    (buttonRect.left - containerRect.left) -
                    containerRect.width / 2 +
                    buttonRect.width / 2;

                container.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth',
                });
            }
        }

        window.setTimeout(updateScrollState, 260);
    }, [activeCategory]);

    const hasOverflow = canScrollLeft || canScrollRight;

    return (
        <div className="relative">
            <div
                className={cn(
                    'pointer-events-none absolute top-0 bottom-3 left-0 z-10 w-10 bg-gradient-to-r from-[#F1EADF] to-transparent opacity-0 transition duration-300 lg:hidden',
                    canScrollLeft && 'opacity-100',
                )}
            />
            <div
                className={cn(
                    'pointer-events-none absolute top-0 right-0 bottom-3 z-10 w-10 bg-gradient-to-l from-[#F1EADF] to-transparent opacity-0 transition duration-300 lg:hidden',
                    canScrollRight && 'opacity-100',
                )}
            />

            <button
                type="button"
                onClick={() => scrollTabs('left')}
                disabled={!canScrollLeft}
                className={cn(
                    'absolute top-1/2 left-0 z-20 grid size-8 -translate-y-[calc(50%+0.35rem)] place-items-center rounded-full border border-[#8D6B38]/16 bg-[#F8F4EC]/82 text-[#171512] shadow-[0_14px_36px_rgba(42,34,24,0.14)] backdrop-blur-xl transition duration-300 hover:border-[#8D6B38]/50 hover:text-[#8D6B38] lg:hidden',
                    (!hasOverflow || !canScrollLeft) &&
                        'pointer-events-none opacity-0',
                )}
                aria-label="Scroll product categories left"
            >
                <ChevronLeft className="size-4" strokeWidth={1.6} />
            </button>

            <button
                type="button"
                onClick={() => scrollTabs('right')}
                disabled={!canScrollRight}
                className={cn(
                    'absolute top-1/2 right-0 z-20 grid size-8 -translate-y-[calc(50%+0.35rem)] place-items-center rounded-full border border-[#8D6B38]/16 bg-[#F8F4EC]/82 text-[#171512] shadow-[0_14px_36px_rgba(42,34,24,0.14)] backdrop-blur-xl transition duration-300 hover:border-[#8D6B38]/50 hover:text-[#8D6B38] lg:hidden',
                    (!hasOverflow || !canScrollRight) &&
                        'pointer-events-none opacity-0',
                )}
                aria-label="Scroll product categories right"
            >
                <ChevronRight className="size-4" strokeWidth={1.6} />
            </button>

            <div
                ref={scrollRef}
                className="-mx-4 overflow-x-auto scroll-smooth px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                aria-label="Product categories"
            >
                <div className="flex w-max min-w-full gap-2 px-9 sm:w-auto sm:min-w-0 sm:gap-3 sm:px-0">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <button
                                key={category}
                                ref={isActive ? activeButtonRef : null}
                                type="button"
                                onClick={() => onCategoryChange(category)}
                                className={cn(
                                    'group relative shrink-0 overflow-hidden rounded-full border px-4 py-2.5 font-sans text-[0.6rem] font-semibold tracking-[0.14em] uppercase transition duration-500 sm:px-5 sm:text-[0.62rem]',
                                    isActive
                                        ? 'border-[#8D6B38]/45 bg-[#171512] text-[#F8F5EC] shadow-[0_16px_38px_rgba(42,34,24,0.12)]'
                                        : 'border-[#8D6B38]/14 bg-[#F8F4EC]/52 text-[#665F53] hover:border-[#8D6B38]/38 hover:bg-[#F8F4EC] hover:text-[#171512]',
                                )}
                                aria-pressed={isActive}
                            >
                                <span className="relative z-10">
                                    {category}
                                </span>
                                <span
                                    className={cn(
                                        'pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[#B8945F] transition duration-500',
                                        isActive && 'scale-x-100',
                                    )}
                                />
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/40 via-transparent to-[#B8945F]/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
