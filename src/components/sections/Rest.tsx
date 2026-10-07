import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Phone, Mail, MapPin, Clock, ArrowRight, ArrowUp, Quote, Snowflake } from "lucide-react";
import { hours, testimonials, faqs, company, counties } from "../../data/site";
import { SectionHead, Reveal, Button, scrollToId, Logo, Modal } from "../ui";

function AnalogClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const open = h >= hours.openHour && h < hours.closeHour;
  const arc = (from: number, to: number) => {
    const p = (hr: number) => { const a = ((hr % 12) / 12) * 2 * Math.PI - Math.PI / 2; return [100 + 92 * Math.cos(a), 100 + 92 * Math.sin(a)]; };
    const [x1, y1] = p(from), [x2, y2] = p(to);
    return `M${x1} ${y1} A92 92 0 0 1 ${x2} ${y2}`;
  };
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 200 200" className="w-full" role="img" aria-label={`Current time ${now.toLocaleTimeString()}`}>
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="6" />
        <path d={arc(6, 11.999)} stroke="url(#arcg)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={arc(12, 17.999)} stroke="url(#arcg)" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".55" />
        <defs><linearGradient id="arcg"><stop offset="0" stopColor="#5fb4c9" /><stop offset="1" stopColor="#1f8a8a" /></linearGradient></defs>
        <circle cx="100" cy="100" r="78" fill="rgba(255,255,255,.04)" />
        {Array.from({ length: 12 }).map((_, i) => <line key={i} x1="100" y1="28" x2="100" y2={i % 3 === 0 ? 38 : 33} stroke="rgba(255,255,255,.5)" strokeWidth={i % 3 === 0 ? 2 : 1} transform={`rotate(${i * 30} 100 100)`} />)}
        <line x1="100" y1="100" x2="100" y2="58" stroke="white" strokeWidth="4" strokeLinecap="round" transform={`rotate(${(h % 12) * 30 + m * 0.5} 100 100)`} />
        <line x1="100" y1="100" x2="100" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${m * 6} 100 100)`} />
        <line x1="100" y1="110" x2="100" y2="38" stroke="#5fb4c9" strokeWidth="1" transform={`rotate(${s * 6} 100 100)`} style={{ transition: "transform .3s" }} />
        <circle cx="100" cy="100" r="4" fill="#5fb4c9" />
      </svg>
      <div className={`mx-auto mt-4 flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ring-1 ${open ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30" : "bg-white/5 text-white/70 ring-white/15"}`}>
        <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse bg-emerald-400" : "bg-white/40"}`} />{open ? "Open now" : "Currently closed · submit a request anytime"}
      </div>
    </div>
  );
}

