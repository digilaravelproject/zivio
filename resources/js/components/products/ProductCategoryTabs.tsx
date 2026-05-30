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
                    'pointer-events-none absolute top-0 bottom-3 left-0 z-10 w-10 bg-gradient-to-r from-[#0A0A0A] to-transparent opacity-0 transition duration-300 lg:hidden',
                    canScrollLeft && 'opacity-100',
                )}
            />
            <div
                className={cn(
                    'pointer-events-none absolute top-0 right-0 bottom-3 z-10 w-10 bg-gradient-to-l from-[#0A0A0A] to-transparent opacity-0 transition duration-300 lg:hidden',
                    canScrollRight && 'opacity-100',
                )}
            />

            <button
                type="button"
                onClick={() => scrollTabs('left')}
                disabled={!canScrollLeft}
                className={cn(
                    'absolute top-1/2 left-0 z-20 grid size-8 -translate-y-[calc(50%+0.35rem)] place-items-center rounded-full border border-white/[0.12] bg-[#080808]/78 text-[#F8F5EC] shadow-[0_14px_36px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-300 hover:border-[#B88A2A]/70 hover:text-[#D2B276] lg:hidden',
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
                    'absolute top-1/2 right-0 z-20 grid size-8 -translate-y-[calc(50%+0.35rem)] place-items-center rounded-full border border-white/[0.12] bg-[#080808]/78 text-[#F8F5EC] shadow-[0_14px_36px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-300 hover:border-[#B88A2A]/70 hover:text-[#D2B276] lg:hidden',
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
                                    'group relative shrink-0 overflow-hidden rounded-full border px-4 py-2.5 font-sans text-[0.64rem] font-semibold tracking-[0.18em] uppercase transition duration-500 sm:px-5',
                                    isActive
                                        ? 'border-[#B88A2A]/70 bg-[#B88A2A]/14 text-[#F8F5EC] shadow-[0_0_28px_rgba(184,138,42,0.12)]'
                                        : 'border-white/10 bg-white/[0.022] text-[#BDB7AA] hover:border-[#B88A2A]/50 hover:bg-[#B88A2A]/7 hover:text-[#F8F5EC]',
                                )}
                                aria-pressed={isActive}
                            >
                                <span className="relative z-10">
                                    {category}
                                </span>
                                <span
                                    className={cn(
                                        'pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[#B88A2A] transition duration-500',
                                        isActive && 'scale-x-100',
                                    )}
                                />
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.07] via-transparent to-[#B88A2A]/8 opacity-0 transition duration-500 group-hover:opacity-100" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
