import { Link } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#FAF9F5] p-4 sm:p-6 lg:p-10 relative overflow-hidden antialiased">
            {/* Subtle background ambient lighting blur */}
            <div className="absolute -top-32 -right-32 size-96 rounded-full bg-[#8E755F]/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-[#8E755F]/8 blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white border border-black/[0.08] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-9 space-y-6">
                    {/* Header with Official ZIVIO Logo */}
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105 mb-2" title="Go to Home">
                            <img
                                src="/images/zivio-life-logo.png"
                                alt="ZIVIO LIFE"
                                className="h-9 sm:h-10 w-auto object-contain"
                            />
                        </Link>
                        {title && (
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171512]">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm text-[#716C64] leading-relaxed max-w-xs">
                                {description}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                {/* Back to Live Site Footer Link */}
                <div className="mt-6 text-center">
                    <a
                        href="/products"
                        className="text-xs text-[#716C64] hover:text-[#8E755F] transition font-medium inline-flex items-center gap-1.5"
                    >
                        <span>&larr; Return to Architectural Showroom</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
