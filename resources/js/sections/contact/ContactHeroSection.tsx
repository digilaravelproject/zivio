import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { contactPageData } from '@/data/contactPageData';

export function ContactHeroSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative min-h-[60vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-10">
            {/* Dark luxury background image with rich overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={contactPageData.hero.backgroundImage}
                    alt="Luxury lighting contact showcase"
                    className="h-full w-full object-cover object-center brightness-[0.34] scale-105"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,138,42,0.06),transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl">
                {/* Breadcrumbs */}
                <div
                    className="mb-8 flex items-center gap-2.5 font-sans text-[0.72rem] font-bold tracking-[0.22em] text-[#D8D3C8] uppercase transition-all duration-[800ms] ease-out"
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transform: isMounted ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                >
                    <Link href="/" className="transition hover:text-[#BDA18A]">
                        Home
                    </Link>
                    <span className="text-white/20">/</span>
                    <span className="text-[#BDA18A]">Contact</span>
                </div>

                {/* Subtitle label */}
                <div
                    className="mb-4 flex items-center gap-3 transition-all duration-[800ms] ease-out delay-[100ms]"
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transform: isMounted ? 'translateY(0)' : 'translateY(15px)',
                    }}
                >
                    <span className="h-[1px] w-8 bg-[#BDA18A]" />
                    <p className="text-luxury-label">
                        {contactPageData.hero.label}
                    </p>
                </div>

                {/* Main Heading */}
                <h1
                    className="max-w-4xl text-[2.5rem] leading-[1.05] font-semibold text-[#F8F5EC] sm:text-5xl md:text-6xl lg:text-[4.6rem] text-balance transition-all duration-[900ms] ease-out delay-[200ms]"
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transform: isMounted ? 'translateY(0)' : 'translateY(24px)',
                    }}
                >
                    {contactPageData.hero.heading}
                </h1>

                {/* Description Paragraph */}
                <p
                    className="mt-6 max-w-xl font-sans text-sm leading-8 tracking-[0.01em] text-[#D8D3C8] sm:mt-8 sm:text-base sm:leading-9 transition-all duration-[900ms] ease-out delay-[350ms]"
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    {contactPageData.hero.paragraph}
                </p>
            </div>

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </section>
    );
}
