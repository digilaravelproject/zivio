import { Link } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Compass, Globe, Mail, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { BrandLogo } from '@/components/common/BrandLogo'

const C = {
  ink:       '#0B0B0B',
  inkCard:   '#111111',
  inkMid:    '#181818',
  inkBorder: 'rgba(255,255,255,0.08)',
  amber:     '#B5722A',
  amberLt:   '#C9944A',
  amberDk:   '#8C4E18',
  navyDark:  '#09090D',
  bodyDark:  '#F4EFE6',
  bodyMid:   'rgba(244,239,230,0.60)',
  bodyLight: 'rgba(244,239,230,0.36)',
}

const MEGA_PRODUCTS = [
  {
    group: 'Outdoor Lighting',
    slug: 'outdoor',
    color: '#0F4C81',
    items: ['Bollards', 'Tree Uplighters', 'Projectors', 'Post Top Luminaires', 'Wall Lights', 'In-Ground Luminaires'],
  },
  {
    group: 'Indoor Lighting',
    slug: 'indoor',
    color: '#5e35b1',
    items: ['Downlights', 'Linear Lighting Systems', 'Surface Spotlights', 'Track Spotlights', 'Pendants'],
  },
  {
    group: 'Facade Lighting',
    slug: 'facade',
    color: '#0277bd',
    items: ['Linear Facade Systems', 'Wall Washers', 'Grazers', 'Cove & Niche Lighting'],
  },
  {
    group: 'Solar Lighting',
    slug: 'solar',
    color: '#e65100',
    items: ['Solar Street Lights', 'Solar Garden Lights', 'Solar High Mast Lights'],
  },
  {
    group: 'Lighting Poles',
    slug: 'poles',
    color: '#2e7d32',
    items: ['Architectural Poles', 'Octagonal Poles', 'High Mast Poles'],
  },
  {
    group: 'Smart Lighting',
    slug: 'smart',
    color: '#6a1b9a',
    items: ['Smart Light Poles', 'DALI-2 Controls', 'DMX Controllers', 'IoT Smart City'],
  },
]

export interface NavbarProps {
  theme?: 'dark' | 'light'
}

