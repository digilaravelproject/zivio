import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type ScrollDepthWrapperProps = {
    children: ReactNode;
    className?: string;
    intensity?: 'soft' | 'medium';
    disabledOnMobile?: boolean;
};

export function ScrollDepthWrapper({
    children,
    className,
    intensity = 'soft',
    disabledOnMobile = true,
}: ScrollDepthWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    const shouldUseSimpleMotion =
        prefersReducedMotion || (disabledOnMobile && isMobile);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 92%', 'center 56%'],
    });

    const depth = intensity === 'medium' ? 1 : 0.72;
    const rotateX = useTransform(scrollYProgress, [0, 1], [8 * depth, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40 * depth, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const updateDevice = () => setIsMobile(mediaQuery.matches);

        updateDevice();
        mediaQuery.addEventListener('change', updateDevice);

        return () => mediaQuery.removeEventListener('change', updateDevice);
    }, []);

    if (shouldUseSimpleMotion) {
        return (
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={containerRef}
            className={cn('[transform-style:preserve-3d]', className)}
            style={{
                opacity,
                rotateX,
                scale,
                y,
                transformPerspective: 1200,
            }}
        >
            {children}
        </motion.div>
    );
}
