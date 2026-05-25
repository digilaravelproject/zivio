import { useEffect, useRef, useState, type ReactNode } from 'react';

type LazySectionProps = {
    children: ReactNode;
    minHeight?: string;
    rootMargin?: string;
};

export function LazySection({
    children,
    minHeight = 'min-h-32',
    rootMargin = '720px 0px',
}: LazySectionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const element = containerRef.current;

        if (!element || shouldRender) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            setShouldRender(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin, shouldRender]);

    return (
        <div ref={containerRef} className={shouldRender ? undefined : minHeight}>
            {shouldRender ? children : null}
        </div>
    );
}
