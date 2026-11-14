import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import shreeJirapurePhoto from './imports/shree_jirapure.jpeg'
import priyaJirapurePhoto from './imports/priya_jirapure.jpeg'
import anjaliBunkarPhoto from './imports/anjali_bunkar.jpeg'
import shridharMorabPhoto from './imports/WhatsApp_Image_2026-07-28_at_12.40.15_PM.jpeg'
import g5043Product from './imports/WhatsApp_Image_2026-08-03_at_1.38.59_PM.jpeg'
import g5043Bg1 from './imports/WhatsApp_Image_2026-08-03_at_1.39.00_PM.jpeg'
import g5043Bg2 from './imports/WhatsApp_Image_2026-08-03_at_1.39.00_PM__1_.jpeg'
import classicLanternProduct from './imports/WhatsApp_Image_2026-08-03_at_1.49.55_PM__1_.jpeg'
import classicLanternBg1 from './imports/WhatsApp_Image_2026-08-03_at_1.49.54_PM.jpeg'
import classicLanternBg2 from './imports/WhatsApp_Image_2026-08-03_at_1.49.55_PM.jpeg'
import classicLanternBg3 from './imports/WhatsApp_Image_2026-08-03_at_1.49.55_PM__2_.jpeg'
import linearProduct from './imports/WhatsApp_Image_2026-08-03_at_1.56.45_PM.jpeg'
import linearBg1 from './imports/WhatsApp_Image_2026-08-03_at_1.56.45_PM__1_.jpeg'
import linearBg2 from './imports/WhatsApp_Image_2026-08-03_at_1.56.45_PM__2_.jpeg'
import linearBg3 from './imports/WhatsApp_Image_2026-08-03_at_1.56.45_PM__3_.jpeg'
import crownProduct from './imports/WhatsApp_Image_2026-08-03_at_2.04.36_PM.jpeg'
import crownBg1 from './imports/WhatsApp_Image_2026-08-03_at_2.04.36_PM__1_.jpeg'
import crownBg2 from './imports/WhatsApp_Image_2026-08-03_at_2.04.37_PM.jpeg'
import surfaceProduct from './imports/WhatsApp_Image_2026-08-03_at_2.08.24_PM.jpeg'
import surfaceBg1 from './imports/WhatsApp_Image_2026-08-03_at_2.08.24_PM__1_.jpeg'
import globeProduct from './imports/WhatsApp_Image_2026-08-03_at_2.12.26_PM.jpeg'
import globeBg1 from './imports/WhatsApp_Image_2026-08-03_at_2.12.25_PM.jpeg'
import globeBg2 from './imports/WhatsApp_Image_2026-08-03_at_2.12.26_PM__1_.jpeg'
// Hero atmospheric slides — named by scene
import heroLuxuryTerrace from './imports/3c6b2e14a19517ce443bab64f61bad94.jpg'
import heroLuxuryInterior from './imports/c12c7970491d4d3db92ebe22ee8a35d8.jpg'
import heroStreetLantern from './imports/E1.jpg'
import helixPostProduct from './imports/PT1.PNG'
import globePostProduct2 from './imports/PT2.PNG'
import helixPostAlt from './imports/PT1-1.PNG'
import globePostAlt from './imports/PT2-1.PNG'
import helixPostV3 from './imports/PT1-2.PNG'
import { BrandLogo } from '@/components/common/BrandLogo'
import { ZivioWordmarkSvg } from '@/components/common/ZivioWordmarkSvg'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Search, X, ArrowRight, MapPin, Phone, Mail,
  Download, Shield, Zap, Globe, Award, Cpu, Droplets,
  CheckCircle, ChevronLeft, ChevronRight, ChevronDown,
  Star, TrendingUp, Building2, Sliders, Compass, MessageCircle, Send
} from 'lucide-react'

