// ─────────────────────────────────────────────────────────────
// SPECTRUM demo — inflated / fictional showcase data.
// Every number, person and quote below is fabricated for the demo.
// ─────────────────────────────────────────────────────────────

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Classes (6–10)', href: '#courses' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Why Us', href: '#why' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const tickerItems = [
  'Admissions open for 2026–27',
  'Classes 6 – 12 · CBSE · ICSE · State Board',
  'Free demo classes every weekend',
  'Batches limited to 20 students',
  '24×7 doubt-resolution app',
  'New senior wing for Classes 11 & 12',
  'Parent progress reports every fortnight',
]

export interface Stat {
  value: number
  suffix: string
  label: string
  decimals?: number
}

export const stats: Stat[] = [
  { value: 35, suffix: '+', label: 'Years of teaching excellence' },
  { value: 12500, suffix: '+', label: 'Students mentored till date' },
  { value: 98.6, suffix: '%', label: 'Board distinction rate', decimals: 1 },
  { value: 120, suffix: '+', label: 'Expert faculty members' },
  { value: 4200, suffix: '+', label: 'Tests conducted every year' },
  { value: 64000, suffix: '+', label: 'Doubts solved on the app' },
]

export interface Feature {
  icon: string
  title: string
  desc: string
}

export const whySpectrum: Feature[] = [
  {
    icon: 'GraduationCap',
    title: 'Expert Faculty',
    desc: 'PhD & gold-medalist educators with 35+ years of combined teaching craft, board-examiner insight and structured, proven methods.',
  },
  {
    icon: 'Crosshair',
    title: 'Exam-Focused Learning',
    desc: 'Concept-first teaching layered with timed practice, chapter-wise tests and targeted revision cycles tuned to each board blueprint.',
  },
  {
    icon: 'Wrench',
    title: 'Learning Tools',
    desc: 'A 24×7 doubt-resolution app, adaptive question banks and custom study material that test, analyse and improve continuously.',
  },
  {
    icon: 'Compass',
    title: 'Mentor Support',
    desc: 'One-on-one mentorship, exam-strategy reviews and fortnightly parent updates so every learner stays on a visible growth curve.',
  },
]

export interface Subject {
  id: string
  name: string
  tagline: string
  hours: string
  level: string
  color: string
  topics: string[]
}

export const subjects: Subject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    tagline: 'From number sense to calculus — built layer by layer, never memorised.',
    hours: '8 hrs / week',
    level: 'Core + Advanced',
    color: '#8b5cf6',
    topics: ['Algebra & Polynomials', 'Geometry Proofs', 'Trigonometry', 'Calculus Foundations', 'Statistics & Probability', 'Advanced Problem Solving'],
  },
  {
    id: 'physics',
    name: 'Physics',
    tagline: 'See the physics before you solve it — demos, models and derivations.',
    hours: '6 hrs / week',
    level: 'Concept + Numericals',
    color: '#3b82f6',
    topics: ['Kinematics & Laws of Motion', 'Electricity & Circuits', 'Light & Ray Optics', 'Thermodynamics', 'Modern Physics', 'Board-style Numericals'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    tagline: 'Mechanisms, mole concepts and memory hooks that actually stick.',
    hours: '6 hrs / week',
    level: 'Organic + Physical',
    color: '#22d3ee',
    topics: ['Mole Concept & Stoichiometry', 'Atomic Structure', 'Chemical Bonding', 'Organic Mechanisms', 'Acids, Bases & Salts', 'Periodic Trends'],
  },
  {
    id: 'biology',
    name: 'Biology',
    tagline: 'Diagram-first learning with NCERT line-by-line mastery.',
    hours: '5 hrs / week',
    level: 'NCERT Mastery',
    color: '#34d399',
    topics: ['Cell Biology', 'Human Physiology', 'Genetics & Evolution', 'Plant Kingdom', 'Ecology & Environment', 'Assertion-Reason Drills'],
  },
]

export interface Board {
  id: string
  name: string
  full: string
  desc: string
  classes: string
  points: string[]
  accent: string
}

export const boards: Board[] = [
  {
    id: 'cbse',
    name: 'CBSE',
    full: 'Central Board of Secondary Education',
    desc: 'NCERT-aligned mastery with competency-based question patterns and CBSE-style evaluation training.',
    classes: 'Classes 6 – 12',
    points: ['NCERT line-by-line coverage', 'Competency-based question drills', 'Sample-paper marathons', 'OTA-style answer framing'],
    accent: '#3b82f6',
  },
  {
    id: 'icse',
    name: 'ICSE',
    full: 'Indian Certificate of Secondary Education',
    desc: 'Depth-heavy syllabus handling with emphasis on application, presentation and board-specific answer craft.',
    classes: 'Classes 6 – 10',
    points: ['Application-first teaching', 'Diagram & presentation training', 'Ten-year solved papers', 'Internal-assessment support'],
    accent: '#f59e0b',
  },
  {
    id: 'state',
    name: 'State Board',
    full: 'Matriculation · Tamil Nadu',
    desc: 'Samacheer-aligned coaching with bilingual support and cut-off-oriented preparation for board exams.',
    classes: 'Classes 6 – 12',
    points: ['Samacheer Kalvi alignment', 'Tamil / English medium batches', 'Cut-off score optimisation', 'Quarterly & half-yearly prep'],
    accent: '#22d3ee',
  },
]

