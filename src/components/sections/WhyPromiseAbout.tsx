import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { Reveal, SectionHead } from "../ui";
import { hours } from "../../data/site";

const benefits = [
  { t: "Safety First", d: "Your safety and comfort are always a priority." },
  { t: "Professional Service", d: "Respectful, dependable transportation from people who understand the importance of your appointment." },
  { t: "Reliable Scheduling", d: "Transportation designed around your schedule and destination." },
  { t: "Local Coverage", d: "Serving communities across seven counties throughout New York." },
];

function Parallax({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img style={{ y, scale: 1.18 }} src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <Parallax src="/images/interior.jpg" alt="A relaxed passenger seated comfortably inside a clean transportation vehicle" className="aspect-[4/5] rounded-[2rem] shadow-2xl shadow-navy/20 sm:aspect-[5/5] lg:aspect-[4/5]" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-slate-200 backdrop-blur-md sm:-right-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal text-white"><ShieldCheck size={20} /></span>
            <span><span className="block font-display text-sm font-semibold text-navy">Comfort & dignity</span><span className="text-xs text-slate-500">On every trip</span></span>
          </motion.div>
        </Reveal>
        <div>
          <SectionHead center={false} eyebrow="Why Choose Us" title="Why Families Choose Us" sub="When someone you care about needs to get to an appointment, you need to know they're in good hands." />
          <div className="mt-10 space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.1}>
                <div className="group flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200/70 transition duration-300 hover:shadow-lg hover:ring-teal/30 sm:p-6">
                  <motion.span initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200, damping: 15 }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal text-white shadow-md shadow-teal/30">
                    <Check size={18} strokeWidth={2.5} />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{b.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-slate-600">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const words = ["SAFE", "RESPECTABLE", "RELIABLE", "SPEEDY"];

export function BrandPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(3, Math.max(0, Math.floor(v * 4)))));
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <section ref={ref} className="relative h-[260vh] bg-ink" aria-label="Our brand promise">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.img style={{ y: bgY, scale: 1.15 }} src="/images/road.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink/90" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6">
          <span className="eyebrow !text-sky"><span className="h-px w-6 bg-current" />Our Promise</span>
          <div className="mt-6 space-y-1 sm:space-y-2">
            {words.map((w, i) => (
              <motion.p key={w} animate={{ opacity: i === idx ? 1 : 0.18, x: i === idx ? 0 : -6 }} transition={{ duration: 0.6 }}
                className={`font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[8.5rem] ${i === idx ? "bg-gradient-to-r from-white to-sky bg-clip-text text-transparent" : "text-white"}`}>
                {w}
              </motion.p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-lg text-white/80 sm:text-xl">More than a ride. It's dependable transportation you can count on.</p>
            <div className="flex gap-2" aria-hidden>{words.map((w, i) => <span key={w} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-sky" : "w-4 bg-white/25"}`} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const stats = [
    { v: "7", l: "Counties Served" },
    { v: hours.short, l: "Current Operating Hours" },
    { v: "Patient-Focused", l: "Every Trip" },
  ];
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHead center={false} eyebrow="About Us" title="Transportation With Care Behind Every Mile" />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>We help people get where they need to be — to doctor and medical appointments, rehabilitation facilities, healthcare destinations, and other necessary places. For many of our passengers, getting there is one of the most important parts of their care.</p>
              <p>That's why every ride is built on the same simple values: be safe, be respectful, be reliable, and be prompt. We treat each passenger with patience and dignity, keep our vehicles clean and comfortable, and plan around the schedules that matter.</p>
              <p>As a local service proud to support communities across seven New York counties, we're here to make transportation one less thing for patients and families to worry about.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={0.15 + i * 0.1}>
                <div className="h-full rounded-2xl bg-mist p-5 ring-1 ring-slate-200/70">
                  <p className="font-display text-2xl font-semibold text-navy">{s.v}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="order-1 lg:order-2">
          <Parallax src="/images/about.jpg" alt="A driver holding the van door open for a passenger outside a healthcare facility" className="aspect-[4/3] rounded-[2rem] shadow-2xl shadow-navy/20 lg:aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}
