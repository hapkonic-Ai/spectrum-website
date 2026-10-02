import { motion } from 'framer-motion'
import { toppers } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'
import { SectionHeading } from './ui'

function TopperCard({ name, score, board, year, note, photo }: (typeof toppers)[number]) {
  return (
    <div className="spotlight-card group w-[280px] shrink-0 rounded-3xl border border-line-dark bg-coal p-5 transition-colors duration-300 hover:border-white/25 sm:w-[300px]">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={photo}
            alt={name}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/15 transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[9px] font-black text-ink">
            {score.toFixed(0)}
          </span>
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-white">{name}</div>
          <div className="mt-0.5 truncate text-[11px] text-white/50">{note}</div>
        </div>
      </div>
      <div className="mt-4 font-display text-3xl tracking-wide text-white">
        {score.toFixed(1)}
        <span className="text-base text-white/40">%</span>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full border border-line-dark bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60">
          {board}
        </span>
        <span className="rounded-full border border-line-dark bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60">
          {year}
        </span>
      </div>
    </div>
  )
}

export function Toppers() {
  return (
    <section id="results" className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-52 top-24 h-[26rem] w-[26rem] rounded-full bg-teal-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-52 bottom-24 h-[26rem] w-[26rem] rounded-full bg-blue-600/20 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          dark
          tag="Results"
          title={
            <>
              Toppers are{' '}
              <span
                style={{
                  background: 'var(--cta)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                grown
              </span>
              , not born
            </>
          }
          sub="A 98.6% distinction rate across CBSE, ICSE and State Board — meet the students who made it happen."
        />

        <motion.div variants={stagger} viewport={viewport} initial="hidden" whileInView="show" className="mt-16">
          <motion.div variants={fadeUp} className="overflow-hidden">
            <div className="flex w-max animate-marquee gap-6 pr-6 hover:[animation-play-state:paused]">
              {[...toppers, ...toppers].map((t, i) => (
                <TopperCard key={`a-${i}`} {...t} />
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 overflow-hidden">
            <div className="flex w-max animate-marquee-reverse gap-6 pr-6 hover:[animation-play-state:paused]">
              {[...toppers, ...toppers].reverse().map((t, i) => (
                <TopperCard key={`b-${i}`} {...t} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