// ─── Palette — Brief spec: Warm Off-White · Rich Charcoal · Matte Gold ────────
const C = {
  // Grounds
  ink: '#FAF9F6',   // primary bg (warm off-white)
  inkMid: '#F5F4F0',   // alternate section bg (soft ivory)
  inkCard: '#FFFFFF',   // card / panel surface (pure white)
  inkBorder: '#E6E6E6',   // hairline border
  inkMuted: '#EEEDE9',   // muted divider

  dust: '#E8E6E0',
  dustMid: '#D8D4CC',
  dustCard: '#C4BFB5',

  // Typography
  bodyDark: '#111111',   // primary headings (rich charcoal)
  bodyMid: '#444444',   // body text (dark gray)
  bodyLight: '#6B7280',   // secondary / captions

  // Footer — near-black
  navyDark: '#0F1115',
  navyMid: '#181C22',
  navyBorder: 'rgba(255,255,255,0.08)',
  navyText: 'rgba(255,255,255,0.38)',

  // Matte Gold accent
  amber: '#B68D40',
  amberLt: '#CBA754',
  amberDk: '#8A6A28',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES: Array<{
  id: number; label: string; headline: string[]; sub: string; location: string;
  type: 'image' | 'video'; image?: string; localImg?: string; video?: string; poster?: string;
}> = [
    // ── 01: Natural Light — ambient architectural video
    {
      id: 0, type: 'video',
      video: 'https://videos.pexels.com/video-files/3971832/3971832-hd_1920_1080_30fps.mp4',
      poster: '1470252329-01cb79fc2caf',
      label: '01 · Natural Light',
      headline: ['Born from', 'Natural Light.'],
      sub: 'Architectural luminaires inspired by the quality of daylight — warm, dimensioned, alive. Crafted for 15+ countries across four continents.',
      location: 'Natural · Precision · 15 Countries'
    },
    // ── 02: Bollard — atmospheric garden bollard at night
    {
      id: 1, type: 'image', image: '1785162413090-475d4368ebe9',
      label: '02 · Bollard Lighting',
      headline: ['Paths', 'Illuminated.'],
      sub: 'Cast-iron and stainless bollard luminaires defining walkways, driveways and public plazas with precise cutoff optics.',
      location: 'Bollard Series · IP67 · IK10 · 3000K–4000K'
    },
    // ── 03: Facade — dramatic lit concrete building
    {
      id: 2, type: 'image', image: '1601785491008-d1153dfadd57',
      label: '03 · Facade Lighting',
      headline: ['Buildings', 'That Glow.'],
      sub: 'IP66-rated facade wash and grazing systems that sculpt architecture with controlled, glare-free beams of light.',
      location: 'Facade Systems · IP66 · DALI-2 · RGBW'
    },
    // ── 04: Post Top — ornamental lamp post close-up amber
    {
      id: 3, type: 'image', image: '1560692659-467e4f0f3deb',
      label: '04 · Post Top Lanterns',
      headline: ['Elegance', 'Overhead.'],
      sub: 'Heritage and contemporary post-top lanterns for boulevards, promenades, residential avenues and civic squares.',
      location: 'Post Top · Heritage Series · IP65 · 15W–60W'
    },
    // ── 05: Landscape — park trees street light night
    {
      id: 4, type: 'image', image: '1668575648926-7a372cf8206a',
      label: '05 · Landscape Lighting',
      headline: ['Gardens', 'Come Alive.'],
      sub: 'Inground uplights, tree spotlights and low-glare pathway fittings for luxury villas, resorts and urban green spaces.',
      location: 'Landscape · Inground · CRI >92 · IP68'
    },
    // ── 06: R&D — cleanroom manufacturing photometric lab
    {
      id: 5, type: 'image', image: '1748000970909-845f4aa144d2',
      label: '06 · R&D · Innovation',
      headline: ['Innovation,', 'Engineered.'],
      sub: 'Dedicated photometric labs and thermal testing facilities driving next-generation luminaire design and IEC-certified performance.',
      location: 'R&D · Photometric Lab · IEC 60598 · LM-80'
    },
  ]

const PRODUCT_CATEGORIES = [
  {
    id: 'outdoor',
    name: 'Outdoor Lighting',
    count: 168,
    image: '1565199975350-a723a63c053f',
    desc: 'Bollards, post-top luminaires, in-ground uplighters and street luminaires rated IP65–IP68 for every outdoor environment.',
    sub: [
      { name: 'Bollards', count: 28, image: '1767680148642-ac49a46543d3', spec: 'IP67 · 6–18W · Tunable White' },
      { name: 'Tree Uplighters', count: 20, image: '1776528881610-6e0483144d54', spec: 'IP65 · 8–30W · Narrow Beam' },
      { name: 'Projectors & Column Proj.', count: 18, image: '1779036440565-9e776cfce061', spec: 'IP66 · 20–150W · RGBW' },
      { name: 'Post Top Luminaires', count: 22, image: '1560692659-467e4f0f3deb', spec: 'IP66 · 30–150W · DALI-2' },
      { name: 'Up & Down Wall Lights', count: 16, image: '1553095066-5014bc7b7f2d', spec: 'IP65 · 6–24W · CRI >90' },
      { name: 'Street & Area Lighting', count: 32, image: '1693946954332-9b42ca00b44c', spec: 'IP66 · 40–250W · EN 13201' },
      { name: 'In-Ground Luminaires', count: 14, image: '1703289773827-7f838dbd5558', spec: 'IP68 · 6–24W · RGBW' },
      { name: 'Step Lights', count: 10, image: '1774978613585-469112b6f40f', spec: 'IP65 · 2–8W · Warm White' },
      { name: 'Surface Ceiling Luminaires', count: 12, image: '1515948725-edac7b5bb0fc', spec: 'IP44 · 10–40W · CRI >90' },
      { name: 'Pendant Luminaires', count: 8, image: '1758915753369-6a33c7bc1d76', spec: 'IP44 · 6–18W · DALI-2' },
      { name: 'Underwater Luminaires', count: 8, image: '1729925179294-30db20fab829', spec: 'IP68 · 6–18W · RGBW' },
      { name: 'High Bay Luminaires', count: 16, image: '1565199975350-a723a63c053f', spec: 'IP65 · 50–300W · IK10' },
      { name: 'Flood Lights', count: 16, image: '1612283157924-f0e11f121c3f', spec: 'IP66 · 50–500W · IK08' },
    ],
  },
  {
    id: 'indoor',
    name: 'Indoor Lighting',
    count: 92,
    image: '1711107796112-e5b4fe9aa075',
    desc: 'Precision downlights, pendants, linear systems and track spots engineered for perfect interior ambience.',
    sub: [
      { name: 'Downlights', count: 28, image: '1711107796112-e5b4fe9aa075', spec: 'IP44 · 6–24W · DALI-2' },
      { name: 'Linear Lighting Systems', count: 24, image: '1570005616859-784c0e1644c5', spec: 'IP20 · up to 30W/m · Tunable White' },
      { name: 'Surface Spotlights', count: 18, image: '1608377205619-03a0b4c4e270', spec: 'IP20 · 10–35W · CRI >92' },
      { name: 'Track & Surface Spotlights', count: 14, image: '1582203423341-64b918240e25', spec: 'IP20 · 10–50W · CRI >92' },
      { name: 'Architectural Pendant Lights', count: 8, image: '1758915753369-6a33c7bc1d76', spec: 'IP20 · 6–18W · RGBW' },
    ],
  },
  {
    id: 'facade',
    name: 'Facade Lighting',
    count: 64,
    image: '1571440727633-ca6b05da2008',
    desc: 'Linear washers, grazers and projectors that sculpt building surfaces with extraordinary precision.',
    sub: [
      { name: 'Linear Facade Systems', count: 20, image: '1585349781000-d086e113b2a2', spec: 'IP66 · up to 24W/m · RGBW' },
      { name: 'Wall Washers', count: 16, image: '1720996655234-1e87e4f07201', spec: 'IP65 · 10–50W · Tunable White' },
      { name: 'Grazers', count: 14, image: '1559173525-d16dfd7c17fe', spec: 'IP67 · 6–18W · Narrow Beam' },
      { name: 'Cove & Niche Lighting', count: 14, image: '1564501838839-b8d1da6fd0e7', spec: 'IP44 · 8–24W · DALI-2' },
    ],
  },
  {
    id: 'solar',
    name: 'Solar Lighting',
    count: 52,
    image: '1688124968558-974cf707348b',
    desc: 'Off-grid solar systems with integrated batteries and smart charge controllers for sustainable cities.',
    sub: [
      { name: 'Solar Street Lights', count: 22, image: '1740805276608-ef60e2e468ba', spec: '40–120W · LiFePO4 Battery' },
      { name: 'Solar Garden Lights', count: 18, image: '1465146344425-f00d5f5c8f07', spec: '6–18W · Auto Dusk-to-Dawn' },
      { name: 'Solar High Mast Lights', count: 12, image: '1625365492753-0ca6557b8aed', spec: '200–600W · 15–40m · Smart Control' },
    ],
  },
  {
    id: 'poles',
    name: 'Lighting Poles',
    count: 53,
    image: '1604388727293-b1e9591d8056',
    desc: 'Custom-engineered galvanised steel and aluminium poles for every urban and architectural context.',
    sub: [
      { name: 'Architectural Poles', count: 18, image: '1604388727293-b1e9591d8056', spec: '3–10m · Custom Finishes' },
      { name: 'Octagonal Poles', count: 20, image: '1560692659-467e4f0f3deb', spec: '4–14m · Hot-dip Galvanised' },
      { name: 'High Mast Poles', count: 15, image: '1625365492753-0ca6557b8aed', spec: '15–40m · Winch System' },
    ],
  },
  {
    id: 'smart',
    name: 'Smart Lighting',
    count: 28,
    image: '1608377205619-03a0b4c4e270',
    desc: 'DALI-2, DMX and IoT-ready controls that integrate seamlessly with building management systems.',
    sub: [
      { name: 'Smart Light Poles', count: 8, image: '1498036882173-b41c28a8ba34', spec: 'LoRa · NB-IoT · 5G Ready' },
      { name: 'DALI-2 Control System', count: 8, image: '1525935944571-4e99237764c9', spec: 'EN 62386 · 64 Groups' },
      { name: 'DMX Controllers', count: 6, image: '1480714378408-67cf0d13bc1b', spec: 'DMX 512 · 512 Channels' },
      { name: 'IoT Smart City', count: 6, image: '1608377205619-03a0b4c4e270', spec: 'LoRa · NB-IoT · Mesh' },
    ],
  },
]


const OFFICE_DETAILS = [
  { city: 'Mumbai', country: 'India', role: 'Head Office', coords: '19°04′N 72°52′E', address: 'Bandra Kurla Complex, Mumbai 400 051', phone: '+91 22 4567 8900', email: 'india@ziviolife.com', image: '1529422085564-f38b543fb00e', index: '01' },
  { city: 'Delhi', country: 'India', role: 'Branch Office', coords: '28°36′N 77°12′E', address: 'Connaught Place, New Delhi 110 001', phone: '+91 11 4567 8900', email: 'delhi@ziviolife.com', image: '1524995997946-a1c2e315a42f', index: '02' },
  { city: 'Dubai', country: 'UAE', role: 'Branch Office', coords: '25°12′N 55°16′E', address: 'Business Bay, Dubai, UAE', phone: '+971 4 567 8900', email: 'dubai@ziviolife.com', image: '1512453979798-5ea266f8880c', index: '03' },
  { city: 'London', country: 'UK', role: 'Branch Office', coords: '51°30′N 0°07′W', address: 'Canary Wharf, London E14 5AB', phone: '+44 20 7946 0900', email: 'london@ziviolife.com', image: '1486325212027-8081e485255e', index: '04' },
]

const SEARCH_TAGS = ['Downlights', 'Bollards', 'IP67 Outdoor', 'DALI-2', 'Solar Street', 'Facade Washer', 'Lighting Poles', 'IES Files']

// ─── Mega-menu data ────────────────────────────────────────────────────────────
const MEGA_PRODUCTS = [
  {
    group: 'Outdoor Lighting', slug: 'outdoor', color: '#0F4C81', items: [
      'Bollards', 'Tree Uplighters', 'Projectors & Column Projectors',
      'Post Top Luminaires', 'Up & Down Wall Lights', 'Street & Area Lighting',
      'In-Ground Luminaires', 'Step Lights', 'Surface Ceiling Luminaires',
      'Pendant Luminaires', 'Underwater Luminaires', 'High Bay Luminaires', 'Flood Lights',
    ]
  },
  {
    group: 'Indoor Lighting', slug: 'indoor', color: '#5e35b1', items: [
      'Downlights', 'Linear Lighting Systems', 'Surface Spotlights',
      'Track & Surface Spotlights', 'Architectural Pendant Lights',
    ]
  },
  {
    group: 'Facade Lighting', slug: 'facade', color: '#0277bd', items: [
      'Linear Facade Systems', 'Wall Washers', 'Grazers', 'Cove & Niche Lighting',
    ]
  },
  {
    group: 'Solar Lighting', slug: 'solar', color: '#e65100', items: [
      'Solar Street Lights', 'Solar Garden Lights', 'Solar High Mast Lights',
    ]
  },
  {
    group: 'Lighting Poles', slug: 'poles', color: '#2e7d32', items: [
      'Architectural Poles', 'Octagonal Poles', 'High Mast Poles',
    ]
  },
  {
    group: 'Smart Lighting', slug: 'smart', color: '#6a1b9a', items: [
      'Smart Light Poles', 'DALI-2 Control System', 'DMX Controllers', 'IoT Smart City',
    ]
  },
]
const MEGA_SOLUTIONS = [
  { group: 'Commercial', items: ['Hotels & Resorts', 'Retail & Shopping', 'Offices', 'Restaurants'] },
  { group: 'Public', items: ['Airports', 'Museums', 'Government', 'Healthcare'] },
  { group: 'Urban', items: ['Smart Cities', 'Roads & Highways', 'Parks', 'Bridges'] },
  { group: 'Private', items: ['Luxury Villas', 'Residential', 'Educational', 'Industrial'] },
]
const TOP_NAV = ['Home', 'About', 'Products', 'Solutions', 'Projects', 'Downloads', 'News', 'Careers', 'ZiVIO CARE']

// ─── Utility ──────────────────────────────────────────────────────────────────
const img = (id: string, w = 800, h = 600) => {
  if (!id) return ''
  if (id.startsWith('http://') || id.startsWith('https://') || id.startsWith('/') || id.startsWith('data:')) {
    return id
  }
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, active = false) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let t0: number | null = null
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return n
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

function InView({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={v ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}


// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ onAbout, onNews, onCareers, onArchConsult, onSearch }: { onAbout: () => void; onNews: () => void; onCareers: () => void; onArchConsult: () => void; onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('EN')
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])


  const openMega = (label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setMegaOpen(label)
  }
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 140) }

  const megaData = megaOpen === 'Products' ? MEGA_PRODUCTS : megaOpen === 'Solutions' ? MEGA_SOLUTIONS : null

  return (
    <>
      {/* ── Utility top-bar — always visible ── */}
      <div className="fixed top-0 inset-x-0 z-[51] hidden lg:block"
        style={{ backgroundColor: C.navyDark, borderBottom: `1px solid rgba(182,141,64,0.18)` }}>
        <div className="flex items-center justify-between px-14" style={{ height: 34 }}>
          {/* Left: Architects & Consultants CTA — bold */}
          <button onClick={onArchConsult}
            className="flex items-center gap-3 group transition-all"
            style={{ cursor: 'pointer' }}>
            <span className="flex items-center justify-center w-5 h-5 rounded"
              style={{ background: `${C.amber}22`, border: `1px solid ${C.amber}50` }}>
              <Compass size={10} style={{ color: C.amber }} />
            </span>
            <span className="font-sans font-black text-[10px] uppercase tracking-[0.16em] group-hover:opacity-80 transition-opacity"
              style={{ color: '#FFFFFF', letterSpacing: '0.14em' }}>
              Architects &amp; Consultants
            </span>
            <span className="font-label text-[7px] tracking-[0.18em] uppercase px-2 py-0.5 rounded"
              style={{ background: `${C.amber}18`, color: C.amber, border: `1px solid ${C.amber}35` }}>
              Project Inquiry
            </span>
            <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" style={{ color: C.amber }} />
          </button>
          {/* Right: contact + language */}
          <div className="flex items-center gap-6">
            <a href="tel:+912245678900" className="flex items-center gap-2 font-label text-[7.5px] tracking-[0.18em] uppercase transition-colors hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              <Phone size={9} style={{ color: C.amber }} /> +91 22 4567 8900
            </a>
            <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.12)' }} />
            <a href="mailto:info@ziviolife.com" className="font-label text-[7.5px] tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              info@ziviolife.com
            </a>
            <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.12)' }} />
            <div className="relative">
              <button onClick={() => setLangOpen(l => !l)}
                className="flex items-center gap-1 font-label text-[7.5px] tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
                <Globe size={8} style={{ color: C.amber }} /> {lang}
                <ChevronDown size={6} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute right-0 top-full mt-2 py-1 z-50"
                    style={{ background: C.navyMid, border: `1px solid rgba(255,255,255,0.1)`, minWidth: 70, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                    {['EN', 'AR', 'FR', 'DE', 'HI'].map(l => (
                      <button key={l} onClick={() => { setLang(l); setLangOpen(false) }}
                        className="w-full text-left px-4 py-1.5 font-label text-[8px] tracking-[0.18em] uppercase transition-colors"
                        style={{ color: l === lang ? C.amber : 'rgba(255,255,255,0.55)' }}>
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

      {/* ── Main header bar ── */}
      <header className="fixed top-0 lg:top-[34px] inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,250,247,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.inkBorder}` : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        }}>

        {/* Brand-red hairline — only on scroll */}
        {scrolled && <div className="w-full" style={{ height: 1.5, background: `linear-gradient(to right, transparent, ${C.amber} 30%, ${C.amber} 70%, transparent)` }} />}

        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-14" style={{ height: scrolled ? 60 : 70, transition: 'height 0.4s ease' }}>

          {/* ── Logo ── */}
          <BrandLogo theme={scrolled ? 'light' : 'dark'} size="md" />

          {/* ── Nav — centred ── */}
          <nav className="hidden xl:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {TOP_NAV.map(label => {
              const hasMega = label === 'Products' || label === 'Solutions'
              const isActive = megaOpen === label
              return (
                <div key={label} className="relative"
                  onMouseEnter={() => hasMega ? openMega(label) : setMegaOpen(null)}
                  onMouseLeave={() => hasMega ? closeMega() : null}>
                  <a
                    href={label === 'Home' ? '/' : label === 'Products' ? '/products' : (label === 'About' || label === 'News' || label === 'Careers') ? undefined : `#${label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={label === 'About' ? (e) => { e.preventDefault(); onAbout() } : label === 'News' ? (e) => { e.preventDefault(); onNews() } : label === 'Careers' ? (e) => { e.preventDefault(); onCareers() } : undefined}
                    className="flex items-center gap-1 px-3 py-2 font-sans font-black uppercase transition-all duration-200"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: '0.07em',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      color: isActive ? C.amber : (scrolled ? '#111111' : 'rgba(255,255,255,0.92)'),
                      background: isActive ? `${C.amber}14` : 'transparent',
                      borderRadius: 4,
                    }}>
                    {label}
                    {hasMega && (
                      <ChevronDown size={8} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                        style={{ color: isActive ? C.amber : (scrolled ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)') }} />
                    )}
                  </a>
                  {isActive && (
                    <motion.span layoutId="nav-active-line"
                      className="absolute bottom-0 left-3 right-3 rounded-full"
                      style={{ height: 2.5, background: C.amber }} />
                  )}
                </div>
              )
            })}
          </nav>

          {/* ── Right ── */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button onClick={onSearch}
              className="hidden lg:flex items-center gap-0 overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                borderRadius: 12,
                background: '#FFFFFF',
                border: `1.5px solid ${C.inkBorder}`,
                boxShadow: '0 4px 18px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}>
              {/* Icon block */}
              <span className="flex items-center justify-center w-9 h-9"
                style={{ background: `${C.amber}18`, borderRight: `1px solid ${C.inkBorder}` }}>
                <Search size={13} style={{ color: C.amber }} />
              </span>
              {/* Label */}
              <span className="font-sans font-black text-[11px] uppercase px-3"
                style={{ color: C.bodyDark, letterSpacing: '0.1em' }}>
                Search
              </span>
              {/* ⌘K badge */}
              <span className="font-sans font-bold text-[8px] mr-2.5 px-1.5 py-0.5 rounded-md"
                style={{ background: C.inkMid, color: C.bodyLight, border: `1px solid ${C.inkBorder}` }}>
                ⌘K
              </span>
            </button>

            {/* Contact */}
            <a href="#contact"
              className="hidden lg:flex items-center gap-0 overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                borderRadius: 12,
                background: C.bodyDark,
                border: `1.5px solid ${C.bodyDark}`,
                boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
                textDecoration: 'none',
              }}>
              {/* Icon block */}
              <span className="flex items-center justify-center w-9 h-9"
                style={{ background: C.amber, borderRight: `1px solid rgba(0,0,0,0.15)` }}>
                <Phone size={13} style={{ color: '#fff' }} />
              </span>
              {/* Label */}
              <span className="font-sans font-black text-[11px] uppercase px-3"
                style={{ color: '#fff', letterSpacing: '0.1em' }}>
                Contact
              </span>
            </a>

            {/* Mobile hamburger */}
            <button className="xl:hidden flex flex-col gap-[5px] p-2" aria-label="Open Navigation Menu"
              onClick={() => setMenuOpen(true)}>
              <span className="block rounded-full transition-colors" style={{ width: 22, height: 2, background: scrolled ? '#111111' : '#FFFFFF' }} />
              <span className="block rounded-full" style={{ width: 15, height: 2, background: C.amber }} />
              <span className="block rounded-full transition-colors" style={{ width: 22, height: 2, background: scrolled ? '#111111' : '#FFFFFF' }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mega menu ── */}
      <AnimatePresence>
        {megaOpen && megaData && (
          <motion.div
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 z-40"
            style={{ top: 104, background: C.ink, borderBottom: `1px solid ${C.inkBorder}`, boxShadow: '0 12px 48px rgba(0,0,0,0.10)' }}
            onMouseEnter={() => { if (megaTimer.current) clearTimeout(megaTimer.current) }}
            onMouseLeave={closeMega}>

            {/* Top accent bar — coloured per category */}
            <div className="flex" style={{ height: 3 }}>
              {(megaOpen === 'Products' ? MEGA_PRODUCTS : MEGA_SOLUTIONS).map(col => (
                <div key={col.group} className="flex-1"
                  style={{ background: (col as typeof MEGA_PRODUCTS[0]).color ?? C.amber }} />
              ))}
            </div>

            <div className="max-w-[1440px] mx-auto px-10 py-8">
              {/* ── Single-row 6-column grid ── */}
              <div className="grid gap-0"
                style={{ gridTemplateColumns: megaOpen === 'Products' ? 'repeat(6,1fr)' : 'repeat(4,1fr)' }}>
                {megaData.map((col, ci) => {
                  const colColor = (col as typeof MEGA_PRODUCTS[0]).color ?? C.amber
                  return (
                    <div key={col.group}
                      className="flex flex-col"
                      style={{ borderRight: ci < megaData.length - 1 ? `1px solid ${C.inkBorder}` : 'none', paddingRight: 22, paddingLeft: ci > 0 ? 22 : 0 }}>

                      {/* Column header */}
                      <a href={megaOpen === 'Products' ? `/products/${(col as any).slug || ''}` : '#solutions'}
                        className="mb-4 pb-3 block group transition-opacity hover:opacity-80"
                        style={{ borderBottom: `2px solid ${colColor}` }}>
                        <p className="font-sans font-bold text-[12px] leading-tight" style={{ color: C.bodyDark }}>{col.group}</p>
                      </a>

                      {/* Items */}
                      <ul className="flex flex-col gap-0 flex-1">
                        {col.items.map(item => (
                          <li key={item}>
                            <a href={megaOpen === 'Products' ? `/products/${(col as any).slug || ''}` : '#solutions'}
                              className="flex items-center gap-2.5 py-1.5 group transition-all"
                              style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
                              <span className="w-0 h-px shrink-0 transition-all duration-200 group-hover:w-3"
                                style={{ background: colColor }} />
                              <span className="font-sans text-[11.5px] leading-snug transition-colors duration-150"
                                style={{ color: C.bodyMid }}
                                onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = C.bodyDark}
                                onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = C.bodyMid}>
                                {item}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>

                      {/* View all */}
                      <a href={megaOpen === 'Products' ? `/products/${(col as any).slug || ''}` : '#solutions'}
                        className="inline-flex items-center gap-1.5 mt-4 font-label text-[7.5px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
                        style={{ color: colColor }}>
                        View All <ArrowRight size={8} />
                      </a>
                    </div>
                  )
                })}
              </div>

              {/* Footer strip */}
              <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: `1px solid ${C.inkBorder}` }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.amber }} />
                  <span className="font-sans font-semibold text-[12px]" style={{ color: C.bodyDark }}>
                    500+ products across 6 families
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="#downloads"
                    className="font-label text-[8px] tracking-[0.18em] uppercase transition-colors hover:opacity-70"
                    style={{ color: C.bodyMid }}>
                    Download Catalogue
                  </a>
                  <a href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-1.5 font-label text-[8px] tracking-[0.18em] uppercase transition-all hover:opacity-85"
                    style={{ background: C.amber, color: '#fff', borderRadius: 3 }}>
                    Request Quote <ArrowRight size={8} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col" style={{ background: '#080808' }}>
            {/* Mobile menu header */}
            <div className="flex justify-between items-center px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <BrandLogo theme="dark" size="sm" />
              <button onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                <X size={17} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              {TOP_NAV.map((label, i) => (
                <motion.a key={label}
                  href={label === 'Home' ? '#' : (label === 'About' || label === 'News' || label === 'Careers') ? undefined : `#${label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => { if (label === 'About' || label === 'News' || label === 'Careers') e.preventDefault(); setMenuOpen(false); if (label === 'About') onAbout(); if (label === 'News') onNews(); if (label === 'Careers') onCareers() }}
                  initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.04, ease: 'easeOut' }}
                  className="flex items-center justify-between px-7 py-4 font-sans font-semibold uppercase transition-colors hover:text-white"
                  style={{ borderBottom: `1px solid rgba(255,255,255,0.05)`, color: 'rgba(255,255,255,0.55)', fontSize: 13, letterSpacing: '0.07em', cursor: 'pointer' }}>
                  {label}
                  <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.2)' }} />
                </motion.a>
              ))}
            </nav>
            <div className="px-7 pb-10 pt-5 flex gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <a href="#contact"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 font-sans font-bold text-[11px] tracking-wide uppercase"
                style={{ background: C.amber, color: '#fff', borderRadius: 6, letterSpacing: '0.07em' }}>
                Get a Quote <ArrowRight size={11} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── FEATURED PRODUCT SHOWCASE ────────────────────────────────────────────────
const FEATURED_PRODUCTS = [
  {
    badge: 'Garden Series',
    model: 'G5043',
    name: 'LED Garden',
    nameAccent: 'Light',
    desc: 'A sculptural luminaire engineered for premium outdoor spaces. The G5043 combines architectural ring design with high-efficiency LED technology for boulevards, plazas, and landscaped environments.',
    productImg: g5043Product,
    bgSlides: [
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'G5043' },
      { label: 'Type', value: 'LED Garden Light' },
      { label: 'Finish', value: 'Anodised Aluminium' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'CCT', value: '3000K / 4000K' },
    ],
  },
  {
    badge: 'Heritage Series',
    model: 'GL Classic',
    name: 'Classic LED',
    nameAccent: 'Lantern',
    desc: 'A timeless lantern-style post light blending heritage craftsmanship with modern LED efficiency. Ideal for boulevards, heritage districts, hotel driveways, and high-end residential streetscapes.',
    productImg: classicLanternProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1565199975350-a723a63c053f?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'GL Classic' },
      { label: 'Type', value: 'Post Lantern' },
      { label: 'Body', value: 'Cast Aluminium' },
      { label: 'IP Rating', value: 'IP66' },
      { label: 'CCT', value: '2700K / 3000K' },
      { label: 'Finish', value: 'Matte Black' },
    ],
  },
  {
    badge: 'Linear Series',
    model: 'LG Linear',
    name: 'LED Linear',
    nameAccent: 'Inground',
    desc: 'A precision-engineered recessed linear luminaire that transforms driveways, plazas, and pathways into dramatic lit passages. Flush-mounted aluminium profile with IP67 protection for demanding outdoor environments.',
    productImg: linearProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1703289773827-7f838dbd5558?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1559173525-d16dfd7c17fe?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'LG Linear' },
      { label: 'Type', value: 'Recessed Linear' },
      { label: 'Body', value: 'Extruded Aluminium' },
      { label: 'IP Rating', value: 'IP67' },
      { label: 'CCT', value: '2700K / 4000K' },
      { label: 'Install', value: 'Flush Inground' },
    ],
  },
  {
    badge: 'Interior Series',
    model: 'SS Surface',
    name: 'LED Surface',
    nameAccent: 'Spotlight',
    desc: 'A modular surface-mounted COB spotlight series available in 1, 2, 3, and 4 head configurations. Engineered for precision accent lighting in bedrooms, dining rooms, living spaces, and commercial interiors.',
    productImg: surfaceProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1711107796112-e5b4fe9aa075?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'SS Surface' },
      { label: 'Type', value: 'Surface Spotlight' },
      { label: 'Heads', value: '1 / 2 / 3 / 4' },
      { label: 'IP Rating', value: 'IP20' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Black / White' },
    ],
  },
  {
    badge: 'Royal Series',
    model: 'GC Crown',
    name: 'LED Crown',
    nameAccent: 'Lantern',
    desc: 'A regal ornamental lantern inspired by classical European street lighting. Intricate crown-top casting in die-cast aluminium, paired with LED efficiency — designed for heritage districts, palace driveways, and luxury streetscapes.',
    productImg: crownProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'GC Crown' },
      { label: 'Type', value: 'Ornamental Post Top' },
      { label: 'Body', value: 'Die-Cast Aluminium' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'CCT', value: '2700K / 3000K' },
      { label: 'Finish', value: 'Matte Black' },
    ],
  },
  {
    badge: 'Globe Series',
    model: 'GP Globe',
    name: 'LED Globe',
    nameAccent: 'Post Light',
    desc: 'A contemporary globe post light with a clear borosilicate sphere and precision die-cast aluminium housing. The iconic spherical form delivers 360° uniform illumination — perfectly suited for promenades, resort boulevards, and landscape avenues.',
    productImg: globeProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1564501838839-b8d1da6fd0e7?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1529422085564-f38b543fb00e?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'GP Globe' },
      { label: 'Type', value: 'Globe Post Top' },
      { label: 'Body', value: 'Die-Cast Aluminium' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Matte Black / Grey' },
    ],
  },
  {
    badge: 'Helix Series',
    model: 'HX Helix',
    name: 'Helix LED',
    nameAccent: 'Post Top',
    desc: 'A sculptural post-top luminaire featuring three interlocking LED rings in a signature helix formation. Each ring is independently illuminated for a dynamic, jewel-like nighttime presence — designed for landmark avenues, luxury resorts, and architectural streetscapes.',
    productImg: helixPostProduct,
    bgSlides: [
      'https://images.unsplash.com/photo-1684395832652-bd82a6758d03?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1480944657103-7fed22359e1d?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'HX Helix' },
      { label: 'Type', value: 'Decorative Post Top' },
      { label: 'Rings', value: '3× LED Ring' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Gun Metal / Silver' },
    ],
  },
  {
    badge: 'Globe Outdoor Series',
    model: 'GO Globe',
    name: 'Globe Park',
    nameAccent: 'Lantern',
    desc: 'A weather-hardened globe park lantern with a clear borosilicate dome over a precision die-cast aluminium spire body. IP66-rated for year-round outdoor endurance — ideal for public parks, garden walkways, urban plazas and resort landscaping.',
    productImg: globePostProduct2,
    bgSlides: [
      'https://images.unsplash.com/photo-1687730825065-4b8a46325333?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1685459842175-788b5f24ccf2?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'GO Globe' },
      { label: 'Type', value: 'Globe Park Lantern' },
      { label: 'Body', value: 'Die-Cast Aluminium' },
      { label: 'IP Rating', value: 'IP66' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Matte Black' },
    ],
  },
  {
    badge: 'Helix Pro Series',
    model: 'HX Helix Pro',
    name: 'Helix Pro',
    nameAccent: 'Street Light',
    desc: 'An evolved triple-ring LED street luminaire with angled helix orientation for superior light distribution across wide carriageways. Engineered for landmark boulevards, airport avenues and five-star resort driveways requiring sculptural identity after dark.',
    productImg: helixPostAlt,
    bgSlides: [
      'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'HX Helix Pro' },
      { label: 'Type', value: 'Decorative Street Light' },
      { label: 'Rings', value: '3× Angled LED Ring' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Gun Metal' },
    ],
  },
  {
    badge: 'Sphere Garden Series',
    model: 'SG Sphere',
    name: 'Sphere Garden',
    nameAccent: 'Post Light',
    desc: 'A robust all-weather sphere garden post light with rain-tested borosilicate globe and a precision cast-iron spire mount. Designed for public parks, civic plazas, resort grounds and heritage garden landscapes where year-round weatherproofing is essential.',
    productImg: globePostAlt,
    bgSlides: [
      'https://images.unsplash.com/photo-1763057802427-095bf233dc8a?w=1600&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1586766820393-556ca02e1bcd?w=1600&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Model', value: 'SG Sphere' },
      { label: 'Type', value: 'Sphere Garden Light' },
      { label: 'Globe', value: 'Borosilicate Clear' },
      { label: 'IP Rating', value: 'IP66' },
      { label: 'CCT', value: '3000K / 4000K' },
      { label: 'Finish', value: 'Matte Black' },
    ],
  },
]

export interface BackendProduct {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  gallery?: string[] | null;
  short_description?: string | null;
  description?: string | null;
  specs?: string[] | null;
  technical_specs?: Array<{ label: string; value: string }> | null;
  category?: {
    name: string;
    environment?: { name: string; slug: string };
  };
}

export interface WelcomeProps {
  featuredProducts?: BackendProduct[];
  environments?: any[];
  heroSlides?: any[];
  projects?: any[];
  testimonials?: any[];
  catalogues?: any[];
}

function adaptHeroSlides(slides: any[] | undefined, defaultSlides: typeof HERO_SLIDES) {
  if (!slides || !Array.isArray(slides) || slides.length === 0) return defaultSlides;
  return slides.map((s, idx) => {
    const fallback = defaultSlides[idx % defaultSlides.length];
    return {
      id: s.id ?? idx,
      type: (s.type === 'video' ? 'video' : 'image') as 'video' | 'image',
      video: s.video || fallback.video,
      image: s.image || fallback.image,
      poster: s.poster || fallback.poster,
      label: s.label || fallback.label,
      headline: Array.isArray(s.headline)
        ? s.headline
        : typeof s.headline === 'string'
          ? s.headline.split('\n')
          : fallback.headline,
      sub: s.sub || fallback.sub,
      location: s.location || fallback.location,
    };
  });
}

function adaptFeaturedProducts(
  dbProducts: BackendProduct[] | undefined,
  defaultProducts: typeof FEATURED_PRODUCTS
) {
  if (!dbProducts || !Array.isArray(dbProducts) || dbProducts.length === 0) {
    return defaultProducts;
  }

  return dbProducts.map((p, idx) => {
    const fallback = defaultProducts[idx % defaultProducts.length];

    const nameParts = p.name.trim().split(' ');
    const nameAccent = nameParts.length > 1 ? nameParts.pop()! : '';
    const mainName = nameParts.join(' ') || p.name;

    const specs = (p.technical_specs && p.technical_specs.length > 0)
      ? p.technical_specs.slice(0, 6)
      : (p.specs && p.specs.length > 0)
        ? p.specs.slice(0, 6).map((s, i) => ({ label: `Spec ${i + 1}`, value: s }))
        : fallback.specs;

    const bgSlides = (p.gallery && p.gallery.length > 0)
      ? p.gallery
      : (p.image ? [p.image, ...fallback.bgSlides.slice(1)] : fallback.bgSlides);

    return {
      badge: p.category?.name || p.category?.environment?.name || fallback.badge,
      model: p.slug ? p.slug.split('-')[0].toUpperCase() : fallback.model,
      name: mainName,
      nameAccent: nameAccent || fallback.nameAccent,
      desc: p.short_description || p.description || fallback.desc,
      productImg: p.image || fallback.productImg,
      bgSlides,
      specs,
      slug: p.slug,
      href: `/product/${p.slug}`,
    };
  });
}

const BG_DURATION = 2500   // ms per background slide
const PROD_DURATION = 8000   // ms per product

function FeaturedProduct({ products = FEATURED_PRODUCTS }: { products?: typeof FEATURED_PRODUCTS }) {
  const [prodIdx, setProdIdx] = useState(0)
  const [bgIdx, setBgIdx] = useState(0)
  const [bgProg, setBgProg] = useState(0)
  const [prodProg, setProdProg] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const product = products[prodIdx] || products[0]
  const totalBg = product.bgSlides.length

  // Background slide cycle
  useEffect(() => {
    setBgIdx(0); setBgProg(0)
  }, [prodIdx])

  useEffect(() => {
    setBgProg(0)
    const start = Date.now()
    const tick = setInterval(() => setBgProg(Math.min((Date.now() - start) / BG_DURATION, 1)), 16)
    const adv = setTimeout(() => setBgIdx(i => (i + 1) % totalBg), BG_DURATION)
    return () => { clearInterval(tick); clearTimeout(adv) }
  }, [bgIdx, prodIdx, totalBg])

  // Product auto-advance
  useEffect(() => {
    setProdProg(0)
    const start = Date.now()
    const tick = setInterval(() => setProdProg(Math.min((Date.now() - start) / PROD_DURATION, 1)), 16)
    const adv = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => {
        setProdIdx(i => (i + 1) % products.length)
        setLeaving(false)
      }, 500)
    }, PROD_DURATION)
    return () => { clearInterval(tick); clearTimeout(adv) }
  }, [prodIdx, products.length])

  const goTo = (idx: number) => {
    if (idx === prodIdx) return
    setLeaving(true)
    setTimeout(() => { setProdIdx(idx); setLeaving(false) }, 450)
  }

  return (
    <section className="w-full max-w-[100vw] overflow-hidden" style={{ background: '#080604', overflow: 'hidden' }}>

      {/* ══ TOP — full-bleed cinematic stage ══ */}
      <div className="relative overflow-hidden" style={{ minHeight: 640 }}>

        {/* Background photo crossfade */}
        <AnimatePresence mode="sync">
          <motion.div key={`bg-${prodIdx}-${bgIdx}`} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}>
            <motion.img src={product.bgSlides[bgIdx]} alt=""
              className="w-full h-full object-cover"
              initial={{ scale: 1.07 }} animate={{ scale: 1 }}
              transition={{ duration: BG_DURATION / 1000 + 2, ease: 'linear' }} />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(5,3,1,0.96) 0%, rgba(5,3,1,0.7) 36%, rgba(5,3,1,0.2) 64%, rgba(5,3,1,0.55) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,3,1,0.98) 0%, rgba(5,3,1,0.15) 35%, transparent 60%)' }} />

        {/* ── Main content ── */}
        <div className="relative lg:absolute inset-0 flex flex-col-reverse lg:flex-row items-center lg:items-stretch overflow-hidden">

          {/* LEFT — product info */}
          <div className="flex flex-col justify-center px-6 lg:pl-20 lg:pr-8 z-10 w-full lg:w-[42%] py-8 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div key={`info-${prodIdx}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: leaving ? 0 : 1, y: leaving ? -10 : 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 24, height: 1, background: C.amber }} />
                  <span className="font-label text-[6.5px] tracking-[0.38em] uppercase" style={{ color: C.amber }}>
                    Featured Product
                  </span>
                </div>

                {/* Badge row */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-label text-[6px] tracking-[0.2em] uppercase px-2.5 py-1"
                    style={{ background: `${C.amber}18`, color: C.amberLt, border: `1px solid ${C.amber}28` }}>
                    {product.badge}
                  </span>
                  <span className="font-label text-[6px] tracking-[0.16em] uppercase px-2.5 py-1"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {product.model}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-serif leading-[0.88] mb-4"
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 5.2rem)', color: '#fff', letterSpacing: '-0.04em', fontWeight: 800 }}>
                  {product.name}<br />
                  <span style={{ color: C.amber, fontWeight: 300, fontStyle: 'italic' }}>{product.nameAccent}</span>
                </h2>

                {/* Desc */}
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.36)', lineHeight: 1.82, maxWidth: 340, marginBottom: 24 }}>
                  {product.desc}
                </p>

                {/* Spec grid — 2 columns */}
                <div className="grid grid-cols-2 gap-px mb-6" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.07)' }}>
                  {product.specs.map(({ label, value }, i) => (
                    <div key={label} className="flex flex-col gap-0.5 px-3 py-2.5" style={{ background: 'rgba(5,3,1,0.85)' }}>
                      <span className="font-label text-[5.5px] tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</span>
                      <span className="font-sans text-[11px] font-semibold" style={{ color: i === 0 ? C.amberLt : '#fff' }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a href={product.href ?? "#products"}
                    className="flex items-center gap-2 font-label text-[7.5px] tracking-[0.16em] uppercase transition-all hover:-translate-y-px"
                    style={{ background: C.amber, color: '#fff', padding: '11px 22px', boxShadow: `0 6px 24px ${C.amber}44` }}>
                    View Product <ArrowRight size={9} />
                  </a>
                  <a href="#contact"
                    className="flex items-center gap-2 font-label text-[7.5px] tracking-[0.16em] uppercase transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.65)', padding: '11px 22px' }}>
                    Enquire Now
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — floating product image */}
          <div className="relative flex-1 w-full min-h-[300px] lg:min-h-0 flex items-center justify-center overflow-hidden">
            {/* Amber glow */}
            <div className="absolute pointer-events-none" style={{
              width: 'min(560px, 90vw)', height: 'min(560px, 90vw)',
              background: `radial-gradient(circle, ${C.amber}1E 0%, transparent 68%)`,
              filter: 'blur(60px)',
            }} />

            <AnimatePresence mode="wait">
              <motion.img key={`img-${prodIdx}`}
                src={product.productImg} alt={product.name}
                className="relative select-none z-10"
                style={{
                  maxHeight: '76%', maxWidth: '72%', objectFit: 'contain',
                  filter: `drop-shadow(0 32px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 48px ${C.amber}28)`,
                }}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.9 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
            </AnimatePresence>

            {/* Badge top-right */}
            <AnimatePresence mode="wait">
              <motion.div key={`badge-${prodIdx}`}
                className="absolute top-8 right-10 text-right"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <p className="font-label text-[6px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>{product.badge}</p>
                <p className="font-label text-[5.5px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>Model · {product.model}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 flex" style={{ height: 2, gap: 2, zIndex: 30 }}>
          {products.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="flex-1 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              {i < prodIdx && <div className="absolute inset-0" style={{ background: C.amber }} />}
              {i === prodIdx && <div className="absolute inset-0 origin-left" style={{ background: C.amber, transform: `scaleX(${prodProg})` }} />}
            </button>
          ))}
        </div>
      </div>

      {/* ══ BOTTOM — thumbnail filmstrip navigator ══ */}
      <div style={{ background: '#06040200', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-stretch overflow-x-auto hide-scrollbar">
          {products.map((p, i) => {
            const isActive = i === prodIdx
            return (
              <button key={i} onClick={() => goTo(i)}
                className="flex-shrink-0 flex flex-col items-center justify-between transition-all duration-300 relative group"
                style={{
                  width: isActive ? 140 : 110,
                  padding: '14px 12px 12px',
                  background: isActive ? 'rgba(182,141,64,0.08)' : 'transparent',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                }}>
                {/* Active top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: isActive ? C.amber : 'transparent',
                  transition: 'background 0.3s',
                }} />
                {/* Product thumbnail */}
                <div className="flex items-center justify-center mb-2"
                  style={{ width: 52, height: 52 }}>
                  <img src={p.productImg} alt={p.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 4px 12px ${C.amber}44) brightness(1.1)`
                        : 'brightness(0.55) grayscale(0.3)',
                    }} />
                </div>
                {/* Name */}
                <p className="font-sans text-center leading-tight"
                  style={{ fontSize: 8.5, fontWeight: isActive ? 600 : 400, color: isActive ? '#fff' : 'rgba(255,255,255,0.3)', maxWidth: 100, transition: 'color 0.3s' }}>
                  {p.name}
                </p>
                {isActive && (
                  <p className="font-label text-center mt-1" style={{ fontSize: 5.5, letterSpacing: '0.18em', color: C.amber, textTransform: 'uppercase' }}>
                    {p.model}
                  </p>
                )}
              </button>
            )
          })}

          {/* Prev / Next controls at the end */}
          <div className="flex items-center gap-2 px-5 ml-auto shrink-0">
            <button onClick={() => goTo((prodIdx - 1 + products.length) % products.length)}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.amber; b.style.color = C.amber }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.12)'; b.style.color = 'rgba(255,255,255,0.4)' }}>
              <ChevronLeft size={12} />
            </button>
            <button onClick={() => goTo((prodIdx + 1) % products.length)}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.amber; b.style.color = C.amber }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.12)'; b.style.color = 'rgba(255,255,255,0.4)' }}>
              <ChevronRight size={12} />
            </button>
            <span className="font-label text-[6.5px] tracking-[0.2em] ml-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {String(prodIdx + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const SLIDE_DURATION = 5000

function Hero({ slides = HERO_SLIDES }: { slides?: typeof HERO_SLIDES }) {
  const [slide, setSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const total = slides.length

  const goTo = useCallback((idx: number) => { setSlide(Math.min(idx, slides.length - 1)); setProgress(0) }, [slides.length])
  const next = useCallback(() => goTo((slide + 1) % total), [slide, total, goTo])
  const prev = useCallback(() => goTo((slide - 1 + total) % total), [slide, total, goTo])

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const tick = setInterval(() => setProgress(Math.min((Date.now() - start) / SLIDE_DURATION, 1)), 16)
    const advance = setTimeout(next, SLIDE_DURATION)
    return () => { clearInterval(tick); clearTimeout(advance) }
  }, [slide, next])

  const safeSlide = Math.min(slide, slides.length - 1)
  const s = slides[safeSlide] || slides[0]
  const eyebrow = s?.label?.split('·')[1]?.trim() ?? s?.label ?? ''

  return (
    <section className="w-full max-w-[100vw] overflow-hidden" style={{ position: 'relative', height: '100svh', minHeight: 640, overflow: 'hidden', background: '#050403' }}>

      {/* ── Full-bleed background — cinematic crossfade + Ken Burns ── */}
      <AnimatePresence mode="sync">
        <motion.div key={safeSlide} className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}>
          <motion.div className="absolute inset-0"
            initial={{ scale: 1.1 }} animate={{ scale: 1 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: 'linear' }}>
            {s.type === 'video' && s.video ? (
              <video src={s.video} poster={s.poster ? img(s.poster, 1920, 1080) : undefined}
                autoPlay muted loop playsInline preload="auto"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1.05) saturate(1.12) contrast(1.04)' }} />
            ) : s.localImg ? (
              <img src={s.localImg} alt={s.label} className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.92) saturate(1.08)' }} />
            ) : (
              <img src={img(s.image!, 1920, 1080)} alt={s.label}
                className="w-full h-full object-cover" />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Multi-layer overlays ── */}
      {/* Deep left vignette for text legibility */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, rgba(2,1,0,0.88) 0%, rgba(2,1,0,0.55) 38%, rgba(2,1,0,0.12) 65%, transparent 100%)' }} />
      {/* Bottom scrim */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,1,0,0.92) 0%, rgba(2,1,0,0.3) 28%, transparent 56%)' }} />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(2,1,0,0.4) 0%, transparent 18%)' }} />

      {/* ── Amber accent line — left edge ── */}
      <div className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none"
        style={{ width: 3, background: `linear-gradient(to bottom, transparent 5%, ${C.amber} 30%, ${C.amber} 70%, transparent 95%)` }} />

      {/* ── Progress bars — top ── */}
      <div className="absolute top-0 inset-x-0 z-30 flex px-3 sm:px-6" style={{ height: 2, gap: 2 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="flex-1 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            {i < safeSlide && <div className="absolute inset-0" style={{ background: C.amber }} />}
            {i === safeSlide && (
              <motion.div className="absolute inset-0" style={{ background: C.amber, transformOrigin: 'left', scaleX: progress }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Main layout: left content + right vertical navigator ── */}
      <div className="absolute inset-0 z-10 flex">

        {/* ─ LEFT CONTENT — bottom-anchored ─ */}
        <div className="flex-1 flex flex-col justify-end pb-28 sm:pb-32 px-5 sm:px-8 lg:pl-20 lg:pr-8">

          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.div key={`ey-${safeSlide}`}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3 mb-6">
              <div style={{ width: 28, height: 1, background: C.amber }} />
              <span className="font-label text-[7px] tracking-[0.4em] uppercase" style={{ color: C.amber }}>
                {String(safeSlide + 1).padStart(2, '0')} &nbsp;·&nbsp; {eyebrow}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline — staggered line reveal */}
          <div style={{ marginBottom: 22 }}>
            {s?.headline.map((line, li) => (
              <div key={`${safeSlide}-${li}`} style={{ overflow: 'hidden' }}>
                <motion.h1
                  initial={{ y: '108%' }} animate={{ y: 0 }}
                  transition={{ duration: 1, delay: li * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif block"
                  style={{
                    fontSize: 'clamp(2.3rem, 6.5vw, 8.4rem)',
                    fontWeight: li === 0 ? 800 : 300,
                    fontStyle: li === 1 ? 'italic' : 'normal',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF',
                  }}>
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p key={`sub-${safeSlide}`}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', maxWidth: 380, lineHeight: 1.78, fontWeight: 400, marginBottom: 32 }}>
              {s?.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div className="flex items-center gap-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            <a href="/products"
              className="inline-flex items-center gap-3 font-label text-[8.5px] tracking-[0.26em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              style={{ background: C.amber, color: '#fff', padding: '13px 30px', borderRadius: 3, boxShadow: `0 6px 28px ${C.amber}50` }}>
              Explore Products
              <ArrowRight size={9} />
            </a>
            <a href="#contact"
              className="font-label text-[8.5px] tracking-[0.26em] uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.42)', borderBottom: `1px solid rgba(255,255,255,0.18)`, paddingBottom: 2 }}>
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* ─ RIGHT — vertical slide navigator ─ */}
        <div className="hidden lg:flex flex-col justify-center items-end pr-10 gap-0" style={{ width: 200 }}>
          {slides.map((sl, i) => {
            const cat = sl.label.split('·')[1]?.trim() ?? sl.label
            const isActive = i === safeSlide
            return (
              <button key={i} onClick={() => goTo(i)}
                className="flex items-center gap-3 py-3 w-full justify-end group transition-all duration-300"
                style={{ opacity: isActive ? 1 : 0.35 }}>
                <div className="text-right">
                  <div className="font-label text-[6px] tracking-[0.22em] uppercase mb-0.5"
                    style={{ color: isActive ? C.amber : 'rgba(255,255,255,0.5)', transition: 'color 0.3s' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-sans text-[9.5px] leading-tight"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: isActive ? 600 : 400, transition: 'color 0.3s' }}>
                    {cat}
                  </div>
                </div>
                {/* Active indicator bar */}
                <div style={{
                  width: 2, height: isActive ? 36 : 16,
                  background: isActive ? C.amber : 'rgba(255,255,255,0.18)',
                  borderRadius: 1,
                  transition: 'all 0.35s ease',
                  flexShrink: 0,
                }} />
              </button>
            )
          })}

          {/* Prev / Next */}
          <div className="flex gap-2 mt-6">
            {[{ fn: prev, icon: <ChevronLeft size={11} /> }, { fn: next, icon: <ChevronRight size={11} /> }].map((btn, bi) => (
              <button key={bi} onClick={btn.fn}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.amber; b.style.color = C.amber }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.15)'; b.style.color = 'rgba(255,255,255,0.4)' }}>
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom spec bar ── */}
      <div className="absolute bottom-0 inset-x-0 z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:pl-20 lg:pr-10 flex items-center justify-between py-4">
          {/* Location specs */}
          <AnimatePresence mode="wait">
            <motion.p key={`loc-${safeSlide}`}
              className="font-label uppercase"
              style={{ fontSize: 6.5, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.25)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              {s?.location}
            </motion.p>
          </AnimatePresence>

          {/* Slide counter */}
          <div className="flex items-center gap-3">
            <span className="font-label text-[7px] tracking-[0.2em]" style={{ color: C.amber }}>
              {String(safeSlide + 1).padStart(2, '0')}
            </span>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.15)' }}>
              <div style={{ height: '100%', width: `${progress * 100}%`, background: C.amber, transition: 'width 0.1s linear' }} />
            </div>
            <span className="font-label text-[7px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TRUE PARTNERSHIP SECTION ─────────────────────────────────────────────────
const TRUSTED_PILLARS = [
  {
    id: 'global',
    icon: Globe,
    label: 'Global Reach',
    title: 'Delivering Excellence Worldwide',
    body: 'With exports to 15+ countries, our global supply network ensures consistent quality, reliable logistics, and timely delivery for projects of every scale.',
  },
  {
    id: 'custom',
    icon: Sliders,
    label: 'Custom Lighting Solutions',
    title: 'Designed Around Your Vision',
    body: 'Every project is unique. Our engineering team develops customized lighting solutions that meet your architectural, commercial, industrial, and infrastructure requirements.',
  },
  {
    id: 'design',
    icon: Cpu,
    label: 'Lighting Design & Engineering',
    title: 'Expertise That Adds Value',
    body: 'Our lighting specialists provide product selection, technical recommendations, photometric guidance, and application support to create efficient, visually impactful spaces.',
  },
  {
    id: 'mfg',
    icon: Building2,
    label: 'Manufacturing Excellence',
    title: 'Precision Built in India',
    body: 'Our advanced manufacturing facility combines modern automation, rigorous quality control, and skilled craftsmanship to produce lighting systems meeting international standards.',
  },
  {
    id: 'quality',
    icon: Shield,
    label: 'Quality Assurance',
    title: 'Tested Beyond Expectations',
    body: 'Every product undergoes comprehensive inspections and performance testing before shipment, ensuring long-lasting reliability and consistent performance in demanding environments.',
  },
  {
    id: 'pm',
    icon: CheckCircle,
    label: 'Project Management',
    title: 'Seamless Execution',
    body: 'From production planning to export documentation and on-site coordination, our experienced team ensures projects are delivered efficiently, on schedule, and with complete transparency.',
  },
  {
    id: 'support',
    icon: Award,
    label: 'Premium After-Sales Support',
    title: 'Service That Continues Beyond Delivery',
    body: 'We provide responsive technical support, warranty assistance, replacement guidance, and long-term customer care to maximise product performance throughout its lifecycle.',
  },
  {
    id: 'trust',
    icon: Star,
    label: 'Trusted Worldwide',
    title: 'Building Long-Term Partnerships',
    body: 'Leading architects, consultants, contractors, developers, and global enterprises trust us because we consistently deliver premium products, dependable service, and lasting value.',
  },
]

function TruePartnership() {
  const [activeId, setActiveId] = useState(TRUSTED_PILLARS[0].id)
  const active = TRUSTED_PILLARS.find(p => p.id === activeId) ?? TRUSTED_PILLARS[0]
  const activeIdx = TRUSTED_PILLARS.findIndex(p => p.id === activeId)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const ActiveIcon = active.icon

  return (
    <section ref={sectionRef} id="partnership" style={{ background: C.ink }}>
      <div style={{ borderTop: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1400px] mx-auto">

          {/* ── Header ── */}
          <div className="px-8 lg:px-14 py-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[8px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>
                  Your Trusted Lighting Partner
                </span>
              </div>
              <h2 className="font-serif font-semibold leading-[0.9]"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 3rem)', color: C.bodyDark, letterSpacing: '-0.03em' }}>
                From Concept to <em style={{ fontStyle: 'italic', fontWeight: 400, color: C.amber }}>Lifetime Support.</em>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:max-w-[340px] text-[13px] leading-relaxed" style={{ color: C.bodyLight }}>
              A dedicated partner at every stage — design, manufacturing, global delivery and lifetime after-sales support.
            </motion.p>
          </div>

          {/* ── Main: left pillar list + right detail ── */}
          <div className="flex flex-col lg:flex-row" style={{ minHeight: 480 }}>

            {/* Left — compact numbered list */}
            <div className="flex-shrink-0 lg:w-72 flex flex-col"
              style={{ borderRight: `1px solid ${C.inkBorder}`, background: C.inkCard }}>
              {TRUSTED_PILLARS.map((p, i) => {
                const Icon = p.icon
                const isActive = p.id === activeId
                return (
                  <motion.button key={p.id}
                    initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
                    onClick={() => setActiveId(p.id)}
                    className="group relative flex items-center gap-3 px-5 py-3.5 text-left transition-all"
                    style={{
                      background: isActive ? C.inkMuted : 'transparent',
                      borderBottom: `1px solid ${C.inkBorder}`,
                    }}>
                    {isActive && (
                      <motion.div layoutId="partner-bar"
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{ background: C.amber }} />
                    )}
                    <div className="flex items-center justify-center w-6 h-6 flex-shrink-0"
                      style={{
                        border: `1px solid ${isActive ? C.amber : C.inkBorder}`,
                        background: isActive ? 'rgba(226,0,26,0.1)' : 'transparent',
                      }}>
                      <Icon size={11} style={{ color: isActive ? C.amber : C.bodyLight }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-label text-[6.5px] tracking-[0.18em] uppercase block mb-0.5"
                        style={{ color: isActive ? C.amber : C.bodyLight }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-[12px] leading-tight block"
                        style={{ color: isActive ? C.bodyDark : C.bodyMid }}>
                        {p.label}
                      </span>
                    </div>
                    <ChevronRight size={9} style={{ color: isActive ? C.amber : C.inkBorder, flexShrink: 0 }} />
                  </motion.button>
                )
              })}
            </div>

            {/* Right — active detail */}
            <div className="flex-1 flex flex-col lg:flex-row">
              <AnimatePresence mode="wait">
                <motion.div key={activeId}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 flex flex-col">

                  {/* Detail header */}
                  <div className="px-8 lg:px-12 py-7 flex-1 flex flex-col justify-center">
                    <span className="font-label text-[7px] tracking-[0.26em] uppercase mb-3 block"
                      style={{ color: C.amber }}>
                      {String(activeIdx + 1).padStart(2, '0')} / {String(TRUSTED_PILLARS.length).padStart(2, '0')}
                    </span>
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ border: `1px solid ${C.amber}`, background: `${C.amber}12` }}>
                        <ActiveIcon size={14} style={{ color: C.amber }} />
                      </div>
                      <h3 className="font-serif font-semibold leading-tight"
                        style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.1rem)', color: C.bodyDark, letterSpacing: '-0.025em' }}>
                        {active.title}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-7" style={{ color: C.bodyMid, maxWidth: 480 }}>
                      {active.body}
                    </p>
                    <div className="w-8 h-px" style={{ background: C.amber }} />
                  </div>

                  {/* Footer nav */}
                  <div className="flex items-center justify-between px-8 lg:px-12 py-4"
                    style={{ borderTop: `1px solid ${C.inkBorder}`, background: C.inkCard }}>
                    <button onClick={() => setActiveId(TRUSTED_PILLARS[(activeIdx - 1 + TRUSTED_PILLARS.length) % TRUSTED_PILLARS.length].id)}
                      className="flex items-center gap-2 font-label text-[8px] tracking-[0.16em] uppercase transition-opacity hover:opacity-70"
                      style={{ color: C.bodyMid }}>
                      <ChevronLeft size={10} /> Prev
                    </button>
                    <div className="flex items-center gap-1.5">
                      {TRUSTED_PILLARS.map((p, i) => (
                        <button key={p.id} onClick={() => setActiveId(p.id)}
                          className="transition-all"
                          style={{ width: p.id === activeId ? 16 : 4, height: 1, background: p.id === activeId ? C.amber : C.inkBorder }} />
                      ))}
                    </div>
                    <button onClick={() => setActiveId(TRUSTED_PILLARS[(activeIdx + 1) % TRUSTED_PILLARS.length].id)}
                      className="flex items-center gap-2 font-label text-[8px] tracking-[0.16em] uppercase transition-opacity hover:opacity-70"
                      style={{ color: C.bodyMid }}>
                      Next <ChevronRight size={10} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Far right: image panel */}
              <AnimatePresence mode="wait">
                <motion.div key={activeId + '-img'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hidden lg:block relative flex-shrink-0 lg:w-[300px] overflow-hidden"
                  style={{ borderLeft: `1px solid ${C.inkBorder}` }}>
                  <img
                    src={img([
                      '1590496793929-36417d3117de', // 01 Global Reach — city skyline night
                      '1560257084-d568f6eb7b29',    // 02 Custom Lighting — warm lit corridor
                      '1703289773827-7f838dbd5558', // 03 Design & Engineering — round lights dim room
                      '1720036236694-d0a231c52563', // 04 Manufacturing — factory machinery dark
                      '1762657424979-e505efb45142', // 05 Quality Assurance — precision inspection
                      '1642781100314-f1ac6fb42296', // 06 Project Management — construction site night
                      '1780415813256-817c8b206a46', // 07 After-Sales — illuminated skyscrapers
                      '1758919917007-100ed47d1e4f', // 08 Trusted Worldwide — vibrant cityscape night
                    ][activeIdx] ?? '1590496793929-36417d3117de', 600, 800)}
                    alt={active.label}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ opacity: 0.92 }}
                  />
                  {/* Strong dark overlay for text legibility */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(6,4,2,0.72) 0%, rgba(6,4,2,0.18) 60%)' }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(6,4,2,0.88) 0%, rgba(6,4,2,0.1) 55%)' }} />
                  <div className="absolute bottom-6 left-5 right-5">
                    <span className="font-label text-[7px] tracking-[0.22em] uppercase" style={{ color: C.amber }}>{active.label}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="flex items-center justify-between px-8 lg:px-14 py-5"
            style={{ borderTop: `1px solid ${C.inkBorder}`, background: C.inkCard }}>
            <span className="font-label text-[8px] tracking-[0.22em] uppercase" style={{ color: C.bodyLight }}>
              Ready to begin a project?
            </span>
            <div className="flex items-center gap-3">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-85"
                style={{ background: C.amber, color: '#fff' }}>
                Get in Touch <ArrowRight size={9} />
              </a>
              <a href="#downloads"
                className="inline-flex items-center gap-2 px-6 py-3 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-75"
                style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyMid }}>
                <Download size={9} /> Technical Docs
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function Products() {
  const [activeId, setActiveId] = useState(() => PRODUCT_CATEGORIES[0]?.id ?? '')
  const active = PRODUCT_CATEGORIES.find(c => c.id === activeId) ?? PRODUCT_CATEGORIES[0]
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section id="products" ref={sectionRef} style={{ background: C.ink }}>

      {/* ── Section header ── */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 pt-10 pb-7"
        style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px" style={{ background: C.amber }} />
              <span className="font-label text-[8px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Product Portfolio</span>
            </div>
            <h2 className="font-serif font-semibold leading-[0.9]"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.6rem)', color: C.bodyDark, letterSpacing: '-0.03em' }}>
              500+ Products · <span style={{ color: C.amber, fontWeight: 400, fontStyle: 'italic' }}>Six Families</span>
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed lg:max-w-xs" style={{ color: C.bodyLight }}>
            From precision downlights to IK10-rated street luminaires — engineered to the highest international standards.
          </p>
        </motion.div>
      </div>

      {/* ── Main layout: sidebar | list | image ── */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 520 }}>

        {/* LEFT — category selector (compact) */}
        <div className="flex-shrink-0 lg:w-60 flex flex-col"
          style={{ borderRight: `1px solid ${C.inkBorder}`, background: C.inkCard }}>

          {/* Mobile horizontal scroll */}
          <div className="flex lg:hidden overflow-x-auto hide-scrollbar"
            style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            {PRODUCT_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveId(cat.id)}
                className="flex-shrink-0 px-5 py-3 font-label text-[8px] tracking-[0.16em] uppercase transition-all"
                style={{
                  color: cat.id === activeId ? C.bodyDark : C.bodyMid,
                  borderBottom: cat.id === activeId ? `2px solid ${C.amber}` : '2px solid transparent',
                  background: cat.id === activeId ? C.inkMuted : 'transparent',
                }}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Desktop: compact vertical list */}
          <nav className="hidden lg:flex flex-col flex-1">
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const active_ = cat.id === activeId
              return (
                <motion.button key={cat.id}
                  initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                  onClick={() => setActiveId(cat.id)}
                  className="group relative flex items-center justify-between px-5 py-3.5 text-left transition-all"
                  style={{
                    background: active_ ? C.inkMuted : 'transparent',
                    borderBottom: `1px solid ${C.inkBorder}`,
                  }}>
                  {active_ && (
                    <motion.div layoutId="prod-active-bar"
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{ background: C.amber }} />
                  )}
                  <div className="flex items-center gap-3">
                    <span className="font-label text-[7px] tracking-[0.18em] w-3.5 shrink-0"
                      style={{ color: active_ ? C.amber : C.bodyLight }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans font-medium text-[13px] leading-snug"
                      style={{ color: active_ ? C.bodyDark : C.bodyMid }}>
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-label text-[8px] shrink-0 ml-2"
                    style={{ color: active_ ? C.amber : C.bodyLight }}>
                    {cat.count}
                  </span>
                </motion.button>
              )
            })}
          </nav>

          {/* Spec badges */}
          <div className="hidden lg:flex flex-col mt-auto"
            style={{ borderTop: `1px solid ${C.inkBorder}` }}>
            {[{ v: 'IP67', l: 'Weatherproof' }, { v: 'IK10', l: 'Impact Rated' }, { v: 'DALI-2', l: 'Smart Ready' }].map((s, i) => (
              <div key={s.v} className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: i < 2 ? `1px solid ${C.inkBorder}` : 'none' }}>
                <span className="font-label text-[7px] tracking-[0.14em] uppercase" style={{ color: C.bodyLight }}>{s.l}</span>
                <span className="font-sans font-semibold text-[11px]" style={{ color: C.bodyDark }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE — product list */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={activeId}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="flex-1 flex flex-col h-full">

              {/* List header */}
              <div className="flex items-center justify-between px-6 py-3"
                style={{ borderBottom: `1px solid ${C.inkBorder}`, background: C.inkCard }}>
                <span className="font-label text-[8px] tracking-[0.22em] uppercase" style={{ color: C.bodyMid }}>
                  {active.name}
                </span>
                <span className="font-label text-[7px]" style={{ color: C.bodyLight }}>
                  {active.sub.length} ranges · {active.count} products
                </span>
              </div>

              {/* Compact rows */}
              <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ background: C.ink }}>
                {active.sub.map((sub, si) => {
                  const subSlug = sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return (
                    <Link
                      key={sub.name}
                      href={`/products/${active.id}/${subSlug}`}
                      className="group flex items-center gap-3 px-6 py-3 cursor-pointer transition-all block"
                      style={{ borderBottom: `1px solid ${C.inkBorder}` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.inkCard }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      <span className="font-label text-[7px] tracking-[0.14em] w-3.5 shrink-0"
                        style={{ color: C.bodyLight }}>
                        {String(si + 1).padStart(2, '0')}
                      </span>
                      <div className="w-0.5 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: C.amber }} />
                      <div className="flex-1 min-w-0">
                        <span className="font-sans text-[13px] leading-none block group-hover:text-[#C9944A] transition-colors"
                          style={{ color: C.bodyMid }}>
                          {sub.name}
                        </span>
                        <span className="font-label text-[7px] tracking-[0.08em] block mt-1"
                          style={{ color: C.bodyLight }}>
                          {sub.spec}
                        </span>
                      </div>
                      <span className="font-sans text-[11px] font-medium shrink-0"
                        style={{ color: C.bodyLight }}>{sub.count}</span>
                      <ChevronRight size={10} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: C.amber }} />
                    </Link>
                  );
                })}
              </div>

              {/* Footer CTAs */}
              <div className="flex items-center gap-3 px-6 py-3.5"
                style={{ borderTop: `1px solid ${C.inkBorder}`, background: C.inkCard }}>
                <Link
                  href={`/products/${active.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-opacity hover:opacity-85"
                  style={{ background: C.amber, color: '#fff' }}>
                  View All {active.name} <ArrowRight size={8} />
                </Link>
                <a href="#downloads"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-opacity hover:opacity-75"
                  style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyMid }}>
                  <Download size={8} /> Catalogue
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — hero image panel */}
        <AnimatePresence mode="wait">
          <motion.div key={activeId + '-img'}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative hidden lg:block flex-shrink-0 lg:w-[340px] overflow-hidden"
            style={{ borderLeft: `1px solid ${C.inkBorder}` }}>
            <img
              src={img(active.image, 680, 900)}
              alt={active.name}
              className="w-full h-full object-cover absolute inset-0"
              style={{ opacity: 0.75 }}
            />
            {/* Gradient: dark on left edge only */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(11,11,11,0.72) 0%, rgba(11,11,11,0.08) 40%, rgba(11,11,11,0.22) 100%)' }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.82) 0%, transparent 50%)' }} />

            {/* Giant watermark number */}
            <div className="absolute top-6 right-4 select-none pointer-events-none">
              <span className="font-serif font-bold"
                style={{ fontSize: '7rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                {String(PRODUCT_CATEGORIES.findIndex(c => c.id === activeId) + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Category info at bottom */}
            <Link
              href={`/products/${active.id}`}
              className="absolute bottom-0 left-0 right-0 p-5 group/card cursor-pointer block z-10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-3 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[7px] tracking-[0.26em] uppercase" style={{ color: C.amber }}>
                  {String(PRODUCT_CATEGORIES.findIndex(c => c.id === activeId) + 1).padStart(2, '0')} / 06
                </span>
              </div>
              <h3 className="font-serif font-semibold leading-tight mb-1.5 group-hover/card:text-[#C9944A] transition-colors"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: '#fff', letterSpacing: '-0.02em' }}>
                {active.name}
              </h3>
              <p className="font-label text-[7px] tracking-[0.12em] flex items-center justify-between"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span>{active.count} Products · {active.sub.length} Ranges</span>
                <span className="text-[#B5722A] font-semibold flex items-center gap-1 group-hover/card:underline">Showroom →</span>
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

// ─── GLOBAL IMPACT ────────────────────────────────────────────────────────────
function ImpactStat({ value, suffix, label, desc, index, sectionInView }: {
  icon: React.ElementType, value: number, suffix: string, label: string, desc: string,
  index: number, sectionInView: boolean
}) {
  const count = useCountUp(value, 1800, sectionInView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-between px-8 py-7"
      style={{ borderRight: index < 2 ? `1px solid ${C.inkBorder}` : 'none' }}>
      <span className="font-label text-[7px] tracking-[0.28em] uppercase mb-6 block"
        style={{ color: C.bodyLight }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <div className="font-serif font-medium tabular-nums leading-none mb-3"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', color: C.bodyDark, letterSpacing: '-0.04em' }}>
          {count.toLocaleString()}{suffix}
        </div>
        <div className="font-sans font-medium text-sm mb-3" style={{ color: C.bodyDark }}>
          {label}
        </div>
        <div className="w-8 h-px mb-4" style={{ background: C.amber }} />
        <p className="text-xs leading-relaxed" style={{ color: C.bodyMid, maxWidth: 220 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}


// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const ABOUT_CHAPTERS = [
  {
    id: 'intro',
    label: 'Our Story',
    image: '1497366216548-37526070297c',
    eyebrow: 'About ZiVIO LIFE',
    headline: 'A Distinguished\nGlobal Leader in\nArchitectural Lighting.',
    body: 'ZIVIO Life by Artize is a distinguished global leader in architectural outdoor lighting, renowned for our expertise in designing, manufacturing, and delivering high-quality luminaires that professionals trust worldwide. Our commitment to excellence and innovation positions us at the forefront of the lighting industry.',
    stats: [{ v: '1000+', l: 'Projects Delivered' }, { v: '15+', l: 'Countries' }, { v: '12+', l: 'Years of Excellence' }],
    highlights: [
      { title: 'Design', desc: 'In-house design studio combining aesthetic vision with engineering precision.' },
      { title: 'Manufacture', desc: 'State-of-the-art production in India, certified to global standards.' },
      { title: 'Deliver', desc: 'Reliable logistics network spanning 68 countries and growing.' },
    ],
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    image: '1518770660439-4636190af475',
    eyebrow: 'Our Philosophy',
    headline: 'Lighting That\nEnhances Lives and\nProtects the Planet.',
    body: 'At ZIVIO, we believe that exceptional lighting should not only enhance the lives of individuals but also protect the planet. This guiding principle drives our pursuit of ethical and environmentally sustainable practices. We are dedicated to preserving natural resources, developing human-centric lighting solutions, and ensuring that future generations inherit a brighter, more sustainable world.',
    stats: [{ v: 'Human', l: 'Centric Design' }, { v: 'Planet', l: 'First Approach' }, { v: 'Future', l: 'Generations' }],
    highlights: [
      { title: 'Preserve Natural Resources', desc: 'Every product decision is weighed against its environmental footprint — from materials sourcing to end-of-life recycling pathways.' },
      { title: 'Human-Centric Solutions', desc: 'We design light for people — studying circadian biology, visual comfort, and psychological wellbeing to create environments that support human flourishing.' },
      { title: 'Intergenerational Responsibility', desc: 'We are stewards of a brighter future. Our actions today are measured against the world we leave for those who come after us.' },
    ],
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    image: '1466611653911-0265b1d8b993',
    eyebrow: 'Commitment to Sustainability',
    headline: 'Carbon-Neutral.\nCommunity-First.\nGlobally Responsible.',
    body: 'Our dedication extends beyond sustainability; we actively promote workplace equality, support local communities, and strive for carbon-neutral manufacturing. ZIVIO is your global partner in lighting solutions, offering flexibility, competitiveness, and a commitment to innovation and responsibility in every project.',
    stats: [{ v: 'Carbon', l: 'Neutral Target' }, { v: 'ISO', l: '9001 Certified' }, { v: '100%', l: 'Equality Driven' }],
    highlights: [
      { title: 'Carbon-Neutral Manufacturing', desc: 'A clear roadmap to net-zero by 2030 — through renewable energy procurement, process efficiency, and verified carbon offsets for residual emissions.' },
      { title: 'Workplace Equality', desc: 'Equal pay, inclusive hiring, and progressive parental policies across all ZiVIO operations globally. Diversity is a business strength, not a compliance checkbox.' },
      { title: 'Community Investment', desc: 'We fund STEM education, lighting apprenticeships, and local infrastructure programmes in the communities surrounding our manufacturing facilities.' },
    ],
  },
  {
    id: 'vision',
    label: 'Vision',
    image: '1585349781000-d086e113b2a2',
    eyebrow: 'Our Vision',
    headline: 'An International\nCommunity Advancing\nLighting Culture.',
    body: 'ZIVIO by Artize is more than just a production center; it is an international community dedicated to advancing architectural lighting culture. As a hub of innovation and excellence, we are committed to the study, design, and mastery of lighting in all its forms.',
    stats: [{ v: 'Study', l: 'Research First' }, { v: 'Design', l: 'Mastery' }, { v: 'Lead', l: 'Global Culture' }],
    highlights: [
      { title: 'A Hub of Innovation', desc: 'Our R&D centre is open to collaboration — with universities, lighting designers, architects, and artists — because the best ideas come from unexpected conversations.' },
      { title: 'Advancing the Discipline', desc: 'We publish research, host symposia, and mentor the next generation of lighting designers. Our vision is an industry elevated, not just a business grown.' },
      { title: 'Mastery in All Forms', desc: 'From micro-precision optics to city-scale infrastructure, ZiVIO pursues mastery across every scale of the built environment that light touches.' },
    ],
  },
  {
    id: 'values',
    label: 'Core Values',
    image: '1558618666-fcd25c85cd64',
    eyebrow: 'Core Values',
    headline: 'Five Principles.\nOne Purpose.',
    body: 'These are not aspirations on a wall. They are the operating principles by which every decision at ZiVIO is made — from how we design a luminaire to how we treat a partner.',
    stats: [{ v: '5', l: 'Core Principles' }, { v: '1', l: 'Shared Purpose' }, { v: '∞', l: 'Long-Term Thinking' }],
    values: [
      { name: 'Imagination', desc: 'We thrive on curiosity and creativity, fueling our passion for research and innovation. Our entrepreneurial spirit drives us to push the boundaries of lighting technology, enhancing our impact on the evolution of the industry.' },
      { name: 'Beauty', desc: 'At ZIVIO, we channel our resources into enhancing the world\'s beauty through thoughtful actions and intelligent lighting solutions. With passion, precision, and a commitment to continuous improvement, we create experiences that inspire wonder and delight.' },
      { name: 'Inclusivity', desc: 'We respect and embrace local customs and cultures, contributing to the global community. Our strong relationships and diverse network transform diversity into a powerful source of growth and innovation.' },
      { name: 'People First', desc: 'Our mission is to create a positive impact on people, communities, and the environment. We value empathy, growth, and collaboration as the cornerstones of every endeavor.' },
      { name: 'Authenticity', desc: 'Authenticity is at the heart of our approach. We act with honesty, uphold our commitments, and remain true to our values, fostering trust and integrity in all our interactions.' },
    ],
  },
  {
    id: 'closing',
    label: 'Join Us',
    image: '1509391366360-2e959784a276',
    eyebrow: 'Illuminating the World',
    headline: 'Join Us on Our\nJourney to a Brighter,\nMore Sustainable Future.',
    body: 'ZIVIO Life by Artize is dedicated to illuminating the world responsibly and beautifully. As we continue to expand our global footprint, our mission remains the same: to create world-class architectural lighting in India that creates lasting value for communities, partners, and the planet around the world.',
    stats: [{ v: '15+', l: 'Countries' }, { v: '15+', l: 'Export Markets' }, { v: '2030', l: 'Carbon-Neutral Goal' }],
    highlights: [
      { title: 'Partner With Us', desc: 'We welcome specification partnerships with architects, lighting designers, contractors, and distributors who share our commitment to excellence.' },
      { title: 'Careers at ZiVIO', desc: 'We are always looking for exceptional people who want to contribute to the future of architectural lighting. View open positions at our India and global offices.' },
      { title: 'Contact Our Team', desc: 'Reach our regional offices in Mumbai, Dubai, London, and New York for project consultation, product specification, and technical support.' },
    ],
    joinCtas: [
      { label: 'Get a Quote', href: '#contact' },
      { label: 'View Projects', href: '#projects' },
      { label: 'Company Profile PDF', href: '/zivio-company-profile.pdf', download: true },
    ],
  },
]

function AboutPage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [chapter, setChapter] = useState(0)
  const [dir, setDir] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)

  const go = (next: number) => {
    setDir(next > chapter ? 1 : -1)
    setChapter(next)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!open) { setChapter(0); return }
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(Math.min(chapter + 1, ABOUT_CHAPTERS.length - 1))
      if (e.key === 'ArrowLeft') go(Math.max(chapter - 1, 0))
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, chapter])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const ch = ABOUT_CHAPTERS[chapter]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="about-overlay"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[300] flex"
          style={{ background: C.ink }}>

          {/* ════════════════════════════════════════
              LEFT RAIL — vertical chapter navigation
              ════════════════════════════════════════ */}
          <div className="hidden lg:flex flex-col flex-shrink-0 relative"
            style={{ width: 240, borderRight: `1px solid ${C.inkBorder}`, background: C.inkCard }}>

            {/* Logo */}
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
              <div className="flex items-center gap-2.5">
                <div className="w-0.5 h-6" style={{ background: C.amber }} />
                <div>
                  <div className="font-sans font-black" style={{ fontSize: 14, color: C.bodyDark, letterSpacing: '-0.02em' }}>ZiVIO</div>
                  <div className="font-sans font-bold" style={{ fontSize: 6, letterSpacing: '0.24em', color: C.amber }}>LIFE</div>
                </div>
              </div>
            </div>

            {/* Chapter list */}
            <nav className="flex-1 flex flex-col py-4">
              {ABOUT_CHAPTERS.map((c, i) => {
                const active = i === chapter
                const done = i < chapter
                return (
                  <button key={c.id} onClick={() => go(i)}
                    className="group relative flex items-center gap-4 px-8 py-4 text-left transition-all duration-200"
                    style={{ background: active ? `${C.amber}10` : 'transparent' }}>
                    {/* Active indicator bar */}
                    {active && (
                      <motion.div layoutId="about-rail-bar"
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{ background: C.amber }} />
                    )}
                    {/* Step dot */}
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
                      style={{
                        border: `1px solid ${active ? C.amber : done ? C.amber : C.inkBorder}`,
                        background: done ? C.amber : 'transparent',
                      }}>
                      {done
                        ? <div className="w-1.5 h-1 border-b border-r border-white" style={{ transform: 'rotate(45deg) translate(-1px,-1px)' }} />
                        : <span className="font-label text-[7px]" style={{ color: active ? C.amber : C.bodyLight }}>{i + 1}</span>
                      }
                    </div>
                    <span className="font-label text-[9px] tracking-[0.16em] uppercase transition-colors"
                      style={{ color: active ? C.bodyDark : done ? C.bodyMid : C.bodyLight }}>
                      {c.label}
                    </span>
                  </button>
                )
              })}
            </nav>

            {/* Close at bottom */}
            <button onClick={onClose}
              className="flex items-center gap-3 px-8 py-6 transition-opacity hover:opacity-60"
              style={{ borderTop: `1px solid ${C.inkBorder}` }}>
              <X size={12} style={{ color: C.bodyLight }} />
              <span className="font-label text-[9px] tracking-[0.2em] uppercase" style={{ color: C.bodyLight }}>Close</span>
            </button>
          </div>

          {/* ════════════════════════════════════════
              MAIN CONTENT AREA
              ════════════════════════════════════════ */}
          <div ref={contentRef} className="flex-1 overflow-y-auto flex flex-col">

            {/* Mobile top bar */}
            <div className="flex lg:hidden items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-5" style={{ background: C.amber }} />
                <span className="font-sans font-black text-sm" style={{ color: C.bodyDark }}>ZiVIO</span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
                {ABOUT_CHAPTERS.map((c, i) => (
                  <button key={c.id} onClick={() => go(i)}
                    className="flex-shrink-0 font-label text-[8px] tracking-[0.14em] uppercase"
                    style={{ color: i === chapter ? C.amber : C.bodyLight }}>
                    {c.label}
                  </button>
                ))}
              </div>
              <button onClick={onClose}><X size={14} style={{ color: C.bodyMid }} /></button>
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={ch.id} custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 48 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -48 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col flex-1">

                {/* ── HERO BAND: full-width image + headline overlay ── */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ height: '52vh', minHeight: 320 }}>
                  <img
                    src={`https://images.unsplash.com/photo-${ch.image}?w=1600&h=900&fit=crop&auto=format`}
                    alt={ch.label}
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.65 }}
                  />
                  {/* Dark gradient bottom */}
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${C.ink} 0%, ${C.ink}99 25%, transparent 60%)` }} />
                  {/* Eyebrow + chapter counter — top left */}
                  <div className="absolute top-8 left-8 flex items-center gap-3">
                    <div className="w-5 h-px" style={{ background: C.amber }} />
                    <span className="font-label text-[8px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>{ch.eyebrow}</span>
                  </div>
                  <div className="absolute top-8 right-8">
                    <span className="font-label text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {String(chapter + 1).padStart(2, '0')} / {String(ABOUT_CHAPTERS.length).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Watermark number */}
                  <div className="absolute bottom-0 right-6 select-none pointer-events-none">
                    <span className="font-serif font-bold"
                      style={{ fontSize: 'clamp(7rem, 16vw, 14rem)', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>
                      {String(chapter + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Headline overlaid at bottom */}
                  <div className="absolute bottom-10 left-8 right-8 lg:right-16">
                    <h2 className="font-serif font-medium whitespace-pre-line"
                      style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.6rem)', color: C.bodyDark, letterSpacing: '-0.03em', lineHeight: 0.9 }}>
                      {ch.headline}
                    </h2>
                  </div>
                </div>

                {/* ── CONTENT BAND ── */}
                <div className="flex-1 px-8 lg:px-14 py-12">

                  {/* Body + Stats — two columns */}
                  <div className="grid lg:grid-cols-[1fr_auto] gap-10 mb-12 items-start">
                    <p className="text-sm leading-loose" style={{ color: C.bodyMid, maxWidth: 580 }}>{ch.body}</p>

                    {'stats' in ch && ch.stats && (
                      <div className="flex flex-col gap-0 flex-shrink-0"
                        style={{ border: `1px solid ${C.inkBorder}`, minWidth: 220 }}>
                        {ch.stats.map((s: { v: string; l: string }, i: number) => (
                          <div key={s.l} className="flex items-center gap-5 px-6 py-4"
                            style={{ borderBottom: i < ch.stats!.length - 1 ? `1px solid ${C.inkBorder}` : 'none' }}>
                            <span className="font-serif font-semibold flex-shrink-0"
                              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', color: C.bodyDark, letterSpacing: '-0.02em', minWidth: 52 }}>{s.v}</span>
                            <span className="font-label text-[8px] tracking-[0.18em] uppercase" style={{ color: C.bodyMid }}>{s.l}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights — 3-column editorial cards */}
                  {'highlights' in ch && ch.highlights && (
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-10"
                      style={{ border: `1px solid ${C.inkBorder}` }}>
                      {ch.highlights.map((h: { title: string; desc: string }, i: number) => (
                        <motion.div key={h.title}
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.12 + i * 0.09 }}
                          className="px-7 py-8"
                          style={{ borderRight: i < ch.highlights!.length - 1 ? `1px solid ${C.inkBorder}` : 'none' }}>
                          <div className="flex items-center gap-3 mb-5">
                            <span className="font-label text-[8px] tracking-[0.22em] uppercase"
                              style={{ color: C.amber }}>— {String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <h4 className="font-serif font-medium text-base mb-3 leading-snug"
                            style={{ color: C.bodyDark, letterSpacing: '-0.015em' }}>{h.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: C.bodyMid }}>{h.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Core Values — 2×3 grid */}
                  {'values' in ch && ch.values && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px mb-10"
                      style={{ background: C.inkBorder }}>
                      {ch.values.map((v: { name: string; desc: string }, i: number) => (
                        <motion.div key={v.name}
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                          className="px-7 py-8 flex flex-col gap-3"
                          style={{ background: C.inkCard }}>
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.amber }} />
                            <span className="font-serif font-medium text-sm" style={{ color: C.bodyDark }}>{v.name}</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: C.bodyMid, paddingLeft: '1.125rem' }}>{v.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Join Us CTA row */}
                  {'joinCtas' in ch && ch.joinCtas && (
                    <div className="flex flex-wrap gap-3 mb-10">
                      {ch.joinCtas.map((cta: { label: string; href: string; download?: boolean }, i: number) => (
                        <a key={cta.label} href={cta.href}
                          download={cta.download ? 'ZiVIO-LIFE-Company-Profile.pdf' : undefined}
                          onClick={cta.download ? undefined : onClose}
                          className="inline-flex items-center gap-2 px-6 py-3 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
                          style={{
                            background: i === 0 ? C.amber : 'transparent',
                            color: i === 0 ? '#fff' : C.bodyMid,
                            border: i === 0 ? 'none' : `1px solid ${C.inkBorder}`,
                          }}>
                          {cta.label}
                          {cta.download ? <Download size={9} /> : <ChevronRight size={9} />}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* ── BOTTOM NAV ── */}
                  <div className="flex items-center gap-4 pt-8"
                    style={{ borderTop: `1px solid ${C.inkBorder}` }}>
                    <button onClick={() => go(Math.max(chapter - 1, 0))} disabled={chapter === 0}
                      className="flex items-center gap-2 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity disabled:opacity-20 hover:opacity-60"
                      style={{ color: C.bodyMid }}>
                      <ChevronLeft size={11} /> Prev
                    </button>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5 mx-4">
                      {ABOUT_CHAPTERS.map((_, i) => (
                        <button key={i} onClick={() => go(i)}
                          style={{
                            width: i === chapter ? 22 : 5, height: 5, borderRadius: 3,
                            background: i < chapter ? C.amber : i === chapter ? C.amber : C.inkBorder,
                            transition: 'all 0.35s',
                          }} />
                      ))}
                    </div>

                    <button
                      onClick={() => chapter < ABOUT_CHAPTERS.length - 1 ? go(chapter + 1) : onClose()}
                      className="flex items-center gap-2 px-6 py-3 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-85 ml-auto"
                      style={{ background: C.amber, color: '#fff' }}>
                      {chapter < ABOUT_CHAPTERS.length - 1 ? (
                        <>{ABOUT_CHAPTERS[chapter + 1].label} <ChevronRight size={9} /></>
                      ) : (
                        <>Back to Site <ChevronRight size={9} /></>
                      )}
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── STORY DATA ───────────────────────────────────────────────────────────────
const STORIES = [
  {
    id: 'manufacturing',
    icon: Globe,
    title: 'Global Manufacturing',
    tagline: 'State-of-the-art facilities in India with export to 68 countries.',
    image: '1581091226825-a6a2a5aee158',
    chapter: '01',
    headline: 'Built in India.\nTrusted Worldwide.',
    body: [
      'Our manufacturing journey is driven by innovation, precision, and an unwavering commitment to quality. With state-of-the-art production facilities in India, we combine advanced technology, skilled craftsmanship, and rigorous quality standards to deliver products that meet global expectations.',
      'Every stage of our manufacturing process is carefully monitored—from sourcing premium raw materials to precision engineering and final quality inspection—ensuring consistency, durability, and performance in every product we produce.',
      'Today, our products proudly reach customers across 15+ countries, serving diverse industries with reliable manufacturing solutions.',
    ],
    stats: [{ v: '15+', l: 'Countries Served' }, { v: '15+', l: 'Export Markets' }, { v: '100%', l: 'Quality Inspected' }],
    cta: 'Explore Our Facilities',
  },
  {
    id: 'quality',
    icon: Award,
    title: 'Premium Quality',
    tagline: 'IP, IK, LM79 and LM80 tested. ISO 9001 certified production.',
    image: '1485827404703-89b55fcc595e',
    chapter: '02',
    headline: 'Zero Compromise\non Standards.',
    body: [
      'Every ZiVIO product undergoes rigorous multi-stage testing against international benchmarks. Our IP65, IP66, and IP67 rated housings ensure protection in the harshest outdoor environments — from coastal salt spray to desert heat.',
      'We are ISO 9001:2015 certified with LM79 photometric testing and LM80 lumen maintenance data for every LED module. IK08 and IK10 impact ratings guarantee structural resilience in high-traffic public spaces.',
      'Our quality assurance team conducts independent verification at every production milestone, ensuring that what leaves our facility exceeds what was promised.',
    ],
    stats: [{ v: 'ISO 9001', l: 'Certified' }, { v: 'IP67', l: 'Max Rating' }, { v: 'LM80', l: 'Tested' }],
    cta: 'View Certifications',
  },
  {
    id: 'engineering',
    icon: Cpu,
    title: 'Innovative Engineering',
    tagline: 'In-house R&D developing next-generation LED and smart systems.',
    image: '1518770660439-4636190af475',
    chapter: '03',
    headline: 'Engineering the\nNext Generation.',
    body: [
      'Our in-house R&D centre is staffed by a dedicated team of optical engineers, thermal specialists, and embedded systems developers. We design from first principles — optics, thermal pathways, electronics, and mechanics are all engineered together.',
      'Our proprietary lens designs achieve precise beam distributions for architectural, street, and landscape applications. Our thermal management systems deliver L90 lumen maintenance at 50,000+ hours — significantly exceeding industry standards.',
      'Smart-ready from the core: every product platform is designed for DALI-2, DMX 512, and IoT integration without afterthought adapters or third-party modules.',
    ],
    stats: [{ v: 'L90', l: 'Lumen Maintenance' }, { v: '50k+', l: 'Hours Lifespan' }, { v: 'DALI-2', l: 'Native Protocol' }],
    cta: 'Explore Technology',
  },
  {
    id: 'design',
    icon: Shield,
    title: 'Custom Design',
    tagline: 'Bespoke lighting tailored to your architectural vision.',
    image: '1618005182384-a83a8bd57fbe',
    chapter: '04',
    headline: 'Your Vision.\nPrecisely Realised.',
    body: [
      'Architecture demands lighting that disappears into the design when off, and elevates it when illuminated. ZiVIO\'s custom design service begins at concept stage — working alongside architects, lighting designers, and project managers to develop bespoke solutions.',
      'From custom RAL finishes and unique form factors to proprietary beam distributions tuned for specific architectural geometry, our team produces solutions that are unachievable off the shelf.',
      'Minimum order quantities are kept low to serve boutique projects and flagship installations alike, with lead times and delivery schedules built to fit your programme.',
    ],
    stats: [{ v: '200+', l: 'Custom Projects' }, { v: 'RAL', l: 'Any Colour' }, { v: '8 wk', l: 'Avg. Lead Time' }],
    cta: 'Start a Project',
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'High Performance',
    tagline: 'L90 maintenance, CRI >90, 5–10 year product warranties.',
    image: '1497366216548-37526070297c',
    chapter: '05',
    headline: 'Performance That\nOutlasts Expectations.',
    body: [
      'Architectural lighting investments are long-term commitments. ZiVIO products are engineered to perform to specification for the life of the installation — not just the warranty period.',
      'Our LED modules carry CRI >90 across all colour temperatures, with R9 values above 50 for faithful colour rendering in hospitality and retail environments. Colour consistency is maintained within 3-step MacAdam ellipses across batches.',
      'Backed by 5 to 10 year product warranties across our range, with an extended service programme available for infrastructure and public realm installations.',
    ],
    stats: [{ v: 'CRI >90', l: 'Colour Quality' }, { v: '10yr', l: 'Max Warranty' }, { v: '<3 SDCM', l: 'Colour Consistency' }],
    cta: 'See Full Specs',
  },
  {
    id: 'support',
    icon: CheckCircle,
    title: 'Worldwide Support',
    tagline: 'Teams in Mumbai, Dubai, London and New York.',
    image: '1529156069898-4a0d0f939537',
    chapter: '06',
    headline: 'Global Reach.\nLocal Expertise.',
    body: [
      'A lighting project does not end at delivery. ZiVIO\'s global support network is structured to provide technical assistance, commissioning support, and after-sales service wherever your project is located.',
      'Our regional offices in Mumbai, Dubai, London, and New York provide local-language technical consultation, site visits, and spares management. Our 24-hour technical helpline is staffed by qualified engineers, not call-centre scripts.',
      'For major infrastructure projects, we offer dedicated project support officers who remain with the project from specification through commissioning and beyond.',
    ],
    stats: [{ v: '4', l: 'Regional Offices' }, { v: '24/7', l: 'Technical Support' }, { v: '15+', l: 'Countries Covered' }],
    cta: 'Find Your Office',
  },
]

function WhyZivio() {
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [storyProgress, setStoryProgress] = useState(0)
  useEffect(() => {
    if (activeStory === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStory(null)
      if (e.key === 'ArrowRight') setActiveStory(i => i !== null ? Math.min(i + 1, STORIES.length - 1) : null)
      if (e.key === 'ArrowLeft') setActiveStory(i => i !== null ? Math.max(i - 1, 0) : null)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [activeStory])
  useEffect(() => {
    document.body.style.overflow = activeStory !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeStory])

  // Progress bar animation
  useEffect(() => {
    if (activeStory === null) { setStoryProgress(0); return }
    setStoryProgress(0)
    const t = setTimeout(() => setStoryProgress(100), 50)
    return () => clearTimeout(t)
  }, [activeStory])

  const story = activeStory !== null ? STORIES[activeStory] : null
  // keep overlay render but hide the main section content — we only render the overlay now
  return (
    <AnimatePresence>
      {activeStory !== null && story && (
        <motion.div key="story-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex" style={{ background: C.ink }}>
          <div className="absolute top-0 inset-x-0 flex gap-1 px-6 pt-6 z-20">
            {STORIES.map((_, i) => (
              <div key={i} className="flex-1 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <div className="h-full" style={{ background: C.amber, width: i < activeStory ? '100%' : i === activeStory ? `${storyProgress}%` : '0%', transition: i === activeStory ? 'width 8s linear' : 'none' }} />
              </div>
            ))}
          </div>
          <div className="hidden lg:block relative w-[42%] flex-shrink-0 overflow-hidden" style={{ background: C.inkCard }}>
            <img src={`https://images.unsplash.com/photo-${story.image}?w=900&h=1200&fit=crop&auto=format`} alt={story.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ink} 100%), linear-gradient(to top, ${C.ink}99 0%, transparent 40%)` }} />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-8 lg:px-12 pt-16 pb-8 flex-shrink-0">
              <div className="flex items-center gap-3"><div className="w-5 h-px" style={{ background: C.amber }} /><span className="font-label text-[9px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>ZiVIO Technology</span></div>
              <button onClick={() => setActiveStory(null)} className="flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-60" style={{ border: `1px solid ${C.inkBorder}` }}><X size={14} style={{ color: C.bodyMid }} /></button>
            </div>
            <motion.div key={`content-${story.id}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1 px-8 lg:px-12 pb-12">
              <div className="mb-8">
                {(() => { const Icon = story.icon; return <Icon size={20} style={{ color: C.amber }} className="mb-5" /> })()}
                <h2 className="font-serif font-medium leading-[0.9] mb-4 whitespace-pre-line" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: C.bodyDark, letterSpacing: '-0.025em' }}>{story.headline}</h2>
                <p className="text-sm" style={{ color: C.bodyMid }}>{story.tagline}</p>
              </div>
              <div className="grid grid-cols-3 mb-10" style={{ border: `1px solid ${C.inkBorder}` }}>
                {story.stats.map((st, i) => (
                  <div key={st.l} className="flex flex-col items-center justify-center py-6 text-center" style={{ borderRight: i < story.stats.length - 1 ? `1px solid ${C.inkBorder}` : 'none' }}>
                    <span className="font-serif font-semibold mb-1" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: C.bodyDark, letterSpacing: '-0.03em' }}>{st.v}</span>
                    <span className="font-label text-[8px] tracking-[0.2em] uppercase" style={{ color: C.bodyMid }}>{st.l}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5 mb-12">{story.body.map((p, i) => <p key={i} className="text-sm leading-loose" style={{ color: i === 0 ? C.bodyMid : C.bodyLight }}>{p}</p>)}</div>
              <a href="#contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 font-label text-[10px] tracking-[0.14em] uppercase font-medium transition-opacity hover:opacity-85" style={{ background: C.amber, color: '#fff' }}>{story.cta} <ArrowRight size={10} /></a>
            </motion.div>
            <div className="flex items-center justify-between px-8 lg:px-12 py-8 flex-shrink-0" style={{ borderTop: `1px solid ${C.inkBorder}` }}>
              <button onClick={() => setActiveStory(i => i !== null && i > 0 ? i - 1 : i)} disabled={activeStory === 0} className="flex items-center gap-2.5 font-label text-[9px] tracking-[0.18em] uppercase transition-opacity disabled:opacity-20 hover:opacity-70"><ChevronLeft size={12} style={{ color: C.bodyMid }} /><span style={{ color: C.bodyMid }}>Previous</span></button>
              <div className="flex items-center gap-2">{STORIES.map((_, i) => <button key={i} onClick={() => setActiveStory(i)} className="transition-all duration-300" style={{ width: i === activeStory ? 20 : 4, height: 4, borderRadius: 2, background: i === activeStory ? C.amber : C.inkBorder }} />)}</div>
              <button onClick={() => setActiveStory(i => i !== null && i < STORIES.length - 1 ? i + 1 : i)} disabled={activeStory === STORIES.length - 1} className="flex items-center gap-2.5 font-label text-[9px] tracking-[0.18em] uppercase transition-opacity disabled:opacity-20 hover:opacity-70"><span style={{ color: C.bodyMid }}>Next</span><ChevronRight size={12} style={{ color: C.bodyMid }} /></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── WARM TECHNOLOGY ──────────────────────────────────────────────────────────
const TECH_SCENES = [
  { id: 'invisible', label: 'Invisible Source', desc: 'The light that allows you to see without being seen, creating a dramatic scenario perfectly integrated into the architectural project.', image: '1558618666-fcd25c85cd64' },
  { id: 'spacious', label: 'Spaciousness', desc: 'The art of giving depth and breadth to spaces, where light and balance merge into a perceptual comfort.', image: '1563973153236-794eef98609f' },
  { id: 'grazing', label: 'Wall Grazing', desc: 'The Wall Grazing effect gives voice to the material: each surface lights up with details, shadows and reflections that tell the story of the space.', image: '1582203423341-64b918240e25' },
]

function Technology() {
  const [activeScene, setActiveScene] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="technology" style={{ background: C.ink }}>
      <div style={{ borderTop: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1400px] mx-auto">

          {/* ── Header ── */}
          <div className="px-8 lg:px-14 py-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[9px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Warm Technology</span>
              </div>
              <h2 className="font-serif font-medium leading-[0.9]"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: C.bodyDark, letterSpacing: '-0.03em' }}>
                Where Research Meets <em style={{ fontStyle: 'italic', fontWeight: 400, color: C.amber }}>Human Experience.</em>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:max-w-[400px] text-sm leading-relaxed" style={{ color: C.bodyMid }}>
              For over a decade we have been exploring the impact of light — transforming research into knowledge and into solutions that combine technology and well-being, design and social and environmental responsibility.
            </motion.p>
          </div>

          {/* ── Three pillars: Innovation · Optics · Service ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            {[
              {
                tag: 'The Heart of Innovation',
                title: 'R&D that drives\nevery luminaire.',
                body: 'We constantly invest in R&D to develop innovative solutions and dynamic systems that improve the relationship between people, architecture and spaces. At the service of those who design light, to improve the quality of life together.',
                stats: [{ v: '45+', l: 'Patents' }, { v: '7%', l: 'Turnover in R&D' }],
                image: '1573496359142-b8d87734a5a2',
              },
              {
                tag: 'In-House Optics',
                title: 'Precision engineered\nto 0.03 mm.',
                body: 'To achieve the always-perfect luminous effect, we design and produce innovative optics internally, thanks to meticulous laboratory work and cutting-edge technologies, evolving the potential of light every day.',
                stats: [{ v: '0.03mm', l: 'Micro End Mill' }, { v: 'CRI >92', l: 'Colour Accuracy' }],
                image: '1582203423341-64b918240e25',
              },
              {
                tag: 'At the Service of Design',
                title: 'The right light\nfor every project.',
                body: 'Our solutions allow lighting designers to find in us the right partner to realise their vision. Optics, reflectors, refractors, colours, visual comfort, accessories — everything to realise your lighting direction.',
                stats: [{ v: 'BIM', l: 'Objects Available' }, { v: 'IES/LDT', l: 'Libraries' }],
                image: '1497366754035-f200968a6435',
              },
            ].map((col, ci) => (
              <motion.div key={col.tag}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
                className="flex flex-col"
                style={{ borderRight: ci < 2 ? `1px solid ${C.inkBorder}` : 'none' }}>
                {/* Image */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
                  <img src={img(col.image, 600, 400)} alt={col.tag}
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.55 }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.85) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-5 left-5">
                    <span className="font-label text-[7px] tracking-[0.24em] uppercase" style={{ color: C.amber }}>{col.tag}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 px-7 py-7">
                  <h3 className="font-serif font-medium mb-4 leading-tight whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                    {col.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-6 flex-1" style={{ color: C.bodyMid }}>
                    {col.body}
                  </p>
                  <div className="flex items-center gap-0 pt-5" style={{ borderTop: `1px solid ${C.inkBorder}` }}>
                    {col.stats.map((s, si) => (
                      <div key={s.l} className="flex-1 flex flex-col gap-0.5"
                        style={{ borderRight: si < col.stats.length - 1 ? `1px solid ${C.inkBorder}` : 'none', paddingRight: si < col.stats.length - 1 ? 16 : 0, paddingLeft: si > 0 ? 16 : 0 }}>
                        <span className="font-serif font-medium" style={{ fontSize: '1.3rem', color: C.bodyDark, letterSpacing: '-0.02em' }}>{s.v}</span>
                        <span className="font-label text-[7px] tracking-[0.18em] uppercase" style={{ color: C.bodyLight }}>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Construction · Finishes row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            {[
              {
                label: 'Construction Details',
                title: 'Every detail speaks\ndesign language.',
                body: 'In our idea of lighting, there is attention to every detail — even those that go beyond optics. Joints, caps, screws respond not only to mechanical needs, but also aesthetic ones. Each luminaire must interact with its environment, enhancing it through a language made of details and design.',
                image: '1563973153236-794eef98609f',
              },
              {
                label: 'Finishes',
                title: 'Dozens of material\nand colour combinations.',
                body: 'Being able to choose the finishes and colours of the lighting fixtures is much more than a chromatic game: it is a way of expressing light within a project, making the fixture not only tech, but also warm. Choose from dozens of material and colour combinations.',
                image: '1584259097630-4d5cb684a0ec',
              },
            ].map((item, ii) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + ii * 0.1 }}
                className="flex gap-0"
                style={{ borderRight: ii === 0 ? `1px solid ${C.inkBorder}` : 'none' }}>
                {/* Mini image left */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ width: 140, background: C.inkCard }}>
                  <img src={img(item.image, 280, 400)} alt={item.label}
                    className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.6 }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 40%, rgba(11,11,11,0.4) 100%)' }} />
                </div>
                <div className="flex-1 px-7 py-8">
                  <span className="font-label text-[7px] tracking-[0.24em] uppercase mb-4 block" style={{ color: C.amber }}>{item.label}</span>
                  <h3 className="font-serif font-medium mb-3 leading-tight whitespace-pre-line"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', color: C.bodyDark, letterSpacing: '-0.015em' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.bodyMid }}>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Scenes of Light ── */}
          <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            <div className="px-8 lg:px-14 py-8 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[8px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Scenes of Light</span>
              </div>
              <span className="font-label text-[7px] tracking-[0.2em] uppercase" style={{ color: C.bodyLight }}>
                How to create your own lighting setups
              </span>
            </div>
            <div className="flex flex-col lg:flex-row">
              {/* Scene thumbnails */}
              <div className="flex flex-col lg:w-56 flex-shrink-0" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
                {TECH_SCENES.map((sc, si) => (
                  <button key={sc.id} onClick={() => setActiveScene(si)}
                    className="group flex items-center gap-3 px-6 py-4 text-left transition-all"
                    style={{
                      background: activeScene === si ? C.inkCard : 'transparent',
                      borderBottom: `1px solid ${C.inkBorder}`,
                      borderLeft: activeScene === si ? `2px solid ${C.amber}` : '2px solid transparent',
                    }}>
                    <span className="font-label text-[7px] tracking-[0.18em] shrink-0" style={{ color: activeScene === si ? C.amber : C.bodyLight }}>
                      {String(si + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[13px] leading-snug" style={{ color: activeScene === si ? C.bodyDark : C.bodyMid }}>
                      {sc.label}
                    </span>
                  </button>
                ))}
              </div>
              {/* Active scene */}
              <AnimatePresence mode="wait">
                <motion.div key={activeScene}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col lg:flex-row">
                  <div className="flex-1 px-8 lg:px-12 py-10 flex flex-col justify-center">
                    <h3 className="font-serif font-medium mb-4 leading-tight"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                      {TECH_SCENES[activeScene].label}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: C.bodyMid, maxWidth: 420 }}>
                      {TECH_SCENES[activeScene].desc}
                    </p>
                    <div className="w-6 h-px" style={{ background: C.amber }} />
                  </div>
                  <div className="relative hidden lg:block flex-shrink-0 lg:w-[360px] overflow-hidden">
                    <img src={img(TECH_SCENES[activeScene].image, 720, 540)} alt={TECH_SCENES[activeScene].label}
                      className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.65 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.05) 50%)' }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Spec rail + Newsletter strip ── */}
          <div className="flex flex-col lg:flex-row items-stretch"
            style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            {/* Scrolling specs */}
            <div className="flex-1 py-5 px-8 overflow-hidden" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
              <div className="ticker-track">
                {['IP65', 'IP66', 'IP67', 'IK08', 'IK10', 'DALI-2', 'DMX 512', '0-10V', 'LM80', 'L90 60k hrs', 'CRI >92', 'CCT Tunable', 'CE · RoHS', 'ISO 9001', 'BIM Objects', 'IES · LDT',
                  'IP65', 'IP66', 'IP67', 'IK08', 'IK10', 'DALI-2', 'DMX 512', '0-10V', 'LM80', 'L90 60k hrs', 'CRI >92', 'CCT Tunable', 'CE · RoHS', 'ISO 9001', 'BIM Objects', 'IES · LDT',
                ].map((s, i) => (
                  <span key={i} className="font-label text-[9px] tracking-[0.2em] uppercase mr-8 shrink-0" style={{ color: C.bodyLight }}>
                    {s} <span style={{ color: C.inkBorder, margin: '0 16px' }}>·</span>
                  </span>
                ))}
              </div>
            </div>
            {/* Newsletter */}
            <div className="flex items-center gap-4 px-8 py-5 flex-shrink-0" style={{ background: C.inkCard }}>
              <div>
                <p className="font-label text-[7px] tracking-[0.2em] uppercase mb-0.5" style={{ color: C.amber }}>Stay Updated</p>
                <p className="text-xs" style={{ color: C.bodyMid }}>Latest innovations & product launches</p>
              </div>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-opacity hover:opacity-85 flex-shrink-0"
                style={{ background: C.amber, color: '#fff' }}>
                Subscribe <ArrowRight size={8} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const PROJECT_MARQUEE_ROW1 = [
  { image: '1512453979798-5ea266f8880c', name: 'MHADA', country: 'Mumbai, India', type: 'Residential' },
  { image: '1486325212027-8081e485255e', name: 'Tata Realty — Intelian Park', country: 'Mumbai, India', type: 'Commercial' },
  { image: '1565538810643-b5bdb714032a', name: 'Tata Realty — OBLP', country: 'Bangalore, India', type: 'Commercial' },
  { image: '1600585154340-be6161a56a0c', name: 'KRC — Whispering Heights', country: 'Mumbai, India', type: 'Residential' },
  { image: '1558618047-3c8c76ca7d13', name: 'Piramal — Mahalaxmi', country: 'Mumbai, India', type: 'Luxury' },
  { image: '1559827291-72f59ad28f64', name: 'Skycity Mall', country: 'Kandivali, Mumbai', type: 'Retail' },
  { image: '1499856871958-5b9627545d1a', name: 'Oberoi Mall', country: 'Goregaon, Mumbai', type: 'Retail' },
  { image: '1558618666-fcd25c85cd64', name: 'Phoenix Mall', country: 'Pune, India', type: 'Retail' },
]
const PROJECT_MARQUEE_ROW2 = [
  { image: '1436491865332-7a61a109cc05', name: 'Indigo Hotel', country: 'Bangkok, Thailand', type: 'Hospitality' },
  { image: '1512453979798-5ea266f8880c', name: 'DBH Hotel', country: 'Dubai, UAE', type: 'Hospitality' },
  { image: '1480714378408-67cf0d13bc1b', name: 'KRC — Building 12', country: 'Hyderabad, India', type: 'Commercial' },
  { image: '1571440727633-ca6b05da2008', name: 'KRC — Chennai', country: 'Chennai, India', type: 'Commercial' },
  { image: '1467269204594-9661b134dd2b', name: 'KRC — Pune Kharadi', country: 'Pune, India', type: 'Commercial' },
  { image: '1465146344425-f00d5f5c8f07', name: 'KRC — Articia', country: 'India', type: 'Mixed-Use' },
  { image: '1524995997946-a1c2e315a42f', name: 'Piramal — Bhandup', country: 'Mumbai, India', type: 'Residential' },
  { image: '1519978778433-26bc8f7a9e52', name: 'BARC — Chembur', country: 'Mumbai, India', type: 'Institutional' },
]

const ALL_PROJECTS = [...PROJECT_MARQUEE_ROW1, ...PROJECT_MARQUEE_ROW2]

function Projects({ projects }: { projects?: any[] } = {}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const defaultRow1 = [
    { image: '1512453979798-5ea266f8880c', name: 'MHADA', country: 'Mumbai, India', type: 'Residential', year: '2023', scope: 'External Lighting' },
    { image: '1486325212027-8081e485255e', name: 'Tata Realty — Intelian Park', country: 'Mumbai, India', type: 'Commercial', year: '2023', scope: 'Facade & Landscape' },
    { image: '1565538810643-b5bdb714032a', name: 'Tata Realty — OBLP', country: 'Bangalore, India', type: 'Commercial', year: '2022', scope: 'Architectural Lighting' },
    { image: '1600585154340-be6161a56a0c', name: 'KRC — Whispering Heights', country: 'Mumbai, India', type: 'Residential', year: '2023', scope: 'Full Project' },
    { image: '1558618047-3c8c76ca7d13', name: 'Piramal — Mahalaxmi', country: 'Mumbai, India', type: 'Luxury', year: '2024', scope: 'Premium Lighting' },
    { image: '1559827291-72f59ad28f64', name: 'Skycity Mall', country: 'Kandivali, Mumbai', type: 'Retail', year: '2023', scope: 'Mall Lighting' },
    { image: '1499856871958-5b9627545d1a', name: 'Oberoi Mall', country: 'Goregaon, Mumbai', type: 'Retail', year: '2022', scope: 'Interior & Exterior' },
    { image: '1558618666-fcd25c85cd64', name: 'Phoenix Mall', country: 'Pune, India', type: 'Retail', year: '2023', scope: 'Full Lighting Design' },
  ]
  const defaultRow2 = [
    { image: '1436491865332-7a61a109cc05', name: 'Indigo Hotel', country: 'Bangkok, Thailand', type: 'Hospitality', year: '2024', scope: 'Hotel Lighting' },
    { image: '1512453979798-5ea266f8880c', name: 'DBH Hotel', country: 'Dubai, UAE', type: 'Hospitality', year: '2023', scope: 'Luxury Lighting' },
    { image: '1480714378408-67cf0d13bc1b', name: 'KRC — Building 12', country: 'Hyderabad, India', type: 'Commercial', year: '2024', scope: 'Office Lighting' },
    { image: '1571440727633-ca6b05da2008', name: 'KRC — Chennai', country: 'Chennai, India', type: 'Commercial', year: '2023', scope: 'Commercial Lighting' },
    { image: '1467269204594-9661b134dd2b', name: 'KRC — Pune Kharadi', country: 'Pune, India', type: 'Commercial', year: '2024', scope: 'Full Project' },
    { image: '1465146344425-f00d5f5c8f07', name: 'KRC — Articia', country: 'India', type: 'Mixed-Use', year: '2023', scope: 'Architectural' },
    { image: '1524995997946-a1c2e315a42f', name: 'Piramal — Bhandup', country: 'Mumbai, India', type: 'Residential', year: '2022', scope: 'Landscape Lighting' },
    { image: '1519978778433-26bc8f7a9e52', name: 'BARC — Chembur', country: 'Mumbai, India', type: 'Institutional', year: '2023', scope: 'Campus Lighting' },
  ]

  const dbRow1 = projects && projects.length > 0 ? projects.filter(p => p.is_marquee_row1) : []
  const dbRow2 = projects && projects.length > 0 ? projects.filter(p => p.is_marquee_row2) : []

  const mapItem = (p: any, fallback: typeof defaultRow1[0]) => ({
    image: p.image || p.image_url || fallback.image,
    name: p.name || fallback.name,
    country: p.country || fallback.country,
    type: p.type || fallback.type,
    year: p.year ? String(p.year) : fallback.year,
    scope: p.scope || fallback.scope,
  })

  const row1 = dbRow1.length > 0 ? dbRow1.map((p, i) => mapItem(p, defaultRow1[i % defaultRow1.length])) : defaultRow1
  const row2 = dbRow2.length > 0 ? dbRow2.map((p, i) => mapItem(p, defaultRow2[i % defaultRow2.length])) : defaultRow2

  const tickerList = [...row1, ...row2].map(p => ({
    name: p.name,
    city: p.country?.split(',')[0]?.trim() || p.country || ''
  }))

  const BG = '#18100A'   // deep espresso — portfolio dark zone
  const BGL = 'rgba(255,255,255,0.05)'  // subtle divider on dark
  const CARD_W = 380
  const CARD_H = 260
  const GAP = 14

  const MarqueeCard = ({ p }: { p: typeof row1[0] }) => (
    <div className="group relative overflow-hidden shrink-0 cursor-pointer"
      style={{ width: CARD_W, height: CARD_H, marginRight: GAP, borderRadius: 8 }}>
      <img src={img(p.image, 760, 520)} alt={p.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        style={{ opacity: 0.78 }} />
      {/* Rich layered gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(12,7,3,0.30) 0%, rgba(12,7,3,0.08) 35%, transparent 55%, rgba(12,7,3,0.92) 100%)' }} />
      {/* Copper top bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${C.amber}, ${C.amberLt})` }} />
      {/* Type pill */}
      <div className="absolute top-3.5 left-3.5">
        <span className="font-label text-[7px] tracking-[0.22em] uppercase px-2.5 py-1.5"
          style={{ background: C.amber, color: '#fff', borderRadius: 3 }}>
          {p.type}
        </span>
      </div>
      <div className="absolute top-3.5 right-3.5">
        <span className="font-label text-[7px] tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.50)' }}>{p.year}</span>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-px" style={{ background: C.amberLt }} />
          <p className="font-label text-[7px] tracking-[0.28em] uppercase" style={{ color: C.amberLt }}>{p.country}</p>
        </div>
        <h3 className="font-serif font-semibold leading-tight mb-2"
          style={{ fontSize: '1.05rem', color: '#FFFFFF', letterSpacing: '-0.015em' }}>
          {p.name}
        </h3>
        <p className="font-label text-[7px] tracking-[0.16em]"
          style={{ color: 'rgba(255,255,255,0.42)' }}>
          {p.scope}
        </p>
      </div>
    </div>
  )

  return (
    <section id="projects" ref={ref} style={{ background: BG, overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${BGL}` }}>
        <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>
                  Project Portfolio
                </span>
              </div>
              <h2 className="font-serif font-bold leading-[0.92]"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', color: '#F4EFE6', letterSpacing: '-0.03em' }}>
                Landmark<br />
                <span style={{ color: C.amberLt, fontStyle: 'italic', fontWeight: 400 }}>Projects</span>
                <span style={{ color: 'rgba(255,255,255,0.18)' }}> · Worldwide</span>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col gap-5 lg:items-end">
              <p className="text-sm leading-relaxed lg:text-right"
                style={{ color: 'rgba(244,239,230,0.55)', maxWidth: 340, fontFamily: 'Inter' }}>
                From luxury residences to international hospitality — ZiVIO luminaires illuminate landmark projects across India and the globe.
              </p>
              <div className="flex items-center gap-5">
                {[{ v: '1000+', l: 'Projects' }, { v: '15', l: 'Countries' }, { v: '12+', l: 'Years' }].map((s, si) => (
                  <div key={s.l} className="flex flex-col items-center px-5"
                    style={{ borderLeft: si > 0 ? `1px solid rgba(255,255,255,0.10)` : 'none' }}>
                    <span className="font-serif font-bold text-xl leading-none mb-0.5" style={{ color: '#F4EFE6' }}>{s.v}</span>
                    <span className="font-label text-[7px] tracking-[0.20em] uppercase" style={{ color: C.amber }}>{s.l}</span>
                  </div>
                ))}
                <a href="#contact"
                  className="ml-2 inline-flex items-center gap-2 px-6 py-3 font-label text-[8px] tracking-[0.16em] uppercase transition-all hover:opacity-85"
                  style={{ background: C.amber, color: '#fff', borderRadius: 6 }}>
                  Discuss <ArrowRight size={9} />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Single marquee — all 16 projects, scrolls left ── */}
      <div className="py-7" style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: 'max-content', animation: 'slide-left 70s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
          {[...row1, ...row2, ...row1, ...row2].map((p, i) => <MarqueeCard key={i} p={p} />)}
        </div>
      </div>

      {/* ── Project pill ticker — single sliding strip ── */}
      <div style={{ borderTop: `1px solid ${BGL}`, overflow: 'hidden', background: 'rgba(255,255,255,0.02)', padding: '12px 0' }}>
        <div className="ticker-track" style={{ gap: 10 }}>
          {[...tickerList, ...tickerList].map((p, i) => (
            <span key={i} className="shrink-0 whitespace-nowrap inline-flex items-center gap-2"
              style={{
                background: i % 4 === 0 ? `rgba(181,114,42,0.18)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i % 4 === 0 ? 'rgba(181,114,42,0.35)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 100,
                padding: '4px 14px',
                marginRight: 8,
              }}>
              <span className="font-serif text-[11px] font-medium" style={{ color: i % 4 === 0 ? C.amberLt : 'rgba(244,239,230,0.65)', letterSpacing: '-0.01em' }}>
                {p.name}
              </span>
              <span className="font-label text-[7px] tracking-[0.16em] uppercase" style={{ color: 'rgba(244,239,230,0.28)' }}>
                {p.city}
              </span>
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}

