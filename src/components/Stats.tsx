import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../lib/data'
import type { Stat } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(
          v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }),
        ),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return <span ref={ref}>{display}</span>
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group flex flex-col items-center gap-3 px-6 py-10 text-center sm:py-12 ${
        index % 2 === 0 ? 'border-r border-line' : ''
      } ${index < 4 ? 'max-lg:border-b max-lg:border-line' : ''} ${
        index === 1 || index === 3 ? 'max-lg:border-r-0 lg:border-r' : ''
      } ${index === 4 ? 'lg:border-r' : ''}`}
    >
      <span className="relative block font-display text-5xl uppercase tracking-wide sm:text-6xl">
        <span className="text-ink transition-opacity duration-300 group-hover:opacity-0">
          <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
          {stat.suffix}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'var(--cta)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
          {stat.suffix}
        </span>
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute sm:text-xs">
        {stat.label}
      </span>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section id="stats" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          tag="Results that speak"
          align="left"
          title={
            <>
              Numbers we <span style={{ background: 'var(--cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>celebrate</span> every year
            </>
          }
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid grid-cols-2 overflow-hidden rounded-[2.5rem] border border-line bg-paper shadow-soft lg:grid-cols-6"
        >
          {stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
