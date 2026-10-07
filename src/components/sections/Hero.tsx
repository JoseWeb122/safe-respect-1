import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, ChevronDown, ShieldCheck, Navigation } from "lucide-react";
import { counties } from "../../data/site";
import { Button, scrollToId } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const order = ["Monroe", "Genesee", "Orleans", "Wyoming", "Ontario", "Livingston", "Wayne"];
  void counties;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-24 pt-32 lg:items-center lg:pb-16">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="/images/hero.jpg" alt="A professional driver helping a passenger into a clean medical transportation van" className="kenburns h-full w-full object-cover object-[70%_center]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-end gap-10 px-5 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 ring-1 ring-white/20 backdrop-blur-md">
            <ShieldCheck size={14} className="text-sky" /> Non-Emergency Medical Transportation · New York
          </motion.div>
          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {["Safe. Respectful.", "Reliable.", "Right When You Need Us."].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span className={`block ${i === 2 ? "bg-gradient-to-r from-sky to-teal bg-clip-text text-transparent" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Professional medical transportation for appointments, rehabilitation, healthcare facilities, and essential trips across seven New York counties.
          </motion.p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6, ease }}>
              <Button onClick={() => scrollToId("request")} className="w-full sm:w-auto !px-7 !py-4">Request Transportation <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92, duration: 0.6, ease }}>
              <Button variant="ghost" onClick={() => scrollToId("services")} className="w-full sm:w-auto !px-7 !py-4">Explore Our Services</Button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-7 flex items-center gap-3 text-sm text-white/70">
            <span className="flex -space-x-1">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-sky ring-2 ring-ink" />)}</span>
            Serving 7 Counties Across New York
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ delay: 1, duration: 1.1, ease }} className="hidden lg:col-span-5 lg:block">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="ml-auto max-w-sm rounded-3xl bg-white/10 p-6 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Currently Serving</span>
              <span className="flex items-center gap-1.5 text-xs text-white/70"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>Active</span>
            </div>
            <div className="relative mt-5 h-20 overflow-hidden rounded-2xl bg-ink/40 ring-1 ring-white/10">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden>
                <path d="M10 60 C 80 10, 140 70, 200 30 S 280 40, 290 20" stroke="rgba(95,180,201,.5)" strokeWidth="2" strokeDasharray="4 6" fill="none" />
              </svg>
              <motion.div className="absolute top-1/2 -translate-y-1/2" animate={{ left: ["4%", "88%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-teal shadow-lg shadow-teal/50"><Navigation size={14} className="rotate-90" /></span>
              </motion.div>
              <MapPin className="absolute right-3 top-3 text-sky" size={16} />
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-white/90">{order.join(" • ")}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-white/60">Hours</span><span className="font-semibold">6:00 AM – 6:00 PM</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <button onClick={() => scrollToId("trust")} aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition hover:text-white sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown size={18} /></motion.span>
      </button>
    </section>
  );
}