// ─── APPLICATIONS ─────────────────────────────────────────────────────────────
function Applications() {
  const [active, setActive] = useState(0)

  const apps = [
    { tag: 'Hospitality', name: 'Hotels & Hospitality', desc: 'Bespoke ambience for lobbies, suites, ballrooms and resort exteriors.', image: '1551882547-ff40c63fe5fa', count: 140 },
    { tag: 'Residential', name: 'Luxury Villas & Homes', desc: 'Layered architectural light for private residences and villa communities.', image: '1600585154340-be6161a56a0c', count: 88 },
    { tag: 'Commercial', name: 'Commercial Buildings', desc: 'Efficient, specification-grade luminaires for offices and retail environments.', image: '1486325212027-8081e485255e', count: 112 },
    { tag: 'Infrastructure', name: 'Airports & Transit', desc: 'High-lumen, IK10-rated systems for terminals, platforms and concourses.', image: '1436491865332-7a61a109cc05', count: 64 },
    { tag: 'Urban', name: 'Roads & Highways', desc: 'Smart EN 13201-compliant street lighting designed for 24/7 performance.', image: '1558618047-3c8c76ca7d13', count: 76 },
    { tag: 'Landscape', name: 'Parks & Landscapes', desc: 'Ground-level spikes, bollards and uplighters that elevate outdoor spaces.', image: '1519978778433-26bc8f7a9e52', count: 95 },
    { tag: 'Cultural', name: 'Museums & Cultural', desc: 'CRI >95 accent and display lighting for galleries, museums and heritage sites.', image: '1565538810643-b5bdb714032a', count: 58 },
    { tag: 'Smart', name: 'Smart Cities', desc: 'IoT-ready luminaires with DALI-2, DMX and centralised control integration.', image: '1480714378408-67cf0d13bc1b', count: 42 },
  ]

  return (
    <section id="solutions" style={{ background: C.ink }}>

      {/* ── Section header ── */}
      <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 py-10 lg:py-14 items-end">
            <InView>
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px" style={{ background: C.amber }} />
                  <span className="font-label text-[9px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Applications</span>
                </div>
                <h2 className="font-serif font-medium leading-[0.88]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', color: C.bodyDark, letterSpacing: '-0.025em' }}>
                  Designed for Every Environment
                </h2>
              </motion.div>
            </InView>
            <InView>
              <motion.div variants={fadeUp} className="flex flex-col justify-end gap-8">
                <p className="text-sm leading-relaxed" style={{ color: C.bodyMid, maxWidth: 400 }}>
                  From grand hotel lobbies to smart city infrastructure — ZiVIO luminaires are engineered to perform in every climate, application, and architectural context across the globe.
                </p>
                <div className="flex items-center gap-3">
                  <a href="#contact"
                    className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.18em] uppercase group"
                    style={{ color: C.amber }}>
                    All Applications <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </InView>
          </div>
        </div>
      </div>

      {/* ── Interactive body: numbered list left + sticky photo right ── */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row">

          {/* Left: numbered application list */}
          <div className="flex-1" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
            {apps.map((app, i) => (
              <div key={app.name}
                className="relative flex items-center cursor-pointer transition-colors duration-200 group"
                style={{ borderBottom: `1px solid ${C.inkBorder}` }}
                onMouseEnter={() => setActive(i)}>

                {/* Active left border */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
                  style={{ background: active === i ? C.amber : 'transparent' }} />

                <div className="flex items-center gap-6 lg:gap-10 px-8 lg:px-12 py-8 w-full">
                  {/* Index */}
                  <span className="font-label text-[9px] tracking-[0.2em] shrink-0 w-5 transition-colors duration-200"
                    style={{ color: active === i ? C.amber : C.bodyLight }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif font-medium flex-1 transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: active === i ? C.bodyDark : C.bodyMid, letterSpacing: '-0.01em' }}>
                    {app.name}
                  </h3>

                  {/* Tag */}
                  <span className="hidden lg:block font-label text-[8px] tracking-[0.18em] uppercase px-2.5 py-1 transition-colors duration-200"
                    style={{
                      border: `1px solid ${active === i ? C.amber + '55' : C.inkBorder}`,
                      color: active === i ? C.amber : C.bodyLight,
                    }}>
                    {app.tag}
                  </span>

                  {/* Count + arrow */}
                  <div className="flex items-center gap-4">
                    <span className="font-label text-[9px] tracking-wider hidden sm:block"
                      style={{ color: C.bodyLight }}>
                      {app.count}+
                    </span>
                    <div className="w-7 h-7 flex items-center justify-center border transition-all duration-200"
                      style={{
                        borderColor: active === i ? C.amber : C.inkBorder,
                        color: active === i ? C.amber : C.bodyLight,
                      }}>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Bottom description — slides in when active */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Bottom description bar */}
            <div className="px-8 lg:px-12 py-8" style={{ borderTop: `1px solid ${C.inkBorder}` }}>
              <AnimatePresence mode="wait">
                <motion.p key={active}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm leading-relaxed" style={{ color: C.bodyMid, maxWidth: 480 }}>
                  {apps[active].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: photo panel — full height sticky */}
          <div className="relative hidden lg:block" style={{ width: 480, flexShrink: 0 }}>
            <div className="sticky top-[64px]" style={{ height: 'calc(100vh - 64px)', maxHeight: 860 }}>
              <AnimatePresence mode="sync">
                <motion.div key={active}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0">
                  <img src={img(apps[active].image, 960, 1200)} alt={apps[active].name}
                    className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.1) 50%, rgba(17,17,17,0) 100%)' }} />
                </motion.div>
              </AnimatePresence>

              {/* Red top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: C.amber }} />

              {/* Bottom overlay: app name + tag */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <AnimatePresence mode="wait">
                  <motion.div key={active}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <span className="font-label text-[8px] tracking-[0.28em] uppercase block mb-2" style={{ color: C.amber }}>
                      {apps[active].tag}
                    </span>
                    <h4 className="font-serif font-medium" style={{ fontSize: '1.6rem', color: C.dust, letterSpacing: '-0.02em' }}>
                      {apps[active].name}
                    </h4>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="font-label text-[9px] tracking-wider" style={{ color: C.bodyMid }}>
                        {apps[active].count}+ products
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Counter badge */}
              <div className="absolute top-6 right-6 z-10 font-label text-[9px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {String(active + 1).padStart(2, '0')} / {String(apps.length).padStart(2, '0')}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── DOWNLOADS ────────────────────────────────────────────────────────────────
function Downloads({ catalogues }: { catalogues?: any[] } = {}) {
  const defaultDocs = [
    {
      tag: 'Company Profile',
      title: 'ZiVIO LIFE — Our Story',
      desc: 'Philosophy, vision, global presence and sustainability commitment.',
      size: '16 MB',
      image: '1497366216548-37526070297c',
      href: '/zivio-company-profile.pdf',
      dl: 'ZiVIO-LIFE-Company-Profile.pdf',
      accent: true,
    },
    {
      tag: 'Product Catalogue 2024',
      title: 'Complete Product Range',
      desc: '500+ luminaires across six families — specs, photometrics, applications.',
      size: '16 MB',
      image: '1558618666-fcd25c85cd64',
      href: '/zivio-product-catalogue.pdf',
      dl: 'ZiVIO-Product-Catalogue-2024.pdf',
      accent: false,
    },
  ]

  const docs = catalogues && catalogues.length > 0 ? catalogues.map((c, di) => ({
    tag: c.category || 'Catalogue',
    title: c.title,
    desc: c.description || 'Architectural lighting catalogue and specifications.',
    size: c.file_size || 'PDF',
    image: c.cover_image || c.cover_image_url || (di % 2 === 0 ? '1497366216548-37526070297c' : '1558618666-fcd25c85cd64'),
    href: c.file_url || c.file_path || '#',
    dl: (c.title || 'catalogue').replace(/[^a-zA-Z0-9_-]/g, '_') + '.pdf',
    accent: di === 0,
  })) : defaultDocs

  return (
    <section id="downloads" style={{ background: C.ink, borderTop: `1px solid ${C.inkBorder}` }}>
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header strip ── */}
        <div className="flex items-center justify-between px-8 lg:px-14 py-5"
          style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-px" style={{ background: C.amber }} />
            <span className="font-label text-[8px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Downloads</span>
          </div>
          <span className="font-label text-[7px] tracking-[0.2em] uppercase" style={{ color: C.bodyLight }}>{docs.length} Documents Available</span>
        </div>

        {/* ── Compact side-by-side rows ── */}
        <InView>
          <motion.div variants={fadeUp}>
            {docs.map((doc, di) => (
              <a key={doc.dl}
                href={doc.href} download={doc.dl}
                className="group flex items-stretch"
                style={{ borderBottom: `1px solid ${C.inkBorder}` }}>

                {/* Thumbnail — fixed width */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ width: 140, height: 100 }}>
                  <img src={img(doc.image, 280, 200)} alt={doc.tag}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ opacity: 0.55 }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(11,11,11,0.1), rgba(11,11,11,0.45))' }} />
                  {doc.accent && (
                    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: C.amber }} />
                  )}
                </div>

                {/* Meta — grows */}
                <div className="flex-1 flex items-center gap-6 px-7 py-5"
                  style={{ background: di % 2 === 0 ? C.inkCard : C.ink }}>
                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <span className="font-label text-[7px] tracking-[0.2em] uppercase mb-1 block"
                      style={{ color: C.amber }}>{doc.tag}</span>
                    <h3 className="font-serif font-medium leading-tight mb-1 truncate"
                      style={{ fontSize: '1.05rem', color: C.bodyDark, letterSpacing: '-0.015em' }}>
                      {doc.title}
                    </h3>
                    <p className="text-[11px] leading-snug line-clamp-1" style={{ color: C.bodyMid }}>
                      {doc.desc}
                    </p>
                  </div>

                  {/* File info */}
                  <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="font-label text-[7px] tracking-[0.18em] uppercase" style={{ color: C.bodyLight }}>PDF</span>
                    <span className="font-label text-[8px]" style={{ color: C.bodyMid }}>{doc.size}</span>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-all duration-200 group-hover:opacity-90"
                    style={{ background: C.amber, color: '#fff' }}>
                    <Download size={9} />
                    <span className="hidden sm:inline">Download</span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </InView>

        {/* ── Bottom note ── */}
        <div className="px-8 lg:px-14 py-4 flex items-center gap-2">
          <div className="w-3 h-px" style={{ background: C.inkBorder }} />
          <span className="font-label text-[7px] tracking-[0.18em] uppercase" style={{ color: C.bodyLight }}>
            Compatible with Adobe Acrobat and all modern PDF viewers
          </span>
        </div>

      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', project: '', message: '', type: 'Project Enquiry' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.post('/inquiry', {
      name: form.name,
      email: form.email,
      company: form.company,
      project_type: form.type,
      message: form.message || (form.project ? `Project: ${form.project}` : 'General Inquiry'),
      specs_snapshot: {
        project: form.project,
        inquiry_type: form.type,
      }
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setSent(true)
        setForm({ name: '', email: '', company: '', project: '', message: '', type: 'Project Enquiry' })
        setTimeout(() => setSent(false), 5000)
      },
      onFinish: () => setLoading(false)
    })
  }

  const inquiryTypes = ['Project Enquiry', 'Request Quote', 'Dealer / Distributor', 'Technical Support', 'Careers']

  return (
    <section id="contact" style={{ background: C.inkMid }}>
      {/* ── Top bar ── */}
      <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: C.amber }} />
            <span className="font-label text-[9px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Contact ZiVIO LIFE</span>
          </div>
          <span className="font-label text-[9px] tracking-wider hidden sm:block" style={{ color: C.bodyLight }}>
            Response within 24 hrs · IN · AE · UK
          </span>
        </div>
      </div>

      {/* ── Main split ── */}
      <div className="grid lg:grid-cols-2 min-h-[75vh]">

        {/* Left — editorial info panel */}
        <div className="relative flex flex-col hidden lg:flex" style={{ borderRight: `1px solid ${C.inkBorder}` }}>

          {/* Top: headline block */}
          <div className="flex-1 flex flex-col justify-center px-12 pt-10 pb-8"
            style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px" style={{ background: C.amber }} />
              <span className="font-label text-[9px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Get In Touch</span>
            </div>
            <h2 className="font-serif font-medium leading-[0.85] mb-8"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.8rem)', color: C.bodyDark, letterSpacing: '-0.03em' }}>
              Let's Build Something<br />
              <em style={{ color: C.amber }}>Remarkable.</em>
            </h2>
            <p className="text-sm leading-[1.8]" style={{ color: C.bodyMid, maxWidth: 340 }}>
              Our lighting specialists partner with architects, engineers and developers — from initial
              concept through to final installation, anywhere in the world.
            </p>

            {/* Contact details */}
            <div className="mt-10 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.inkBorder}`, paddingTop: '2rem' }}>
              {[
                { icon: Phone, value: '+91 22 4567 8900', label: 'International HQ Line' },
                { icon: Mail, value: 'info@ziviolife.com', label: 'General Enquiries' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full shrink-0"
                    style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}30` }}>
                    <Icon size={12} style={{ color: C.amber }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: C.bodyDark }}>{value}</p>
                    <p className="font-label text-[9px] tracking-[0.16em] uppercase" style={{ color: C.bodyLight }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: office strips */}
          <div>
            <div className="px-12 pt-7 pb-4 flex items-center gap-3">
              <div className="w-5 h-px" style={{ background: C.inkBorder }} />
              <span className="font-label text-[8px] tracking-[0.28em] uppercase" style={{ color: C.bodyLight }}>Our Offices</span>
            </div>
            {OFFICE_DETAILS.map(o => (
              <div key={o.city} className="group flex items-center gap-5 px-12 py-4 transition-colors cursor-default"
                style={{
                  borderTop: `1px solid ${C.inkBorder}`,
                  background: 'transparent',
                }}>
                {/* Index */}
                <span className="font-label text-[8px] tracking-[0.24em] shrink-0 w-5" style={{ color: C.bodyLight }}>
                  {o.index}
                </span>
                {/* City + role */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-sm font-medium" style={{ color: C.bodyDark }}>{o.city}</span>
                    <span className="font-label text-[7px] tracking-[0.18em] uppercase px-1.5 py-0.5"
                      style={{ color: o.role === 'Head Office' ? C.amber : C.bodyMid, border: `1px solid ${o.role === 'Head Office' ? C.amber + '50' : C.inkBorder}` }}>
                      {o.role}
                    </span>
                  </div>
                  <p className="font-label text-[9px] tracking-wider truncate mt-0.5" style={{ color: C.bodyLight }}>{o.email}</p>
                </div>
                {/* Phone */}
                <span className="font-label text-[9px] tracking-wider shrink-0 hidden xl:block" style={{ color: C.bodyMid }}>
                  {o.phone}
                </span>
                {/* Arrow */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight size={11} style={{ color: C.amber }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form panel */}
        <div className="flex flex-col" style={{ background: C.inkMid }}>
          <InView className="flex-1 flex flex-col">
            <motion.div variants={fadeUp} className="flex-1 flex flex-col p-8 lg:p-14">

              {/* Inquiry type selector */}
              <div className="mb-10">
                <p className="font-label text-[9px] tracking-[0.22em] uppercase mb-4" style={{ color: C.bodyMid }}>I am enquiring about</p>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map(type => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, type }))}
                      className="font-label text-[10px] tracking-[0.12em] uppercase px-4 py-2.5 transition-all"
                      style={{
                        background: form.type === type ? C.amber : 'transparent',
                        color: form.type === type ? '#fff' : C.bodyMid,
                        border: `1px solid ${form.type === type ? C.amber : C.inkBorder}`,
                      }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="flex flex-col flex-1 gap-0">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-px mb-px" style={{ background: C.inkBorder }}>
                  {[
                    { f: 'name', l: 'Full Name', t: 'text', ph: 'Your full name' },
                    { f: 'email', l: 'Email Address', t: 'email', ph: 'you@company.com' },
                  ].map(({ f, l, t, ph }) => (
                    <div key={f} className="relative" style={{ background: C.inkCard }}>
                      <label className="font-label text-[9px] tracking-[0.18em] uppercase block pt-4 px-5" style={{ color: focusedField === f ? C.amber : C.bodyMid }}>
                        {l}
                      </label>
                      <input type={t} value={form[f as keyof typeof form]}
                        onFocus={() => setFocusedField(f)} onBlur={() => setFocusedField(null)}
                        onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                        className="w-full px-5 pb-4 pt-1.5 text-sm outline-none bg-transparent"
                        style={{ color: C.bodyLight }}
                        placeholder={ph} />
                      {focusedField === f && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: C.amber }} />}
                    </div>
                  ))}
                </div>

                {/* Company + Project row */}
                <div className="grid sm:grid-cols-2 gap-px mb-px" style={{ background: C.inkBorder }}>
                  {[
                    { f: 'company', l: 'Company / Organisation', t: 'text', ph: 'Your company name' },
                    { f: 'project', l: 'Project Name', t: 'text', ph: 'e.g. Dubai Marina Hotel' },
                  ].map(({ f, l, t, ph }) => (
                    <div key={f} className="relative" style={{ background: C.inkCard }}>
                      <label className="font-label text-[9px] tracking-[0.18em] uppercase block pt-4 px-5" style={{ color: focusedField === f ? C.amber : C.bodyMid }}>
                        {l}
                      </label>
                      <input type={t} value={form[f as keyof typeof form]}
                        onFocus={() => setFocusedField(f)} onBlur={() => setFocusedField(null)}
                        onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                        className="w-full px-5 pb-4 pt-1.5 text-sm outline-none bg-transparent"
                        style={{ color: C.bodyLight }}
                        placeholder={ph} />
                      {focusedField === f && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: C.amber }} />}
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="relative mb-px flex-1" style={{ background: C.inkCard, borderTop: `1px solid ${C.inkBorder}` }}>
                  <label className="font-label text-[9px] tracking-[0.18em] uppercase block pt-4 px-5" style={{ color: focusedField === 'message' ? C.amber : C.bodyMid }}>
                    Your Message
                  </label>
                  <textarea rows={6} value={form.message}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-5 pb-5 pt-1.5 text-sm outline-none resize-none bg-transparent"
                    style={{ color: C.bodyLight }}
                    placeholder="Describe your project, requirements, timeline or any questions you have…" />
                  {focusedField === 'message' && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: C.amber }} />}
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="sent"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3 py-5"
                      style={{ background: C.amberDk }}>
                      <CheckCircle size={16} style={{ color: '#fff' }} />
                      <span className="font-label text-[11px] tracking-[0.18em] uppercase font-medium" style={{ color: '#fff' }}>
                        Message Sent — We'll respond within 24 hours
                      </span>
                    </motion.div>
                  ) : (
                    <motion.button key="submit" type="submit"
                      whileHover={{ backgroundColor: C.amberDk }}
                      className="flex items-center justify-between gap-3 px-8 py-5 w-full font-label text-[11px] tracking-[0.18em] uppercase font-medium transition-colors"
                      style={{ background: C.amber, color: '#fff' }}>
                      <span>Send Message</span>
                      <div className="flex items-center gap-2">
                        <span className="font-label text-[9px] tracking-wider opacity-70">{form.type}</span>
                        <ArrowRight size={14} />
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="font-label text-[9px] tracking-wider mt-4 text-center" style={{ color: C.bodyMid }}>
                  By submitting you agree to our Privacy Policy · Your data is never shared with third parties
                </p>
              </form>
            </motion.div>
          </InView>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIAL SLIDER ───────────────────────────────────────────────────────
type Testimonial = { quote: string; name: string; role: string; company: string; avatar: string }
function TestimonialSlider({ testimonials, C }: { testimonials: Testimonial[]; C: Record<string, string> }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length
  const DURATION = 6000

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(a => (a + 1) % total), DURATION)
    return () => clearInterval(id)
  }, [total, paused])

  const t = testimonials[active]
  const initials = t.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      style={{ background: C.navyDark, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C.amber}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16" style={{ paddingTop: 56, paddingBottom: 60 }}>

        {/* ── Story bars ── */}
        <div className="flex items-center gap-2 mb-10">
          <span className="font-label text-[7px] tracking-[0.3em] uppercase mr-3" style={{ color: C.amber }}>Client Testimonials</span>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="relative h-[2px] rounded-full overflow-hidden flex-1 max-w-[60px]"
              style={{ background: 'rgba(255,255,255,0.12)', cursor: 'pointer' }}>
              {i === active && (
                <motion.div
                  key={`bar-${active}`}
                  style={{ position: 'absolute', inset: 0, background: C.amber, transformOrigin: 'left', borderRadius: 9999 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION / 1000, ease: 'linear' }}
                />
              )}
              {i < active && <div style={{ position: 'absolute', inset: 0, background: C.amber, opacity: 0.9 }} />}
            </button>
          ))}
          <span className="font-label text-[7px] tracking-[0.1em] ml-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">

          {/* Left: client identity column */}
          <div className="flex flex-col items-center lg:items-start gap-5 lg:w-48">
            {/* Avatar circle */}
            <AnimatePresence mode="wait">
              <motion.div key={`avatar-${active}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-serif font-bold text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${C.amberDk}, ${C.amber})`,
                      color: '#fff',
                      boxShadow: `0 0 0 3px ${C.navyDark}, 0 0 0 4px ${C.amber}55`,
                    }}>
                    {initials}
                  </div>
                  {/* Verified dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: C.navyDark, border: `1.5px solid ${C.amber}` }}>
                    <svg viewBox="0 0 10 10" width="9" height="9" fill={C.amber}><path d="M4.1 7.3L1.5 4.7l.9-.9 1.7 1.7 3.5-3.5.9.9z" /></svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Name + role */}
            <AnimatePresence mode="wait">
              <motion.div key={`name-${active}`}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-center lg:text-left">
                <p className="font-serif font-semibold text-[15px] leading-tight mb-1" style={{ color: '#fff' }}>{t.name}</p>
                <p className="font-label text-[7.5px] tracking-[0.12em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.role}</p>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <div className="w-3 h-px" style={{ background: C.amber }} />
                  <p className="font-label text-[7.5px] tracking-[0.1em] uppercase" style={{ color: C.amberLt }}>{t.company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} viewBox="0 0 12 12" width="11" height="11" fill={C.amber}>
                  <path d="M6 1l1.4 2.9 3.2.5-2.3 2.2.5 3.2L6 8.3 3.2 9.8l.5-3.2L1.4 4.4l3.2-.5z" />
                </svg>
              ))}
            </div>

            {/* Dot nav */}
            <div className="flex gap-2 mt-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? C.amber : 'rgba(255,255,255,0.2)',
                  }} />
              ))}
            </div>
          </div>

          {/* Right: quote */}
          <div className="relative">
            {/* Decorative quotemark */}
            <div className="absolute -top-4 -left-2 font-serif select-none pointer-events-none"
              style={{ fontSize: 'clamp(80px, 10vw, 140px)', lineHeight: 1, color: `${C.amber}14`, fontWeight: 700 }}>
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote key={`quote-${active}`}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10">
                <p className="font-serif leading-[1.7]"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)',
                    color: 'rgba(255,255,255,0.88)',
                    letterSpacing: '-0.01em',
                    fontWeight: 400,
                  }}>
                  {t.quote}
                </p>
              </motion.blockquote>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <div className="flex gap-3 mt-10">
              <button onClick={() => setActive(a => (a - 1 + total) % total)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: `1px solid rgba(255,255,255,0.15)`, background: 'transparent', color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.amber; (e.currentTarget as HTMLButtonElement).style.color = C.amber }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)' }}>
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15l-5-5 5-5" /></svg>
              </button>
              <button onClick={() => setActive(a => (a + 1) % total)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: `1px solid rgba(255,255,255,0.15)`, background: 'transparent', color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.amber; (e.currentTarget as HTMLButtonElement).style.color = C.amber }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)' }}>
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 5l5 5-5 5" /></svg>
              </button>
              <span className="font-label text-[7px] tracking-[0.15em] self-center ml-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                PAUSE ON HOVER · AUTO-ADVANCES
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── NEWS & MEDIA ─────────────────────────────────────────────────────────────
const NEWS_ITEMS = [
  {
    id: 'csr',
    category: 'CSR',
    date: 'June 2024',
    headline: 'Supporting Education During the Monsoon in the Konkan Region',
    summary: 'As part of our commitment to community development, our team distributed rain protection kits and essential educational materials to schoolchildren in the Konkan region, reflecting our belief that brighter futures begin with equal access to education and care.',
    image: '1488521787991-ed7bbaae773c',
    tag: 'Corporate Social Responsibility',
    featured: true,
  },
  {
    id: 'award',
    category: 'Awards',
    date: 'March 2024',
    headline: 'Recognized by BARC India for Excellence in Lighting',
    summary: 'Our commitment to innovation, manufacturing excellence, and quality was recognized through a prestigious industry acknowledgment from BARC India, reflecting the dedication of our entire team in delivering reliable, high-performance lighting solutions.',
    image: '1578269174936-2709b6aeb913',
    tag: 'Industry Recognition',
    featured: true,
  },
  {
    id: 'manufacturing',
    category: 'Manufacturing',
    date: 'January 2024',
    headline: 'Exporting Premium Lighting Solutions to 15+ Countries',
    summary: 'Our advanced manufacturing facility in India continues to deliver high-quality lighting solutions to customers across international markets, strengthening long-term partnerships through innovation, reliability, and on-time delivery.',
    image: '1717386255773-1e3037c81788',
    tag: 'Global Expansion',
    featured: true,
  },
  {
    id: 'event',
    category: 'Events',
    date: 'November 2023',
    headline: 'ZiVIO Showcases at India International Lighting Expo 2023',
    summary: 'Our team presented the latest product innovations and smart lighting solutions to industry professionals and architects, marking a strong presence at one of India\'s largest trade exhibitions for the lighting sector.',
    image: '1776248783518-400b6d0da64c',
    tag: 'Industry Events',
    featured: false,
  },
  {
    id: 'facade',
    category: 'Projects',
    date: 'September 2023',
    headline: 'ZiVIO Facade Systems Complete Piramal Mahalaxmi Tower',
    summary: 'Our IP66-rated facade lighting systems were selected to illuminate the landmark Piramal Mahalaxmi residential towers in Mumbai, delivering precision beam control and DALI-2 smart control integration.',
    image: '1571440727633-ca6b05da2008',
    tag: 'Featured Projects',
    featured: false,
  },
  {
    id: 'innovation',
    category: 'Innovation',
    date: 'July 2023',
    headline: 'Introducing DALI-2 Smart Control Across the ZiVIO Portfolio',
    summary: 'ZiVIO expands its DALI-2 compatible range, enabling building management systems to achieve precise scene control, energy monitoring, and maintenance alerts across all product categories.',
    image: '1612283157924-f0e11f121c3f',
    tag: 'Product Innovation',
    featured: false,
  },
]

const TIMELINE = [
  { year: '2012', label: 'Founded', desc: 'ZiVIO LIFE established with a vision to deliver world-class architectural lighting.' },
  { year: '2015', label: 'Manufacturing', desc: 'Advanced production facility set up with international quality standards.' },
  { year: '2018', label: 'Global Export', desc: 'Commenced exports to international markets across Asia and the Middle East.' },
  { year: '2020', label: 'CSR Launch', desc: 'Launched structured community outreach and education support programs.' },
  { year: '2022', label: 'DALI-2 Portfolio', desc: 'Full DALI-2 smart control integration across all product categories.' },
  { year: '2024', label: 'Industry Award', desc: 'Recognized by BARC India for excellence in manufacturing and innovation.' },
  { year: '2025+', label: 'Sustainability', desc: 'Expanding solar product range and carbon-neutral manufacturing roadmap.' },
]

const GALLERY_IMAGES = [
  { id: '1488521787991-ed7bbaae773c', caption: 'CSR — Konkan Region School Outreach' },
  { id: '1717386255773-1e3037c81788', caption: 'Manufacturing Excellence — ZiVIO Plant' },
  { id: '1578269174936-2709b6aeb913', caption: 'Industry Award — BARC India' },
  { id: '1571440727633-ca6b05da2008', caption: 'Piramal Mahalaxmi Facade Installation' },
  { id: '1542810634-71277d95dcbb', caption: 'Community Education Program' },
  { id: '1612283157924-f0e11f121c3f', caption: 'Architectural Facade Illumination' },
  { id: '1776248783518-400b6d0da64c', caption: 'ZiVIO Team — Industry Exhibition' },
  { id: '1647427060118-4911c9821b82', caption: 'Production Line — Quality Manufacturing' },
]

const NEWS_CATEGORIES = ['All', 'CSR', 'Awards', 'Manufacturing', 'Events', 'Projects', 'Innovation']

function NewsMedia({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<null | { idx: number }>(null)

  const filtered = activeCategory === 'All' ? NEWS_ITEMS : NEWS_ITEMS.filter(n => n.category === activeCategory)
  const hero = filtered[0]
  const secondary = filtered.slice(1, 3)
  const rest = filtered.slice(3)

  const lbImg = lightbox !== null ? GALLERY_IMAGES[lightbox.idx] : null
  const lbNext = () => setLightbox(l => l ? { idx: (l.idx + 1) % GALLERY_IMAGES.length } : null)
  const lbPrev = () => setLightbox(l => l ? { idx: (l.idx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length } : null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] overflow-y-auto"
          style={{ background: C.ink }}>

          {/* Close button */}
          <button onClick={onClose}
            className="fixed top-5 right-6 z-[90] flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-[11px] tracking-wide uppercase transition-all hover:opacity-80"
            style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.06em', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <X size={13} /> Close
          </button>

          <section id="news" style={{ background: C.ink }}>

            {/* ══ CINEMATIC HERO ══ */}
            <div className="relative overflow-hidden" style={{ height: '72vh', minHeight: 520 }}>
              <motion.div className="absolute inset-0"
                initial={{ scale: 1.06 }} animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}>
                <img src={img('1560257084-d568f6eb7b29', 1920, 1080)} alt="ZiVIO News"
                  className="w-full h-full object-cover" />
              </motion.div>
              {/* Multi-layer overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(4,3,1,0.88) 0%, rgba(4,3,1,0.46) 50%, rgba(4,3,1,0.12) 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,3,1,0.9) 0%, transparent 45%)' }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Top bar */}
                <div className="max-w-[1440px] mx-auto w-full px-10 lg:px-16 pt-10 flex items-center justify-between">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
                    className="flex items-center gap-3">
                    <div style={{ width: 24, height: 1, background: C.amber }} />
                    <span className="font-label text-[7px] tracking-[0.38em] uppercase" style={{ color: C.amber }}>ZiVIO · News & Media</span>
                  </motion.div>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                    className="font-label text-[7px] tracking-[0.2em] hidden lg:block" style={{ color: 'rgba(255,255,255,0.22)' }}>
                    {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </motion.span>
                </div>

                {/* Hero headline */}
                <div className="max-w-[1440px] mx-auto w-full px-10 lg:px-16 pb-14">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="overflow-hidden mb-3">
                      <motion.h1 className="font-serif font-bold" initial={{ y: '100%' }} animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: 'clamp(2.8rem,6vw,7rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.92 }}>
                        Stories That Define
                      </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-6">
                      <motion.h1 className="font-serif font-light italic" initial={{ y: '100%' }} animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: 'clamp(2.8rem,6vw,7rem)', color: C.amberLt, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
                        Our Journey.
                      </motion.h1>
                    </div>
                    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-sans" style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', maxWidth: 500, lineHeight: 1.75 }}>
                      Discover milestones, industry recognition, innovation, and community initiatives that define ZiVIO LIFE across 15+ countries.
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ══ STICKY FILTER ══ */}
            <div className="sticky z-30" style={{ top: 56, background: 'rgba(250,249,246,0.96)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${C.inkBorder}` }}>
              <div className="max-w-[1440px] mx-auto px-10 lg:px-16 flex items-center justify-between">
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-3.5">
                  {NEWS_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className="whitespace-nowrap font-label text-[7px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-200"
                      style={{
                        background: activeCategory === cat ? C.bodyDark : 'transparent',
                        color: activeCategory === cat ? '#fff' : C.bodyLight,
                        border: `1px solid ${activeCategory === cat ? C.bodyDark : C.inkBorder}`,
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
                <span className="font-label text-[7px] tracking-[0.18em] shrink-0 ml-6 hidden md:block" style={{ color: C.bodyLight }}>
                  {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                </span>
              </div>
            </div>

            {/* ══ EDITORIAL LEAD STORY + SIDE STACK ══ */}
            {hero && (
              <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{ minHeight: 520 }}>

                  {/* Hero story — full image with overlay text */}
                  <motion.div className="group relative cursor-pointer overflow-hidden"
                    style={{ borderRight: `1px solid ${C.inkBorder}` }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <motion.img src={img(hero.image, 1200, 700)} alt={hero.headline}
                      className="w-full h-full object-cover absolute inset-0"
                      style={{ minHeight: 420 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,3,1,0.96) 0%, rgba(4,3,1,0.55) 35%, rgba(4,3,1,0.1) 70%)' }} />
                    <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                      <span className="inline-flex items-center gap-2 font-label text-[6.5px] tracking-[0.2em] uppercase mb-4 px-2.5 py-1 rounded-full"
                        style={{ background: C.amber, color: '#fff' }}>
                        {hero.tag}
                      </span>
                      <h2 className="font-serif font-bold mb-3 leading-tight"
                        style={{ fontSize: 'clamp(1.4rem,2.8vw,2.4rem)', color: '#fff', letterSpacing: '-0.025em', maxWidth: 640 }}>
                        {hero.headline}
                      </h2>
                      <p className="font-sans mb-5" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 520, lineHeight: 1.7 }}>
                        {hero.summary}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-label text-[6.5px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{hero.date}</span>
                        <div className="flex items-center gap-1.5 font-label text-[7px] tracking-[0.2em] uppercase transition-all group-hover:gap-3 duration-200"
                          style={{ color: C.amberLt }}>
                          Read Story <ArrowRight size={8} />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Side: 2 stacked stories */}
                  <div className="flex flex-col">
                    {(secondary.length > 0 ? secondary : NEWS_ITEMS.slice(1, 3)).map((n, ni) => (
                      <motion.div key={n.id}
                        className="group cursor-pointer flex flex-col flex-1"
                        style={{ borderBottom: ni === 0 ? `1px solid ${C.inkBorder}` : 'none' }}
                        initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: ni * 0.1 }}>
                        {/* Image */}
                        <div className="relative overflow-hidden" style={{ height: 180 }}>
                          <motion.img src={img(n.image, 600, 360)} alt={n.headline}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }} />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 60%)' }} />
                          <span className="absolute top-3 left-3 font-label text-[5.5px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
                            style={{ background: `${C.amber}dd`, color: '#fff', backdropFilter: 'blur(4px)' }}>
                            {n.category}
                          </span>
                        </div>
                        {/* Text */}
                        <div className="p-6 flex flex-col flex-1">
                          <span className="font-label text-[6px] tracking-[0.18em] uppercase mb-2 block" style={{ color: C.bodyLight }}>{n.date}</span>
                          <h3 className="font-serif font-semibold leading-snug mb-2 flex-1"
                            style={{ fontSize: '0.88rem', color: C.bodyDark, letterSpacing: '-0.014em' }}>
                            {n.headline}
                          </h3>
                          <div className="flex items-center gap-1.5 font-label text-[6.5px] tracking-[0.16em] uppercase group-hover:gap-2.5 transition-all duration-200"
                            style={{ color: C.amber }}>
                            Read More <ArrowRight size={8} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ ARTICLE STRIP — remaining stories ══ */}
            {rest.length > 0 && (
              <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
                <div className="max-w-[1440px] mx-auto px-10 lg:px-16" style={{ paddingTop: 56, paddingBottom: 64 }}>
                  <div className="flex items-center gap-3 mb-10">
                    <div style={{ width: 20, height: 1, background: C.amber }} />
                    <span className="font-label text-[7px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>More Stories</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
                    {rest.map((n, ni) => (
                      <motion.div key={n.id} className="group cursor-pointer"
                        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.45, delay: ni * 0.07 }}>
                        {/* Image */}
                        <div className="overflow-hidden rounded-xl mb-4" style={{ aspectRatio: '16/10' }}>
                          <motion.img src={img(n.image, 640, 400)} alt={n.headline}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} />
                        </div>
                        {/* Meta */}
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="font-label text-[6px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                            style={{ background: `${C.amber}18`, color: C.amberDk, border: `1px solid ${C.amber}33` }}>
                            {n.category}
                          </span>
                          <span className="font-label text-[6px] tracking-[0.14em] uppercase" style={{ color: C.bodyLight }}>{n.date}</span>
                        </div>
                        <h3 className="font-serif font-semibold leading-snug mb-2"
                          style={{ fontSize: '0.9rem', color: C.bodyDark, letterSpacing: '-0.014em' }}>
                          {n.headline}
                        </h3>
                        <p className="font-sans text-[11.5px] leading-relaxed mb-3"
                          style={{ color: C.bodyMid, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {n.summary}
                        </p>
                        <div className="flex items-center gap-1.5 font-label text-[6.5px] tracking-[0.18em] uppercase group-hover:gap-3 transition-all"
                          style={{ color: C.amber }}>
                          Read More <ArrowRight size={8} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ TIMELINE ══ */}
            <div style={{ background: C.navyDark, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
              <div className="max-w-[1440px] mx-auto px-10 lg:px-16" style={{ paddingTop: 64, paddingBottom: 72 }}>
                <div className="flex items-center gap-3 mb-14">
                  <div style={{ width: 20, height: 1, background: C.amber }} />
                  <span className="font-label text-[7px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Our Journey</span>
                </div>
                {/* Horizontal scrollable timeline */}
                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex items-start gap-0 min-w-max pb-2">
                    {TIMELINE.map((t, ti) => (
                      <motion.div key={t.year}
                        className="flex flex-col items-center"
                        style={{ width: 180 }}
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.45, delay: ti * 0.06 }}>
                        {/* Year + label */}
                        <div className="text-center mb-5">
                          <p className="font-serif font-bold mb-1"
                            style={{ fontSize: '1.2rem', color: ti === TIMELINE.length - 1 ? C.amber : 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                            {t.year}
                          </p>
                          <p className="font-sans font-semibold text-[11px]" style={{ color: ti === TIMELINE.length - 1 ? C.amberLt : 'rgba(255,255,255,0.38)' }}>
                            {t.label}
                          </p>
                        </div>
                        {/* Node + line */}
                        <div className="flex items-center w-full relative mb-5">
                          <div className="flex-1 h-px" style={{ background: ti > 0 ? 'rgba(255,255,255,0.1)' : 'transparent' }} />
                          <div className="w-3 h-3 rounded-full shrink-0 z-10"
                            style={{ background: ti === TIMELINE.length - 1 ? C.amber : 'rgba(255,255,255,0.2)', boxShadow: ti === TIMELINE.length - 1 ? `0 0 0 4px ${C.amber}30` : 'none' }} />
                          <div className="flex-1 h-px" style={{ background: ti < TIMELINE.length - 1 ? 'rgba(255,255,255,0.1)' : 'transparent' }} />
                        </div>
                        {/* Description */}
                        <p className="font-sans text-[11px] text-center leading-relaxed px-3"
                          style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {t.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ══ FULL-BLEED GALLERY ══ */}
            <div style={{ background: '#0C0A07' }}>
              <div className="max-w-[1440px] mx-auto px-10 lg:px-16" style={{ paddingTop: 64, paddingBottom: 72 }}>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 20, height: 1, background: C.amber }} />
                    <span className="font-label text-[7px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Image Gallery</span>
                  </div>
                  <span className="font-label text-[6.5px] tracking-[0.18em] uppercase hidden md:block" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Click to Enlarge
                  </span>
                </div>
                {/* 4-col masonry */}
                <div style={{ columns: 4, columnGap: 10 }}>
                  {GALLERY_IMAGES.map((g, gi) => (
                    <motion.div key={g.id}
                      className="group cursor-pointer break-inside-avoid overflow-hidden"
                      style={{ borderRadius: 8, marginBottom: 10, position: 'relative' }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: gi * 0.04 }}
                      onClick={() => setLightbox({ idx: gi })}>
                      <motion.img
                        src={img(g.id, 480, gi % 3 === 0 ? 560 : gi % 3 === 1 ? 340 : 440)} alt={g.caption}
                        className="w-full object-cover block"
                        style={{ borderRadius: 8 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }} />
                      {/* Gold hover overlay */}
                      <motion.div className="absolute inset-0 flex items-end p-3"
                        style={{ borderRadius: 8, background: `linear-gradient(to top, ${C.amberDk}cc 0%, transparent 60%)` }}
                        initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}>
                        <p className="font-label text-[6px] tracking-[0.12em] text-white leading-tight">{g.caption}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ NEWSLETTER CTA — full bleed bold ══ */}
            <div style={{ background: C.ink, borderTop: `1px solid ${C.inkBorder}` }}>
              <div className="max-w-[1440px] mx-auto px-10 lg:px-16" style={{ paddingTop: 80, paddingBottom: 88 }}>
                <motion.div className="text-center"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.65 }}>
                  {/* Oversized eyebrow */}
                  <p className="font-label text-[7.5px] tracking-[0.4em] uppercase mb-6" style={{ color: C.amber }}>Stay Updated</p>
                  {/* Giant headline */}
                  <h2 className="font-serif font-bold mb-4 mx-auto"
                    style={{ fontSize: 'clamp(2.4rem,5vw,5.5rem)', color: C.bodyDark, letterSpacing: '-0.04em', lineHeight: 0.92, maxWidth: 820 }}>
                    Never Miss a<br />
                    <span style={{ color: C.amber, fontStyle: 'italic', fontWeight: 300 }}>ZiVIO Story.</span>
                  </h2>
                  <p className="font-sans mx-auto mb-10"
                    style={{ fontSize: 14, color: C.bodyMid, maxWidth: 480, lineHeight: 1.75 }}>
                    Follow our journey as we innovate, support communities, and deliver world-class lighting solutions globally.
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a href="#contact"
                      className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.24em] uppercase px-8 py-4 transition-all hover:-translate-y-0.5"
                      style={{ background: C.bodyDark, color: '#fff', borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}>
                      Subscribe to Updates <ArrowRight size={9} />
                    </a>
                    <a href="#contact"
                      className="inline-flex items-center gap-2 font-label text-[9px] tracking-[0.22em] uppercase px-8 py-4 transition-all hover:border-amber-500"
                      style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyMid, borderRadius: 4 }}>
                      Contact Us
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ══ LIGHTBOX ══ */}
            <AnimatePresence>
              {lbImg && (
                <motion.div className="fixed inset-0 z-[200] flex items-center justify-center"
                  style={{ background: 'rgba(4,3,1,0.94)', backdropFilter: 'blur(12px)' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setLightbox(null)}>
                  <motion.div className="relative max-w-4xl w-full px-4"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={e => e.stopPropagation()}>
                    <img src={img(lbImg.id, 1400, 900)} alt={lbImg.caption}
                      className="w-full object-cover" style={{ borderRadius: 12, maxHeight: '78vh' }} />
                    <div className="flex items-center justify-between mt-4 px-1">
                      <div className="flex items-center gap-3">
                        <button onClick={lbPrev} className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}>
                          <ChevronLeft size={13} />
                        </button>
                        <button onClick={lbNext} className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}>
                          <ChevronRight size={13} />
                        </button>
                        <p className="font-label text-[7px] tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbImg.caption}</p>
                      </div>
                      <button onClick={() => setLightbox(null)}
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onCareers, testimonials: propTestimonials }: { onCareers: () => void; testimonials?: any[] }) {
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewSent, setReviewSent] = useState(false)

  const defaultTestimonials = [
    { quote: 'ZiVIO delivered exceptional quality for our residential towers. Their attention to detail and on-time execution made all the difference.', name: 'Sushil Kadam', role: 'Project Head', company: 'Tata Realty', avatar: '1472099645785-5658abf4ff4e' },
    { quote: 'Working with ZiVIO on the Mahalaxmi facade was seamless. Their technical expertise and custom fixture solutions elevated the entire project.', name: 'Parshuram', role: 'Sr. Project Manager', company: 'Piramal Realty', avatar: '1507003211169-0a1dd7228f2d' },
    { quote: 'ZiVIO consistently delivers specification-grade luminaires with outstanding support. They are our go-to partner for every lighting design.', name: 'Sanchita Shinde', role: 'Principal Lighting Consultant', company: 'Shaviya Lighting Consultants', avatar: '1494790108755-2616b612b786' },
    { quote: 'From Hyderabad to Chennai and Pune, ZiVIO has been a reliable and technically superior partner across all our developments.', name: 'Vinayak Pawar', role: 'Head of Projects', company: 'KRC Infrastructure', avatar: '1500648767791-00dcc994a43e' },
    { quote: 'The ZiVIO team brought great professionalism and product quality to our sites. Delivery timelines and after-sales support are excellent.', name: 'Vaibhav Chandre', role: 'Project Manager', company: 'Tata Projects Ltd.', avatar: '1560250097-0b93528c311a' },
    { quote: 'ZiVIO\'s lighting solutions for our commercial sites have been outstanding. Their on-site coordination is truly world-class.', name: 'Basawraj', role: 'Site Engineer', company: 'Tata Projects Ltd.', avatar: '1519085360753-af0119f7cbe7' },
  ]

  const testimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials.map((t, ti) => ({
    quote: t.quote,
    name: t.name,
    role: t.role || defaultTestimonials[ti % defaultTestimonials.length].role,
    company: t.company || defaultTestimonials[ti % defaultTestimonials.length].company,
    avatar: t.avatar || defaultTestimonials[ti % defaultTestimonials.length].avatar,
  })) : defaultTestimonials

  const team = [
    { name: 'Shree Jirapure', role: 'CEO & Founder', avatar: '1560250097-0b93528c311a' },
    { name: 'Shridhar Morab', role: 'Business Head', avatar: '1507003211169-0a1dd7228f2d' },
    { name: 'Priya Jirapure', role: 'Regional Director', avatar: '1573496359142-b8d87734a5a2' },
    { name: 'Vinod Rao', role: 'HR Head', avatar: '1519085360753-af0119f7cbe7' },
    { name: 'Anjali Bunkar', role: 'Technical Head', avatar: '1494790108755-2616b612b786' },
    { name: 'Prakash Bane', role: 'Production Head', avatar: '1472099645785-5658abf4ff4e' },
  ]

  const socials = [
    { name: 'LinkedIn', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
    { name: 'Instagram', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
    { name: 'YouTube', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg> },
    { name: 'Twitter/X', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { name: 'Facebook', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
    { name: 'Pinterest', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg> },
    { name: 'Houzz', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0L.585 6.818v10.364L12 24l11.415-6.818V6.818L12 0zm0 2.182l9.006 5.385-3.75 2.246-5.256-2.85V2.182zm-1.5.546v4.525l-5.25 2.85-3.15-1.884L10.5 2.728zm-6.75 7.136l3.006 1.8v5.4L3.75 15.25V9.864zm8.25 1.8l3 1.8v3.872l-3 1.788V11.664zm-1.5 7.65l-3.75-2.244v-5.4l3.75 2.25v5.394zm1.5.006V13.93l3 1.8v3.628l-3 1.762zm4.5-2.682l-3-1.8v-3.87l3-1.8v7.47z" /></svg> },
    { name: 'WhatsApp', href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
  ]

  const productLinks = [
    { label: 'Outdoor Lighting', count: 168, slug: 'outdoor' },
    { label: 'Indoor Lighting', count: 92, slug: 'indoor' },
    { label: 'Facade Lighting', count: 64, slug: 'facade' },
    { label: 'Solar Lighting', count: 52, slug: 'solar' },
    { label: 'Lighting Poles', count: 53, slug: 'poles' },
    { label: 'Smart Lighting', count: 28, slug: 'smart' },
  ]

  return (
    <footer style={{ background: C.ink }}>

      {/* ══ TESTIMONIALS — auto-sliding carousel ══ */}
      <TestimonialSlider testimonials={testimonials} C={C} />

      {/* ══ TEAM SECTION ══ */}
      <div style={{ background: C.ink, borderBottom: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1440px] mx-auto px-8 lg:px-14" style={{ paddingTop: 56, paddingBottom: 64 }}>

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-px" style={{ background: C.amber }} />
                <span className="font-label text-[7px] tracking-[0.3em] uppercase" style={{ color: C.amber }}>Meet Our Team</span>
              </div>
              <h2 className="font-serif font-semibold leading-tight" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                The People Behind ZiVIO
              </h2>
            </div>
            <a href="#contact"
              className="inline-flex items-center gap-2 font-label text-[7.5px] tracking-[0.2em] uppercase transition-all hover:gap-3"
              style={{ color: C.bodyMid, borderBottom: `1px solid ${C.inkBorder}`, paddingBottom: 4 }}>
              Join Our Team <ArrowRight size={8} />
            </a>
          </div>

          {/* 6-col compact roster */}
          {(() => {
            const localPhotos: Record<string, string> = {
              'Shree Jirapure': shreeJirapurePhoto,
              'Priya Jirapure': priyaJirapurePhoto,
              'Anjali Bunkar': anjaliBunkarPhoto,
              'Shridhar Morab': shridharMorabPhoto,
            }
            const unsplashPhotos: Record<string, string> = {
              'Vinod Rao': 'photo-1725568124885-4a8b4758f1fc',
              'Prakash Bane': 'photo-1774660810047-46e73147b32b',
            }
            return (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {team.map((m, mi) => {
                  const isLocal = !!localPhotos[m.name]
                  const src = isLocal
                    ? localPhotos[m.name]
                    : `https://images.unsplash.com/${unsplashPhotos[m.name]}?w=240&h=320&fit=crop&crop=faces&auto=format&q=85`

                  return (
                    <motion.div key={m.name}
                      className="group cursor-default flex flex-col"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: mi * 0.06 }}>

                      {/* Photo frame */}
                      <motion.div className="relative overflow-hidden"
                        style={{ borderRadius: 12, aspectRatio: '2/3', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        whileHover={{ boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 0 0 2px ${C.amber}` }}
                        transition={{ duration: 0.3 }}>
                        <motion.img
                          src={src}
                          alt={m.name}
                          className="w-full h-full object-cover object-top"
                          initial={{ scale: 1.06 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                        {/* Bottom gradient for index legibility */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)' }} />
                        {/* Index bottom-right */}
                        <span className="absolute bottom-2.5 right-3 font-sans font-bold text-[9px] tracking-[0.06em]"
                          style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {String(mi + 1).padStart(2, '0')}
                        </span>
                        {/* Amber accent line at bottom */}
                        <motion.div className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, ${C.amber}, ${C.amberLt})`, transformOrigin: 'left' }}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.35 }} />
                      </motion.div>

                      {/* Name + role */}
                      <div className="pt-3 px-0.5">
                        <p className="font-serif font-bold leading-snug" style={{ fontSize: '0.82rem', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                          {m.name}
                        </p>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                          style={{ background: `${C.amber}18`, border: `1px solid ${C.amber}44` }}>
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.amber }} />
                          <p className="font-sans font-bold text-[6px] tracking-[0.12em] uppercase" style={{ color: C.amberDk }}>
                            {m.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )
          })()}

        </div>
      </div>

      {/* ══ PRODUCT PURCHASE + REVIEW CTAs ══ */}
      <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Purchase */}
          <div className="flex flex-col justify-between px-8 lg:px-12 py-8 gap-5"
            style={{ borderRight: `1px solid ${C.inkBorder}` }}>
            <div>
              <span className="font-label text-[7.5px] tracking-[0.28em] uppercase block mb-2" style={{ color: C.amber }}>Shop & Specify</span>
              <h3 className="font-serif font-semibold" style={{ fontSize: '1.15rem', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                Request a Product Quote
              </h3>
              <p className="text-xs leading-relaxed mt-1.5" style={{ color: C.bodyMid, maxWidth: 360 }}>
                Browse our full catalogue online or contact our sales team for project-specific pricing, samples, and technical specifications.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-all hover:-translate-y-px"
                style={{ background: C.bodyDark, color: C.ink, borderRadius: 10 }}>
                Browse Products <ArrowRight size={9} />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-all hover:opacity-80"
                style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyMid, borderRadius: 10 }}>
                Request Quote
              </a>
            </div>
          </div>
          {/* Leave a Review */}
          <div className="flex flex-col justify-between px-8 lg:px-12 py-8 gap-5">
            <div>
              <span className="font-label text-[7.5px] tracking-[0.28em] uppercase block mb-2" style={{ color: C.amber }}>Share Your Experience</span>
              <h3 className="font-serif font-semibold" style={{ fontSize: '1.15rem', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                Leave a Review
              </h3>
              <p className="text-xs leading-relaxed mt-1.5" style={{ color: C.bodyMid, maxWidth: 360 }}>
                Have you worked with ZiVIO LIFE? We'd love to hear your experience — your review helps other specifiers and architects make confident decisions.
              </p>
            </div>
            <button onClick={() => setReviewOpen(true)}
              className="self-start inline-flex items-center gap-2 px-5 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-all hover:-translate-y-px"
              style={{ background: C.amber, color: '#fff', borderRadius: 10 }}>
              Write a Review ★
            </button>
          </div>
        </div>
      </div>

      {/* ══ REVIEW MODAL ══ */}
      <AnimatePresence>
        {reviewOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
            onClick={() => setReviewOpen(false)}>
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg p-8 rounded-2xl"
              style={{ background: '#FFFFFF', border: `1px solid ${C.inkBorder}`, boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setReviewOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ border: `1px solid ${C.inkBorder}`, borderRadius: 8 }}>
                <X size={12} style={{ color: C.bodyLight }} />
              </button>
              {reviewSent ? (
                <div className="flex flex-col items-center text-center py-6 gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${C.amber}18` }}>
                    <CheckCircle size={20} style={{ color: C.amber }} />
                  </div>
                  <h3 className="font-serif font-semibold" style={{ fontSize: '1.2rem', color: C.bodyDark }}>Thank You!</h3>
                  <p className="text-sm" style={{ color: C.bodyMid }}>Your review has been submitted. We appreciate your feedback.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-5 h-px" style={{ background: C.amber }} />
                    <span className="font-label text-[7.5px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Rate Your Experience</span>
                  </div>
                  <h3 className="font-serif font-semibold mb-5" style={{ fontSize: '1.3rem', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                    Leave a Review
                  </h3>
                  {/* Star rating */}
                  <div className="flex gap-2 mb-5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(s)}
                        className="transition-transform hover:scale-110">
                        <svg viewBox="0 0 24 24" width="28" height="28"
                          fill={(hoverRating || rating) >= s ? C.amber : 'none'}
                          stroke={C.amber} strokeWidth="1.5">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="self-center font-label text-[9px] tracking-wider ml-1" style={{ color: C.bodyLight }}>
                        {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Share your experience with ZiVIO products or service…"
                    className="w-full text-sm outline-none resize-none p-4 rounded-lg mb-4"
                    style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyDark, background: C.ink }} />
                  <button
                    onClick={() => { if (rating > 0 && reviewText.trim()) { setReviewSent(true) } }}
                    disabled={rating === 0 || !reviewText.trim()}
                    className="w-full py-3 font-label text-[9px] tracking-[0.16em] uppercase transition-opacity disabled:opacity-40 rounded-lg"
                    style={{ background: C.bodyDark, color: C.ink }}>
                    Submit Review
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ TOP DIVIDER ══ */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.amber} 30%, ${C.amber} 70%, transparent)` }} />

      {/* ══ MAIN FOOTER GRID ══ */}
      <div style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">

          {/* Brand + Socials */}
          <div className="lg:col-span-4 px-8 lg:px-12 py-10" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
            <BrandLogo theme="light" size="lg" className="mb-5" />
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: C.bodyMid, maxWidth: 260 }}>
              A global manufacturer of premium architectural lighting. Engineering precision, delivering excellence across 68 countries.
            </p>
            {/* Certifications */}
            <div className="flex flex-wrap gap-1.5 mb-7">
              {['ISO 9001', 'CE', 'RoHS', 'LM79', 'LM80', 'IK10'].map(cert => (
                <span key={cert} className="font-label text-[6.5px] tracking-[0.14em] uppercase px-2 py-1"
                  style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyLight }}>
                  {cert}
                </span>
              ))}
            </div>
            {/* Socials grid */}
            <p className="font-label text-[7px] tracking-[0.22em] uppercase mb-3" style={{ color: C.bodyLight }}>Follow Us</p>
            <div className="grid grid-cols-4 gap-2">
              {socials.map(s => (
                <a key={s.name} href={s.href} title={s.name}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 hover:border-[#B5722A]"
                  style={{ border: `1px solid ${C.inkBorder}`, color: C.bodyMid }}>
                  {s.svg}
                  <span className="font-label text-[6px] tracking-wider truncate w-full text-center px-1" style={{ color: C.bodyLight }}>
                    {s.name.split('/')[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3 px-8 py-10" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
            <p className="font-label text-[7.5px] tracking-[0.28em] uppercase mb-6" style={{ color: C.amber }}>Products</p>
            <ul>
              {productLinks.map(({ label, count, slug }) => (
                <li key={label}>
                  <a href={`/products/${slug}`}
                    className="group flex items-center justify-between py-3 transition-colors"
                    style={{ borderBottom: `1px solid ${C.inkBorder}` }}>
                    <span className="text-[13px] group-hover:text-[#B5722A] transition-colors" style={{ color: C.bodyMid }}>{label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-label text-[8px] tracking-wider" style={{ color: C.bodyLight }}>{count}</span>
                      <span className="font-label text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `${C.amber}18`, color: C.amber, borderRadius: 4 }}>
                        Enquire
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact"
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 font-label text-[8px] tracking-[0.14em] uppercase transition-all hover:opacity-85 rounded-lg"
              style={{ background: C.bodyDark, color: C.ink }}>
              Request a Quote <ArrowRight size={9} />
            </a>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 px-8 py-10" style={{ borderRight: `1px solid ${C.inkBorder}` }}>
            <p className="font-label text-[7.5px] tracking-[0.28em] uppercase mb-6" style={{ color: C.amber }}>Company</p>
            <ul>
              {['About', 'Projects', 'Technology', 'Downloads', 'News', 'Careers', 'ZiVIO CARE', 'Partners'].map(link => (
                <li key={link}>
                  <a href={link === 'Careers' ? undefined : `#${link.toLowerCase()}`}
                    onClick={link === 'Careers' ? (e) => { e.preventDefault(); onCareers() } : undefined}
                    className="flex items-center py-3 group transition-colors"
                    style={{ borderBottom: `1px solid ${C.inkBorder}`, cursor: 'pointer' }}>
                    <span className="text-[13px] group-hover:text-[#111] transition-colors" style={{ color: C.bodyMid }}>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 px-8 py-10">
            <p className="font-label text-[7.5px] tracking-[0.28em] uppercase mb-6" style={{ color: C.amber }}>Contact</p>
            <div className="flex flex-col gap-5">
              {[
                { icon: MapPin, line1: 'Bandra Kurla Complex', line2: 'Mumbai 400 051, India' },
                { icon: Phone, line1: '+91 22 4567 8900', line2: 'Mon–Fri 9am–6pm IST' },
                { icon: Mail, line1: 'info@ziviolife.com', line2: 'Response within 24h' },
              ].map(({ icon: Icon, line1, line2 }) => (
                <div key={line1} className="flex items-start gap-3">
                  <Icon size={11} className="mt-0.5 shrink-0" style={{ color: C.amber }} />
                  <div>
                    <p className="text-[13px] font-medium leading-tight" style={{ color: C.bodyDark }}>{line1}</p>
                    <p className="font-label text-[7px] tracking-wider mt-0.5" style={{ color: C.bodyLight }}>{line2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-label text-[7.5px] tracking-wider" style={{ color: C.bodyLight }}>
          © {new Date().getFullYear()} ZiVIO LIFE Pvt. Ltd. All rights reserved.
        </p>
        <p className="font-label text-[7.5px] tracking-wider" style={{ color: C.bodyLight }}>
          Designed &amp; Engineered in India · Global Reach
        </p>
        <div className="flex gap-5">
          {['Privacy Policy', 'Cookie Policy', 'Terms of Use'].map(link => (
            <a key={link} href="#"
              className="font-label text-[7.5px] tracking-wider transition-colors hover:text-[#111]"
              style={{ color: C.bodyLight }}>
              {link}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}

// ─── SEARCH DATA ──────────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  // Products
  { type: 'Product', title: 'Bollards', desc: 'IP67 · 6–18W · Tunable White · Outdoor', section: 'products' },
  { type: 'Product', title: 'Tree Uplighters', desc: 'IP65 · 8–30W · Narrow Beam · Garden', section: 'products' },
  { type: 'Product', title: 'Post Top Luminaires', desc: 'IP66 · 30–150W · DALI-2 · Street', section: 'products' },
  { type: 'Product', title: 'Street & Area Lighting', desc: 'IP66 · 40–250W · EN 13201 · Urban', section: 'products' },
  { type: 'Product', title: 'In-Ground Luminaires', desc: 'IP68 · 6–24W · RGBW · Recessed', section: 'products' },
  { type: 'Product', title: 'Flood Lights', desc: 'IP66 · 50–500W · IK08 · Facade', section: 'products' },
  { type: 'Product', title: 'Downlights', desc: 'IP44 · 6–24W · DALI-2 · Indoor', section: 'products' },
  { type: 'Product', title: 'Linear Lighting Systems', desc: 'IP20 · up to 30W/m · Tunable White', section: 'products' },
  { type: 'Product', title: 'Surface Spotlights', desc: 'IP20 · 10–35W · CRI >92 · Track', section: 'products' },
  { type: 'Product', title: 'Architectural Pendant Lights', desc: 'IP20 · 6–18W · RGBW · Indoor', section: 'products' },
  { type: 'Product', title: 'Linear Facade Systems', desc: 'IP66 · up to 24W/m · RGBW', section: 'products' },
  { type: 'Product', title: 'Wall Washers', desc: 'IP65 · 10–50W · Tunable White · Facade', section: 'products' },
  { type: 'Product', title: 'Grazers', desc: 'IP67 · 6–18W · Narrow Beam · Facade', section: 'products' },
  { type: 'Product', title: 'Solar Street Lights', desc: '40–120W · LiFePO4 Battery · Standalone', section: 'products' },
  { type: 'Product', title: 'Solar Garden Lights', desc: '6–18W · Auto Dusk-to-Dawn · IP67', section: 'products' },
  { type: 'Product', title: 'DALI-2 Control System', desc: 'EN 62386 · 64 Groups · Smart', section: 'products' },
  { type: 'Product', title: 'Architectural Poles', desc: '3–10m · Custom Finishes · Galvanised', section: 'products' },
  { type: 'Product', title: 'High Mast Poles', desc: '15–40m · Winch System · Hot-dip', section: 'products' },
  // Projects
  { type: 'Project', title: 'MHADA', desc: 'Residential · Mumbai, India · External Lighting · 2023', section: 'projects' },
  { type: 'Project', title: 'Tata Realty — Intelian Park', desc: 'Commercial · Mumbai, India · Facade & Landscape · 2023', section: 'projects' },
  { type: 'Project', title: 'Tata Realty — OBLP Bangalore', desc: 'Commercial · Bangalore, India · 2023', section: 'projects' },
  { type: 'Project', title: 'KRC — Whispering Height', desc: 'Residential · Mumbai, India · 2022', section: 'projects' },
  { type: 'Project', title: 'Piramal — Mahalaxmi', desc: 'Residential · Mumbai, India · 2023', section: 'projects' },
  { type: 'Project', title: 'Skycity Mall — Kandivali', desc: 'Retail · Mumbai, India · 2023', section: 'projects' },
  { type: 'Project', title: 'Oberoi Mall — Goregaon', desc: 'Retail · Mumbai, India · 2022', section: 'projects' },
  { type: 'Project', title: 'Phoenix Mall — Pune', desc: 'Retail · Pune, India · 2023', section: 'projects' },
  { type: 'Project', title: 'Indigo Hotel', desc: 'Hospitality · Bangkok, Thailand · 2024', section: 'projects' },
  { type: 'Project', title: 'DBH Hotel', desc: 'Hospitality · Dubai, UAE · 2024', section: 'projects' },
  { type: 'Project', title: 'KRC — Building 12', desc: 'Commercial · Hyderabad, India · 2023', section: 'projects' },
  { type: 'Project', title: 'KRC — Chennai', desc: 'Commercial · Chennai, India · 2023', section: 'projects' },
  { type: 'Project', title: 'KRC — Pune Kharadi', desc: 'Commercial · Pune, India · 2024', section: 'projects' },
  { type: 'Project', title: 'KRC — Articia', desc: 'Commercial · India · 2024', section: 'projects' },
  { type: 'Project', title: 'Piramal — Bhandup', desc: 'Residential · Mumbai, India · 2024', section: 'projects' },
  { type: 'Project', title: 'BARC — Chembur', desc: 'Institutional · Mumbai, India · 2023', section: 'projects' },
  // Categories
  { type: 'Category', title: 'Outdoor Lighting', desc: '168 products — Bollards, Street, Uplighters', section: 'products' },
  { type: 'Category', title: 'Indoor Lighting', desc: '92 products — Downlights, Linear, Track', section: 'products' },
  { type: 'Category', title: 'Facade Lighting', desc: '64 products — Washers, Grazers, Linear', section: 'products' },
  { type: 'Category', title: 'Solar Lighting', desc: '52 products — Street, Garden, High Mast', section: 'products' },
  { type: 'Category', title: 'Smart Lighting', desc: '28 products — DALI-2, DMX, IoT', section: 'products' },
  { type: 'Category', title: 'Lighting Poles', desc: '53 products — Architectural, Octagonal, High Mast', section: 'products' },
  // Info
  { type: 'Info', title: 'About ZiVIO', desc: 'Company story, vision, mission, team', section: 'about' },
  { type: 'Info', title: 'Download Catalogue', desc: 'Product catalogue & company profile PDF', section: 'downloads' },
  { type: 'Info', title: 'Contact Us', desc: 'Sales, technical support, project inquiry', section: 'contact' },
  { type: 'Info', title: 'DALI-2 Technology', desc: 'Smart lighting control protocol', section: 'products' },
  { type: 'Info', title: 'IP67 / IP68 Ratings', desc: 'Waterproof outdoor luminaire standards', section: 'products' },
]

// ─── SEARCH MODAL ─────────────────────────────────────────────────────────────
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) { setQ(''); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const results = q.trim().length < 2 ? [] : SEARCH_INDEX.filter(item =>
    [item.title, item.desc, item.type].some(f => f.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 10)

  const typeColor: Record<string, string> = {
    Product: C.amber, Project: '#6366F1', Category: '#10B981', Info: C.bodyLight,
  }
  const typeIcon: Record<string, string> = {
    Product: '◈', Project: '◉', Category: '▤', Info: '○',
  }

  const QUICK = ['Outdoor Lighting', 'Facade', 'Solar', 'DALI-2', 'Mumbai Projects', 'Catalogue']
  const TRENDING = ['LED Streetlight', 'Architectural Facade', 'Smart Controls', 'Indoor Panel']

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[200] flex flex-col items-center px-4"
          style={{ paddingTop: 'clamp(48px, 8vh, 96px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}>

          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: 'rgba(6,5,10,0.72)', backdropFilter: 'blur(16px)' }} />

          {/* Modal */}
          <motion.div className="relative w-full max-w-[680px] overflow-hidden"
            style={{ borderRadius: 20, background: C.navyDark, border: `1.5px solid rgba(182,141,64,0.22)`, boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)' }}
            initial={{ y: -32, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}>

            {/* ── Search input bar ── */}
            <div className="relative flex items-center gap-4 px-6 py-5"
              style={{ borderBottom: `1px solid ${focused ? 'rgba(182,141,64,0.35)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.2s' }}>
              {/* Animated search icon */}
              <motion.div animate={{ scale: focused ? 1.12 : 1 }} transition={{ duration: 0.2 }}>
                <Search size={18} style={{ color: focused ? C.amber : 'rgba(255,255,255,0.35)', transition: 'color 0.2s', flexShrink: 0 }} />
              </motion.div>

              <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                placeholder="Search products, projects, solutions…"
                className="flex-1 bg-transparent outline-none font-sans"
                style={{ fontSize: 16, color: '#fff', letterSpacing: '-0.01em' }} />

              {/* Clear / count */}
              <AnimatePresence>
                {q && (
                  <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                    onClick={() => { setQ(''); inputRef.current?.focus() }}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <X size={12} />
                  </motion.button>
                )}
              </AnimatePresence>

              <button onClick={onClose}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-sans text-[9px] font-semibold tracking-widest uppercase transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                ESC
              </button>
            </div>

            {/* ── Results ── */}
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="overflow-y-auto" style={{ maxHeight: 420 }}>
                  <div className="px-6 pt-4 pb-1 flex items-center justify-between">
                    <span className="font-label text-[7px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </span>
                    <span className="font-label text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>↑↓ navigate · ↵ open</span>
                  </div>
                  {results.map((item, i) => (
                    <motion.a key={i} href={`#${item.section}`} onClick={onClose}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-4 px-6 py-3.5 group transition-all"
                      style={{ borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {/* Type badge */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${typeColor[item.type]}18`, border: `1px solid ${typeColor[item.type]}30` }}>
                        <span style={{ fontSize: 12, color: typeColor[item.type] }}>{typeIcon[item.type]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-semibold text-[13px] leading-tight mb-0.5 truncate" style={{ color: '#fff' }}>{item.title}</p>
                        <p className="font-sans text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.38)' }}>{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-label text-[6.5px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full"
                          style={{ background: `${typeColor[item.type]}18`, color: typeColor[item.type] }}>
                          {item.type}
                        </span>
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                          style={{ color: C.amber }} />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>

              ) : q.trim().length >= 2 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-14">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Search size={20} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </div>
                  <p className="font-sans font-semibold text-[15px] mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>No results found</p>
                  <p className="font-sans text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    No matches for "<span style={{ color: C.amber }}>{q}</span>"
                  </p>
                </motion.div>

              ) : (
                <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-6 py-5 flex flex-col gap-6">

                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={10} style={{ color: C.amber }} />
                      <span className="font-label text-[7px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map(s => (
                        <button key={s} onClick={() => setQ(s)}
                          className="flex items-center gap-1.5 font-sans text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:border-amber-400"
                          style={{ background: 'rgba(182,141,64,0.1)', color: C.amber, border: `1px solid rgba(182,141,64,0.25)` }}>
                          <TrendingUp size={8} /> {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick links */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={10} style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <span className="font-label text-[7px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Quick Search</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK.map(s => (
                        <button key={s} onClick={() => setQ(s)}
                          className="font-sans text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Products', color: C.amber, icon: '◈' },
                      { label: 'Projects', color: '#6366F1', icon: '◉' },
                      { label: 'Downloads', color: '#10B981', icon: '▤' },
                      { label: 'Contact', color: '#F43F5E', icon: '◎' },
                    ].map(({ label, color, icon }) => (
                      <button key={label} onClick={() => setQ(label)}
                        className="flex flex-col items-center gap-2 py-4 rounded-xl transition-all hover:scale-105"
                        style={{ background: `${color}0e`, border: `1px solid ${color}22` }}>
                        <span style={{ fontSize: 18, color }}>{icon}</span>
                        <span className="font-sans font-semibold text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Footer bar ── */}
            <div className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-4">
                {[['↵', 'Open'], ['↑↓', 'Navigate'], ['Esc', 'Close']].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <span className="font-sans text-[9px] px-1.5 py-0.5 rounded font-medium"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>{k}</span>
                    <span className="font-label text-[7px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.amber }} />
                <span className="font-label text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>ZiVIO Search</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── CAREERS PAGE ─────────────────────────────────────────────────────────────
const VACANCIES = [
  {
    id: 1,
    title: 'Area Sales Manager',
    location: 'Mumbai',
    department: 'Sales & Business Development',
    experience: '5–8 Years',
    type: 'Full Time',
    badge: 'Electrical Background Required',
    overview: 'Drive business growth by developing channel partners, managing key accounts, and identifying project opportunities across the Mumbai region. Candidates must hold a degree/diploma in Electrical Engineering with experience in the lighting, electrical, or building materials industry. Deep knowledge of electrical specifications, DALI systems, and lighting controls preferred.',
    criteria: ['B.E. / Diploma in Electrical Engineering', 'Experience in lighting / electrical / building materials', 'Strong channel & key account management', 'Knowledge of DALI, lighting controls, and specifications', 'Established relationships with architects, consultants & contractors'],
  },
  {
    id: 2,
    title: 'Area Sales Manager',
    location: 'Pune',
    department: 'Sales & Business Development',
    experience: '5–8 Years',
    type: 'Full Time',
    badge: 'Electrical Background Required',
    overview: 'Lead regional sales initiatives in Pune, strengthen distributor relationships, and work closely with architects, consultants, contractors, and project developers to achieve business objectives. Electrical engineering background essential for engaging with technical specifications and client requirements.',
    criteria: ['B.E. / Diploma in Electrical Engineering', 'Experience in lighting / electrical industry', 'Project sales and specification-driven selling', 'Strong technical presentation skills', 'Ability to manage and grow distribution network'],
  },
  {
    id: 3,
    title: 'Production Manager',
    location: 'Vasao Plant, Navi Mumbai',
    department: 'Production & Manufacturing',
    experience: '8–12 Years',
    type: 'Full Time',
    badge: 'Manufacturing Leadership',
    overview: 'Lead manufacturing operations at our Vasao Plant, optimize production planning, maintain quality standards, improve operational efficiency, and ensure timely delivery. Drive continuous process improvements across LED luminaire assembly lines, coordinate with procurement and quality teams, and maintain full compliance with ISO and safety norms.',
    criteria: ['B.E. / Diploma in Mechanical / Electrical / Production Engineering', 'Experience in LED luminaire or electronics manufacturing', 'Proficiency in ERP-based production planning', 'Strong knowledge of ISO quality standards & lean manufacturing', 'Proven track record in team leadership at plant level'],
  },
]

const GALLERY_CAREERS = [
  '1521737604893-d14cc237f11d', '1556761175-4b46a572b786', '1517245386807-bb43f82c33c4',
  '1600880292203-757bb62b4baf', '1581091226825-a6a2a5aee158', '1573496359142-b8d87734a5a2',
  '1542744173-8e7e53415bb0', '1573497491765-dccce02b29df',
]

function CareersPage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', location: '', position: '', experience: '',
    company: '', currentCtc: '', expectedCtc: '', notice: '', linkedin: '', message: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', mobile: '', message: '' })
  const [inquirySent, setInquirySent] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f.type)) setResumeFile(f)
  }

  const handleApply = (jobId: number) => {
    const v = VACANCIES.find(v => v.id === jobId)!
    setSelectedJob(jobId)
    setFormData(d => ({ ...d, position: v.title + ' – ' + v.location }))
    setTimeout(() => document.getElementById('careers-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }
  const handleInquiry = (e: React.FormEvent) => { e.preventDefault(); setInquirySent(true) }

  const inp = (field: keyof typeof formData, placeholder: string, type = 'text') => (
    <input type={type} placeholder={placeholder} value={formData[field]}
      onChange={e => setFormData(d => ({ ...d, [field]: e.target.value }))}
      className="w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none transition-all"
      style={{ background: C.inkMid, border: `1.5px solid ${C.inkBorder}`, color: C.bodyDark }}
      onFocus={e => (e.target.style.borderColor = C.amber)}
      onBlur={e => (e.target.style.borderColor = C.inkBorder)} />
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 48 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] overflow-y-auto"
          style={{ background: C.ink }}>

          {/* Close */}
          <button onClick={onClose}
            className="fixed top-5 right-6 z-[90] flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-[11px] tracking-wide uppercase transition-all hover:opacity-80"
            style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.06em', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <X size={13} /> Close
          </button>

          {/* ══ HERO ══ */}
          <div className="relative overflow-hidden" style={{ height: '72vh', minHeight: 520 }}>
            <motion.div className="absolute inset-0"
              initial={{ scale: 1.07 }} animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}>
              <img src={img('1521737604893-d14cc237f11d', 1920, 1080)} alt="Careers at ZiVIO"
                className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(4,3,1,0.88) 0%, rgba(4,3,1,0.48) 50%, rgba(4,3,1,0.14) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,3,1,0.9) 0%, transparent 48%)' }} />
            <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-20" style={{ paddingTop: 80 }}>
              <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-7 h-px" style={{ background: C.amber }} />
                  <span className="font-label text-[8px] tracking-[0.36em] uppercase" style={{ color: C.amber }}>ZiVIO LIFE · Careers</span>
                </div>
                <h1 className="font-sans font-black leading-none mb-5" style={{ fontSize: 'clamp(36px,5.5vw,76px)', color: '#fff', letterSpacing: '-0.03em', maxWidth: 760 }}>
                  Build Your Career.<br />Shape the Future of Lighting.
                </h1>
                <p className="font-sans mb-8" style={{ fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.7)', maxWidth: 560, lineHeight: 1.65 }}>
                  Join a team driven by innovation, engineering excellence, and a commitment to creating world-class lighting solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 font-sans font-bold text-[13px] tracking-wide rounded-xl transition-all hover:opacity-90"
                    style={{ background: C.amber, color: '#fff', letterSpacing: '0.04em' }}>
                    View Open Positions <ArrowRight size={14} />
                  </button>
                  <button onClick={() => document.getElementById('careers-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 font-sans font-semibold text-[13px] tracking-wide rounded-xl transition-all hover:bg-white/10"
                    style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', letterSpacing: '0.04em' }}>
                    Submit Your Resume
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ══ WHY WORK WITH US ══ */}
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
            <div className="text-center mb-14">
              <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Why ZiVIO LIFE</span>
              <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>Why Work With Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: 'Innovation', desc: 'Work with advanced technology and modern manufacturing processes at the forefront of LED lighting.' },
                { icon: TrendingUp, title: 'Career Growth', desc: 'Continuous learning, leadership development, and clear pathways for advancement.' },
                { icon: Globe, title: 'Collaborative Culture', desc: 'Join a passionate team focused on quality, innovation, and customer success.' },
                { icon: Award, title: 'Meaningful Impact', desc: 'Contribute to projects that illuminate commercial, industrial, and architectural spaces worldwide.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(182,141,64,0.12)' }}
                  className="rounded-2xl p-7 transition-all"
                  style={{ background: C.inkCard, border: `1px solid ${C.inkBorder}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${C.amber}14` }}>
                    <Icon size={20} style={{ color: C.amber }} />
                  </div>
                  <h3 className="font-sans font-bold mb-2" style={{ fontSize: 15, color: C.bodyDark }}>{title}</h3>
                  <p className="font-sans text-[13px] leading-relaxed" style={{ color: C.bodyMid }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══ OPEN POSITIONS ══ */}
          <div id="open-positions" className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
            <div className="mb-12">
              <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Now Hiring</span>
              <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>Current Open Positions</h2>
            </div>
            <div className="flex flex-col gap-6">
              {VACANCIES.map((v, i) => (
                <motion.div key={v.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl p-8 transition-all"
                  style={{ background: C.inkCard, border: `1.5px solid ${selectedJob === v.id ? C.amber : C.inkBorder}`, boxShadow: selectedJob === v.id ? `0 0 0 3px ${C.amber}18` : 'none' }}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-label text-[7.5px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                          style={{ background: `${C.amber}16`, color: C.amber }}>{v.badge}</span>
                        <span className="font-label text-[7.5px] tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                          style={{ background: C.inkMid, color: C.bodyLight }}>{v.type}</span>
                      </div>
                      <h3 className="font-sans font-black mb-1" style={{ fontSize: 22, color: C.bodyDark, letterSpacing: '-0.01em' }}>{v.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="flex items-center gap-1.5 font-sans text-[12px]" style={{ color: C.bodyMid }}><MapPin size={11} style={{ color: C.amber }} />{v.location}</span>
                        <span className="font-sans text-[12px]" style={{ color: C.bodyMid }}>· {v.department}</span>
                        <span className="font-sans text-[12px]" style={{ color: C.bodyMid }}>· {v.experience}</span>
                      </div>
                      <p className="font-sans text-[13px] leading-relaxed mb-5" style={{ color: C.bodyMid }}>{v.overview}</p>
                      <div>
                        <p className="font-sans font-semibold text-[11px] uppercase tracking-wide mb-2" style={{ color: C.bodyDark }}>Key Requirements</p>
                        <ul className="flex flex-col gap-1.5">
                          {v.criteria.map(c => (
                            <li key={c} className="flex items-start gap-2 font-sans text-[12px]" style={{ color: C.bodyMid }}>
                              <CheckCircle size={11} className="mt-0.5 shrink-0" style={{ color: C.amber }} />{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <button onClick={() => handleApply(v.id)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-[12px] tracking-wide uppercase transition-all hover:opacity-85"
                        style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                        Apply Now <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══ RECRUITMENT TIMELINE ══ */}
          <div style={{ background: C.navyDark }} className="py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
              <div className="text-center mb-14">
                <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Our Process</span>
                <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(22px,3vw,36px)', color: '#fff', letterSpacing: '-0.02em' }}>Recruitment Process</h2>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-0 relative">
                <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(to right, transparent, ${C.amber}, transparent)` }} />
                {[
                  { icon: CheckCircle, step: '01', label: 'Application\nSubmitted' },
                  { icon: Shield, step: '02', label: 'HR\nScreening' },
                  { icon: Cpu, step: '03', label: 'Technical\nInterview' },
                  { icon: Star, step: '04', label: 'Final\nDiscussion' },
                  { icon: Award, step: '05', label: 'Offer &\nOnboarding' },
                ].map(({ icon: Icon, step, label }, i) => (
                  <motion.div key={step}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                    className="flex flex-col items-center gap-3 relative z-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: C.navyMid, border: `2px solid ${C.amber}`, boxShadow: `0 0 20px ${C.amber}30` }}>
                      <Icon size={22} style={{ color: C.amber }} />
                    </div>
                    <span className="font-label text-[8px] tracking-[0.18em]" style={{ color: C.amber }}>{step}</span>
                    <p className="font-sans font-semibold text-[12px] text-center leading-snug whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.8)' }}>{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ BENEFITS ══ */}
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
            <div className="text-center mb-12">
              <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>What We Offer</span>
              <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(22px,3vw,36px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>Employee Benefits</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { icon: Award, label: 'Competitive Compensation' },
                { icon: TrendingUp, label: 'Career Development' },
                { icon: Cpu, label: 'Professional Training' },
                { icon: Globe, label: 'Collaborative Culture' },
                { icon: Star, label: 'Performance Recognition' },
                { icon: Zap, label: 'Long-Term Growth Opportunities' },
              ].map(({ icon: Icon, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(182,141,64,0.1)' }}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={{ background: C.inkCard, border: `1px solid ${C.inkBorder}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${C.amber}14` }}>
                    <Icon size={18} style={{ color: C.amber }} />
                  </div>
                  <p className="font-sans font-semibold text-[13px]" style={{ color: C.bodyDark }}>{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══ LIFE AT ZIVIO GALLERY ══ */}
          <div style={{ background: '#0a0a0a' }} className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <div className="text-center mb-12">
                <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Culture</span>
                <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(22px,3vw,36px)', color: '#fff', letterSpacing: '-0.02em' }}>Life at ZiVIO LIFE</h2>
              </div>
              <div style={{ columns: 4, columnGap: 12 }} className="max-sm:columns-2">
                {GALLERY_CAREERS.map((id, i) => (
                  <motion.div key={id} className="break-inside-avoid mb-3 overflow-hidden rounded-xl group"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <motion.img src={img(id, 600, 800)} alt="Life at ZiVIO"
                      className="w-full object-cover" style={{ display: 'block' }}
                      whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ APPLICATION FORM ══ */}
          <div id="careers-form" className="max-w-4xl mx-auto px-6 lg:px-10 py-20">
            <div className="text-center mb-12">
              <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Apply Now</span>
              <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>Submit Your Application</h2>
              <p className="font-sans mt-3 text-[14px]" style={{ color: C.bodyMid }}>Fill in the form below and attach your resume. Our HR team will be in touch.</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center rounded-2xl p-14" style={{ background: C.inkCard, border: `1.5px solid ${C.amber}40` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${C.amber}18` }}>
                  <CheckCircle size={30} style={{ color: C.amber }} />
                </div>
                <h3 className="font-sans font-black text-[22px] mb-2" style={{ color: C.bodyDark }}>Application Submitted!</h3>
                <p className="font-sans text-[14px]" style={{ color: C.bodyMid }}>Thank you for applying to ZiVIO LIFE. Our HR team will review your profile and reach out within 5–7 working days.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 lg:p-10 flex flex-col gap-5"
                style={{ background: C.inkCard, border: `1px solid ${C.inkBorder}`, boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inp('name', 'Full Name *')}
                  {inp('email', 'Email Address *', 'email')}
                  {inp('mobile', 'Mobile Number *', 'tel')}
                  {inp('location', 'Current Location *')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select value={formData.position} onChange={e => setFormData(d => ({ ...d, position: e.target.value }))}
                    className="w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none"
                    style={{ background: C.inkMid, border: `1.5px solid ${C.inkBorder}`, color: formData.position ? C.bodyDark : C.bodyLight }}>
                    <option value="">Position Applying For *</option>
                    {VACANCIES.map(v => <option key={v.id} value={`${v.title} – ${v.location}`}>{v.title} – {v.location}</option>)}
                    <option value="General Application">General Application</option>
                  </select>
                  {inp('experience', 'Years of Experience *')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {inp('company', 'Current Company')}
                  {inp('currentCtc', 'Current CTC (LPA)')}
                  {inp('expectedCtc', 'Expected CTC (LPA)')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inp('notice', 'Notice Period')}
                  {inp('linkedin', 'LinkedIn Profile (Optional)', 'url')}
                </div>
                <textarea placeholder="Brief Message (Optional)" rows={4} value={formData.message}
                  onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                  className="w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none resize-none transition-all"
                  style={{ background: C.inkMid, border: `1.5px solid ${C.inkBorder}`, color: C.bodyDark }}
                  onFocus={e => (e.target.style.borderColor = C.amber)}
                  onBlur={e => (e.target.style.borderColor = C.inkBorder)} />

                {/* Resume Upload */}
                <div>
                  <p className="font-sans font-semibold text-[12px] uppercase tracking-wide mb-3" style={{ color: C.bodyDark }}>Resume Upload *</p>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className="cursor-pointer flex flex-col items-center justify-center gap-3 rounded-xl py-10 transition-all"
                    style={{
                      border: `2px dashed ${dragOver ? C.amber : resumeFile ? C.amber : C.dustCard}`,
                      background: dragOver ? `${C.amber}06` : resumeFile ? `${C.amber}08` : C.inkMid,
                    }}>
                    {resumeFile ? (
                      <>
                        <CheckCircle size={28} style={{ color: C.amber }} />
                        <p className="font-sans font-semibold text-[13px]" style={{ color: C.bodyDark }}>{resumeFile.name}</p>
                        <p className="font-label text-[8px] tracking-wider uppercase" style={{ color: C.bodyLight }}>File attached · Click to replace</p>
                      </>
                    ) : (
                      <>
                        <Download size={28} style={{ color: C.bodyLight }} />
                        <p className="font-sans font-semibold text-[13px]" style={{ color: C.bodyMid }}>Drag & drop your resume here</p>
                        <p className="font-label text-[8px] tracking-wider uppercase" style={{ color: C.bodyLight }}>PDF, DOC, DOCX · Max 10 MB</p>
                        <span className="px-4 py-1.5 rounded-lg font-sans font-semibold text-[11px]"
                          style={{ background: C.inkCard, color: C.bodyMid, border: `1px solid ${C.inkBorder}` }}>Browse File</span>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) setResumeFile(f) }} />
                  </div>
                </div>

                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-sans font-bold text-[13px] uppercase tracking-wide transition-all hover:opacity-85"
                  style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.06em' }}>
                  Submit Application <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          {/* ══ GENERAL INQUIRY ══ */}
          <div style={{ background: C.navyDark }} className="py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
              <div className="text-center mb-10">
                <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>HR Contact</span>
                <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(22px,3vw,36px)', color: '#fff', letterSpacing: '-0.02em' }}>Don't See the Right Opportunity?</h2>
                <p className="font-sans mt-3 text-[14px]" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                  We're always looking for talented professionals. Share your profile and our recruitment team will contact you when a suitable role becomes available.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  <a href="mailto:careers@ziviolife.com" className="flex items-center gap-2 font-sans text-[13px] transition-colors hover:opacity-80" style={{ color: C.amber }}>
                    <Mail size={14} /> careers@ziviolife.com
                  </a>
                  <a href="tel:+912245678910" className="flex items-center gap-2 font-sans text-[13px] transition-colors hover:opacity-80" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <Phone size={14} /> +91 22 4567 8910 (HR)
                  </a>
                </div>
              </div>

              {inquirySent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center rounded-2xl p-10" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.amber}40` }}>
                  <CheckCircle size={28} className="mx-auto mb-3" style={{ color: C.amber }} />
                  <p className="font-sans font-bold text-[15px] text-white">Inquiry Received!</p>
                  <p className="font-sans text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>We'll reach out when a suitable opportunity arises.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquiry} className="flex flex-col gap-4 rounded-2xl p-8"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(['name', 'email', 'mobile'] as const).map(f => (
                      <input key={f} type={f === 'email' ? 'email' : f === 'mobile' ? 'tel' : 'text'}
                        placeholder={f === 'name' ? 'Full Name *' : f === 'email' ? 'Email Address *' : 'Mobile Number'}
                        value={inquiryData[f]} onChange={e => setInquiryData(d => ({ ...d, [f]: e.target.value }))}
                        className="w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                    ))}
                    <textarea placeholder="Message (Optional)" rows={1} value={inquiryData.message}
                      onChange={e => setInquiryData(d => ({ ...d, message: e.target.value }))}
                      className="w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans font-bold text-[12px] uppercase tracking-wide transition-all hover:opacity-85"
                    style={{ background: C.amber, color: '#fff', letterSpacing: '0.06em' }}>
                    Submit General Application <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 text-center">
            <h2 className="font-sans font-black mb-4" style={{ fontSize: 'clamp(26px,4vw,52px)', color: C.bodyDark, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Join Our Team and Help Shape<br />the Future of Lighting.
            </h2>
            <p className="font-sans text-[15px] mb-10 mx-auto" style={{ color: C.bodyMid, maxWidth: 540, lineHeight: 1.7 }}>
              We're building a workplace where innovation, collaboration, and excellence come together to create exceptional lighting solutions for customers around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-sans font-bold text-[13px] uppercase tracking-wide transition-all hover:opacity-85"
                style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.05em' }}>
                Apply Now <ArrowRight size={14} />
              </button>
              <a href="mailto:careers@ziviolife.com"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-sans font-semibold text-[13px] uppercase tracking-wide transition-all hover:opacity-80"
                style={{ border: `1.5px solid ${C.bodyDark}`, color: C.bodyDark, letterSpacing: '0.05em' }}>
                <Mail size={14} /> Contact HR
              </a>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── ARCHITECTS & CONSULTANTS PAGE ───────────────────────────────────────────
const AC_SERVICES = [
  { icon: Compass, title: 'Specification Support', desc: 'Detailed photometric data, IES files, BIM objects and spec sheets delivered to your desk.' },
  { icon: Cpu, title: 'Custom Luminaire Design', desc: 'Bespoke fixtures engineered to match your design intent — form, finish, and CCT.' },
  { icon: Shield, title: 'DALI & Smart Controls', desc: 'Full DALI-2, Tunable White, and scene-control integration for intelligent spaces.' },
  { icon: Award, title: 'Mock-up & Sample Room', desc: 'Dedicated sample room at our Vasao facility for pre-approval lighting trials.' },
  { icon: Globe, title: 'Site & Project Support', desc: 'Our engineers attend site visits, review reflected ceiling plans, and guide installation.' },
  { icon: TrendingUp, title: 'Loyalty Programme', desc: 'Priority project pricing, CPD sessions, and co-branding opportunities for registered firms.' },
]

const PROJECT_TYPES = [
  'Commercial Office', 'Retail & Luxury', 'Hospitality & Hotels',
  'Healthcare', 'Education', 'Residential High-Rise',
  'Industrial & Warehousing', 'Facade & Landscape', 'Infrastructure',
]

const WHATSAPP_NUMBER = '919022456789'
const INQUIRY_EMAIL = 'projects@ziviolife.com'

function ArchConsultPage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', firm: '', email: '', mobile: '',
    projectName: '', projectLocation: '', projectType: '',
    area: '', budget: '', timeline: '', message: '',
  })
  const [sent, setSent] = useState<null | 'email' | 'whatsapp'>(null)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(d => ({ ...d, [k]: e.target.value }))

  const buildMessage = () =>
    `*ZiVIO LIFE – Project Inquiry*\n\n` +
    `👤 Name: ${form.name}\n🏢 Firm: ${form.firm}\n📧 Email: ${form.email}\n📱 Mobile: ${form.mobile}\n\n` +
    `🏗 Project: ${form.projectName}\n📍 Location: ${form.projectLocation}\n🏷 Type: ${form.projectType}\n` +
    `📐 Area: ${form.area} sq.ft\n💰 Budget: ${form.budget}\n⏱ Timeline: ${form.timeline}\n\n` +
    `📝 Message:\n${form.message}`

  const saveToBackend = (callback?: () => void) => {
    setSubmitting(true)
    router.post('/inquiry', {
      name: form.name,
      email: form.email,
      phone: form.mobile,
      company: form.firm,
      project_type: form.projectType || 'Project Inquiry',
      message: `Project: ${form.projectName || 'N/A'}\nLocation: ${form.projectLocation || 'N/A'}\nArea: ${form.area || 'N/A'} sq.ft\nBudget: ${form.budget || 'N/A'}\nTimeline: ${form.timeline || 'N/A'}\n\nDetails:\n${form.message || 'No additional notes'}`,
      specs_snapshot: {
        projectName: form.projectName,
        projectLocation: form.projectLocation,
        projectType: form.projectType,
        area: form.area,
        budget: form.budget,
        timeline: form.timeline,
        firm: form.firm,
      }
    }, {
      preserveScroll: true,
      onFinish: () => {
        setSubmitting(false)
        callback?.()
      }
    })
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    saveToBackend(() => {
      const sub = encodeURIComponent(`Project Inquiry – ${form.projectName || 'New Project'} | ${form.firm}`)
      const body = encodeURIComponent(
        `Dear ZiVIO LIFE Projects Team,\n\n` +
        `Name: ${form.name}\nFirm: ${form.firm}\nEmail: ${form.email}\nMobile: ${form.mobile}\n\n` +
        `Project Name: ${form.projectName}\nLocation: ${form.projectLocation}\nType: ${form.projectType}\n` +
        `Area: ${form.area}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nMessage:\n${form.message}`
      )
      window.open(`mailto:${INQUIRY_EMAIL}?subject=${sub}&body=${body}`)
      setSent('email')
    })
  }

  const sendWhatsApp = () => {
    if (!form.name || !form.email) {
      alert('Please enter your Name and Email address.')
      return
    }
    saveToBackend(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`, '_blank')
      setSent('whatsapp')
    })
  }

  const inputCls = "w-full px-4 py-3 font-sans text-[13px] rounded-xl outline-none transition-all"
  const inputStyle = { background: C.inkMid, border: `1.5px solid ${C.inkBorder}`, color: C.bodyDark }
  const focusAmber = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderColor = C.amber)
  const blurReset = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderColor = C.inkBorder)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 48 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] overflow-y-auto"
          style={{ background: C.ink }}>

          {/* Close */}
          <button onClick={onClose}
            className="fixed top-5 right-6 z-[90] flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-[11px] tracking-wide uppercase transition-all hover:opacity-80"
            style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.06em', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <X size={13} /> Close
          </button>

          {/* ══ HERO ══ */}
          <div className="relative overflow-hidden" style={{ height: '68vh', minHeight: 480 }}>
            <motion.div className="absolute inset-0"
              initial={{ scale: 1.07 }} animate={{ scale: 1 }}
              transition={{ duration: 1.9, ease: 'easeOut' }}>
              <img src={img('1503387762-db93d30e-5571-4f37-a3e9', 1920, 1080)} alt="Architects & Consultants"
                className="w-full h-full object-cover" />
            </motion.div>
            {/* Multi-layer dark overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(3,2,8,0.92) 0%, rgba(3,2,8,0.52) 50%, rgba(3,2,8,0.18) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,2,8,0.88) 0%, transparent 52%)' }} />

            {/* Compass watermark */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.06] hidden lg:block">
              <Compass size={260} color="#fff" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-20" style={{ paddingTop: 80 }}>
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.72 }}>
                <div className="flex items-center gap-3 mb-4">
                  <Compass size={14} style={{ color: C.amber }} />
                  <span className="font-label text-[8px] tracking-[0.36em] uppercase" style={{ color: C.amber }}>ZiVIO LIFE · For Design Professionals</span>
                </div>
                <h1 className="font-sans font-black leading-none mb-4" style={{ fontSize: 'clamp(34px,5.5vw,72px)', color: '#fff', letterSpacing: '-0.03em', maxWidth: 700 }}>
                  Lighting Crafted<br />for Architects &<br />Consultants.
                </h1>
                <p className="font-sans mb-8" style={{ fontSize: 'clamp(13px,1.4vw,17px)', color: 'rgba(255,255,255,0.68)', maxWidth: 520, lineHeight: 1.68 }}>
                  Premium specification support, custom luminaire engineering, and dedicated project partnership — from concept drawing to final commissioning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => document.getElementById('ac-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 font-sans font-bold text-[13px] rounded-xl transition-all hover:opacity-90"
                    style={{ background: C.amber, color: '#fff', letterSpacing: '0.04em' }}>
                    Submit Project Inquiry <ArrowRight size={14} />
                  </button>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ZiVIO LIFE, I am an Architect/Consultant and would like to discuss a lighting project.')}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 font-sans font-semibold text-[13px] rounded-xl transition-all hover:bg-white/10"
                    style={{ border: '1.5px solid rgba(255,255,255,0.32)', color: '#fff', letterSpacing: '0.04em' }}>
                    <MessageCircle size={14} /> Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ══ WHAT WE OFFER ══ */}
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
            <div className="text-center mb-14">
              <span className="font-label text-[8px] tracking-[0.32em] uppercase" style={{ color: C.amber }}>Our Commitment to Design Professionals</span>
              <h2 className="font-sans font-black mt-3" style={{ fontSize: 'clamp(24px,3.2vw,40px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                End-to-End Specification Support
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AC_SERVICES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(182,141,64,0.1)' }}
                  className="rounded-2xl p-7 transition-all"
                  style={{ background: C.inkCard, border: `1px solid ${C.inkBorder}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${C.amber}14` }}>
                    <Icon size={20} style={{ color: C.amber }} />
                  </div>
                  <h3 className="font-sans font-bold mb-2" style={{ fontSize: 15, color: C.bodyDark }}>{title}</h3>
                  <p className="font-sans text-[13px] leading-relaxed" style={{ color: C.bodyMid }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══ STATS BAR ══ */}
          <div style={{ background: C.navyDark }} className="py-12">
            <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: '1,000+', l: 'Projects Delivered' },
                { v: '300+', l: 'Architect Partnerships' },
                { v: '15+', l: 'Countries' },
                { v: '48h', l: 'Specification Turnaround' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <p className="font-sans font-black" style={{ fontSize: 'clamp(28px,4vw,44px)', color: C.amber, letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</p>
                  <p className="font-label text-[8px] tracking-[0.24em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ PROJECT INQUIRY FORM ══ */}
          <div id="ac-form" className="max-w-4xl mx-auto px-6 lg:px-10 py-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                style={{ background: `${C.amber}12`, border: `1px solid ${C.amber}30` }}>
                <Compass size={11} style={{ color: C.amber }} />
                <span className="font-label text-[7.5px] tracking-[0.28em] uppercase" style={{ color: C.amber }}>Project Inquiry</span>
              </div>
              <h2 className="font-sans font-black" style={{ fontSize: 'clamp(24px,3.5vw,42px)', color: C.bodyDark, letterSpacing: '-0.02em' }}>
                Tell Us About Your Project
              </h2>
              <p className="font-sans mt-3 text-[14px]" style={{ color: C.bodyMid }}>
                Fill in the details below and our projects team will reach out within 24 hours.<br />
                Your inquiry is sent directly via <strong>Email</strong> and <strong>WhatsApp</strong>.
              </p>
            </div>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center rounded-2xl p-16" style={{ background: C.inkCard, border: `1.5px solid ${C.amber}40` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: `${C.amber}14` }}>
                  {sent === 'whatsapp' ? <MessageCircle size={28} style={{ color: C.amber }} /> : <Send size={28} style={{ color: C.amber }} />}
                </div>
                <h3 className="font-sans font-black text-[22px] mb-2" style={{ color: C.bodyDark }}>Inquiry Sent!</h3>
                <p className="font-sans text-[14px] mb-8" style={{ color: C.bodyMid }}>
                  {sent === 'whatsapp'
                    ? 'Your WhatsApp message has been prepared. Our team will reply within a few hours.'
                    : 'Your email client has opened with the inquiry. Our projects team will respond within 24 hours.'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setSent(null)}
                    className="px-6 py-3 rounded-xl font-sans font-semibold text-[12px] uppercase tracking-wide"
                    style={{ background: C.inkMid, color: C.bodyMid, border: `1px solid ${C.inkBorder}` }}>
                    Edit Inquiry
                  </button>
                  <button onClick={sendWhatsApp}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-[12px] uppercase tracking-wide"
                    style={{ background: '#25D366', color: '#fff' }}>
                    <MessageCircle size={14} /> Also Send WhatsApp
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={sendEmail}
                className="rounded-2xl p-8 lg:p-10 flex flex-col gap-5"
                style={{ background: C.inkCard, border: `1px solid ${C.inkBorder}`, boxShadow: '0 4px 40px rgba(0,0,0,0.05)' }}>

                {/* Section: Contact */}
                <p className="font-sans font-bold text-[11px] uppercase tracking-widest pb-1" style={{ color: C.bodyDark, borderBottom: `1.5px solid ${C.amber}`, display: 'inline-block' }}>Your Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputCls} style={inputStyle} placeholder="Full Name *" value={form.name} onChange={set('name')} onFocus={focusAmber} onBlur={blurReset} required />
                  <input className={inputCls} style={inputStyle} placeholder="Firm / Practice Name *" value={form.firm} onChange={set('firm')} onFocus={focusAmber} onBlur={blurReset} required />
                  <input className={inputCls} style={inputStyle} placeholder="Email Address *" type="email" value={form.email} onChange={set('email')} onFocus={focusAmber} onBlur={blurReset} required />
                  <input className={inputCls} style={inputStyle} placeholder="Mobile Number *" type="tel" value={form.mobile} onChange={set('mobile')} onFocus={focusAmber} onBlur={blurReset} required />
                </div>

                {/* Section: Project */}
                <p className="font-sans font-bold text-[11px] uppercase tracking-widest pb-1 mt-2" style={{ color: C.bodyDark, borderBottom: `1.5px solid ${C.amber}`, display: 'inline-block' }}>Project Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputCls} style={inputStyle} placeholder="Project Name *" value={form.projectName} onChange={set('projectName')} onFocus={focusAmber} onBlur={blurReset} required />
                  <input className={inputCls} style={inputStyle} placeholder="Project Location / City *" value={form.projectLocation} onChange={set('projectLocation')} onFocus={focusAmber} onBlur={blurReset} required />
                  <select className={inputCls} style={{ ...inputStyle, color: form.projectType ? C.bodyDark : C.bodyLight }}
                    value={form.projectType} onChange={set('projectType')} onFocus={focusAmber} onBlur={blurReset}>
                    <option value="">Project Type *</option>
                    {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input className={inputCls} style={inputStyle} placeholder="Approximate Area (sq.ft)" value={form.area} onChange={set('area')} onFocus={focusAmber} onBlur={blurReset} />
                  <input className={inputCls} style={inputStyle} placeholder="Approximate Budget" value={form.budget} onChange={set('budget')} onFocus={focusAmber} onBlur={blurReset} />
                  <input className={inputCls} style={inputStyle} placeholder="Expected Timeline / Handover" value={form.timeline} onChange={set('timeline')} onFocus={focusAmber} onBlur={blurReset} />
                </div>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={4}
                  placeholder="Specific requirements, lighting zones, design intent, or any other details…"
                  value={form.message} onChange={set('message')} onFocus={focusAmber} onBlur={blurReset} />

                {/* Dual submit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button type="submit"
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-sans font-bold text-[12px] uppercase tracking-wide transition-all hover:opacity-85"
                    style={{ background: C.bodyDark, color: C.ink, letterSpacing: '0.06em' }}>
                    <Send size={14} /> Send via Email
                  </button>
                  <button type="button" onClick={sendWhatsApp}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-sans font-bold text-[12px] uppercase tracking-wide transition-all hover:opacity-85"
                    style={{ background: '#25D366', color: '#fff', letterSpacing: '0.06em' }}>
                    <MessageCircle size={14} /> Send via WhatsApp
                  </button>
                </div>

                <p className="text-center font-label text-[7px] tracking-wider" style={{ color: C.bodyLight }}>
                  Your details are shared only with our ZiVIO LIFE projects team. We do not share your information with third parties.
                </p>
              </form>
            )}

            {/* Direct contact strip */}
            <div className="mt-10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ background: C.navyDark }}>
              <div>
                <p className="font-sans font-bold text-[14px] text-white">Prefer to speak directly?</p>
                <p className="font-sans text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Our projects team is available Mon–Sat, 9am–7pm IST</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-[12px] transition-all hover:opacity-85"
                  style={{ background: '#25D366', color: '#fff' }}>
                  <MessageCircle size={13} /> WhatsApp
                </a>
                <a href={`mailto:${INQUIRY_EMAIL}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold text-[12px] transition-all hover:opacity-75"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)' }}>
                  <Mail size={13} /> {INQUIRY_EMAIL}
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100)
    const t2 = setTimeout(() => setPhase('out'), 2900)
    const t3 = setTimeout(onDone, 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isIn = phase === 'in'
  const isOut = phase === 'out'

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden select-none"
      style={{ background: '#06050A' }}
      animate={{ opacity: isOut ? 0 : 1 }}
      transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}>

      {/* ── Deep amber core glow — zooms with the logo ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 480, height: 480, background: 'radial-gradient(circle, rgba(182,141,64,0.18) 0%, rgba(182,141,64,0.06) 45%, transparent 72%)', filter: 'blur(32px)' }}
        animate={{ scale: isIn ? 0.6 : isOut ? 1.4 : 1, opacity: isOut ? 0 : 1 }}
        transition={{ duration: isOut ? 0.5 : 1.1, ease: [0.22, 1, 0.36, 1] }} />

      {/* ── Outer thin ring — breathes ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 340, height: 340, border: '1px solid rgba(182,141,64,0.14)' }}
        animate={{ scale: isIn ? 0.5 : isOut ? 1.5 : 1, opacity: isOut ? 0 : 0.6 }}
        transition={{ duration: isOut ? 0.5 : 1.3, ease: [0.22, 1, 0.36, 1] }} />

      {/* ── Wordmark — the only content ── */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          scale: isIn ? 0.72 : isOut ? 1.14 : 1,
          opacity: isOut ? 0 : 1,
          filter: isIn ? 'blur(6px)' : isOut ? 'blur(3px)' : 'blur(0px)',
        }}
        transition={{ duration: isOut ? 0.55 : 1.05, ease: [0.22, 1, 0.36, 1] }}>

        {/* ── Official ZiVIO Vector Wordmark with exact #DA9807 gold accent ── */}
        <div className="flex items-center justify-center" style={{ height: 'clamp(55px, 12vw, 110px)' }}>
          <ZivioWordmarkSvg
            textColor="#FFFFFF"
            accentColor="#DA9807"
            style={{ height: 'clamp(55px, 12vw, 110px)', width: 'auto', maxWidth: '85vw' }}
          />
        </div>

        {/* ── LIFE + separator + by ARTIZE LITE — inline ── */}
        <div className="flex items-center justify-center w-full mt-1" style={{ gap: 14 }}>
          {/* Amber rule left */}
          <motion.div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.amber}80)` }}
            animate={{ scaleX: isIn ? 0 : isOut ? 0 : 1, opacity: isOut ? 0 : 1 }}
            transition={{ duration: 0.7, delay: isIn ? 0 : 0, ease: [0.22, 1, 0.36, 1] }} />

          <span className="font-sans font-black"
            style={{ fontSize: 'clamp(13px, 2.6vw, 24px)', color: C.amber, letterSpacing: '0.52em', textTransform: 'uppercase' }}>
            LIFE
          </span>

          {/* Thin divider */}
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.18)' }} />

          {/* by ARTIZE LITE */}
          <div className="flex flex-col items-start leading-none" style={{ gap: 2 }}>
            <span className="font-sans font-light"
              style={{ fontSize: 'clamp(6px, 0.9vw, 9px)', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.30em', textTransform: 'uppercase' }}>
              by
            </span>
            <span className="font-sans font-semibold"
              style={{ fontSize: 'clamp(8px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.30em', textTransform: 'uppercase' }}>
              ARTIZE LITE
            </span>
          </div>

          {/* Amber rule right */}
          <motion.div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.amber}80)` }}
            animate={{ scaleX: isIn ? 0 : isOut ? 0 : 1, opacity: isOut ? 0 : 1 }}
            transition={{ duration: 0.7, delay: isIn ? 0 : 0, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App({
  featuredProducts,
  environments,
  heroSlides,
  projects,
  testimonials,
  catalogues,
}: WelcomeProps = {}) {
  const [splash, setSplash] = useState(true)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [newsOpen, setNewsOpen] = useState(false)
  const [careersOpen, setCareersOpen] = useState(false)
  const [archOpen, setArchOpen] = useState(false)

  const resolvedHero = useMemo(
    () => adaptHeroSlides(heroSlides, HERO_SLIDES),
    [heroSlides]
  )

  const resolvedFeatured = useMemo(
    () => adaptFeaturedProducts(featuredProducts, FEATURED_PRODUCTS),
    [featuredProducts]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden relative" style={{ background: C.ink }}>
      <Head title="ZiVIO LIFE — Architectural Lighting Solutions">
        <meta name="description" content="ZiVIO LIFE delivers precision architectural lighting solutions, facade systems, bollards, and landscape illumination across 15+ countries." />
      </Head>
      <AnimatePresence>{splash && <SplashScreen onDone={() => setSplash(false)} />}</AnimatePresence>
      <Header onAbout={() => setAboutOpen(true)} onNews={() => setNewsOpen(true)} onCareers={() => setCareersOpen(true)} onArchConsult={() => setArchOpen(true)} onSearch={() => setSearchOpen(true)} />
      <AboutPage open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <NewsMedia open={newsOpen} onClose={() => setNewsOpen(false)} />
      <CareersPage open={careersOpen} onClose={() => setCareersOpen(false)} />
      <ArchConsultPage open={archOpen} onClose={() => setArchOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        <Hero slides={resolvedHero} />
        <FeaturedProduct products={resolvedFeatured} />
        <Products />
        <TruePartnership />
        <Technology />
        <Projects projects={projects} />
        <Applications />
        <Downloads catalogues={catalogues} />
        <Contact />
      </main>
      <Footer onCareers={() => setCareersOpen(true)} testimonials={testimonials} />
    </div>
  )
}