export interface Course {
  id: string
  name: string
  classes: string
  duration: string
  price: string
  oldPrice: string
  tag?: string
  blurb: string
  features: string[]
  accent: string
}

export const courses: Course[] = [
  {
    id: 'foundation',
    name: 'Foundation Core',
    classes: 'Classes 6 – 8',
    duration: '1 academic year',
    price: '₹24,000',
    oldPrice: '₹32,000',
    tag: 'Popular',
    blurb: 'Concept bedsrock for Maths, Science and English with habit-building study routines.',
    features: ['Maths + Science + English', 'Weekly concept tests', 'Reading & writing labs', 'Parent app access'],
    accent: '#8b5cf6',
  },
  {
    id: 'boardx',
    name: 'Board Mastery X',
    classes: 'Classes 9 – 10',
    duration: '1 academic year',
    price: '₹38,500',
    oldPrice: '₹52,000',
    tag: 'Bestseller',
    blurb: 'The full board-exam machine — concept teaching, test series, revision sprints and answer craft.',
    features: ['All core subjects', '42-test grand series', 'Answer-evaluation clinics', 'Study material included'],
    accent: '#3b82f6',
  },
  {
    id: 'scixii',
    name: 'Senior Science Pro',
    classes: 'Classes 11 – 12',
    duration: '1 academic year',
    price: '₹52,000',
    oldPrice: '₹68,000',
    blurb: 'PCMB/PCMC depth coaching with complete board mastery, answer craft and structured revision.',
    features: ['Physics · Chemistry · Maths · Bio', 'Board-focused depth teaching', 'Monthly parent reviews', 'Mentor check-ins'],
    accent: '#22d3ee',
  },
  {
    id: 'bridge',
    name: 'Summer Bridge Program',
    classes: 'Classes 6 – 10',
    duration: '6 weeks',
    price: '₹9,999',
    oldPrice: '₹14,000',
    tag: 'NEW',
    blurb: 'A six-week head start on the next academic year — preview chapters, rebuild basics and close last year’s gaps.',
    features: ['Next-year syllabus preview', 'Basics-rebuild bootcamp', 'Diagnostic test + study plan', 'Parent debrief session'],
    accent: '#34d399',
  },
  {
    id: 'crash',
    name: 'Final Lap Crash Course',
    classes: 'Class 10 & 12',
    duration: '10 weeks',
    price: '₹14,999',
    oldPrice: '₹22,000',
    blurb: 'A hyper-focused revision blitz — full syllabus in 70 days with daily tests and strategy labs.',
    features: ['70-day structured plan', 'Daily mini-tests', 'PYQ marathons', 'Exam-hall strategy labs'],
    accent: '#f59e0b',
  },
  {
    id: 'onetoone',
    name: '1-on-1 Elite Mentoring',
    classes: 'All classes',
    duration: 'Custom plans',
    price: '₹1,200',
    oldPrice: '₹1,800',
    blurb: 'Private mentoring for students who need a fully personalised pace, plan and mentor.',
    features: ['Dedicated mentor', 'Custom timetable', 'Flexible scheduling', 'WhatsApp priority line'],
    accent: '#f472b6',
  },
]

export const parentReasons: Feature[] = [
  { icon: 'UserCheck', title: 'Personalized Attention', desc: 'Learning plans tuned to every student’s pace, gaps and goals.' },
  { icon: 'Users', title: 'Small Batch Sizes', desc: 'Maximum 20 students per batch — real interaction, real attention.' },
  { icon: 'BookOpen', title: 'Board-Specific Teaching', desc: 'Separate CBSE, ICSE and State Board tracks with aligned material.' },
  { icon: 'ChartLine', title: 'Tests & Performance Analysis', desc: 'Continuous assessment with chapter, unit and grand test analytics.' },
  { icon: 'Award', title: 'Experienced Subject Experts', desc: 'Senior educators with deep board-examiner and evaluation insight.' },
  { icon: 'MessageCircleQuestion', title: 'Doubt-Clearing Sessions', desc: 'Dedicated daily pods plus a 24×7 in-app doubt engine.' },
  { icon: 'BellRing', title: 'Parent Progress Updates', desc: 'Fortnightly reports, app dashboards and mentor calls to parents.' },
]

