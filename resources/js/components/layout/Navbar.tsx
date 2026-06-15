import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { NavigationLink, navigationLinks } from '@/data/navigationData';
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

    const handleHomeClick = (e: React.MouseEvent) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-500 w-full border-b border-black/[0.06] bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl',
            )}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="flex shrink-0 items-center"
                    aria-label="ZIVIO LIFE home"
                >
                    <img
                        src="/images/zivio-life-logo.png"
                        alt="ZIVIO LIFE"
                        className="h-8 w-auto object-contain sm:h-9 lg:h-11"
                        width={180}
                        height={44}
                    />
                </Link>

                <div className="hidden items-center gap-6 xl:gap-9 lg:flex ml-auto mr-4">
                    {navigationLinks.map((link) =>
                        link.children ? (
                            <div key={link.label} className="group relative py-6">
                                <button className="flex items-center gap-1.5 whitespace-nowrap font-sans text-[0.75rem] font-semibold tracking-[0.15em] text-neutral-800 uppercase transition duration-500 hover:text-[#B88A2A] xl:tracking-[0.18em]">
                                    {link.label}
                                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" strokeWidth={2} />
                                    <span className="absolute bottom-4 left-0 h-px w-0 bg-[#B88A2A] transition-all duration-500 group-hover:w-full" />
                                </button>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="flex flex-col min-w-[220px] border border-black/[0.06] bg-white/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] p-2 rounded-md relative overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B88A2A]/40 to-transparent" />

                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="px-4 py-3 font-sans text-sm tracking-[0.1em] text-neutral-700 transition-all duration-300 hover:text-[#B88A2A] hover:bg-black/[0.03] hover:pl-5 rounded-sm flex items-center"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href!}
                                onClick={link.href === '/' ? handleHomeClick : undefined}
                                className="group relative whitespace-nowrap font-sans text-[0.75rem] font-semibold tracking-[0.15em] text-neutral-800 uppercase transition duration-500 hover:text-[#B88A2A] xl:tracking-[0.18em] py-6"
                            >
                                {link.label}
                                <span className="absolute bottom-4 left-0 h-px w-0 bg-[#B88A2A] transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ),
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                    <button
                        type="button"
                        className="hidden size-9 place-items-center text-neutral-800 transition hover:text-[#B88A2A] sm:size-10"
                        aria-label="Search"
                    >
                        <Search className="size-4.5 sm:size-5" strokeWidth={1.6} />
                    </button>

                    <button
                        type="button"
                        className="grid size-9 place-items-center text-neutral-800 transition hover:text-[#B88A2A] sm:size-10 lg:hidden"
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
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-black/[0.06] bg-white/95 px-4 pb-8 shadow-[0_28px_80px_rgba(0,0,0,0.15)] backdrop-blur-2xl sm:px-6 lg:hidden"
                    >
                        <div className="mx-auto flex max-w-7xl flex-col pt-5">
                            {navigationLinks.map((link, index) => (
                                <MobileNavLink
                                    key={link.label}
                                    link={link}
                                    index={index}
                                    setIsMenuOpen={setIsMenuOpen}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function MobileNavLink({
    link,
    index,
    setIsMenuOpen
}: {
    link: NavigationLink;
    index: number;
    setIsMenuOpen: (val: boolean) => void
}) {
    const [isOpen, setIsOpen] = useState(false);

    if (link.children) {
        return (
            <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
                className="border-b border-black/[0.06]"
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between py-4 font-sans text-sm font-semibold tracking-[0.18em] text-neutral-800 uppercase transition duration-300 hover:text-[#B88A2A] sm:py-5 sm:tracking-[0.2em]"
                >
                    {link.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col pb-4 pl-4 space-y-4">
                                {link.children.map((child) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-sans text-xs tracking-[0.15em] text-neutral-600 transition-colors hover:text-[#B88A2A]"
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04, duration: 0.25 }}
        >
            <Link
                href={link.href!}
                onClick={(e) => {
                    setIsMenuOpen(false);
                    if (link.href === '/' && window.location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
                className="flex border-b border-black/[0.06] py-4 font-sans text-sm font-semibold tracking-[0.18em] text-neutral-800 uppercase transition duration-300 hover:text-[#B88A2A] sm:py-5 sm:tracking-[0.2em]"
            >
                {link.label}
            </Link>
        </motion.div>
    );
}
