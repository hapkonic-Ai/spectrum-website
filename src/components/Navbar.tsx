import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks } from '../lib/data'
import { Logo } from './Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? 'border-line bg-cream/90 backdrop-blur-xl' : 'border-transparent bg-cream/60 backdrop-blur-md'
        }`}
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-blue-700"
          style={{ scaleX: progress }}
        />
        <nav className="container-x flex h-[76px] items-center justify-between">
          <a href="#home" className="flex items-center py-2">
            <Logo width={110} />
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[12px] font-bold uppercase tracking-[0.12em] text-ink/60 transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-blue-700 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 xl:flex">
            <a href="#contact" className="btn-cta !px-6 !py-3 text-xs">
              Book Free Demo
              <span className="arrow-disc !h-6 !w-6">
                <ArrowRight size={13} />
              </span>
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-line bg-paper p-2.5 xl:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[61] flex w-[78%] max-w-sm flex-col bg-cream p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo width={96} />
                <button onClick={() => setOpen(false)} className="rounded-full border border-line bg-paper p-2.5" aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-2">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.4 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-3xl tracking-wide text-ink/70 transition-colors hover:bg-white hover:text-ink"
                    >
                      {l.label}
                      <ArrowRight size={20} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-cta mt-auto w-full justify-center">
                Book Free Demo
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
