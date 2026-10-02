import { motion } from 'framer-motion'
import { Check, Languages } from 'lucide-react'
import { viewport } from '../lib/anim'
import { boards } from '../lib/data'
import { SectionHeading } from './ui'

export function Boards() {
  return (
    <section id="boards" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          tag="Boards We Cover"
          title={
            <>
              Three boards.{' '}
              <span style={{ background: 'var(--cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                One
              </span>{' '}
              playbook.
            </>
          }
          sub="Separate tracks, faculty and material for every board — never one-size-fits-all teaching with a different label."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {boards.map((board, i) => (
            <motion.article
              key={board.id}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-line bg-paper p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              {/* top accent bar animates in on hover */}
              <span
                className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ background: board.accent }}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-5xl uppercase leading-none tracking-wide text-ink">
                    {board.name}
                  </h3>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-mute">
                    {board.full}
                  </p>
                </div>
                <span
                  className="mt-2 h-4 w-4 shrink-0 rounded-full shadow-pill"
                  style={{ background: board.accent }}
                />
              </div>

              <span className="pill-tag mt-6">{board.classes}</span>

              <p className="mt-5 text-sm leading-relaxed text-mute">{board.desc}</p>

              <ul className="mt-7 space-y-3.5 border-t border-line pt-7">
                {board.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-semibold text-ink">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: `${board.accent}1f`, color: board.accent }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Bilingual strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex items-center justify-center gap-3 rounded-full border border-line bg-paper px-6 py-4 text-sm font-semibold text-ink shadow-soft"
        >
          <Languages size={18} style={{ color: '#2e7cf6' }} />
          <span>
            Bilingual medium support — தமிழ் · English — across all boards and batches
          </span>
        </motion.div>
      </div>
    </section>
  )
}