export interface Faculty {
  name: string
  subject: string
  degree: string
  exp: number
  rating: number
  students: string
  initials: string
  photo: string
  hue: string
}

export const faculty: Faculty[] = [
  { name: 'Dr. Meera Krishnan', subject: 'Mathematics', degree: 'PhD, IIT Madras', exp: 21, rating: 4.9, students: '3,200+', initials: 'MK', photo: 'https://randomuser.me/api/portraits/women/68.jpg', hue: '#8b5cf6' },
  { name: 'Prof. Arjun Raghavan', subject: 'Physics', degree: 'M.Sc Physics, Gold Medalist', exp: 17, rating: 4.9, students: '2,800+', initials: 'AR', photo: 'https://randomuser.me/api/portraits/men/32.jpg', hue: '#3b82f6' },
  { name: 'Dr. S. Lavanya', subject: 'Chemistry', degree: 'PhD Organic Chemistry', exp: 14, rating: 4.8, students: '2,400+', initials: 'SL', photo: 'https://randomuser.me/api/portraits/women/44.jpg', hue: '#22d3ee' },
  { name: 'Prof. Kevin D’Souza', subject: 'Biology', degree: 'M.Sc Botany, Board Examiner', exp: 12, rating: 4.9, students: '2,100+', initials: 'KD', photo: 'https://randomuser.me/api/portraits/men/75.jpg', hue: '#34d399' },
  { name: 'Ms. Anitha Selvam', subject: 'English & Grammar', degree: 'M.A English Literature', exp: 15, rating: 4.8, students: '1,900+', initials: 'AS', photo: 'https://randomuser.me/api/portraits/women/12.jpg', hue: '#f59e0b' },
  { name: 'Mr. Vikram Iyer', subject: 'Mathematics', degree: 'M.Sc Mathematics, B.Ed', exp: 9, rating: 4.7, students: '1,400+', initials: 'VI', photo: 'https://randomuser.me/api/portraits/men/41.jpg', hue: '#f472b6' },
]

export interface Topper {
  name: string
  score: number
  board: string
  year: number
  note: string
  initials: string
  photo: string
}

