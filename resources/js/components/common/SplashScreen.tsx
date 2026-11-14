import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const C = {
  amber:   '#B5722A', // Primary copper/amber accent
  amberLt: '#C9944A', // Warm highlight
  amberDk: '#8C4E18', // Deep copper
}

export function SplashScreen({ onDone, fast = false }: { onDone: () => void; fast?: boolean }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    const holdTime = fast ? 60 : 100
    const outTime  = fast ? 1100 : 2000
    const doneTime = fast ? 1500 : 2600

    const t1 = setTimeout(() => setPhase('hold'), holdTime)
    const t2 = setTimeout(() => setPhase('out'), outTime)
    const t3 = setTimeout(onDone, doneTime)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [fast, onDone])

  const isIn   = phase === 'in'
  const isOut  = phase === 'out'

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none pointer-events-none"
      style={{ background: '#06050A' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOut ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}>

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

        {/* ── ZiVIO ── */}
        <div className="flex items-baseline leading-none" style={{ gap: 0 }}>
          {/* Zi */}
          <span className="font-sans font-black"
            style={{ fontSize: 'clamp(54px, 12vw, 110px)', color: '#FFFFFF', letterSpacing: '-0.055em', lineHeight: 0.88 }}>
            Zi
          </span>
          {/* V — amber accent */}
          <span className="font-sans font-black"
            style={{ fontSize: 'clamp(54px, 12vw, 110px)', color: C.amber, letterSpacing: '-0.055em', lineHeight: 0.88 }}>
            V
          </span>
          {/* IO */}
          <span className="font-sans font-black"
            style={{ fontSize: 'clamp(54px, 12vw, 110px)', color: '#FFFFFF', letterSpacing: '-0.055em', lineHeight: 0.88 }}>
            IO
          </span>
        </div>

        {/* ── LIFE + separator + by ARTIZE LITE — inline ── */}
        <div className="flex items-center justify-center w-full mt-2" style={{ gap: 14 }}>
          {/* Amber rule left */}
          <motion.div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.amber}80)` }}
            animate={{ scaleX: isIn ? 0 : isOut ? 0 : 1, opacity: isOut ? 0 : 1 }}
            transition={{ duration: 0.7, delay: isIn ? 0 : 0, ease: [0.22, 1, 0.36, 1] }} />

          <span className="font-sans font-black"
            style={{ fontSize: 'clamp(11px, 2.2vw, 20px)', color: C.amber, letterSpacing: '0.52em', textTransform: 'uppercase' }}>
            LIFE
          </span>

          {/* Thin divider */}
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.18)' }} />

          {/* by ARTIZE LITE */}
          <div className="flex flex-col items-start leading-none" style={{ gap: 2 }}>
            <span className="font-sans font-light"
              style={{ fontSize: 'clamp(6px, 0.8vw, 8px)', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.30em', textTransform: 'uppercase' }}>
              by
            </span>
            <span className="font-sans font-semibold"
              style={{ fontSize: 'clamp(7px, 1.1vw, 11px)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.30em', textTransform: 'uppercase' }}>
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
