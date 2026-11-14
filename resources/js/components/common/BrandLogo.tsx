import { Link } from '@inertiajs/react'

interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

export function BrandLogo({ className = '', theme = 'dark', size = 'md' }: BrandLogoProps) {
  const isLight = theme === 'light'
  const isLg = size === 'lg'
  const isSm = size === 'sm'

  const barHeight = isLg ? 34 : isSm ? 22 : 28
  const barWidth = isLg ? 3.5 : isSm ? 2.5 : 3
  const zivioSize = isLg ? 26 : isSm ? 18 : 22
  const lifeSize = isLg ? 8.5 : isSm ? 6.5 : 7.5

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 shrink-0 group select-none ${className}`} aria-label="ZiVIO LIFE Home">
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
        <span
          className="font-sans font-black transition-all group-hover:opacity-90"
          style={{
            fontSize: zivioSize,
            color: isLight ? '#111111' : '#FFFFFF',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}>
          ZiVIO
        </span>
        <span
          className="font-sans font-black"
          style={{
            fontSize: lifeSize,
            color: '#B5722A',
            letterSpacing: '0.52em',
            textTransform: 'uppercase',
            lineHeight: 1.4,
          }}>
          LIFE
        </span>
      </div>
    </Link>
  )
}
