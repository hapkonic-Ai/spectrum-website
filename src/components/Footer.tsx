import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { contact, navLinks, subjects } from '../lib/data'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#home" className="block w-max rounded-2xl bg-white p-3 shadow-soft">
            <Logo width={140} />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Board-specific coaching for CBSE, ICSE &amp; State Board students in Vellore — 35+ years
            of craft, rebuilt for the next decade of learners.
          </p>
          <div className="mt-6 h-1.5 w-24 rounded-full" style={{ background: 'var(--cta)' }} />
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Explore</h4>
          <ul className="mt-5 space-y-3">
            {navLinks.slice(0, 6).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white">
                  {l.label}
                  <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Subjects</h4>
          <ul className="mt-5 space-y-3">
            {subjects.map((s) => (
              <li key={s.id}>
                <a href="#subjects" className="text-sm text-white/70 transition-colors hover:text-white">
                  {s.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#courses" className="text-sm text-white/70 transition-colors hover:text-white">
                Summer Bridge Program
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Reach Us</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-teal-300" />
              {contact.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-blue-300" />
              {contact.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-teal-300" />
              {contact.email}
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-blue-300" />
              {contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 sm:flex-row">
          <span>© 2026 Spectrum Tuition Point, Vellore. Concept demo — all data is illustrative.</span>
          <a href="#home" className="group flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white">
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line-dark transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
