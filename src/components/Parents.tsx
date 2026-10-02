import { motion } from 'framer-motion'
import {
  Award,
  BellRing,
  BookOpen,
  ChartLine,
  MessageCircleQuestion,
  UserCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { parentReasons } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

const icons: Record<string, LucideIcon> = {
  UserCheck,
  Users,
  BookOpen,
  ChartLine,
  Award,
  MessageCircleQuestion,
  BellRing,
}

const cardPills: string[][] = [
  ['Custom Plans'],
  ['Max 20 / batch'],
  ['CBSE · ICSE · State'],
  ['4,200 tests / yr'],
  ['35+ yrs craft', 'Examiner insight'],
  ['24×7 app'],
  ['Fortnightly reports'],
]

export function Parents() {
  return (
    <section id="parents" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          tag="Why Parents Choose Spectrum"
          title={
            <>
              Parents{' '}
              <span
                style={{
                  background: 'var(--cta)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                trust
              </span>{' '}
              us with their children
            </>
          }
          sub="Personalized attention is not a promise here — it is the operating system. Every batch, test and report is built around one child at a time."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {parentReasons.map((reason, i) => {
            const Icon = icons[reason.icon] ?? UserCheck
            return (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative flex flex-col gap-5 rounded-3xl border border-line bg-paper p-6 pt-14 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                {/* floating pill tags */}
                <div className="absolute -top-3 right-5 flex flex-col items-end gap-2">
                  {cardPills[i % cardPills.length].map((pill) => (
                    <span
                      key={pill}
                      className="pill-tag !px-3 !py-1 !text-[10px] transition-transform duration-300 group-hover:-translate-y-0.5"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400/20 to-blue-500/20 text-ink transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{reason.desc}</p>
                </div>

                <span
                  className="mt-auto block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background: 'var(--cta)' }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
