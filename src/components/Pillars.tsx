import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { pillars, subjects } from '../lib/data'
import { SectionHeading } from './ui'

export function Pillars() {
  return (
    <section id="why" className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-52 top-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-teal-500/15 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          tag="Why SPECTRUM?"
          dark
          title={
            <>
              Teaching that <span style={{ background: 'var(--cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>actually sticks</span>
            </>
          }
          sub="Every batch, material set and test is built around one question — does this help the child understand, apply and score?"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.a
              href="#courses"
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative block h-[460px] overflow-hidden rounded-[2.5rem] sm:h-[520px]"
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 transition-opacity duration-500" />

              {/* floating pill tags */}
              <div className="absolute inset-x-5 top-5 flex flex-wrap gap-2">
                {p.pills.map((pill) => (
                  <span key={pill} className="pill-tag">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <h3 className="font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{p.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  Explore
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
                    <ArrowDownRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* giant subject marquee */}
      <div className="mt-20 overflow-hidden border-t border-line-dark pt-8">
        <div className="flex w-max animate-marquee-slow gap-8">
          {[...subjects, ...subjects, ...subjects].map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-5xl uppercase tracking-wide text-white/15 sm:text-7xl">
              {s.name}
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--cta)' }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
