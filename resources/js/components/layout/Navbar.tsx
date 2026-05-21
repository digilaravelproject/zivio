import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { navigationLinks } from '@/data/navigationData';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const updateNavbar = () => setIsScrolled(window.scrollY > 24);

        updateNavbar();
        window.addEventListener('scroll', updateNavbar);

        return () => window.removeEventListener('scroll', updateNavbar);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'border-b border-white/10 bg-[#0A0A0A]/88 shadow-2xl shadow-black/25 backdrop-blur-xl'
                    : 'border-b border-white/0 bg-transparent',
            )}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    className="flex shrink-0 items-center"
                    aria-label="ZIVIO LIFE home"
                >
                    <img
                        src="/images/zivio-life-logo.svg"
                        alt="ZIVIO LIFE"
                        className="h-8 w-auto object-contain sm:h-9 lg:h-11"
                        width={180}
                        height={44}
                    />
                </Link>

                <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="group relative whitespace-nowrap text-xs font-medium tracking-[0.18em] text-[#CFCFCB] uppercase transition duration-300 hover:text-[#F5F5F2] xl:tracking-[0.2em]"
                        >
                            {link.label}
                            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#DA9807] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                    <button
                        type="button"
                        className="grid size-9 place-items-center text-[#F5F5F2] transition hover:text-[#DA9807] sm:size-10"
                        aria-label="Search"
                    >
                        <Search className="size-4.5 sm:size-5" strokeWidth={1.6} />
                    </button>

                    <Link
                        href="/contact"
                        className="hidden whitespace-nowrap border border-[#DA9807]/70 bg-[#0A0A0A]/20 px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.16em] text-[#F5F5F2] uppercase backdrop-blur-sm transition duration-300 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] md:inline-flex xl:px-5 xl:py-3 xl:text-xs xl:tracking-[0.18em]"
                    >
                        Start a Project
                    </Link>

                    <button
                        type="button"
                        className="grid size-9 place-items-center text-[#F5F5F2] transition hover:text-[#DA9807] sm:size-10 lg:hidden"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="size-6" strokeWidth={1.5} />
                        ) : (
                            <Menu className="size-6" strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0A0A0A]/96 px-4 pb-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-6 lg:hidden"
                    >
                        <div className="mx-auto flex max-w-7xl flex-col pt-4">
                            {navigationLinks.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.04,
                                        duration: 0.25,
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex border-b border-white/10 py-4 text-sm font-medium tracking-[0.18em] text-[#F5F5F2] uppercase transition hover:text-[#DA9807] sm:py-5 sm:tracking-[0.22em]"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <Link
                                href="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-6 inline-flex max-w-full justify-center border border-[#DA9807]/70 px-4 py-4 text-center text-xs font-semibold tracking-[0.16em] text-[#F5F5F2] uppercase transition hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:px-5 sm:tracking-[0.22em]"
                            >
                                Start a Project
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
