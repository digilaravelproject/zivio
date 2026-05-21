import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type SiteButtonProps = PropsWithChildren<{
    href: string;
    className?: string;
}>;

export function SiteButton({ children, href, className }: SiteButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group inline-flex max-w-full items-center justify-center overflow-hidden border border-[#DA9807]/70 bg-[#0A0A0A]/20 px-5 py-3 text-center text-[0.68rem] font-semibold tracking-[0.18em] text-[#F5F5F2] uppercase shadow-[0_0_35px_rgba(184,155,114,0.08)] backdrop-blur-sm transition duration-300 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] hover:shadow-[0_0_45px_rgba(184,155,114,0.22)] focus:outline-none focus:ring-2 focus:ring-[#DA9807]/60 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.24em]',
                className,
            )}
        >
            {children}
        </Link>
    );
}
