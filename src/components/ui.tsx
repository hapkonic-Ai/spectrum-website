import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewport } from '../lib/anim'

interface SectionHeadingProps {
  tag: string
  title: ReactNode
  sub?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({ tag, title, sub, align = 'center', dark = false }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const titleCls = dark ? 'text-white' : 'text-ink'
  const subCls = dark ? 'text-white/60' : 'text-mute'
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex flex-col gap-5 ${alignCls}`}
    >
      <motion.span variants={fadeUp} className={`eyebrow ${dark ? 'eyebrow-dark' : ''}`}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--cta)' }} />
        {tag}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={`max-w-3xl font-display text-4xl uppercase leading-[1.02] tracking-wide sm:text-6xl ${titleCls}`}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className={`max-w-xl text-base leading-relaxed sm:text-lg ${subCls}`}>
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}

/** Wraps children in a motion reveal used inside sections. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
