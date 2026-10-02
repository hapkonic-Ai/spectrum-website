import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ClipboardCheck, Users, Wallet, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { boards, courses } from '../lib/data'
import { fadeUp, stagger, viewport } from '../lib/anim'

const TARGET = new Date('2026-11-15T09:00:00+05:30').getTime()

interface Perk {
  icon: LucideIcon
  title: string
  desc: string
}

const perks: Perk[] = [
  { icon: ClipboardCheck, title: 'Personalized learning plans', desc: 'Tuned to pace, gaps and goals' },
  { icon: Wallet, title: 'Affordable fees & flexible batches', desc: 'Instalments, scholarships up to 40%' },
  { icon: Users, title: 'Limited seats — 20 per batch', desc: 'Hard-capped. When it fills, we open a new one.' },
]

const inputCls =
  'w-full rounded-xl border border-line-dark bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-400 transition-colors'

function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, TARGET - Date.now()))
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, TARGET - Date.now())), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.floor(left / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function FlipDigit({ value, pad = 2 }: { value: number; pad?: number }) {
  const text = String(value).padStart(pad, '0')
  return (
    <span className="relative inline-flex h-10 overflow-hidden sm:h-12">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="inline-block font-display text-4xl tracking-wide text-white sm:text-4xl"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Admissions() {
  const { days, hours, minutes, seconds } = useCountdown()
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-52 top-0 h-[28rem] w-[28rem] rounded-full bg-teal-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[130px]" />

      <div className="container-x relative">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* LEFT — pitch + countdown */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-5">
              <motion.span variants={fadeUp} className="eyebrow eyebrow-dark w-max">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--cta)' }} />
                Admissions 2026–27
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="max-w-xl font-display text-4xl uppercase leading-[1.02] tracking-wide text-white sm:text-6xl"
              >
                Admissions open —{' '}
                <span
                  style={{
                    background: 'var(--cta)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  join today
                </span>
              </motion.h2>
            </div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {perks.map((p) => (
                <motion.div
                  key={p.title}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 rounded-2xl border border-line-dark bg-coal p-4"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: 'var(--cta)' }}
                  >
                    <p.icon size={20} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-white/50">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                Next batch begins in
              </p>
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[
                  { v: days, l: 'Days', pad: 2 },
                  { v: hours, l: 'Hrs', pad: 2 },
                  { v: minutes, l: 'Min', pad: 2 },
                  { v: seconds, l: 'Sec', pad: 2 },
                ].map((u) => (
                  <div
                    key={u.l}
                    className="flex flex-col items-center gap-1 rounded-2xl border border-line-dark bg-coal px-2 py-5"
                  >
                    <FlipDigit value={u.v} pad={u.pad} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      {u.l}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — enrollment form */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-line-dark bg-coal p-8">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    className="flex min-h-[504px] flex-col items-center justify-center gap-6 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                      className="grid h-20 w-20 place-items-center rounded-3xl text-white"
                      style={{ background: 'var(--cta)' }}
                    >
                      <CheckCircle2 size={40} strokeWidth={2} />
                    </motion.span>
                    <h3 className="font-display text-3xl uppercase tracking-wide text-white">
                      Demo class reserved
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-white/60">
                      Our counselors will call you within 24 hours (demo data).
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="flex flex-col gap-4"
                  >
                    <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                      Book a free demo class
                    </h3>
                    <input required name="name" placeholder="Student name" className={inputCls} />
                    <input
                      required
                      name="phone"
                      type="tel"
                      pattern="[0-9+ -]{10,15}"
                      placeholder="Phone number"
                      className={inputCls}
                    />
                    <input name="email" type="email" placeholder="Email (optional)" className={inputCls} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <select required name="board" defaultValue="" className={inputCls}>
                        <option value="" disabled className="bg-ink">
                          Board
                        </option>
                        {boards.map((b) => (
                          <option key={b.id} value={b.id} className="bg-ink">
                            {b.name}
                          </option>
                        ))}
                      </select>
                      <select required name="class" defaultValue="" className={inputCls}>
                        <option value="" disabled className="bg-ink">
                          Class
                        </option>
                        {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                          <option key={c} value={c} className="bg-ink">
                            Class {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <select required name="course" defaultValue="" className={inputCls}>
                      <option value="" disabled className="bg-ink">
                        Course of interest
                      </option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id} className="bg-ink">
                          {c.name} · {c.classes}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Anything we should know? (optional)"
                      className={`${inputCls} resize-none`}
                    />
                    <button type="submit" className="btn-cta mt-2 w-full justify-center">
                      Reserve My Seat
                    </button>
                    <p className="text-center text-[11px] text-white/40">
                      Hard-capped at 20 students per batch · no spam, ever
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
