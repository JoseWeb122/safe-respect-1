import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { counties } from "../../data/site";
import { SectionHead, Reveal, Modal, Button, scrollToId } from "../ui";

const shapes: Record<string, { d: string; c: [number, number] }> = {
  orleans: { d: "M40 70 L200 60 L200 170 L40 170 Z", c: [120, 118] },
  monroe: { d: "M200 60 L250 44 L330 54 L350 175 L200 170 Z", c: [272, 115] },
  wayne: { d: "M330 54 L540 62 L545 175 L350 175 Z", c: [440, 118] },
  genesee: { d: "M40 170 L200 170 L215 280 L40 280 Z", c: [125, 225] },
  livingston: { d: "M200 170 L350 175 L330 330 L232 340 L215 280 Z", c: [275, 260] },
  ontario: { d: "M350 175 L470 175 L485 330 L330 330 Z", c: [410, 252] },
  wyoming: { d: "M40 280 L215 280 L232 340 L222 425 L58 425 Z", c: [135, 352] },
};

export const prefillCounty = (name: string) => {
  window.dispatchEvent(new CustomEvent("prefill-county", { detail: `${name} County` }));
  setTimeout(() => scrollToId("request"), 300);
};

export function CountyMap({ hover, setHover, onSelect }: { hover: string | null; setHover: (s: string | null) => void; onSelect: (id: string) => void }) {
  const h = counties.find((c) => c.id === hover);
  return (
    <div className="relative">
      <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label="Stylized map of the seven New York counties served">
        <defs>
          <linearGradient id="lake" x1="0" x2="1"><stop offset="0" stopColor="#5fb4c9" stopOpacity=".25" /><stop offset="1" stopColor="#1f8a8a" stopOpacity=".12" /></linearGradient>
          <linearGradient id="hl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f8a8a" /><stop offset="1" stopColor="#0f2a44" /></linearGradient>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#0f2a44" opacity=".08" /></pattern>
        </defs>
        <rect width="600" height="460" fill="url(#dots)" />
        <path d="M0 0 H600 V40 C 520 70, 420 30, 330 40 C 240 50, 160 28, 80 52 C 50 60, 20 58, 0 56 Z" fill="url(#lake)" />
        <text x="430" y="26" className="fill-teal/70 text-[11px] font-semibold tracking-[0.3em]" style={{ fontSize: 11, letterSpacing: "0.3em" }}>LAKE ONTARIO</text>
        {counties.map((c, i) => {
          const s = shapes[c.id];
          const on = hover === c.id;
          return (
            <motion.g key={c.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} style={{ transformOrigin: `${s.c[0]}px ${s.c[1]}px` }}>
              <path
                d={s.d} tabIndex={0} role="button" aria-label={`${c.name} County`}
                onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(c.id)} onBlur={() => setHover(null)}
                onClick={() => onSelect(c.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(c.id))}
                fill={on ? "url(#hl)" : "#ffffff"} stroke={on ? "#1f8a8a" : "#c9d6df"} strokeWidth={on ? 2.5 : 1.5} strokeLinejoin="round"
                className="cursor-pointer outline-none transition-all duration-300"
                style={{ filter: on ? "drop-shadow(0 12px 18px rgba(15,42,68,.25))" : "drop-shadow(0 2px 3px rgba(15,42,68,.06))" }}
              />
              <text x={s.c[0]} y={s.c[1]} textAnchor="middle" pointerEvents="none" style={{ fontSize: 13, fontWeight: 600, fontFamily: "Manrope" }} fill={on ? "#fff" : "#0f2a44"}>{c.name}</text>
              <circle cx={s.c[0]} cy={s.c[1] + 14} r="3" pointerEvents="none" fill={on ? "#5fb4c9" : "#1f8a8a"} />
            </motion.g>
          );
        })}
      </svg>
      <AnimatePresence>
        {h && (
          <motion.div key={h.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pointer-events-none absolute bottom-3 left-3 rounded-2xl bg-white/90 px-4 py-3 shadow-xl ring-1 ring-slate-200 backdrop-blur-md">
            <p className="font-display text-sm font-semibold text-navy">{h.name} County</p>
            <p className="text-xs text-slate-500">County seat: {h.seat} · Service available · Click for details</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceArea() {
  const [hover, setHover] = useState<string | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const c = counties.find((x) => x.id === sel);
  return (
    <section id="area" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHead eyebrow="Service Area" title="Serving Communities Across 7 New York Counties" sub="Professional medical transportation throughout Western and Finger Lakes New York. Hover or tap a county to learn more." />
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] bg-mist p-4 ring-1 ring-slate-200/70 sm:p-8">
              <CountyMap hover={hover} setHover={setHover} onSelect={setSel} />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 lg:col-span-5">
            {counties.map((ct, i) => (
              <Reveal key={ct.id} delay={i * 0.05} className={i === counties.length - 1 ? "col-span-2" : ""}>
                <button onMouseEnter={() => setHover(ct.id)} onMouseLeave={() => setHover(null)} onClick={() => setSel(ct.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl p-4 text-left ring-1 transition duration-300 ${hover === ct.id ? "bg-navy text-white ring-navy shadow-xl -translate-y-0.5" : "bg-white text-navy ring-slate-200 hover:ring-teal/40"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${hover === ct.id ? "bg-white/15 text-sky" : "bg-teal/10 text-teal"}`}><MapPin size={18} /></span>
                  <span>
                    <span className="block font-display font-semibold">{ct.name} County</span>
                    <span className={`block text-xs ${hover === ct.id ? "text-white/60" : "text-slate-500"}`}>{ct.seat} & surrounding areas</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Modal open={!!c} onClose={() => setSel(null)} label={`Serving ${c?.name} County`}>
        {c && (
          <div className="p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-teal"><MapPin size={26} /></span>
            <h3 className="mt-6 text-2xl font-semibold text-navy">Serving {c.name} County</h3>
            <p className="mt-3 leading-relaxed text-slate-600">Professional medical transportation available throughout this service area.</p>
            <div className="mt-6 rounded-2xl bg-mist p-4 text-sm text-slate-600">Including {c.seat} and surrounding communities. Hours: 6:00 AM – 6:00 PM.</div>
            <Button className="mt-6 w-full" onClick={() => { setSel(null); prefillCounty(c.name); }}>Request Transportation <ArrowRight size={16} /></Button>
          </div>
        )}
      </Modal>
    </section>
  );
}
