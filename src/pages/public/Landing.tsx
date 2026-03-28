import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, Search, Star, ArrowRight, Library, Shield, Zap } from "lucide-react";
import ContactSection from "@/components/landing/ContactSection";
import { AvatarCircles } from "@/registry/magicui/avatar-circles";
import {
  PartnersSection,
  GenreExplorerSection,
  NewArrivalsSection,
  EventsSection,
  DigitalLibrarySection,
} from "@/components/landing/LandingSections";

const words = ["Read More.", "Learn Faster.", "Explore Freely."];

const useTypewriter = (words: string[], speed = 100, pause = 2000) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, pause]);

  return text;
};

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return { count, ref };
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const features = [
  { icon: BookOpen, title: "Browse & Borrow", desc: "Explore thousands of books and borrow with one click.", color: "bg-primary" },
  { icon: Search, title: "Smart Search", desc: "Find any book instantly with powerful search & filters.", color: "bg-secondary" },
  { icon: Clock, title: "Track Returns", desc: "Never miss a due date with automated reminders.", color: "bg-accent" },
  { icon: Shield, title: "Secure Access", desc: "Role-based access for members and administrators.", color: "bg-success" },
  { icon: Star, title: "Rate & Review", desc: "Share your thoughts and discover highly rated books.", color: "bg-primary" },
  { icon: Zap, title: "Real-time Updates", desc: "Live availability and notification updates.", color: "bg-secondary" },
];