export const toppers: Topper[] = [
  { name: 'Aditi Raman', score: 99.2, board: 'CBSE', year: 2026, note: 'School topper, Class 10', initials: 'AR', photo: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { name: 'S. Karthik', score: 98.8, board: 'State', year: 2026, note: 'District rank 3, Class 12', initials: 'SK', photo: 'https://randomuser.me/api/portraits/men/18.jpg' },
  { name: 'Ishita Kapoor', score: 98.4, board: 'ICSE', year: 2025, note: '99 in Maths & Physics', initials: 'IK', photo: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { name: 'Md. Faisal', score: 98.0, board: 'CBSE', year: 2025, note: 'Maths centum', initials: 'MF', photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Priya Nair', score: 97.6, board: 'ICSE', year: 2026, note: '100 in Chemistry', initials: 'PN', photo: 'https://randomuser.me/api/portraits/women/26.jpg' },
  { name: 'R. Dinesh', score: 97.2, board: 'State', year: 2024, note: 'Biology centum', initials: 'RD', photo: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Aarav Menon', score: 96.8, board: 'CBSE', year: 2026, note: 'Centum in Mathematics', initials: 'AM', photo: 'https://randomuser.me/api/portraits/men/29.jpg' },
  { name: 'Sneha Reddy', score: 96.4, board: 'State', year: 2025, note: 'District rank 5, Class 12', initials: 'SR', photo: 'https://randomuser.me/api/portraits/women/17.jpg' },
]

export interface Testimonial {
  name: string
  role: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  { name: 'Ramesh Kumar', role: 'Parent · Class 10 CBSE', text: 'The fortnightly progress reports changed everything for us. We always knew exactly where our son stood and what came next.', rating: 5 },
  { name: 'Aditi Raman', role: 'Student · 99.2% CBSE', text: 'The test series felt harder than the actual boards. Walking into the exam hall felt like a revision session.', rating: 5 },
  { name: 'Fatima Sheikh', role: 'Parent · Class 8 ICSE', text: 'Small batches mean the teachers actually know my daughter — her gaps, her pace, her mood before tests.', rating: 5 },
  { name: 'S. Karthik', role: 'Student · District rank 3', text: 'Doubt pods at 11 pm before my board exam — who does that? Spectrum does.', rating: 5 },
  { name: 'Lakshmi Narayanan', role: 'Parent · Class 12 State Board', text: 'Bilingual teaching helped my son switch mediums without losing a single mark. Worth every rupee.', rating: 4 },
  { name: 'Dev Patel', role: 'Student · Class 12 CBSE', text: 'The daily practice system compounds. Six months in, physics numericals that scared me became my strongest section.', rating: 5 },
  { name: 'Anitha Jose', role: 'Parent · Class 9 CBSE', text: 'Mentor calls before every exam kept my daughter calm and planned. It is coaching plus guidance, really.', rating: 5 },
  { name: 'Rohan Verma', role: 'Student · Crash Course', text: 'Seventy days, full syllabus, daily tests. The crash course is the most disciplined I have ever been.', rating: 5 },
]

export interface Resource {
  icon: string
  title: string
  desc: string
  meta: string
}

export const resources: Resource[] = [
  { icon: 'NotebookPen', title: 'Chapter Notes', desc: 'Board-mapped, diagram-rich notes for every chapter, refreshed every term.', meta: '1,200+ chapters' },
  { icon: 'Layers', title: 'Question Banks', desc: 'Graded question banks from NCERT-level to topper-level, with video solutions.', meta: '38,000+ questions' },
  { icon: 'Timer', title: 'Test Series', desc: 'Chapter, unit and grand tests with percentiles and error analytics.', meta: '4,200 tests / yr' },
  { icon: 'MonitorPlay', title: 'Video Library', desc: 'Recorded concept capsules for every topic — rewind, replay, revise.', meta: '2,400+ videos' },
  { icon: 'FileText', title: 'Formula Sheets', desc: 'One-page formula and reaction maps for last-minute revision sprints.', meta: '350+ sheets' },
  { icon: 'History', title: 'PYQ Vault', desc: 'Ten years of board papers solved, tagged by chapter and difficulty.', meta: '10 years × 3 boards' },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  { q: 'Which boards and classes do you cover?', a: 'We run dedicated tracks for CBSE (Classes 6–12), ICSE (Classes 6–10) and Tamil Nadu State Board / Matriculation (Classes 6–12), each with its own faculty, material and test calendar.' },
  { q: 'How small are the batches, really?', a: 'Hard-capped at 20 students per batch. When a batch fills, we open a new one — we never squeeze extra chairs in.' },
  { q: 'Is the demo class actually free?', a: 'Yes — every weekend we run free demo classes for any subject and any board. Attend with your child, meet the faculty, sit through a real session, then decide.' },
  { q: 'How do parents track progress?', a: 'You get a parent app login with test analytics, attendance and mentor remarks, plus a structured mentor call every fortnight and a written report every term.' },
  { q: 'Do you coach for JEE / NEET or other entrance exams?', a: 'No — Spectrum is deliberately focused. We do one thing: Classes 6–12 board excellence for CBSE, ICSE and State Board. That single-minded focus is exactly why our distinction rate stays above 98%.' },
  { q: 'What are the fees and payment options?', a: 'Course fees range from ₹9,999 to ₹52,000 per year depending on the track. Instalment plans, sibling discounts and merit scholarships up to 40% are available.' },
]

export const contact = {
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'hello@spectrumdemo.in',
  address: '2nd Floor, Spectrum Towers, Anna Salai, Vellore, Tamil Nadu 632001',
  hours: 'Mon – Sat · 9:00 AM – 8:30 PM',
}

// ── V2: photography & pillar data (stock URLs — demo only) ──

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const photos = {
  heroWord: u('photo-1509062522246-3755977927d7'),
  heroCampus: u('photo-1562774053-701939374585', 2000),
  heroStudents: u('photo-1522202176988-66273c2fd55f', 1200),
  pillars: [
    u('photo-1427504494785-3a9ca7044f45'),
    u('photo-1523240795612-9a054b0db644'),
    u('photo-1517245386807-bb43f82c33c4'),
  ],
  courses: [
    u('photo-1503676260728-1c00da094a0b'),
    u('photo-1434030216411-0b793f4b4173'),
    u('photo-1532094349884-543bc11b234d'),
    u('photo-1524178232363-1fb2b075b655'),
    u('photo-1522202176988-66273c2fd55f'),
    u('photo-1456513080510-7bf3a84b82f8'),
  ],
  badges: [
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
  ],
}

export interface Pillar {
  title: string
  desc: string
  image: string
  pills: string[]
}

export const pillars: Pillar[] = [
  {
    title: 'Board-Specific Teaching',
    desc: 'Separate CBSE, ICSE and State Board tracks — never one-size-fits-all.',
    image: photos.pillars[0],
    pills: ['CBSE', 'ICSE', 'State Board', 'Bilingual'],
  },
  {
    title: 'Concept-First Classes',
    desc: 'Understanding before memorising, application before examination.',
    image: photos.pillars[1],
    pills: ['Conceptual Clarity', 'Real-World Application', 'Exam Technique', 'Revision'],
  },
  {
    title: '24×7 Learning Tools',
    desc: 'Doubt app, test series and analytics that keep working after class ends.',
    image: photos.pillars[2],
    pills: ['Doubt App', 'Test Series', 'Video Library', 'Analytics'],
  },
]