export function Hours() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="grad-anim relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl shadow-navy/20 sm:p-14 lg:grid-cols-2">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />
            <div className="relative">
              <span className="eyebrow !text-sky"><span className="h-px w-6 bg-current" />Hours</span>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">We're Here When You Need Us</h2>
              <div className="mt-8 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Current Hours</p>
                <p className="mt-3 font-display text-xl font-semibold">{hours.days}</p>
                <p className="font-display text-3xl font-semibold text-sky sm:text-4xl">{hours.time}</p>
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm text-white/70"><Snowflake size={16} className="mt-0.5 shrink-0 text-sky" />{hours.note}</p>
            </div>
            <div className="relative"><AnalogClock /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);
  useEffect(() => { if (paused) return; const t = setInterval(() => go(1), 6000); return () => clearInterval(t); }, [paused, go]);
  const t = testimonials[i];
  return (
    <section className="bg-mist py-24 sm:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHead eyebrow="Testimonials" title="What Passengers Will Say" sub="Placeholder content — real client testimonials will be added here once collected." />
        <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-navy/5 ring-1 ring-slate-200/70 sm:p-14">
          <span className="absolute right-6 top-6 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">Placeholder</span>
          <Quote size={40} className="text-teal/30" />
          <AnimatePresence mode="wait">
            <motion.div key={i} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3}
              onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} className="cursor-grab active:cursor-grabbing">
              <p className="mt-6 font-display text-xl leading-relaxed text-navy sm:text-2xl">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-teal to-navy font-display font-semibold text-white">{t.name.split(" ").slice(-2).map((w) => w[0]).join("")}</span>
                <span><span className="block font-semibold text-navy">{t.name}</span><span className="text-sm text-slate-500">{t.role}</span></span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className="grid h-8 place-items-center"><span className={`block h-2 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-teal" : "w-2 bg-slate-300 hover:bg-slate-400"}`} /></button>)}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-slate-200 transition hover:bg-navy hover:text-white"><ChevronLeft size={18} /></button>
              <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-slate-200 transition hover:bg-navy hover:text-white"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead center={false} eyebrow="FAQ" title="Questions, Answered" sub="Can't find what you're looking for? Our team is happy to help." />
          <Reveal delay={0.1}><Button variant="outline" className="mt-8" onClick={() => scrollToId("contact")}>Contact our team <ArrowRight size={16} /></Button></Reveal>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-8">
          {faqs.map((f, k) => {
            const on = open === k;
            return (
              <div key={f.q}>
                <h3>
                  <button onClick={() => setOpen(on ? null : k)} aria-expanded={on} aria-controls={`faq-${k}`} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className={`font-display text-lg font-semibold transition ${on ? "text-teal" : "text-navy"}`}>{f.q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${on ? "rotate-45 bg-teal text-white" : "bg-mist text-navy"}`}><Plus size={16} /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${k}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const items = [
    { I: Phone, l: "Phone", v: company.phoneDisplay, s: "Placeholder — to be updated", href: company.phoneHref },
    { I: Mail, l: "Email", v: company.email, s: "Placeholder — to be updated", href: `mailto:${company.email}` },
    { I: MapPin, l: "Service Area", v: "7 New York Counties", s: "Monroe, Genesee, Orleans, Wyoming, Ontario, Livingston, Wayne" },
    { I: Clock, l: "Hours", v: hours.time, s: hours.days },
  ];
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-teal/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHead light eyebrow="Contact" title="Let's Get You Where You Need To Go" sub="Reach out with questions or submit a transportation request — our team will follow up." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ I, l, v, s, href }, k) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-sky transition group-hover:bg-teal group-hover:text-white"><I size={20} /></span>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">{l}</p>
                <p className="mt-2 break-words font-display text-lg font-semibold">{v}</p>
                <p className="mt-1 text-sm text-white/50">{s}</p>
              </>
            );
            return (
              <Reveal key={l} delay={k * 0.08}>
                {href ? <a href={href} className="group block h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10">{inner}</a>
                  : <div className="group h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">{inner}</div>}
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="light" href={company.phoneHref} className="!px-8 !py-4"><Phone size={17} /> Call Now</Button>
            <Button onClick={() => scrollToId("request")} className="!px-8 !py-4">Request Transportation <ArrowRight size={17} /></Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const legal = {
  privacy: { t: "Privacy Policy", b: "This is placeholder Privacy Policy content for the website prototype. The final policy will describe how information submitted through transportation requests is collected, used, and protected. Please contact our team with any questions." },
  terms: { t: "Terms & Conditions", b: "This is placeholder Terms & Conditions content for the website prototype. Submitting a request through this website does not confirm or book transportation. Final terms will be provided by the company." },
};

export function Footer() {
  const [doc, setDoc] = useState<null | "privacy" | "terms">(null);
  const links = [["home", "Home"], ["services", "Services"], ["area", "Service Area"], ["about", "About"], ["faq", "FAQ"], ["contact", "Contact"]];
  const order = ["Monroe", "Genesee", "Orleans", "Wyoming", "Ontario", "Livingston", "Wayne"];
  void counties;
  return (
    <footer className="bg-[#07131f] pb-28 pt-20 text-white/70 lg:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed">Safe, respectful, and reliable non-emergency medical transportation to appointments, rehabilitation, healthcare facilities, and essential destinations across seven New York counties.</p>
            <Button className="mt-8" onClick={() => scrollToId("request")}>Request Transportation <ArrowRight size={16} /></Button>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Navigate</h4>
            <ul className="mt-5 space-y-3">{links.map(([id, l]) => <li key={id}><button onClick={() => scrollToId(id)} className="transition hover:text-sky">{l}</button></li>)}</ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Service Areas</h4>
            <ul className="mt-5 grid grid-cols-2 gap-3">{order.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Hours</h4>
            <p className="mt-5 font-display text-2xl font-semibold text-white">{hours.short}</p>
            <p className="text-sm">{hours.days}</p>
            <a href={company.phoneHref} className="mt-5 block transition hover:text-sky">{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`} className="block transition hover:text-sky">{company.email}</a>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setDoc("privacy")} className="transition hover:text-sky">Privacy Policy</button>
            <button onClick={() => setDoc("terms")} className="transition hover:text-sky">Terms & Conditions</button>
          </div>
        </div>
      </div>
      <Modal open={!!doc} onClose={() => setDoc(null)} label={doc ? legal[doc].t : "Legal"}>
        {doc && <div className="p-8"><h3 className="pr-10 text-2xl font-semibold text-navy">{legal[doc].t}</h3><p className="mt-4 leading-relaxed text-slate-600">{legal[doc].b}</p><Button className="mt-6 w-full" onClick={() => setDoc(null)}>Close</Button></div>}
      </Modal>
    </footer>
  );
}

export function FloatingUI() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-xl transition hover:-translate-y-1 hover:bg-teal lg:bottom-8 lg:right-8">
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", damping: 24 }} className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/85 p-2 shadow-2xl shadow-ink/20 ring-1 ring-slate-200 backdrop-blur-xl">
              <a href={company.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded-xl font-semibold text-navy ring-1 ring-slate-200 active:scale-95"><Phone size={17} /> Call Now</a>
              <button onClick={() => scrollToId("request")} className="flex h-12 items-center justify-center gap-1 rounded-xl bg-teal text-sm font-semibold text-white active:scale-95">Request Transportation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
