import { motion } from 'framer-motion'
import {
  FileText,
  History,
  Layers,
  MonitorPlay,
  NotebookPen,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { resources } from '../lib/data'
import { stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

const iconMap: Record<string, LucideIcon> = {
  NotebookPen,
  Layers,
  Timer,
  MonitorPlay,
  FileText,
  History,
}

export function Resources() {
  return (
    <section id="resources" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[24rem] w-[24rem] rounded-full bg-teal-300/20 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-blue-400/20 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          tag="Study Materials"
          title={
            <>
              Your complete study{' '}
              <span
                style={{
                  background: 'var(--cta)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                arsenal
              </span>
            </>
          }
          sub="Notes, question banks and test engines — every Spectrum student gets round-the-clock access to a library that never sleeps."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resources.map((r) => {
            const Icon = iconMap[r.icon] ?? NotebookPen
            const featured = r.title === 'Question Banks'
            return (
              <motion.div
                key={r.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group relative flex flex-col gap-5 rounded-[2rem] border border-line bg-paper p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift ${
                  featured ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: 'var(--cta)' }}
                  >
                    <Icon size={26} strokeWidth={2.2} />
                  </span>
                  <span className="pill-tag">{r.meta}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">{r.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
