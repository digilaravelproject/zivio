import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { NavigationLink, navigationLinks } from '@/data/navigationData';
import { cn } from '@/lib/utils';

const secondaryLinks = [
    { label: 'About Us', href: '/about-company' },
    { label: 'Team', href: '/teams' },
    { label: 'Quality', href: '#quality' },
    { label: 'Sustainability', href: '#sustainability' },
    { label: 'Control', href: '#control' },
    { label: 'Career', href: '#career' },
    { label: 'ZIVIO Care', href: '#zivio-care' },
];

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
        <>
            <header
                className={cn(
                    'sticky top-0 z-[100] transition-all duration-500 w-full border-b backdrop-blur-2xl',
                    isMenuOpen 
                        ? 'border-transparent bg-transparent' 
                        : 'border-black/[0.06] bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
                )}
            >
                <nav className="mx-auto flex h-16 max-w-[1536px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:px-12">
                    {/* Brand Logo & Left Menu items Container */}
                    <div className="flex items-center gap-8 xl:gap-12">
                        <Link
                            href="/"
                            onClick={handleHomeClick}
                            className="flex shrink-0 items-center relative z-50"
                            aria-label="ZIVIO LIFE home"
                        >
                            <img
                                src="/images/zivio-life-logo.png"
                                alt="ZIVIO LIFE"
                                className="h-8 w-auto object-contain transition-all duration-300 sm:h-9 lg:h-11"
                                width={180}
                                height={44}
                            />
                        </Link>

                        {/* Top-level menu (Desktop) - Logo ke pass, left side */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {navigationLinks.map((link) =>
                                link.children ? (
                                    <div key={link.label} className="group relative py-6">
                                        <button className="flex items-center gap-1.5 whitespace-nowrap font-montserrat text-[15px] leading-[20px] font-bold uppercase transition duration-300 text-neutral-800 hover:text-[#BDA18A]">
                                            {link.label}
                                            <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" strokeWidth={2} />
                                            <span className="absolute bottom-4 left-0 h-px w-0 bg-[#BDA18A] transition-all duration-500 group-hover:w-full" />
                                        </button>

                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="flex flex-col min-w-[220px] border border-black/[0.06] bg-white/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] p-2 rounded-md relative overflow-hidden">
                                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDA18A]/40 to-transparent" />

                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="px-4 py-3 font-montserrat text-[14px] leading-[18px] font-bold text-neutral-700 transition-all duration-300 hover:text-[#BDA18A] hover:bg-black/[0.03] hover:pl-5 rounded-sm flex items-center"
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
                                        className="group relative whitespace-nowrap font-montserrat text-[15px] leading-[20px] font-bold uppercase transition duration-300 py-6 text-neutral-800 hover:text-[#BDA18A]"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-4 left-0 h-px w-0 bg-[#BDA18A] transition-all duration-500 group-hover:w-full" />
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Right side Hamburger controls */}
                    <div className="flex shrink-0 items-center gap-3">
                        <button
                            type="button"
                            className="hidden size-9 place-items-center text-neutral-800 transition hover:text-[#BDA18A] sm:size-10"
                            aria-label="Search"
                        >
                            <Search className="size-4.5 sm:size-5 transition-colors text-neutral-800 hover:text-[#BDA18A]" strokeWidth={1.6} />
                        </button>

                        {/* Luxury Hamburger button */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="relative z-50 flex h-10 w-10 items-center justify-center focus:outline-none group"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <div className="relative w-7 h-5 flex flex-col justify-between items-end">
                                <span
                                    className={cn(
                                        "h-[2px] transition-all duration-300 absolute right-0 top-0 bg-neutral-900 group-hover:bg-[#BDA18A]",
                                        isMenuOpen && "w-7 rotate-45 translate-y-[9px]"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "h-[2px] transition-all duration-200 absolute right-0 top-1/2 -translate-y-1/2 bg-neutral-900 group-hover:w-7 group-hover:bg-[#BDA18A]",
                                        isMenuOpen ? "w-0 opacity-0" : "w-4"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "h-[2px] transition-all duration-300 absolute right-0 bottom-0 bg-neutral-900 group-hover:bg-[#BDA18A]",
                                        isMenuOpen 
                                            ? "w-7 -rotate-45 -translate-y-[9px]" 
                                            : "w-5.5 group-hover:w-4"
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full Screen Luxury Menu Section */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="fixed inset-0 z-[99] bg-white text-neutral-800 backdrop-blur-lg flex flex-col overflow-y-auto"
                    >
                        <div className="mx-auto w-full max-w-[1536px] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 flex-1 flex flex-col justify-between">
                            
                            {/* Layout split on Desktop */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start my-auto">
                                
                                {/* Left Side (Desktop Only) - Brand Context */}
                                <div className="hidden lg:flex flex-col space-y-8 pr-12 border-r border-black/[0.06]">
                                    <div className="space-y-4">
                                        <span className="font-montserrat text-xs tracking-[0.2em] text-[#BDA18A] uppercase font-semibold">
                                            Premium Lighting Experiences
                                        </span>
                                        <h2 className="text-4xl xl:text-5xl font-montserrat font-light text-neutral-800 leading-tight">
                                            Crafting the future of <br />
                                            <span className="font-bold text-neutral-950">illuminating spaces.</span>
                                        </h2>
                                    </div>
                                    <p className="text-neutral-600 font-montserrat text-sm max-w-sm leading-relaxed">
                                        We design and manufacture elite architectural lighting solutions. Elevating environments through state-of-the-art aesthetics and functional brilliance.
                                    </p>
                                    <div className="pt-6 space-y-2">
                                        <div className="text-xs text-neutral-500 font-semibold tracking-wider uppercase">Contact Us</div>
                                        <div className="text-neutral-800 font-medium hover:text-[#BDA18A] transition">info@zivio.life</div>
                                        <div className="text-neutral-800 font-medium hover:text-[#BDA18A] transition">+91 98765 43210</div>
                                    </div>
                                </div>

                                {/* Right Side (Desktop Secondary Links) / Mobile Full Content */}
                                <div className="flex flex-col justify-center">
                                    {/* Desktop: Show Hamburger Menus only */}
                                    <div className="hidden lg:flex flex-col space-y-5">
                                        <span className="font-montserrat text-xs tracking-[0.2em] text-neutral-500 uppercase font-semibold mb-2">
                                            Discover ZIVIO
                                        </span>
                                        {secondaryLinks.map((link, idx) => (
                                            <motion.div
                                                key={link.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="group flex items-center font-montserrat text-2xl xl:text-3xl font-light text-neutral-700 hover:text-[#BDA18A] transition duration-300"
                                                >
                                                    <span className="w-0 group-hover:w-6 h-[1px] bg-[#BDA18A] mr-0 group-hover:mr-4 transition-all duration-300" />
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Mobile: Show all menu items */}
                                    <div className="flex lg:hidden flex-col space-y-6">
                                        {/* Primary Links: Home, Company, Products, Projects, Contact (Bold) */}
                                        <div className="space-y-1">
                                            <span className="font-montserrat text-[10px] tracking-[0.2em] text-[#BDA18A] uppercase font-semibold block mb-4">
                                                Navigation
                                            </span>
                                            {navigationLinks.map((link, idx) => (
                                                <MobileHamburgerLink
                                                    key={link.label}
                                                    link={link}
                                                    index={idx}
                                                    setIsMenuOpen={setIsMenuOpen}
                                                />
                                            ))}
                                        </div>

                                        {/* Gap / Divider */}
                                        <div className="h-[1px] bg-black/[0.06] w-full my-4" />

                                        {/* Secondary Links: About Us, Team, Quality, Sustainability, Control, Career, ZIVIO Care (Normal font weight) */}
                                        <div className="space-y-4 pl-1">
                                            <span className="font-montserrat text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-semibold block mb-2">
                                                Company Info
                                            </span>
                                            {secondaryLinks.map((link, idx) => (
                                                <motion.div
                                                    key={link.label}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: (idx + navigationLinks.length) * 0.04 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block font-montserrat text-[16px] leading-[22px] font-normal text-neutral-600 hover:text-[#BDA18A] transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Luxury footer line */}
                            <div className="border-t border-black/[0.06] pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
                                <div>&copy; {new Date().getFullYear()} ZIVIO LIFE. All Rights Reserved.</div>
                                <div className="flex gap-6">
                                    <a href="#" className="hover:text-neutral-800 transition">Privacy Policy</a>
                                    <a href="#" className="hover:text-neutral-800 transition">Terms of Service</a>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function MobileHamburgerLink({
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
                className="border-b border-black/[0.04]"
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between py-3 font-montserrat text-[18px] leading-[24px] font-bold text-neutral-800 uppercase transition duration-300 hover:text-[#BDA18A]"
                >
                    {link.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-300 text-neutral-500", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col pb-3 pl-4 space-y-3 pt-1">
                                {link.children.map((child) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-montserrat text-[15px] leading-[20px] font-medium text-neutral-600 transition-colors hover:text-[#BDA18A]"
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
                className="flex border-b border-black/[0.04] py-3 font-montserrat text-[18px] leading-[24px] font-bold text-neutral-800 uppercase transition duration-300 hover:text-[#BDA18A]"
            >
                {link.label}
            </Link>
        </motion.div>
    );
}
