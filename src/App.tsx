import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useInView, useSpring } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ArrowRight, Star, ChevronDown, ChevronUp,
  Menu, X, ArrowUp, Shield, Award, CheckCircle2, Hammer, HardHat,
  Building2, Home, Bath, UtensilsCrossed, ArrowDownToLine, Plus, Check,
  Stethoscope, Heart, Syringe, Dog, Cat, Sparkles, Calendar, FileText, Ruler,
  ClipboardCheck, Users, Trophy, Zap
} from 'lucide-react';
import logoImage from '/logo.png';
const heroVideo = new URL('../hero1.mp4', import.meta.url).href;

// Simple social icons as inline components
const Facebook = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
);
const Instagram = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const Linkedin = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
);
const Twitter = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

/* ============ DATA ============ */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { number: 250, suffix: '+', label: 'Projects Completed' },
  { number: 15, suffix: '+', label: 'Years Experience' },
  { number: 100, suffix: '%', label: 'Client Satisfaction' },
  { number: 50, suffix: '+', label: 'Team Members' },
];

const WHY_CHOOSE = [
  { icon: Building2, title: 'Specialized Animal Hospital Construction', desc: 'Deep expertise in veterinary-specific design, infection control, and medical infrastructure.' },
  { icon: Users, title: 'Experienced Construction Team', desc: 'Led by industry veterans with decades of commercial medical construction experience.' },
  { icon: Award, title: 'High Quality Craftsmanship', desc: 'Premium finishes and meticulous attention to every detail, from foundation to finish.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your timeline with proven scheduling and milestone-driven project management.' },
  { icon: FileText, title: 'Transparent Communication', desc: 'Clear documentation, regular updates, and no hidden costs throughout your project.' },
  { icon: Shield, title: 'Licensed & Insured', desc: 'Fully licensed, bonded, and insured with comprehensive OSHA compliance on every job.' },
  { icon: HardHat, title: 'Safety Focused', desc: 'Zero-incident safety culture with rigorous protocols on every jobsite.' },
  { icon: Sparkles, title: 'Custom Design Solutions', desc: 'Tailored architectural solutions that match your practice brand and operational needs.' },
];

const SERVICES = [
  {
    title: 'Animal Hospital Construction',
    desc: 'Ground-up construction of state-of-the-art animal hospitals with full medical infrastructure, surgical suites, and boarding facilities.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    icon: Stethoscope,
  },
  {
    title: 'Veterinary Clinic Remodeling',
    desc: 'Complete renovation and modernization of existing veterinary clinics to improve flow, efficiency, and client experience.',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80',
    icon: Syringe,
  },
  {
    title: 'Medical Facility Renovations',
    desc: 'Upgrading medical spaces with modern infection control, medical gas, and cutting-edge treatment environments.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    icon: Building2,
  },
  {
    title: 'Kitchen Remodeling',
    desc: 'Luxury kitchen transformations featuring custom cabinetry, premium appliances, and timeless design.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    icon: UtensilsCrossed,
  },
  {
    title: 'Bathroom Remodeling',
    desc: 'Spa-inspired bathrooms with high-end fixtures, natural stone, and accessible design options.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    icon: Bath,
  },
  {
    title: 'Basement Finishing',
    desc: 'Transforming unfinished basements into livable, functional spaces including recreation rooms, offices, and in-law suites.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    icon: Hammer,
  },
  {
    title: 'Whole Home Renovation',
    desc: 'Comprehensive home remodels that reimagine your space from floor to ceiling with no detail overlooked.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    icon: Home,
  },
  {
    title: 'Home Additions',
    desc: 'Seamless additions that match existing architecture while adding valuable square footage to your home.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    icon: Home,
  },
];

const INDUSTRIES = [
  { title: 'Animal Hospitals', icon: Dog },
  { title: 'Veterinary Clinics', icon: Stethoscope },
  { title: 'Emergency Animal Centers', icon: Heart },
  { title: 'Pet Wellness Clinics', icon: Cat },
  { title: 'Specialty Veterinary Centers', icon: Syringe },
  { title: 'Residential Homes', icon: Home },
];

