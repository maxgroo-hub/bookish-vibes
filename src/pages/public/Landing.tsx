import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, Search, Star, ArrowRight, Library, Shield, Zap } from "lucide-react";
import ContactSection from "@/components/landing/ContactSection";
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

          {/* 3D Book Stack */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
          >
            <div className="relative w-64 h-80 perspective-[800px]">
              {[
                { bg: "bg-primary", rotate: -5, z: 3, delay: 0 },
                { bg: "bg-secondary", rotate: 3, z: 2, delay: 0.1 },
                { bg: "bg-accent", rotate: -2, z: 1, delay: 0.2 },
              ].map((book, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-0 ${book.bg} brutal-border rounded-lg animate-float`}
                  style={{
                    zIndex: book.z,
                    animationDelay: `${book.delay * 3}s`,
                    transform: `rotate(${book.rotate}deg) translateY(${i * -15}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
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
            </div>
          </motion.div>
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
        <h2 className="font-heading text-4xl md:text-5xl font-black text-center mb-16">
          What People Say
        </h2>
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
