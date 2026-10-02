import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import { Admissions } from './components/Admissions'
import { Boards } from './components/Boards'
import { Courses } from './components/Courses'
import { Cursor } from './components/Cursor'
import { Faq } from './components/Faq'
import { Faculty } from './components/Faculty'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Parents } from './components/Parents'
import { Pillars } from './components/Pillars'
import { Preloader } from './components/Preloader'
import { Resources } from './components/Resources'
import { Stats } from './components/Stats'
import { Subjects } from './components/Subjects'
import { Testimonials } from './components/Testimonials'
import { Toppers } from './components/Toppers'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Lenis smooth scroll — sync with anchor navigation
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf: number
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -76 })
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  // Lock scroll while preloading
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <div className="noise relative min-h-screen bg-cream">
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Pillars />
        <Stats />
        <Parents />
        <Subjects />
        <Boards />
        <Courses />
        <Faculty />
        <Toppers />
        <Testimonials />
        <Resources />
        <Admissions />
        <Faq />
      </main>

      <Footer />
    </div>
  )
}
