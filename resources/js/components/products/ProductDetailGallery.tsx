import { useState } from 'react';
import { cn } from '@/lib/utils';

type ProductDetailGalleryProps = {
    images: string[];
    name: string;
};

export function ProductDetailGallery({ images, name }: ProductDetailGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="relative w-full aspect-square border border-white/[0.08] bg-[#0E0E0E] flex items-center justify-center">
                <span className="font-sans text-xs text-[#A6A6A2]">No Images Available</span>
            </div>
        );
    }

    const activeImage = images[activeIndex] ?? images[0];

    return (
        <div className="flex flex-col gap-4">
            {/* Main Active Image - 1:1 Aspect Ratio with dynamic hover and gloss overlay */}
            <div className="relative w-full aspect-square overflow-hidden border border-white/[0.08] bg-[#0E0E0E] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img
                    src={activeImage}
                    alt={`${name} main view`}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105 brightness-[0.92]"
                    loading="eager"
                    decoding="sync"
                />
                
                {/* Visual architectural reflection reflection mask */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                
                {/* Gold corner styling */}
                <div className="absolute top-0 right-0 h-[1.5px] w-24 bg-[#B88A2A]" />
                <div className="absolute top-0 right-0 h-24 w-[1.5px] bg-[#B88A2A]" />
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <button
                                key={img}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    'relative aspect-square overflow-hidden border bg-[#0E0E0E] transition-all duration-300',
                                    isActive
                                        ? 'border-[#B88A2A] shadow-[0_0_12px_rgba(184,138,42,0.2)]'
                                        : 'border-white/10 hover:border-white/30',
                                )}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`${name} thumbnail ${idx + 1}`}
                                    className="h-full w-full object-cover brightness-[0.78] hover:brightness-[0.94]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {isActive && (
                                    <div className="absolute inset-0 bg-[#B88A2A]/8 border-[1.5px] border-[#B88A2A]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
