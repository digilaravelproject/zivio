import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ZoomIn } from 'lucide-react';

type ProductDetailGalleryProps = {
    images: string[];
    name: string;
};

export function ProductDetailGallery({ images, name }: ProductDetailGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="relative w-full h-[380px] border border-black/[0.06] bg-[#F7F7F6] flex items-center justify-center rounded-sm">
                <span className="font-sans text-xs text-[#7C776E]">No Images Available</span>
            </div>
        );
    }

    const activeImage = images[activeIndex] ?? images[0];

    return (
        <div className="flex flex-col-reverse sm:flex-row gap-3 lg:gap-4 items-start">
            {/* Thumbnails strip - Left on sm+, below on mobile (Amazon/Flipkart style) */}
            {images.length > 1 && (
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[420px] w-full sm:w-16 shrink-0 py-0.5">
                    {images.map((img, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <button
                                key={img}
                                type="button"
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    'relative size-14 sm:size-16 overflow-hidden border bg-white transition-all duration-200 rounded-sm shrink-0 cursor-pointer',
                                    isActive
                                        ? 'border-[#8E755F] ring-1 ring-[#8E755F] shadow-xs'
                                        : 'border-black/10 hover:border-black/30 opacity-70 hover:opacity-100',
                                )}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`${name} thumbnail ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Main Featured Image Box - Constrained for single-screen view */}
            <div className="relative flex-1 w-full h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden border border-black/[0.06] bg-[#FFFFFF] rounded-sm flex items-center justify-center group shadow-xs">
                <img
                    src={activeImage}
                    alt={`${name} architectural luminaire`}
                    className="h-full w-full object-contain p-3 sm:p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="eager"
                    decoding="sync"
                />

                {/* Luxury architectural gold accent corners */}
                <div className="absolute top-0 right-0 h-[1.5px] w-16 bg-[#BDA18A] pointer-events-none" />
                <div className="absolute top-0 right-0 h-16 w-[1.5px] bg-[#BDA18A] pointer-events-none" />

                {/* Subtle zoom indicator on hover */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-black/10 text-[#716C64] p-1.5 rounded text-[11px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <ZoomIn className="size-3.5" />
                    <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">Hover to Zoom</span>
                </div>
            </div>
        </div>
    );
}