export function Navbar({ theme = 'dark' }: NavbarProps) {
  const isLight = theme === 'light'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('EN')
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)

    return () => window.removeEventListener('scroll', fn)
  }, [])

  const openMega = () => {
    if (megaTimer.current) {
clearTimeout(megaTimer.current)
}

    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', hasMega: true },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Downloads', href: '/#downloads' },
    { label: 'About', href: '/about-company' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      {/* ── Top Utility Strip ── */}
      <div
        className="relative z-50 hidden lg:block select-none"
        style={{ backgroundColor: C.navyDark, borderBottom: `1px solid rgba(182,141,64,0.18)` }}
      >
        <div className="mx-auto flex h-[34px] max-w-[1536px] items-center justify-between px-6 lg:px-12">
          {/* Left CTA */}
          <Link
            href="/#contact"
            className="group flex items-center gap-3 transition-all"
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded"
              style={{ background: `${C.amber}22`, border: `1px solid ${C.amber}50` }}
            >
              <Compass size={10} style={{ color: C.amber }} />
            </span>
            <span
              className="font-sans text-[10px] font-black uppercase tracking-[0.14em] text-white transition-opacity group-hover:opacity-80"
            >
              Architects &amp; Consultants
            </span>
            <span
              className="rounded px-2 py-0.5 font-sans text-[7px] font-bold uppercase tracking-[0.18em]"
              style={{ background: `${C.amber}18`, color: C.amber, border: `1px solid ${C.amber}35` }}
            >
              Project Inquiry
            </span>
            <ArrowRight size={9} className="transition-transform group-hover:translate-x-0.5" style={{ color: C.amber }} />
          </Link>

          {/* Right Contact Details & Lang */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+912245678900"
              className="flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              <Phone size={9} style={{ color: C.amber }} /> +91 22 4567 8900
            </a>
            <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.15)' }} />
            <a
              href="mailto:info@ziviolife.com"
              className="flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              <Mail size={9} style={{ color: C.amber }} /> info@ziviolife.com
            </a>
            <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.15)' }} />
            <div className="relative">
              <button
                onClick={() => setLangOpen((l) => !l)}
                className="flex items-center gap-1 font-sans text-[8px] uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Globe size={8} style={{ color: C.amber }} /> {lang}
                <ChevronDown size={7} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-full z-50 mt-2 py-1"
                    style={{
                      background: '#121216',
                      border: `1px solid rgba(255,255,255,0.1)`,
                      minWidth: 70,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    }}
                  >
                    {['EN', 'AR', 'FR', 'DE', 'HI'].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l)
                          setLangOpen(false)
                        }}
                        className="w-full px-4 py-1.5 text-left font-sans text-[8px] uppercase tracking-[0.18em] transition-colors"
                        style={{ color: l === lang ? C.amber : 'rgba(255,255,255,0.65)' }}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Sticky Header ── */}
      <header
        className="sticky top-0 z-40 w-full transition-all duration-300"
        style={{
          background: isLight
            ? (scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)')
            : (scrolled ? 'rgba(11,11,11,0.96)' : 'rgba(11,11,11,0.90)'),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : C.inkBorder}`,
          boxShadow: scrolled
            ? (isLight ? '0 8px 24px rgba(0,0,0,0.05)' : '0 10px 30px rgba(0,0,0,0.45)')
            : 'none',
        }}
      >
        <div className="mx-auto flex h-[66px] max-w-[1536px] items-center justify-between px-6 lg:px-12">
          {/* Exact Brand Logo */}
          <BrandLogo theme={theme} />

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(({ label, href, hasMega }) => {
              const isCurrent = typeof window !== 'undefined' && window.location.pathname === href

              return (
                <div
                  key={label}
                  className="relative"
                  onMouseEnter={hasMega ? openMega : undefined}
                  onMouseLeave={hasMega ? closeMega : undefined}
                >
                  <Link
                    href={href}
                    className="flex items-center gap-1 rounded-sm px-3.5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200"
                    style={{
                      color: isCurrent || (hasMega && megaOpen)
                        ? C.amber
                        : (isLight ? '#1A1A1A' : 'rgba(255,255,255,0.9)'),
                      background: hasMega && megaOpen ? (isLight ? 'rgba(181,114,42,0.1)' : `${C.amber}14`) : 'transparent',
                    }}
                  >
                    {label}
                    {hasMega && (
                      <ChevronDown
                        size={9}
                        className={`transition-transform duration-200 ${
                          megaOpen ? 'rotate-180 text-[#B5722A]' : (isLight ? 'text-black/50' : 'text-white/40')
                        }`}
                      />
                    )}
                  </Link>

                  {/* Active Indicator bar */}
                  {isCurrent && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 rounded-full"
                      style={{ height: 2, background: C.amber }}
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action: Contact CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden sm:flex items-center overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: isLight ? '#F5F4F0' : C.inkCard,
                border: isLight ? '1.5px solid rgba(0,0,0,0.1)' : `1.5px solid ${C.inkBorder}`,
                boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : '0 4px 18px rgba(0,0,0,0.3)',
              }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center"
                style={{ background: C.amber }}
              >
                <Phone size={13} style={{ color: '#fff' }} />
              </span>
              <span
                className="px-3.5 font-sans text-[11px] font-black uppercase"
                style={{ letterSpacing: '0.1em', color: isLight ? '#111111' : '#FFFFFF' }}
              >
                Contact
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex xl:hidden flex-col gap-[5px] p-2 text-white"
              aria-label="Open navigation menu"
            >
              <span className={`h-[2px] w-5 rounded-full ${isLight ? 'bg-black/80' : 'bg-white/80'}`} />
              <span className="h-[2px] w-3.5 rounded-full" style={{ background: C.amber }} />
              <span className={`h-[2px] w-5 rounded-full ${isLight ? 'bg-black/80' : 'bg-white/80'}`} />
            </button>
          </div>
        </div>

        {/* ── Mega Menu for Products ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 border-b"
              style={{
                background: isLight ? '#FFFFFF' : C.ink,
                borderColor: isLight ? 'rgba(0,0,0,0.08)' : C.inkBorder,
                boxShadow: isLight ? '0 20px 50px rgba(0,0,0,0.1)' : '0 20px 60px rgba(0,0,0,0.5)',
              }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              {/* Top Accent Strip */}
              <div className="flex h-[3px]">
                {MEGA_PRODUCTS.map((col) => (
                  <div key={col.group} className="flex-1" style={{ background: col.color }} />
                ))}
              </div>

              <div className="mx-auto max-w-[1536px] px-8 py-7">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {MEGA_PRODUCTS.map((col, ci) => (
                    <div
                      key={col.group}
                      className="flex flex-col"
                      style={{
                        borderRight: ci < MEGA_PRODUCTS.length - 1
                          ? `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : C.inkBorder}`
                          : 'none',
                        paddingRight: 16,
                      }}
                    >
                      {/* Family Header */}
                      <Link
                        href={`/products/${col.slug}`}
                        className="mb-3 pb-2 transition-colors hover:opacity-80"
                        style={{ borderBottom: `2px solid ${col.color}` }}
                      >
                        <p className={`font-sans text-[12px] font-bold ${isLight ? 'text-[#111111]' : 'text-white'}`}>{col.group}</p>
                      </Link>

                      {/* Items */}
                      <ul className="flex flex-col gap-1.5 flex-1">
                        {col.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/products/${col.slug}`}
                              className={`group flex items-center gap-2 py-1 text-[11.5px] transition-colors hover:text-[#B5722A] ${
                                isLight ? 'text-black/60' : 'text-white/60'
                              }`}
                            >
                              <span
                                className="h-px w-0 transition-all duration-200 group-hover:w-2.5"
                                style={{ background: col.color }}
                              />
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* View All Family */}
                      <Link
                        href={`/products/${col.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 font-sans text-[8px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-75"
                        style={{ color: col.color }}
                      >
                        View All <ArrowRight size={8} />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Bottom Showroom Action Strip */}
                <div
                  className="mt-6 flex flex-wrap items-center justify-between border-t pt-4"
                  style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : C.inkBorder }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.amber }} />
                    <span className={`font-sans text-[12px] font-semibold ${isLight ? 'text-black/80' : 'text-white/80'}`}>
                      500+ luminaires across 6 architectural families
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
                      style={{ background: C.amber }}
                    >
                      Open Full Showroom <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Slide-out Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full max-w-[320px] flex-col overflow-y-auto p-6"
              style={{ background: '#0D0D10', borderLeft: `1px solid ${C.inkBorder}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: C.inkBorder }}>
                <BrandLogo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
                  style={{ background: C.inkCard }}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-2 py-6">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3 font-sans text-base font-bold text-white transition-colors hover:text-[#B5722A]"
                  >
                    {label}
                    <ArrowRight size={12} className="text-white/30" />
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto pt-6 border-t" style={{ borderColor: C.inkBorder }}>
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: C.amber }}
                >
                  <Phone size={13} /> Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
