import { useEffect, useState } from 'react'
import './App.css'

const nav = [['About', 'about'], ['Experience', 'experience'], ['Projects', 'projects'], ['Skills', 'skills'], ['Education', 'education']]
const socials = [
  ['LinkedIn', 'https://linkedin.com/in/nivinjk'],
  ['GitHub', 'https://github.com/jknivin'],
  ['LeetCode', 'https://leetcode.com/u/jknivin'],
]
const experiences = [
  { company: 'Codingmart Technologies', role: 'Full Stack Engineer', note: 'Promoted from Intern', dates: 'July 2025 - September 2026', tags: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'AWS Lambda'], points: ['Built features across TravelGo, a B2B travel booking platform, and QuickRecruit, a recruitment SaaS product.', 'Integrated HotelBeds and WebBeds APIs, processing JSON and XML responses for travel inventory.', 'Worked with Redis caching, Elasticsearch and Kibana, AWS Lambda, Razorpay, and scheduled jobs.', 'Contributed to custom role-based access, WebSocket live chat, and microservice workflows.'] },
  { company: 'Wenexo Technologies', role: 'Intern', dates: 'June 2024 - July 2024', tags: ['Software Development'], points: ['Responsibilities are not detailed in the supplied brief.'] },
  { company: 'NITTTR Chennai', role: 'AR/VR Development Intern', note: 'Additional experience from the previous portfolio', tags: ['Unity', 'Blender', 'AR/VR', '3D'], points: ['Worked with Unity and Blender on AR/VR development, 3D modelling, and interactive environments.'] },
]
const projects = [
  { name: 'TravelGo', kind: 'B2B travel platform', number: '01', description: 'A travel booking platform connecting hotel and transport inventory with a reliable search and booking flow.', tags: ['React.js', 'Express.js', 'PostgreSQL', 'Redis', 'Elasticsearch', 'AWS Lambda', 'Razorpay'], points: ['HotelBeds and WebBeds integrations with JSON and XML processing.', 'Search backed by Elasticsearch, with Redis caching for frequently used data.', 'Price rechecking and locking in the booking flow, with Razorpay payment integration.'], visual: 'travel' },
  { name: 'QuickRecruit', kind: 'Recruitment SaaS', number: '02', description: 'A recruitment platform with hiring workflows, candidate tools, AI-assisted features, and real-time communication.', tags: ['Next.js', 'Fastify', 'Prisma', 'PostgreSQL', 'MongoDB', 'WebSockets'], points: ['Recruitment management and candidate portal, including AI resume parsing and Qscreen AI interviews.', 'Custom RBAC, usage-based billing, live chat, and payment integration.', 'Microservice-based workflows, with AI calling capabilities.'], visual: 'recruit' },
]
const skillGroups = [
  ['Languages', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
  ['Frontend', 'React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Ant Design', 'Chart.js', 'HTML', 'CSS'],
  ['Backend', 'Node.js', 'Express.js', 'Fastify', 'REST APIs', 'WebSockets', 'Prisma ORM', 'Cron Jobs'],
  ['Data & search', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  ['Tools & infrastructure', 'Git', 'Postman', 'PM2', 'AWS S3', 'AWS Lambda', 'JWT', 'Google OAuth', 'Docker'],
]

function Arrow({ diagonal = false }) { return <span aria-hidden="true" className="arrow">{diagonal ? '\u2197' : '\u2192'}</span> }
function SectionTitle({ eyebrow, title, text }) { return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'))
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [expanded, setExpanded] = useState(null)
  const [formState, setFormState] = useState('idle')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  async function submitContact(event) {
    event.preventDefault()
    const form = event.currentTarget; const data = new FormData(form)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) { setFormState('unconfigured'); return }
    setFormState('sending')
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: { from_name: data.get('name'), reply_to: data.get('email'), message: data.get('message') } }),
      })
      if (!response.ok) throw new Error('Email service rejected the request')
      setFormState('sent'); form.reset()
    } catch { setFormState('error') }
  }

  return <div className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Nivin J K, home"><span className="mark">N</span><span>nivin<span className="muted">.dev</span></span></a>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {nav.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <a className="mobile-connect" href="#contact" onClick={closeMenu}>Let&apos;s talk <Arrow diagonal /></a>
      </nav>
      <div className="nav-actions"><button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle theme"><span>{theme === 'dark' ? 'L' : 'D'}</span></button><a className="nav-cta" href="#contact">Let&apos;s talk <Arrow diagonal /></a><button className={`menu-toggle ${menuOpen ? 'opened' : ''}`} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button></div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot"/> Open to exciting opportunities</div>
          <p className="hero-kicker">Hi, I&apos;m <span>Nivin J K</span></p>
          <h1>Full Stack<br/><em>Developer</em><span className="period">.</span></h1>
          <p className="hero-tagline">Building scalable applications with modern technologies.</p>
          <p className="hero-intro">I build reliable, user-focused applicationsfrom thoughtful interfaces to the systems behind them. Currently focused on full stack product engineering.</p>
          <div className="hero-buttons"><a className="button button-primary" href="#contact">Let&apos;s connect <Arrow diagonal /></a><a className="button button-quiet" href="/resume/nivin-jk-resume.pdf" download>Download rsum <span className="download-icon">?</span></a></div>
          <div className="social-row">{socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label}<Arrow diagonal /></a>)}</div>
        </div>
        <div className="hero-art" aria-label="Abstract emerald portfolio graphic">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="art-grid"/>
          <div className="hero-core"><div className="core-ring"/><span className="core-initial">N<span>.</span></span><span className="core-caption">BUILD &middot; SHIP &middot; ITERATE</span></div>
          <div className="float-card float-code"><span className="tiny-dot"/> <code>const craft = 'full stack'</code></div>
          <div className="float-card float-stack"><span className="stack-icon">?</span><span>Product<br/>engineering</span></div>
          <div className="art-coordinate">13N&nbsp; 80E<br/><span>INDIA</span></div>
          <div className="art-index">FIG. 01<br/><span>INDEPENDENT BY DESIGN</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01  05</span></div>
      </section>

      <section className="about section-wrap section-pad" id="about"><SectionTitle eyebrow="A LITTLE ABOUT ME &middot; 01" title={<>Engineering with<br/><em>intention.</em></>} />
        <div className="about-grid reveal"><div className="about-lead"><span className="large-quote"></span><p>My path started with Artificial Intelligence and Data Science, then grew into a fascination with how complete products are made: the interface, the logic, and the infrastructure that connects them.</p></div><div className="about-detail"><p>I enjoy taking a feature from an early idea through to a dependable implementation. My work has included travel and recruitment products, third-party integrations, search, payments, and real-time communication.</p><p>I value clear interfaces, maintainable systems, and practical problem-solving. Im happiest learning a new part of the stack and making it work well with the rest.</p><div className="about-tags"><span>Curious by default</span><span>Built for people</span><span>Always iterating</span></div></div></div>
      </section>

      <section className="experience section-wrap section-pad" id="experience"><SectionTitle eyebrow="THE PATH SO FAR &middot; 02" title={<>Experience that<br/><em>keeps moving.</em></>} text="A growing practice across product engineering, integrations, and immersive technology." />
        <div className="timeline">{experiences.map((item, index) => <article className="timeline-item reveal" key={item.company}><div className="timeline-marker"><span>0{index + 1}</span></div><div className="experience-card"><div className="exp-head"><div><span className="eyebrow exp-date">{item.dates || 'Internship'}</span><h3>{item.company}</h3><p className="role">{item.role}{item.note && <span className="promotion">{item.note}</span>}</p></div><button className="expand-button" type="button" aria-expanded={expanded === index} onClick={() => setExpanded(expanded === index ? null : index)}>{expanded === index ? 'Close' : 'Details'} <span>{expanded === index ? '-' : '+'}</span></button></div><div className="tag-row">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className={`exp-details ${expanded === index ? 'expanded' : ''}`}><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div></div></article>)}</div>
      </section>

      <section className="projects section-wrap section-pad" id="projects"><SectionTitle eyebrow="SELECTED WORK &middot; 03" title={<>Products built to<br/><em>do real work.</em></>} text="Two featured products shaped by practical engineering challenges and connected systems." />
        <div className="project-list">{projects.map((project) => <article className={`project-card reveal ${project.visual}`} key={project.name}><div className="project-visual"><div className="visual-top"><span>PROJECT / {project.number}</span><span className="visual-live"><i/> CASE STUDY</span></div><div className="visual-body"><div className="visual-window"><div className="window-head"><i/><i/><i/><span>{project.visual === 'travel' ? 'travelgo / bookings' : 'quickrecruit / workspace'}</span></div><div className="window-content"><div className="window-sidebar"><b/><b/><b/><b/></div><div className="window-main"><div className="window-title"/><div className="window-subtitle"/><div className="window-cards"><i/><i/><i/></div><div className="window-row"/><div className="window-row short"/></div></div></div><span className="visual-orbit"/><span className="visual-number">{project.number}</span></div></div><div className="project-info"><div className="project-heading"><div><span className="eyebrow">{project.kind}</span><h3>{project.name}<span className="period">.</span></h3></div><span className="project-symbol"><Arrow diagonal /></span></div><p>{project.description}</p><ul className="project-points">{project.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><span className="project-footnote">Professional project &middot; No public demo link supplied</span></div></article>)}</div>
        <div className="other-projects"><span className="eyebrow">MORE IN THE ARCHIVE</span><p>Visa consultancy platform <i>&middot;</i> AR wedding invitation <i>&middot;</i> AiNexus corporate website</p><span className="archive-note">Titles referenced in the brief; further details await the previous portfolio source.</span></div>
      </section>

      <section className="skills section-wrap section-pad" id="skills"><SectionTitle eyebrow="TOOLS OF THE TRADE &middot; 04" title={<>A stack for the<br/><em>whole picture.</em></>} text="Technologies drawn from hands-on work and the supplied rsum brief." />
        <div className="skills-grid">{skillGroups.map(([category, ...items], index) => <article className="skill-card reveal" key={category}><div className="skill-head"><span className="skill-index">0{index + 1}</span><h3>{category}</h3><span className="skill-plus">?</span></div><div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
      </section>

      <section className="education section-wrap section-pad" id="education"><SectionTitle eyebrow="THE FOUNDATION &middot; 05" title={<>Grounded in<br/><em>the fundamentals.</em></>} />
        <article className="education-card reveal"><div className="education-side"><span className="eyebrow">2022  2026</span><span className="degree-mark">AI<span>+</span>DS</span><span className="edu-caption">UNDERGRADUATE DEGREE</span></div><div className="education-main"><span className="eyebrow">P.S.R. ENGINEERING COLLEGE &middot; SIVAKASI</span><h3>B.Tech in Artificial Intelligence<br/>and Data Science</h3><p>Built a foundation in data and intelligent systems while growing into full stack product development.</p><div className="cgpa"><strong>8.4</strong><span>CGPA<br/><i>Latest rsum</i></span></div></div></article>
      </section>

      <section className="certifications section-wrap section-pad" id="certifications"><div className="cert-card reveal"><div><span className="eyebrow">CERTIFICATIONS</span><h2>Credentials, <em>when ready.</em></h2><p>No certificates were supplied yet. This space is ready for verified credentials.</p></div><span className="cert-stamp" aria-hidden="true">+</span></div></section>

      <section className="achievements section-wrap section-pad" id="achievements"><SectionTitle eyebrow="A FEW ANCHORS  06" title={<>Progress, in<br/><em>good company.</em></>} text="A few verified markers across education and product work." /><div className="stats-grid reveal"><article><strong>02</strong><span>Featured products</span><small>TravelGo  QuickRecruit</small></article><article><strong>8.4</strong><span>CGPA</span><small>B.Tech  AI & Data Science</small></article><article><strong>02</strong><span>Travel inventory APIs</span><small>HotelBeds  WebBeds</small></article><article><strong>03</strong><span>Experience entries</span><small>Product  software  AR/VR</small></article></div></section>
      <section className="services section-wrap section-pad" id="services"><SectionTitle eyebrow="HOW I CAN HELP &middot; 06" title={<>From interface to<br/><em>infrastructure.</em></>} text="Areas that reflect the products and systems Ive worked on." /><div className="service-grid"><article className="service-card reveal"><span>01 / INTERFACES</span><h3>Web application<br/>development</h3><p>Responsive product experiences built with modern frontend tools.</p></article><article className="service-card reveal"><span>02 / SYSTEMS</span><h3>Backend & API<br/>engineering</h3><p>Application logic, data workflows, and integrations that hold together.</p></article><article className="service-card reveal"><span>03 / CONNECTIVITY</span><h3>Integrations &<br/>real-time features</h3><p>Third-party services, payments, search, and live communication.</p></article></div></section>

      <section className="contact section-wrap section-pad" id="contact"><div className="contact-heading reveal"><span className="eyebrow">HAVE A GOOD ONE IN MIND?</span><h2>Let&apos;s build<br/><em>something useful.</em></h2><a className="email-link" href="mailto:jkniv9080@gmail.com">jkniv9080@gmail.com <Arrow diagonal /></a><div className="contact-socials">{socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label}<Arrow diagonal /></a>)}</div></div><form className="contact-form reveal" onSubmit={submitContact}><label>Your name<input name="name" autoComplete="name" required placeholder="How should I address you?" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>What are you thinking?<textarea name="message" required rows="4" placeholder="A little about your project or opportunity" /></label><button className="button button-primary" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending' : 'Send message'} <Arrow diagonal /></button><p className={`form-status ${formState}`} aria-live="polite">{formState === 'sent' ? 'Message sent. Thanks for reaching out.' : formState === 'unconfigured' ? 'The contact form is not configured yet. Email me directly at jkniv9080@gmail.com.' : formState === 'error' ? 'Message could not be sent. Please email me directly.' : formState === 'sending' ? 'Sending your message' : 'Your details are only used to respond to your message.'}</p></form></section>
    </main>

    <footer className="footer section-wrap"><a className="wordmark" href="#home"><span className="mark">N</span><span>nivin<span className="muted">.dev</span></span></a><span>Designed & built by Nivin J K <span className="period">&middot;</span> India</span><a href="#home" className="back-top">Back to top ?</a><span className="footer-copy"> {new Date().getFullYear()} Nivin J K</span></footer>
  </div>
}
export default App
