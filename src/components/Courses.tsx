import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { courses, photos } from '../lib/data'
import type { Course } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

const gradientText = {
  background: 'var(--cta)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-line bg-paper shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={photos.courses[index]}
          alt={course.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
        <span className="pill-tag absolute left-4 top-4 !px-3.5 !py-1.5 !text-xs">
          {course.classes}
        </span>
        {course.tag && (
          <span
            className="absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-pill"
            style={{ backgroundColor: course.accent }}
          >
            {course.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl uppercase tracking-wide text-ink">
          {course.name}
        </h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mute">
          {course.duration}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mute">{course.blurb}</p>

        <ul className="mt-5 space-y-2.5">
          {course.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: `${course.accent}1f`, color: course.accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
          <div>
            <div className="font-display text-3xl uppercase tracking-wide text-ink">
              {course.price}
            </div>
            <div className="text-sm font-semibold text-mute line-through">
              {course.oldPrice}
            </div>
          </div>
          <a
            href="#contact"
            aria-label={`Enquire about ${course.name}`}
            className="grid place-items-center rounded-full bg-ink p-3 text-white transition-transform duration-300 group-hover:rotate-45"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function Courses() {
  return (
    <section id="courses" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-24 h-[26rem] w-[26rem] rounded-full bg-teal-300/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-[26rem] w-[26rem] rounded-full bg-blue-400/20 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          tag="Programs"
          title={
            <>
              Pick your <span style={gradientText}>track</span>
            </>
          }
          sub="Personalised study plans, genuinely affordable fees and batches hard-capped at 20 students — so every learner gets noticed, tested and mentored."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
