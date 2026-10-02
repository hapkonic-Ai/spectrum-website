import { motion } from 'framer-motion'
import { GraduationCap, Star, Users } from 'lucide-react'
import { faculty } from '../lib/data'
import type { Faculty as FacultyMember } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

const gradientText = {
  background: 'var(--cta)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

const edgeFade = {
  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
} as const

function FacultyCard({ member, className = '' }: { member: FacultyMember; className?: string }) {
  return (
    <article
      className={`group flex shrink-0 flex-col rounded-3xl border border-line bg-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={member.photo}
            alt={member.name}
            width={80}
            height={80}
            loading="lazy"
            className="h-20 w-20 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            style={{ boxShadow: `0 0 0 3px ${member.hue}45` }}
          />
          <span
            className="absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full text-white shadow-pill"
            style={{ background: member.hue }}
          >
            <GraduationCap size={13} />
          </span>
        </div>
        <div className="min-w-0">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ backgroundColor: `${member.hue}1a`, color: member.hue }}
          >
            {member.subject}
          </span>
          <h3 className="mt-1.5 truncate font-display text-xl uppercase tracking-wide text-ink">
            {member.name}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-mute">{member.degree}</p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-ink/80">
          <GraduationCap size={15} style={{ color: member.hue }} />
          {member.exp} yrs
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-ink/80">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          {member.rating.toFixed(1)}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-ink/80">
          <Users size={15} style={{ color: member.hue }} />
          {member.students}
        </div>
      </div>
    </article>
  )
}

export function Faculty() {
  const row = [...faculty, ...faculty]

  return (
    <section id="faculty" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          tag="Faculty"
          title={
            <>
              Meet the <span style={gradientText}>mentors</span>
            </>
          }
          sub="PhDs, gold medalists and board examiners — 120+ educators who have spent decades mastering how students actually learn."
        />
      </div>

      {/* Desktop: seamless auto-scrolling marquee */}
      <div
        className="mt-16 hidden overflow-hidden md:block"
        style={edgeFade}
      >
        <div className="flex w-max animate-marquee-slow gap-6 px-3 hover:[animation-play-state:paused]">
          {row.map((member, i) => (
            <FacultyCard key={`${member.initials}-${i}`} member={member} className="w-[320px]" />
          ))}
        </div>
      </div>

      {/* Mobile: static grid */}
      <div className="container-x mt-14 md:hidden">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {faculty.map((member) => (
            <motion.div key={member.initials} variants={fadeUp}>
              <FacultyCard member={member} className="w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
