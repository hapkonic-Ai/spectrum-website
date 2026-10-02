import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calculator,
  FlaskConical,
  Lightbulb,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const blueText = {
  background: 'linear-gradient(100deg,#1e3a8a,#2563eb)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

const headline = [
  { t: 'BUILD A' },
  { t: 'BRIGHTER', style: blueText },
  { t: 'FUTURE WITH' },
  { t: 'SPECTRUM', style: blueText },
]

const subjectPills = [
  { icon: BookOpen, label: 'English', cls: 'bg-violet-100 text-violet-800', pos: 'left-[-5%] top-[30%]', delay: 3.45, floatDelay: '0s', rot: '-4deg' },
  { icon: Calculator, label: 'Mathematics', cls: 'bg-sky-100 text-sky-800', pos: 'left-[-9%] top-[58%]', delay: 3.6, floatDelay: '-1.4s', rot: '3deg' },
  { icon: FlaskConical, label: 'Science', cls: 'bg-blue-100 text-blue-800', pos: 'right-[-3%] top-[26%]', delay: 3.75, floatDelay: '-2.6s', rot: '2deg' },
  { icon: Users, label: 'Social Studies', cls: 'bg-amber-100 text-amber-800', pos: 'right-[-7%] top-[58%]', delay: 3.9, floatDelay: '-3.8s', rot: '-3deg' },
]

const sparkles = [
  { pos: 'left-[2%] top-[12%]', size: 20, delay: 0, color: 'text-blue-700' },
  { pos: 'right-[30%] top-[2%]', size: 14, delay: 0.7, color: 'text-indigo-400' },
  { pos: 'left-[30%] bottom-[30%]', size: 16, delay: 1.4, color: 'text-blue-500' },
  { pos: 'right-[4%] bottom-[38%]', size: 12, delay: 2.1, color: 'text-indigo-500' },
  { pos: 'left-[16%] top-[44%]', size: 12, delay: 2.8, color: 'text-blue-600' },
]

const circles = [
  { pos: 'right-[12%] top-[8%]', size: 14, delay: 3.4 },
  { pos: 'left-[6%] bottom-[18%]', size: 18, delay: 3.9 },
  { pos: 'right-[38%] bottom-[10%]', size: 12, delay: 4.4 },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* ── Illustrated background art ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hex-bg-light absolute inset-0 opacity-70" />
        <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-blue-200/40 blur-[110px]" />
        <div className="absolute -left-52 bottom-[-14rem] h-[32rem] w-[32rem] rounded-full bg-indigo-200/30 blur-[110px]" />

        {/* giant gradient pyramid mark */}
        <motion.svg
          initial={{ opacity: 0, y: 40, rotate: 8 }}
          animate={{ opacity: [0.85, 1, 0.85], y: 0, rotate: 4 }}
          transition={{
            opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3.2 },
            y: { delay: 2.7, duration: 1.4, ease },
            rotate: { delay: 2.7, duration: 1.4, ease },
          }}
          viewBox="0 0 200 180"
          className="absolute right-[1%] top-[3%] hidden w-[420px] sm:block lg:w-[520px]"
        >
          <defs>
            <linearGradient id="heroPyramid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <path
            d="M100 6 194 172H6L100 6Z M100 64 150 146H50L100 64Z"
            fill="url(#heroPyramid)"
            fillRule="evenodd"
            opacity="0.55"
          />
        </motion.svg>

        {/* dashed flight path */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3.4 }}
          viewBox="0 0 500 320"
          fill="none"
          className="absolute right-[6%] top-[14%] hidden w-[480px] lg:block"
        >
          <path
            d="M14 300 C 130 190, 300 260, 486 40"
            stroke="#3b82f6"
            strokeOpacity="0.4"
            strokeWidth="2.5"
            strokeDasharray="7 9"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      <div className="container-x relative grid items-center gap-10 pb-10 pt-[120px] lg:min-h-screen lg:grid-cols-2 lg:gap-4 lg:pb-0">
        {/* ── Left: copy ── */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7, ease }}
            className="mb-7 flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-900/70 sm:text-xs">
              Admissions Open · 2026–27 · Vellore
            </span>
          </motion.div>

          <h1 className="font-display text-[15vw] uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl xl:text-[5.9rem]">
            {headline.map((line, i) => (
              <span key={line.t} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  style={line.style}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 2.4 + i * 0.12, duration: 1, ease }}
                >
                  {line.t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.95, duration: 0.7, ease }}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold tracking-[0.22em] text-ink/60 sm:text-xs"
          >
            <span>CLASSES 6 TO 10</span>
            <span className="h-3.5 w-px bg-ink/25" />
            <span>ALL SUBJECTS</span>
            <span className="h-3.5 w-px bg-ink/25" />
            <span>EXPERT FACULTY</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.05, duration: 0.7, ease }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-mute"
          >
            Concept clarity. Consistent practice. Real progress. Helping students in Vellore excel
            in school and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-cta">
              Book a Free Demo
              <span className="arrow-disc">
                <ArrowRight size={15} />
              </span>
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/70 px-7 py-[15px] text-sm font-bold text-ink transition-all duration-300 hover:bg-ink hover:text-white active:scale-95"
            >
              Explore Classes
            </a>
          </motion.div>
        </div>

        {/* ── Right: students cutout + floating elements ── */}
        <div className="relative mx-auto h-[400px] w-full max-w-[600px] sm:h-[480px] lg:h-[620px]">
          {/* student cutout */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.85, duration: 1.1, ease }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="animate-float" style={{ animationDelay: '-2.2s', ['--rot' as never]: '0deg' }}>
              <img
                src="/hero-students.png"
                alt="Cheerful Spectrum students with books and backpacks"
                className="w-full drop-shadow-[0_35px_35px_rgba(30,64,175,0.22)]"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3.25, type: 'spring', stiffness: 220, damping: 15 }}
            className="absolute -top-1 right-0 sm:right-2 lg:-top-3"
          >
            <div className="animate-float" style={{ animationDelay: '-1.8s', ['--rot' as never]: '2deg' }}>
              <div className="flex w-[230px] items-center gap-3 rounded-2xl bg-white p-4 shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700">
                  <BarChart3 size={22} />
                </span>
                <span>
                  <span className="block font-display text-[26px] leading-none text-ink">98.2%</span>
                  <span className="mt-1 block text-[11px] font-medium leading-snug text-mute">
                    Average improvement in school scores
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* subject pills */}
          {subjectPills.map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: p.delay, type: 'spring', stiffness: 260, damping: 14 }}
              className={`absolute hidden sm:block ${p.pos}`}
            >
              <div className="animate-float" style={{ animationDelay: p.floatDelay, ['--rot' as never]: p.rot }}>
                <span className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-pill ${p.cls}`}>
                  <p.icon size={17} />
                  {p.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* doodles — looping fade in / out + motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: 1, rotate: [0, 9, 0] }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 3.9 },
              scale: { delay: 3.9, type: 'spring', stiffness: 200, damping: 12 },
              rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3.9 },
            }}
            className="absolute left-[2%] top-[4%] hidden text-blue-900 lg:block"
          >
            <Lightbulb size={46} strokeWidth={1.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 4.1 },
              scale: { delay: 4.1, type: 'spring', stiffness: 200, damping: 12 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 4.1 },
            }}
            className="absolute right-[14%] top-[13%] hidden text-blue-900 lg:block"
          >
            <Send size={40} strokeWidth={1.6} className="-rotate-12" />
          </motion.div>

          {/* handwritten note */}
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: -10 }}
            animate={{ opacity: [0.55, 1, 0.55], y: 0, rotate: -6 }}
            transition={{
              opacity: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 4.3 },
              y: { delay: 4.3, type: 'spring', stiffness: 120, damping: 14 },
              rotate: { delay: 4.3, type: 'spring', stiffness: 120, damping: 14 },
            }}
            className="absolute right-[0%] top-[40%] hidden max-w-[190px] xl:block"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <span className="block text-[28px] leading-[1.05] text-blue-900/75">
              Better Understanding,
              <br />
              Brighter Results
            </span>
            <span className="mt-1 block h-[3px] w-24 rounded-full bg-blue-900/40" />
          </motion.div>

          {/* decorative circles — pop + fade loop */}
          {circles.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.25, 0.7, 0.25], scale: 1 }}
              transition={{
                duration: 3.6 + i * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.delay,
              }}
              className={`absolute hidden rounded-full border-2 border-blue-400/50 sm:block ${c.pos}`}
              style={{ width: c.size, height: c.size }}
            />
          ))}

          {/* sparkles — twinkle fade in / out */}
          {sparkles.map((s, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.1, 0.7], rotate: [0, 25, 0] }}
              transition={{
                duration: 2.6 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3.6 + s.delay,
              }}
              className={`absolute hidden sm:block ${s.pos} ${s.color}`}
            >
              <Sparkles size={s.size} />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
