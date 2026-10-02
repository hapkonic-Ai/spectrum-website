import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Compass, Crosshair, GraduationCap, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { fadeUp, stagger, viewport } from '../lib/anim'
import type { Feature } from '../lib/data'
import { whySpectrum } from '../lib/data'
import { SectionHeading } from './ui'

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Crosshair,
  Wrench,
  Compass,
}

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 180, damping: 18 })

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    px.set(x)
    py.set(y)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function WhyCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = iconMap[feature.icon] ?? GraduationCap
  return (
    <TiltCard className="spotlight-card glass h-full rounded-3xl p-8">
      <div style={{ transform: 'translateZ(36px)' }} className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-spectrum text-ink shadow-lg shadow-violet-600/20">
            <Icon size={22} strokeWidth={2.2} />
          </span>
          <span className="font-display text-sm font-semibold tracking-widest text-white/25">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-mist sm:text-[0.95rem]">{feature.desc}</p>
        <span className="mt-auto h-px w-full bg-gradient-to-r from-violet-500/40 via-cyan-400/25 to-transparent" />
      </div>
    </TiltCard>
  )
}

export function WhySpectrum() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 -z-10 h-[26rem] w-[26rem] animate-aurora rounded-full bg-blue-600/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-0 -z-10 h-[22rem] w-[22rem] animate-aurora rounded-full bg-violet-600/15 blur-[130px] [animation-delay:-8s]"
      />

      <div className="container-x">
        <SectionHeading
          tag="Why SPECTRUM?"
          title={
            <>
              Built to make <span className="text-spectrum">learning stick</span>
            </>
          }
          sub="Thirty-five years of teaching craft, distilled into one system — expert faculty, exam-focused methods and mentorship that follows every student home."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whySpectrum.map((feature, i) => (
            <WhyCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
