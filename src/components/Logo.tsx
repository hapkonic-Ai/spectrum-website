interface LogoProps {
  width?: number
  className?: string
}

/** Official Spectrum Tution Point logo (image asset). */
export function Logo({ width = 120, className = '' }: LogoProps) {
  return (
    <img
      src="/spectrum-logo.png"
      alt="Spectrum Tution Point"
      width={width}
      className={`h-auto ${className}`}
      style={{ width }}
      draggable={false}
    />
  )
}