const avatars = [
  { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://github.com/dillionverma" },
  { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://github.com/tomonarifeehan" },
  { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "https://github.com/BankkRoll" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://github.com/safethecode" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "https://github.com/sanjay-mali" },
  { imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "https://github.com/itsarghyadas" },
];

const testimonials = [
  { name: "Sarah K.", role: "Student", text: "LibraVault made managing my reading list so easy!" },
  { name: "Prof. Ahmed", role: "Faculty", text: "The admin dashboard gives me full control over our library." },
  { name: "Mike R.", role: "Librarian", text: "Best library system I've ever worked with. Period." },
  { name: "Lisa T.", role: "Researcher", text: "The search and reservation features are phenomenal." },
  { name: "David O.", role: "Book Club Lead", text: "Our entire club uses LibraVault. It's transformed how we share books." },
  { name: "Emma W.", role: "Student", text: "I love the notification system — never had an overdue book since!" },
];

const FeaturesSection = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section id="features" className="relative">
      <div className="py-20 px-6">
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything You Need
        </motion.h2>
        <p className="text-center text-muted-foreground font-body mb-4">Scroll to explore</p>
      </div>
      <section ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="brutal-card p-8 rounded-lg flex-shrink-0 w-[380px] h-[280px] flex flex-col justify-between"
              >
                <div>
                  <div className={`${f.color} w-14 h-14 rounded-lg brutal-border flex items-center justify-center mb-5`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground font-body text-base">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </section>
  );
};

const BOOKS = [
  { bg: "bg-primary",   rotate: -5, z: 3, tz: 20, floatDelay: 0    },
  { bg: "bg-secondary", rotate:  3, z: 2, tz: 10, floatDelay: 0.1  },
  { bg: "bg-accent",    rotate: -2, z: 1, tz:  0, floatDelay: 0.2  },
];

const HeroBookViewer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const parallaxRotYRef = useRef(0);

  /* ── motion values ── */
  const mouseNX = useMotionValue(0.5);
  const mouseNY = useMotionValue(0.5);

  const rotateX    = useSpring(useTransform(mouseNY, [0, 1], [12, -12]), { stiffness: 110, damping: 24 });
  const xOffset    = useSpring(useTransform(mouseNX, [0, 1], [-16, 16]), { stiffness: 80,  damping: 20 });
  const yOffset    = useSpring(useTransform(mouseNY, [0, 1], [-10, 10]), { stiffness: 80,  damping: 20 });
  const shadowOpac  = useTransform(mouseNY, [0, 1], [0.08, 0.22]);

  const rotateY       = useMotionValue(0);
  const rotateYSpring = useSpring(rotateY, { stiffness: 55, damping: 18 });
  const shadowScaleX  = useTransform(rotateYSpring, (v) => 0.75 + 0.25 * Math.cos((v * Math.PI) / 180));

  /* ── global mouse → parallax ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      mouseNX.set(nx);
      mouseNY.set(ny);
      parallaxRotYRef.current = (nx - 0.5) * 38;
      if (!isHoveredRef.current) rotateY.set(parallaxRotYRef.current);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseNX, mouseNY, rotateY]);

  /* ── hover spin ── */
  useEffect(() => {
    isHoveredRef.current = isHovered;
    if (!isHovered) { rotateY.set(parallaxRotYRef.current); return; }
    let raf: number;
    let angle = rotateY.get();
    const loop = () => { angle += 0.75; rotateY.set(angle); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, rotateY]);

  return (
    <motion.div
      className="flex-1 flex justify-center items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-64 h-80 cursor-pointer"
        style={{ rotateX, rotateY: rotateYSpring, x: xOffset, y: yOffset, transformStyle: "preserve-3d" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Dynamic ground shadow */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-8 rounded-full bg-foreground blur-xl pointer-events-none"
          style={{ opacity: shadowOpac, scaleX: shadowScaleX }}
        />

        {/* Hover hint ring */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-foreground/0 pointer-events-none"
          animate={{ borderColor: isHovered ? "hsl(var(--foreground) / 0.15)" : "hsl(var(--foreground) / 0)" }}
          transition={{ duration: 0.3 }}
        />

        {/* Book stack */}
        {BOOKS.map((book, i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 ${book.bg} brutal-border rounded-lg`}
            style={{ zIndex: book.z, transform: `rotate(${book.rotate}deg) translateY(${i * -15}px) translateZ(${book.tz}px)` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 0.4 + i * 0.15, type: "spring" },
              scale:   { delay: 0.4 + i * 0.15, type: "spring" },
              y: { repeat: Infinity, repeatType: "reverse", duration: 2.8 + i * 0.5, ease: "easeInOut", delay: book.floatDelay * 3 },
            }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-1 bg-foreground mb-3 rounded" />
                <div className="w-24 h-1 bg-foreground/50 mb-2 rounded" />
                <div className="w-20 h-1 bg-foreground/30 rounded" />
              </div>
              <BookOpen className="w-12 h-12 opacity-30" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Landing = () => {
  const typedText = useTypewriter(words);
  const booksCount = useCountUp(12500);
  const membersCount = useCountUp(3200);
  const borrowsCount = useCountUp(45000);
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur brutal-border border-t-0 border-x-0">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Library className="w-8 h-8" />
            <span className="font-heading text-2xl font-bold">LibraVault</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-heading font-semibold">
            <a href="#features" className="hover:text-secondary transition-colors">Features</a>
            <a href="#stats" className="hover:text-secondary transition-colors">Stats</a>
            <a href="#testimonials" className="hover:text-secondary transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
          </div>
          <div className="flex gap-3">
            <Link to="/signin" className="brutal-btn bg-background text-foreground rounded-md text-sm font-heading">
              Sign In
            </Link>
            <Link to="/signup" className="brutal-btn bg-primary text-primary-foreground rounded-md text-sm font-heading">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-black leading-tight mb-6">
              Your Knowledge.
              <br />
              <span className="text-secondary">Unlimited.</span>
            </h1>
            <div className="h-16 mb-8">
              <span className="font-heading text-3xl md:text-4xl font-bold text-accent">
                {typedText}
                <span className="animate-pulse-brutal">|</span>
              </span>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 font-body">
              The modern library management system that makes browsing, borrowing, and managing books a breeze.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup" className="brutal-btn bg-primary text-primary-foreground rounded-md text-lg font-heading inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/dashboard/books" className="brutal-btn bg-background text-foreground rounded-md text-lg font-heading">
                Browse Books
              </Link>
            </div>
          </motion.div>

          {/* 3D Book Stack — ModelViewer-style */}
          <HeroBookViewer />
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Genre Explorer */}
      <GenreExplorerSection />

      {/* New Arrivals */}
      <NewArrivalsSection />

      {/* Stats */}
      <section id="stats" className="py-20 px-6 bg-primary">
        <div className="container mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-center mb-16 text-primary-foreground">
            By the Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Books Available", countData: booksCount, suffix: "+" },
              { label: "Active Members", countData: membersCount, suffix: "+" },
              { label: "Books Borrowed", countData: borrowsCount, suffix: "+" },
            ].map((stat) => (
              <div key={stat.label} ref={stat.countData.ref} className="brutal-card bg-background p-8 rounded-lg text-center">
                <div className="font-heading text-5xl font-black mb-2">
                  {stat.countData.count.toLocaleString()}{stat.suffix}
                </div>
                <div className="font-heading text-lg font-semibold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Programs */}
      <EventsSection />

      {/* Testimonials Marquee */}
      <section id="testimonials" className="py-20 px-6 overflow-hidden">
        <div className="flex flex-col items-center mb-16 gap-6">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-center">
            What People Say
          </h2>
          <div className="flex flex-col items-center gap-3">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
            <p className="text-sm text-muted-foreground font-body">
              Join <span className="font-bold text-foreground">99+</span> happy members already using LibraVault
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="brutal-card p-6 rounded-lg w-80 flex-shrink-0">
                <p className="font-body text-foreground mb-4">"{t.text}"</p>
                <div className="font-heading font-bold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Sponsors */}
      <PartnersSection />

      {/* Digital Library Preview */}
      <DigitalLibrarySection />

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <motion.h2
            className="font-heading text-4xl md:text-5xl font-black mb-6 text-primary-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <p className="text-lg mb-8 text-primary-foreground/80 max-w-lg mx-auto font-body">
            Join thousands of readers and librarians who trust LibraVault.
          </p>
          <Link
            to="/signup"
            className="brutal-btn bg-foreground text-background rounded-md text-lg font-heading inline-flex items-center gap-2"
          >
            Create Your Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 px-6 brutal-border border-b-0 border-x-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-heading font-bold">
            <Library className="w-5 h-5" /> LibraVault
          </div>
          <div className="text-sm text-muted-foreground">© 2026 LibraVault. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
