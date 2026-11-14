import { Link } from '@inertiajs/react'

export interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light' | 'auto'
  size?: 'sm' | 'md' | 'lg'
  showByArtize?: boolean
}

export function BrandLogo({
  className = '',
  theme = 'dark',
  size = 'md',
  showByArtize = true,
}: BrandLogoProps) {
  const isLight = theme === 'light'
  const isLg = size === 'lg'
  const isSm = size === 'sm'

  const barHeight = isLg ? 36 : isSm ? 24 : 30
  const barWidth = isLg ? 3.5 : isSm ? 2.5 : 3.2
  const zivioSize = isLg ? 26 : isSm ? 19 : 23
  const lifeSize = isLg ? 8.5 : isSm ? 6.8 : 7.8
  const artizeSize = isLg ? 7.5 : isSm ? 5.8 : 6.8

  const textColor = isLight ? '#111111' : '#FFFFFF'
  const subTextColor = isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)'
  const dividerColor = isLight ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.25)'

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 shrink-0 group select-none ${className}`}
      aria-label="ZiVIO LIFE Home"
    >
      {/* Amber vertical accent bar */}
      <span
        className="rounded-full shrink-0"
        style={{
          width: barWidth,
          height: barHeight,
          background: 'linear-gradient(to bottom, #B5722A, #8C4E18)',
        }}
      />

      <div className="flex flex-col leading-none">
        {/* ZiVIO wordmark with signature amber V from flash screen */}
        <div
          className="flex items-baseline leading-none font-sans font-black transition-opacity group-hover:opacity-90"
          style={{
            fontSize: zivioSize,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: textColor }}>Zi</span>
          <span style={{ color: '#B5722A' }}>V</span>
          <span style={{ color: textColor }}>IO</span>
        </div>

        {/* LIFE + by ARTIZE LITE from flash screen */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className="font-sans font-black"
            style={{
              fontSize: lifeSize,
              color: '#B5722A',
              letterSpacing: '0.48em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            LIFE
          </span>

          {showByArtize && (
            <>
              <span
                style={{
                  width: 1,
                  height: isSm ? 7 : 9,
                  background: dividerColor,
                  display: 'inline-block',
                }}
              />
              <span
                className="font-sans font-bold uppercase tracking-[0.16em]"
                style={{
                  fontSize: artizeSize,
                  color: subTextColor,
                  lineHeight: 1,
                }}
              >
                by ARTIZE LITE
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
