import { Link } from '@inertiajs/react'

interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light'
}

export function BrandLogo({ className = '', theme = 'dark' }: BrandLogoProps) {
  const isLight = theme === 'light'

  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 group select-none ${className}`} aria-label="ZiVIO LIFE Home">
      {/* Amber vertical accent bar */}
      <span
        className="rounded-full shrink-0"
        style={{
          width: 3,
          height: 28,
          background: 'linear-gradient(to bottom, #B5722A, #8C4E18)',
        }}
      />
      <div className="flex flex-col leading-none">
        <span
          className="font-sans font-black transition-all group-hover:opacity-85"
          style={{
            fontSize: 22,
            color: isLight ? '#111111' : '#FFFFFF',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}>
          ZiVIO
        </span>
        <span
          className="font-sans font-black"
          style={{
            fontSize: 7.5,
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
