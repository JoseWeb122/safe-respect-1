import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, CalendarCheck, Gauge, Stethoscope, Activity, Building2, CalendarClock, Home, Users, ArrowUpRight, Check, MapPinned, CalendarDays, CarFront, Smile, ArrowRight } from "lucide-react";
import { services } from "../../data/site";
import { Reveal, SectionHead, Modal, Button, scrollToId } from "../ui";

const pillars = [
  { t: "SAFE", d: "Your comfort and well-being come first.", I: ShieldCheck },
  { t: "RESPECTABLE", d: "Professional service delivered with care and dignity.", I: HeartHandshake },
  { t: "RELIABLE", d: "Dependable transportation when you need it.", I: CalendarCheck },
  { t: "SPEEDY", d: "Prompt service designed around your schedule.", I: Gauge },
];

export function TrustCards() {
  return (
    <section id="trust" className="relative z-10 -mt-14 px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-[2rem] bg-white p-3 shadow-2xl shadow-ink/10 ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ t, d, I }, i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="group h-full rounded-3xl p-6 transition duration-500 hover:bg-mist lg:p-8">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal transition duration-500 group-hover:bg-teal group-hover:text-white"><I size={22} strokeWidth={1.6} /></span>
                <span className="font-display text-xs text-slate-300">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold tracking-[0.16em] text-navy">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const icons = [Stethoscope, Activity, Building2, CalendarClock, Home, Users];

export function Services() {
  const [sel, setSel] = useState<number | null>(null);
  const s = sel !== null ? services[sel] : null;
  const SI = sel !== null ? icons[sel] : Stethoscope;
  return (
    <section id="services" className="bg-gradient-to-b from-white to-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHead eyebrow="Our Services" title="Transportation That Puts People First" sub="Getting to the care you need should be simple, comfortable, and dependable." />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((sv, i) => {
            const I = icons[i];
            return (
              <Reveal key={sv.key} delay={(i % 3) * 0.1}>
                <button onClick={() => setSel(i)} className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white p-8 text-left ring-1 ring-slate-200/70 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/10 hover:ring-teal/30">
                  <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal/5 transition duration-700 group-hover:scale-[2.2]" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white transition duration-500 group-hover:bg-teal"><I size={24} strokeWidth={1.6} /></span>
                  <h3 className="relative mt-7 text-xl font-semibold text-navy">{sv.title}</h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-slate-600">{sv.desc}</p>
                  <span className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    Learn More <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Modal open={!!s} onClose={() => setSel(null)} label={s?.title ?? "Service"}>
        {s && (
          <div>
            <div className="grad-anim relative px-8 pb-8 pt-10 text-white">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur"><SI size={30} strokeWidth={1.5} /></span>
              <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80">{s.desc}</p>
            </div>
            <div className="p-8">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What passengers can expect</h4>
              <ul className="mt-4 space-y-3">
                {s.expect.map((e) => <li key={e} className="flex gap-3 text-slate-700"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/10 text-teal"><Check size={12} /></span>{e}</li>)}
              </ul>
              <Button className="mt-8 w-full" onClick={() => { setSel(null); setTimeout(() => scrollToId("request"), 300); }}>Request Transportation <ArrowRight size={16} /></Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

const steps = [
  { t: "Tell Us Where You Need To Go", d: "Share your pickup location, destination, and any needs we should know about.", I: MapPinned },
  { t: "Schedule Your Transportation", d: "Choose your appointment date and preferred pickup time — our team reviews every request.", I: CalendarDays },
  { t: "We Arrive Ready", d: "A professional driver arrives in a clean, comfortable vehicle.", I: CarFront },
  { t: "Travel With Confidence", d: "Relax on a calm, respectful ride to your destination.", I: Smile },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-teal/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHead light eyebrow="How It Works" title="Transportation Made Simple" sub="Four clear steps from request to arrival." />
        <div className="relative mt-20 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <div className="absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-white/10 lg:block" />
          <motion.div className="absolute left-7 top-7 hidden h-px origin-left bg-gradient-to-r from-sky to-teal lg:block" style={{ width: "calc(100% - 3.5rem)" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} />
          <div className="absolute bottom-0 left-7 top-0 w-px bg-white/10 lg:hidden" />
          {steps.map(({ t, d, I }, i) => (
            <motion.div key={t} className="relative pl-20 lg:pl-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.25 + i * 0.4, duration: 0.8 }}>
              <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal to-navy shadow-lg shadow-teal/30 ring-4 ring-ink lg:relative"><I size={22} strokeWidth={1.6} /></span>
              <span className="mt-0 block font-display text-sm font-semibold text-sky lg:mt-8">Step 0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-3 leading-relaxed text-white/60">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
