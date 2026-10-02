import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Gauge } from 'lucide-react'
import { useState } from 'react'
import { fadeUp, scaleIn, stagger, viewport } from '../lib/anim'
import { photos, subjects } from '../lib/data'
import { SectionHeading } from './ui'

const chip = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Subjects() {
  const [active, setActive] = useState(0)
  const subject = subjects[active]
  const image = photos.courses[active % photos.courses.length]

  return (
    <section id="subjects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-24 h-[26rem] w-[26rem] rounded-full bg-teal-300/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[26rem] w-[26rem] rounded-full bg-blue-400/20 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          tag="Subjects We Specialize In"
          title={
            <>
              Master the{' '}
              <span style={{ background: 'var(--cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                core four
              </span>
            </>
          }
          sub="Deep conceptual understanding, real-world application and sharp exam technique — every subject is taught the Spectrum way, layer by layer."
        />

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center"
        >
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-line bg-paper p-1.5 shadow-soft">
            {subjects.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
                  i === active ? 'text-white' : 'text-mute hover:text-ink'
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="subject-pill"
                    className="absolute inset-0 rounded-full bg-ink shadow-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{s.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={subject.id}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* Left — copy */}
            <div>
              <motion.h3
                variants={fadeUp}
                className="font-display text-6xl uppercase leading-[0.95] tracking-wide text-ink sm:text-7xl lg:text-8xl"
              >
                {subject.name}
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-mute sm:text-lg">
                {subject.tagline}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink shadow-soft">
                  <Clock size={14} style={{ color: subject.color }} />
                  {subject.hours}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink shadow-soft">
                  <Gauge size={14} style={{ color: subject.color }} />
                  {subject.level}
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute">What we cover</p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {subject.topics.map((topic) => (
                    <motion.span
                      key={topic}
                      variants={chip}
                      className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors duration-300 hover:border-ink/25"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: subject.color }} />
                      {topic}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — tinted photo card */}
            <motion.div variants={scaleIn} className="group relative h-[320px] overflow-hidden rounded-[2rem] shadow-soft sm:h-[420px] lg:h-[480px]">
              <img
                src={image}
                alt={subject.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(165deg, ${subject.color}55 0%, transparent 45%, ${subject.color}cc 100%)`,
                }}
              />
              <div className="absolute inset-x-5 top-5">
                <span className="pill-tag" style={{ color: subject.color }}>
                  {subject.name}
                </span>
              </div>
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <p className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
                  {subject.hours}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {subject.level}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
