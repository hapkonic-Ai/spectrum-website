import { Quote, Star } from 'lucide-react'
import { testimonials } from '../lib/data'
import { SectionHeading } from './ui'

function TestimonialCard({
  name,
  role,
  text,
  rating,
  tilt,
}: (typeof testimonials)[number] & { tilt: boolean }) {
  return (
    <div
      className={`group relative w-[380px] shrink-0 rounded-3xl border border-line bg-paper p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift ${
        tilt ? 'rotate-1' : '-rotate-1'
      } hover:rotate-0`}
    >
      <Quote
        className="absolute right-5 top-5 text-ink opacity-[0.06]"
        size={72}
        fill="currentColor"
        strokeWidth={0}
      />
      <div className="relative flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-amber-400' : 'text-ink/15'}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>
      <p className="relative mt-4 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
        &ldquo;{text}&rdquo;
      </p>
      <div className="relative mt-6 border-t border-line pt-4">
        <div className="text-sm font-bold text-ink">{name}</div>
        <div className="mt-0.5 text-xs text-mute">{role}</div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          tag="Reviews"
          title={
            <>
              Parents &amp; students <span style={{ background: 'var(--cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>love</span> it here
            </>
          }
          sub="Real words from the families and learners who walk through our doors every day in Vellore."
        />
      </div>

      <div
        className="mt-16 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee-slow gap-6 pr-6 hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} {...t} tilt={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
