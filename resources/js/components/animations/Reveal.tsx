import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    y?: number;
    scale?: number;
    threshold?: number;
};

export function Reveal({
    children,
    className,
    duration = 1100, // Slightly slower duration for an ultra-luxury editorial feel
    delay = 0,
    y = 38, // Refined float rise distance
    scale = 0.975, // Subtle scale-in effect to add depth to reveals
    threshold = 0.15,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={cn('transition-all will-change-[transform,opacity]', className)}
            style={{
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting 
                    ? 'translateY(0) scale(1)' 
                    : `translateY(${y}px) scale(${scale})`,
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                // Ultra-smooth decelerating easeOutExpo curve for custom luxury layout timing
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {children}
        </div>
    );
}
