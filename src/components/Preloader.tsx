import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1900
    const timer = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration)
      setProgress(Math.round(p * 100))
      if (p >= 1) {
        clearInterval(timer)
        // CSS-driven exit (runs even when rAF is throttled), then unmount
        setExiting(true)
        setTimeout(onDone, 750)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo width={150} />
        </motion.div>
        <div className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-blue-500/25 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-mute"
      >
        Academy of Vellore
      </motion.div>

      <div className="mt-10 h-[4px] w-56 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#35c99b,#2e7cf6)' }}
        />
      </div>
      <div className="mt-3 font-display text-sm tabular-nums text-mute">{progress}%</div>
    </div>
  )
}