const PROCESS = [
  { step: '01', title: 'Consultation', desc: 'We meet to understand your vision, needs, and goals for the project.', icon: Calendar },
  { step: '02', title: 'Planning', desc: 'Our team develops a strategic project plan with timelines and key milestones.', icon: FileText },
  { step: '03', title: 'Design', desc: 'Architectural and engineering drawings are created, refined, and finalized.', icon: Ruler },
  { step: '04', title: 'Budget Approval', desc: 'Transparent, detailed estimates with clear communication and no surprises.', icon: CheckCircle2 },
  { step: '05', title: 'Construction', desc: 'Our expert craftsmen execute the build with precision, safety, and quality.', icon: Hammer },
  { step: '06', title: 'Final Walkthrough', desc: 'We complete a detailed punch list and ensure every detail meets our exacting standards.', icon: ClipboardCheck },
];

const PROJECTS = [
  { title: 'Paws & Care Animal Hospital', category: 'Animal Hospitals', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80' },
  { title: 'Ridgemont Veterinary Clinic', category: 'Animal Hospitals', image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=900&q=80' },
  { title: 'Modern Residential Renovation', category: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80' },
  { title: 'VetCare Surgical Suite', category: 'Renovations', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80' },
  { title: '24/7 Emergency Center', category: 'Animal Hospitals', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900&q=80' },
  { title: 'Luxury Kitchen Transform', category: 'Residential', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80' },
  { title: 'Medical Office Building', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80' },
  { title: 'Spa Retreat Bathroom', category: 'Renovations', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80' },
  { title: 'Wellness Clinic Build-out', category: 'Animal Hospitals', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80' },
];

const TESTIMONIALS = [
  { name: 'Dr. Sarah Mitchell', role: 'Mitchell Animal Hospital', rating: 5, photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80', text: 'Haven M Construction delivered our new animal hospital on time and exceeded every expectation. Their understanding of veterinary-specific needs — from surgical suites to boarding areas — was truly exceptional. The quality is second to none.' },
  { name: 'Dr. James Rivera', role: 'Rivera Veterinary Group', rating: 5, photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80', text: 'We interviewed six firms and Haven stood out immediately. They handled our complex medical gas, radiology shielding, and infection control requirements flawlessly. Our practice has doubled since the build.' },
  { name: 'Patricia Chen', role: 'Homeowner, Montclair', rating: 5, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', text: 'Our whole-home renovation was handled with the same care and precision as their commercial work. The craftsmanship, communication, and attention to detail were extraordinary. I recommend them without hesitation.' },
  { name: 'Dr. Michael Torres', role: 'Emergency Vet Center', rating: 5, photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80', text: 'Building a 24-hour emergency center had unique challenges. Haven\'s team was proactive, solutions-oriented, and delivered a space that works beautifully for our staff and patients. A truly premium experience.' },
  { name: 'Dr. Laura Bennett', role: 'Bennett Pet Wellness', rating: 5, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', text: 'From our first consultation to the final walkthrough, the Haven team was extraordinary. They turned our vision into a stunning, functional space our clients and patients love. Worth every penny.' },
];

const FAQS = [
  { q: 'Do you specialize only in animal hospital construction?', a: 'While animal hospital construction is our primary expertise, we also handle residential and commercial projects including veterinary clinic renovations, medical facility remodeling, kitchen and bathroom renovations, basement finishing, whole-home renovations, and home additions. Our specialized knowledge in medical construction makes us the premier choice for veterinary practices.' },
  { q: 'Are you licensed and insured?', a: 'Yes. Haven M Construction, LLC is fully licensed, bonded, and insured in New Jersey and surrounding states. We maintain comprehensive general liability, workers\' compensation, and builder\'s risk insurance, and we are fully OSHA compliant on every job site.' },
  { q: 'How long does it take to build an animal hospital?', a: 'Timelines vary based on scope, size, and complexity. A typical ground-up animal hospital ranges from 6 to 12 months from groundbreaking to completion. Renovations of existing clinics often take 3 to 6 months. We provide detailed schedules during the planning phase.' },
  { q: 'Do you handle the design phase as well?', a: 'Absolutely. We offer full design-build services, which means we handle everything from architectural design and engineering through construction. This streamlined approach reduces costs, minimizes delays, and ensures design intent is carried through to completion.' },
  { q: 'Can you work in occupied veterinary clinics?', a: 'Yes. We have extensive experience performing phased renovations in fully operational clinics. We use dust barriers, off-hours work, infection control protocols, and careful scheduling to minimize disruption to your practice and patients.' },
  { q: 'What areas do you serve?', a: 'We are headquartered in Verona, New Jersey and serve the greater New Jersey area, New York, Connecticut, Pennsylvania, and the broader Northeast region. For large-scale projects, we are open to travel nationwide.' },
  { q: 'Do you offer warranties on your work?', a: 'Yes. All of our work is backed by a comprehensive warranty. We provide a 1-year workmanship warranty in addition to all manufacturer warranties on materials and equipment. We stand behind our craft and are committed to your long-term satisfaction.' },
  { q: 'How do you handle budgeting and change orders?', a: 'We believe in transparent, fixed-price proposals with detailed line items. If changes arise, we provide clear change orders with pricing and timeline impacts before proceeding. No hidden costs, no surprise bills — just honest, upfront communication throughout your project.' },
  { q: 'What sets Haven apart from other general contractors?', a: 'Our deep specialization in animal hospital construction means we understand the unique requirements of veterinary medicine: medical gas systems, radiology shielding, surgical suite ventilation, infection control, canine/feline zoning, boarding facility drainage, and more. We combine this specialized knowledge with luxury-level craftsmanship and white-glove service.' },
  { q: 'How do I get started?', a: 'Getting started is simple. Simply call us at (201) 264-3506 or fill out our contact form to schedule a free initial consultation. We\'ll meet with you to discuss your vision, review the site, and begin developing a plan tailored to your needs and budget.' },
];

const CATEGORIES = ['All', 'Animal Hospitals', 'Renovations', 'Residential', 'Commercial'];

/* ============ HELPER COMPONENTS ============ */
function useCounter(target: number, duration: number = 2, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function SectionTitle({ eyebrow, title, subtitle, dark = false, center = true }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-16`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold"></span>
          <span className="text-gold font-semibold tracking-[0.2em] text-xs uppercase">{eyebrow}</span>
          <span className="h-px w-8 bg-gold"></span>
        </div>
      )}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 ${dark ? 'text-white' : 'text-charcoal'}`}>{title}</h2>
      {subtitle && <p className={`text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
    </motion.div>
  );
}

function AnimatedStat({ number, suffix, label, delay = 0 }: { number: number; suffix: string; label: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCounter(number, 2, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-2">{count}{suffix}</div>
      <div className="text-sm md:text-base text-gray-600 font-medium tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

/* ============ MAIN APP ============ */
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-warm-white text-text-dark overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[100] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} scrollTo={scrollTo} />

      {/* Back to top */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-5 md:right-8 md:bottom-8 z-40 w-12 h-12 rounded-full bg-charcoal text-white flex items-center justify-center shadow-xl hover:bg-gold transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <main>
        <Hero scrollTo={scrollTo} />
        <StatsBar />
        <About />
        <WhyChoose />
        <Services />
        <Industries />
        <Process />
        <Projects />
        <BeforeAfter />
        <CompanyStats />
        <Testimonials />
        <Certifications />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}

/* ============ NAVBAR ============ */
function Navbar({ scrolled, mobileOpen, setMobileOpen, scrollTo }: any) {
  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-3 group">
            <img src={logoImage} alt="Haven M Construction Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            <div className="hidden sm:block">
              <div className={`font-bold text-base leading-tight ${scrolled ? 'text-charcoal' : 'text-white'}`}>HAVEN <span className="text-gold">CONSTRUCTION</span></div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-sm font-medium transition-colors relative group ${scrolled ? 'text-gray-700 hover:text-gold' : 'text-white/90 hover:text-gold'}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hidden md:inline-flex btn-primary font-semibold text-sm px-5 py-2.5 rounded-full items-center gap-2"
            >
              Request Consultation <ArrowRight size={16} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center ${scrolled ? 'text-charcoal bg-gray-100' : 'text-white bg-white/10 backdrop-blur'}`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 lg:hidden bg-white pt-24 px-6"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-bold text-charcoal py-2 border-b border-gray-100 flex items-center justify-between group"
                >
                  {link.label}
                  <ArrowRight size={18} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="btn-primary font-semibold w-full text-center py-4 rounded-full mt-8 flex items-center justify-center gap-2"
            >
              Request Consultation <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============ HERO ============ */
function Hero({ scrollTo }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="home" className="relative min-h-screen flex items-end md:items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/70 to-charcoal/92" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      {/* Editorial content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24 md:py-40 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="max-w-3xl"
        >
          <div className="text-xs md:text-sm tracking-[0.35em] uppercase text-gold font-semibold mb-4">Haven M Construction, LLC</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight mb-5 max-w-4xl text-balance">
            Building Exceptional <span className="text-gradient-gold">Animal Hospitals</span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-8 leading-relaxed">
            State-of-the-art veterinary facilities with precision, craftsmanship, and quality.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary font-semibold px-8 py-4 rounded-full flex items-center gap-2 text-base shadow-2xl shadow-gold/20"
            >
              Request Consultation <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollTo('#projects')}
              className="btn-outline font-semibold px-8 py-4 rounded-full flex items-center gap-2 text-base"
            >
              View Projects
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-gray-300">
            <span>Verona, NJ</span>
            <span>Licensed & Insured</span>
            <span>Serving Veterinary and Commercial Clients</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDownToLine size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============ STATS BAR (after hero, white bg) ============ */
function StatsBar() {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <AnimatedStat key={i} number={s.number} suffix={s.suffix} label={s.label} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <section id="about" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl img-zoom aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80" alt="Haven M Construction team reviewing blueprints for an animal hospital" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-gold" size={28} />
                <div>
                  <div className="text-3xl font-bold text-charcoal leading-none">15+</div>
                  <div className="text-xs text-gray-500 font-medium mt-1">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold"></span>
              <span className="text-gold font-semibold tracking-[0.2em] text-xs uppercase">About Haven</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
              Precision Craftsmanship for <span className="text-gold">Veterinary Excellence</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Haven M Construction, LLC is a premier commercial and residential construction firm headquartered in Verona, New Jersey. We are the Northeast's most trusted builder of animal hospitals, veterinary clinics, and specialized medical facilities.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our team combines deep expertise in veterinary-specific construction — medical gas systems, surgical suite ventilation, infection control, radiology shielding, and species-specific zoning — with uncompromising craftsmanship and white-glove client service. From ground-up hospital builds to luxury home renovations, every Haven project is delivered with precision, care, and integrity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Animal Hospitals',
                'Veterinary Clinics',
                'Medical Construction',
                'Luxury Renovations',
                'Commercial Build-Outs',
                'Residential Remodeling',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-gold" strokeWidth={3} />
                  </div>
                  <span className="text-charcoal font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              Get in Touch <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============ WHY CHOOSE ============ */
function WhyChoose() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Why Haven"
          title="Built on Trust, Crafted to Last"
          subtitle="When you choose Haven M Construction, you're partnering with a team that treats every project as if it were our own."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 bg-warm-white rounded-2xl card-lift border border-gray-100 hover:border-gold/30"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-white transition-all text-gold">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
function Services() {
  return (
    <section id="services" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Our Services"
          title="Specialized Construction Services"
          subtitle="From cutting-edge animal hospitals to luxury home renovations, we bring the same uncompromising standard to every project."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden card-lift border border-gray-100 flex flex-col"
              >
                <div className="relative img-zoom aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-gold shadow-lg">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-charcoal mb-2 leading-tight">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <a href="#contact" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:text-charcoal transition-colors">
                    Read More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ INDUSTRIES ============ */
function Industries() {
  return (
    <section id="industries" className="section-padding bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #C8A96A 2px, transparent 2px), radial-gradient(circle at 75% 75%, #C8A96A 2px, transparent 2px)', backgroundSize: '60px 60px' }} />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Industries"
          title="Industries We Serve"
          subtitle="Specialized construction expertise across the veterinary and medical sectors, plus luxury residential work."
          dark
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-colors">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{ind.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Purpose-built facilities designed for operational efficiency, patient comfort, and modern veterinary practice standards.</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ PROCESS TIMELINE ============ */
function Process() {
  return (
    <section id="process" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Our Process"
          title="A Proven Path to Success"
          subtitle="A transparent, six-step process that ensures every project is delivered on time, on budget, and to the highest standard."
        />
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line hidden md:block"></div>
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold"></div>

          <div className="space-y-12 md:space-y-20">
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              const leftSide = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${leftSide ? '' : 'md:[&>*:first-child]:order-2'}`}
                >
                  <div className={`pl-16 md:pl-0 ${leftSide ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`inline-flex items-center gap-3 mb-3 ${leftSide ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-4xl md:text-5xl font-bold text-gold/40 font-mono">{p.step}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">{p.title}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-md md:inline-block">{p.desc}</p>
                  </div>
                  <div className={`hidden md:flex ${leftSide ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'}`}>
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gold group-hover:bg-gold transition-colors">
                      <Icon size={32} strokeWidth={1.6} />
                    </div>
                  </div>
                  {/* Mobile dot */}
                  <div className="absolute left-5 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center shadow-lg text-sm font-bold md:hidden">
                    {p.step}
                  </div>
                  {/* Desktop dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold text-white items-center justify-center shadow-lg border-4 border-warm-white text-sm font-bold z-10">
                    {i + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PROJECTS / PORTFOLIO ============ */
function Projects() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="A curated selection of our finest work across animal hospitals, renovations, commercial, and residential builds."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat ? 'bg-charcoal text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(p.image)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] img-zoom shadow-md hover:shadow-2xl"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/90 text-white text-[10px] font-bold uppercase tracking-wider mb-2">{p.category}</span>
                  <h3 className="text-lg md:text-xl font-bold leading-tight">{p.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-charcoal opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={20} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur flex items-center justify-center p-5 cursor-zoom-out"
          >
            <motion.button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Project"
              className="max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ BEFORE / AFTER ============ */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  return (
    <section className="section-padding bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Before & After"
          title="Transformations That Speak for Themselves"
          subtitle="Drag the slider to see how Haven M Construction transforms outdated spaces into world-class veterinary facilities."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          ref={containerRef}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize"
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
          {/* After (full) */}
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&q=80"
            alt="After - Modern animal hospital"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 px-4 py-2 bg-gold text-white rounded-full text-sm font-bold shadow-lg">After</div>

          {/* Before (clipped) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img
              src="https://images.unsplash.com/photo-1521783988139-89397d761dce?w=1600&q=80"
              alt="Before - Old facility"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: containerRef.current?.clientWidth || '100%' }}
              loading="lazy"
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-charcoal text-white rounded-full text-sm font-bold shadow-lg">Before</div>
          </div>

          {/* Divider */}
          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-charcoal">
              <div className="flex gap-1">
                <ChevronDown size={18} className="rotate-90 -mr-1" />
                <ChevronUp size={18} className="-rotate-90 -ml-1" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ COMPANY STATS ============ */
function CompanyStats() {
  const counters = [
    { num: 250, suffix: '+', label: 'Projects Completed', icon: Building2 },
    { num: 15, suffix: '+', label: 'Years Experience', icon: Trophy },
    { num: 220, suffix: '+', label: 'Happy Clients', icon: Heart },
    { num: 50, suffix: '+', label: 'Team Members', icon: Users },
  ];
  return (
    <section className="py-20 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 gold-shimmer opacity-5" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {counters.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center text-gold mx-auto mb-5">
                  <Icon size={26} />
                </div>
                <BigCounter target={c.num} suffix={c.suffix} />
                <div className="text-sm md:text-base text-gray-300 font-medium uppercase tracking-wider mt-2">{c.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BigCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(target, 2.2, inView);
  return <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold">{count}{suffix}</div>;
}

/* ============ TESTIMONIALS ============ */
function Testimonials() {
  const [index, setIndex] = useState(0);
  const perView = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % Math.ceil(TESTIMONIALS.length / perView)), 6000);
    return () => clearInterval(t);
  }, [perView]);

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the practice owners and homeowners who have built with Haven."
        />
        <div className="overflow-hidden relative">
          <motion.div
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            {Array.from({ length: Math.ceil(TESTIMONIALS.length / perView) }).map((_, groupIdx) => (
              <div key={groupIdx} className="min-w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                {TESTIMONIALS.slice(groupIdx * perView, groupIdx * perView + perView).map((t, i) => (
                  <TestimonialCard key={i} t={t} />
                ))}
              </div>
            ))}
          </motion.div>
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: Math.ceil(TESTIMONIALS.length / perView) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-10 bg-gold' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="bg-warm-white p-8 rounded-2xl border border-gray-100 h-full flex flex-col">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={18} className="fill-gold text-gold" />)}
      </div>
      <p className="text-gray-700 leading-relaxed mb-6 flex-1 italic">"{t.text}"</p>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
        <div>
          <div className="font-bold text-charcoal">{t.name}</div>
          <div className="text-sm text-gold font-medium">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ============ CERTIFICATIONS ============ */
function Certifications() {
  const badges = [
    { label: 'Licensed', icon: Shield },
    { label: 'Insured', icon: CheckCircle2 },
    { label: 'OSHA Compliant', icon: HardHat },
    { label: 'Quality Guaranteed', icon: Award },
    { label: 'Bonded & Certified', icon: Trophy },
    { label: 'Family Owned', icon: Heart },
  ];
  return (
    <section className="py-16 bg-warm-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold tracking-[0.3em] uppercase text-gray-500 mb-10"
        >
          Certifications & Credentials
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gold mb-3 group-hover:border-gold group-hover:bg-gold group-hover:text-white transition-all shadow-sm">
                  <Icon size={28} strokeWidth={1.6} />
                </div>
                <span className="text-sm font-semibold text-charcoal">{b.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Answers to the questions we hear most often from veterinary practices and homeowners."
        />
        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`border rounded-2xl overflow-hidden transition-all ${open === i ? 'border-gold bg-warm-white shadow-md' : 'border-gray-200 bg-white'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-charcoal text-base md:text-lg pr-4">{f.q}</span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${open === i ? 'bg-gold text-white rotate-45' : 'bg-gray-100 text-charcoal'}`}>
                  <Plus size={18} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CTA BANNER ============ */
function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 gold-shimmer" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold-light to-gold-dark opacity-95" />
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="mx-auto mb-6 opacity-90" size={40} />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Ready to Build a Modern <br className="hidden md:block" /> Animal Hospital?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your vision. Schedule a complimentary consultation with our team and discover why Haven is the Northeast's premier veterinary builder.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-charcoal hover:bg-white hover:text-charcoal text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all text-base"
          >
            Schedule Your Consultation <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', projectType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', projectType: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Contact Us"
          title="Let's Build Something Extraordinary"
          subtitle="Reach out to schedule a consultation. We respond within one business day."
        />
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-charcoal text-white rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">We're here to answer your questions and discuss your project.</p>

              <div className="space-y-6 mb-10">
                <ContactItem icon={MapPin} label="Address" value="1 Claridge Dr, Unit 321, Verona, NJ 07044" />
                <ContactItem icon={Phone} label="Phone" value="(201) 264-3506" link="tel:2012643506" />
                <ContactItem icon={Mail} label="Email" value="info@havenconstruction.com" link="mailto:info@havenconstruction.com" />
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">Business Hours</div>
                      <div className="text-white/90 text-sm leading-relaxed">
                        Mon – Fri: 7:00 AM – 6:00 PM<br />
                        Sat: 8:00 AM – 2:00 PM<br />
                        Sun: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden aspect-video bg-gray-800 border border-white/10 relative group">
                <iframe
                  title="Haven M Construction Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-74.2657%2C40.8226%2C-74.2257%2C40.8426&layer=mapnik&marker=40.8326%2C-74.2457"
                  className="w-full h-full border-0 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-6">
                  <CheckCircle2 size={40} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">Message Received!</h3>
                <p className="text-gray-600 max-w-md">Thank you for reaching out. A member of our team will contact you within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">Request a Consultation</h3>
                <p className="text-gray-600 mb-6">Fill out the form and we'll be in touch promptly.</p>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Full Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-warm-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-charcoal"
                    >
                      <option value="">Select project type…</option>
                      <option value="animal-hospital">Animal Hospital Construction</option>
                      <option value="vet-clinic">Veterinary Clinic</option>
                      <option value="renovation">Veterinary Renovation</option>
                      <option value="medical">Medical Facility</option>
                      <option value="commercial">Other Commercial</option>
                      <option value="kitchen">Kitchen Remodeling</option>
                      <option value="bathroom">Bathroom Remodeling</option>
                      <option value="basement">Basement Finishing</option>
                      <option value="whole-home">Whole Home Renovation</option>
                      <option value="addition">Home Addition</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Project Details</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Tell us about your project, timeline, and budget range…"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-warm-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-charcoal resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full btn-primary font-bold py-4 rounded-full flex items-center justify-center gap-2 text-base shadow-lg shadow-gold/20"
                >
                  Send Message <ArrowRight size={18} />
                </motion.button>
                <p className="text-xs text-gray-500 text-center mt-4">We respect your privacy. Your information is never shared.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, link }: any) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">{label}</div>
        <div className="text-white/90 leading-snug">{value}</div>
      </div>
    </div>
  );
  return link ? <a href={link} className="block">{content}</a> : content;
}

function Field({ label, type, value, onChange, required }: { label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{label}{required && <span className="text-gold"> *</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-warm-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-charcoal"
      />
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer({ scrollTo }: any) {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gold text-white flex items-center justify-center font-bold">H</div>
              <div>
                <div className="font-bold text-base">HAVEN <span className="text-gold">CONSTRUCTION</span></div>
                <div className="text-[10px] tracking-[0.25em] text-gray-400">LLC · VERONA, NJ</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premier animal hospital construction and veterinary facility builders serving the Northeast with uncompromising quality and craftsmanship.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold flex items-center justify-center transition-colors text-gray-300 hover:text-white">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }} className="text-gray-400 hover:text-gold transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }} className="text-gray-400 hover:text-gold transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>1 Claridge Dr, Unit 321<br />Verona, NJ 07044</span></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-gold flex-shrink-0" /><a href="tel:2012643506" className="hover:text-gold transition-colors">(201) 264-3506</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-gold flex-shrink-0" /><a href="mailto:info@havenconstruction.com" className="hover:text-gold transition-colors">info@havenconstruction.com</a></li>
              <li className="flex items-start gap-3"><Clock size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>Mon–Fri: 7–6<br />Sat: 8–2</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">© {new Date().getFullYear()} Haven M Construction, LLC. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
