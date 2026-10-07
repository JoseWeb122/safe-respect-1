import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, AlertCircle, Phone, Clock, ShieldCheck } from "lucide-react";
import { counties, company, hours } from "../../data/site";
import { Modal, Button, SectionHead, Reveal } from "../ui";

type F = { name: string; phone: string; email: string; pickup: string; destination: string; date: string; time: string; returnTrip: string; county: string; needs: string; notes: string; consent: boolean };
const empty: F = { name: "", phone: "", email: "", pickup: "", destination: "", date: "", time: "", returnTrip: "", county: "", needs: "", notes: "", consent: false };

const todayStr = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };

function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (f.phone.replace(/\D/g, "").length !== 10) e.phone = "Please enter a valid 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (f.pickup.trim().length < 3) e.pickup = "Please enter a pickup location.";
  if (f.destination.trim().length < 3) e.destination = "Please enter a destination.";
  if (!f.date) e.date = "Please choose an appointment date.";
  else if (f.date < todayStr()) e.date = "Date cannot be in the past.";
  if (!f.time) e.time = "Please choose a preferred pickup time.";
  if (!f.returnTrip) e.returnTrip = "Please let us know about a return trip.";
  if (!f.county) e.county = "Please select a county.";
  if (!f.needs) e.needs = "Please select transportation needs.";
  if (!f.consent) e.consent = "Please confirm to continue.";
  return e;
}

const fmtPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export default function TransportationForm() {
  const [f, setF] = useState<F>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({});
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const h = (e: Event) => setF((p) => ({ ...p, county: (e as CustomEvent).detail }));
    window.addEventListener("prefill-county", h);
    return () => window.removeEventListener("prefill-county", h);
  }, []);

  const set = (k: keyof F) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target as HTMLInputElement;
    let v: string | boolean = t.type === "checkbox" ? t.checked : t.value;
    if (k === "phone") v = fmtPhone(v as string);
    const nf = { ...f, [k]: v };
    setF(nf);
    if (touched) setErrors(validate(nf));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.getElementById(`f-${Object.keys(errs)[0]}`);
      first?.focus();
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1600);
  };

  const reset = () => { setF(empty); setErrors({}); setTouched(false); };

  const Field = ({ k, label, children, span = false }: { k: keyof F; label: string; children: React.ReactNode; span?: boolean }) => (
    <div className={span ? "sm:col-span-2" : ""}>
      <label htmlFor={`f-${k}`} className="mb-2 block text-sm font-medium text-navy">{label}{k !== "notes" && <span className="text-teal"> *</span>}</label>
      {children}
      {errors[k] && <p id={`e-${k}`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600"><AlertCircle size={14} />{errors[k]}</p>}
    </div>
  );
  const cls = (k: keyof F) => `field ${errors[k] ? "field-err" : ""}`;
  const aria = (k: keyof F) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section id="request" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-sky/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead center={false} eyebrow="Request a Ride" title="Request Transportation" sub="Tell us a little about your trip and our team can review your transportation request." />
            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-4">
                {[{ I: ShieldCheck, t: "Reviewed by our team", d: "Every request is personally reviewed before follow-up." }, { I: Clock, t: hours.time, d: `${hours.days} · current hours` }, { I: Phone, t: "Prefer to call?", d: `${company.phoneDisplay} (placeholder)` }].map(({ I, t, d }) => (
                  <li key={t} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-teal shadow-sm ring-1 ring-slate-200"><I size={19} /></span><span><span className="block font-semibold text-navy">{t}</span><span className="text-sm text-slate-500">{d}</span></span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-navy/10 ring-1 ring-slate-200/70 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {Field({ k: "name", label: "Full Name", children: <input {...aria("name")} className={cls("name")} value={f.name} onChange={set("name")} autoComplete="name" placeholder="Jane Doe" /> })}
              {Field({ k: "phone", label: "Phone Number", children: <input {...aria("phone")} type="tel" inputMode="tel" className={cls("phone")} value={f.phone} onChange={set("phone")} autoComplete="tel" placeholder="(585) 555-0123" /> })}
              {Field({ k: "email", label: "Email Address", span: true, children: <input {...aria("email")} type="email" className={cls("email")} value={f.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" /> })}
              {Field({ k: "pickup", label: "Pickup Location", children: <input {...aria("pickup")} className={cls("pickup")} value={f.pickup} onChange={set("pickup")} placeholder="Street address, city" /> })}
              {Field({ k: "destination", label: "Destination", children: <input {...aria("destination")} className={cls("destination")} value={f.destination} onChange={set("destination")} placeholder="Facility name or address" /> })}
              {Field({ k: "date", label: "Appointment Date", children: <input {...aria("date")} type="date" min={todayStr()} className={cls("date")} value={f.date} onChange={set("date")} /> })}
              {Field({ k: "time", label: "Preferred Pickup Time", children: <input {...aria("time")} type="time" className={cls("time")} value={f.time} onChange={set("time")} /> })}
              {Field({ k: "returnTrip", label: "Return Trip", children: (
                <select {...aria("returnTrip")} className={cls("returnTrip")} value={f.returnTrip} onChange={set("returnTrip")}>
                  <option value="">Select an option</option><option>Yes, I need a return trip</option><option>No, one-way only</option><option>Not sure yet</option>
                </select>) })}
              {Field({ k: "county", label: "County", children: (
                <select {...aria("county")} className={cls("county")} value={f.county} onChange={set("county")}>
                  <option value="">Select your county</option>
                  {["Monroe", "Genesee", "Orleans", "Wyoming", "Ontario", "Livingston", "Wayne"].map((n) => counties.find((c) => c.name === n) && <option key={n}>{n} County</option>)}
                </select>) })}
              {Field({ k: "needs", label: "Transportation Needs", span: true, children: (
                <select {...aria("needs")} className={cls("needs")} value={f.needs} onChange={set("needs")}>
                  <option value="">Select the type of trip</option><option>Doctor / medical appointment</option><option>Rehabilitation facility</option><option>Healthcare facility</option><option>Other necessary destination</option>
                </select>) })}
              {Field({ k: "notes", label: "Additional Notes", span: true, children: <textarea {...aria("notes")} rows={4} className={`${cls("notes")} resize-none`} value={f.notes} onChange={set("notes")} placeholder="Anything our team should know (mobility aids, assistance, building entrance, etc.)" maxLength={600} /> })}
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl p-1">
                  <input id="f-consent" type="checkbox" checked={f.consent} onChange={set("consent")} className="mt-1 h-5 w-5 shrink-0 accent-teal" aria-invalid={!!errors.consent} />
                  <span className="text-sm leading-relaxed text-slate-600">I agree that the information provided may be used to respond to my transportation request.</span>
                </label>
                {errors.consent && <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600"><AlertCircle size={14} />{errors.consent}</p>}
              </div>
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={reset} className="min-h-12 rounded-full px-5 text-sm font-medium text-slate-500 transition hover:text-navy">Reset form</button>
              <Button type="submit" disabled={loading} className="!px-8 !py-4">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : <>Submit Transportation Request <Send size={16} className="transition group-hover:translate-x-1" /></>}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>

      <Modal open={done} onClose={() => { setDone(false); reset(); }} label="Request Received">
        <div className="p-8 text-center sm:p-10">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal/10 text-teal">
            <CheckCircle2 size={42} strokeWidth={1.6} />
          </motion.span>
          <h3 className="mt-6 text-2xl font-semibold text-navy">Request Received</h3>
          <p className="mt-3 leading-relaxed text-slate-600">Thank you. Your transportation request has been submitted successfully. A member of our team will review your information and follow up with you.</p>
          <p className="mt-4 rounded-xl bg-mist p-3 text-xs text-slate-500">Please note: submitting a request does not confirm a ride. Our team will contact you to review availability.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button variant="outline" onClick={() => { setDone(false); reset(); }}>Submit another</Button>
            <Button onClick={() => { setDone(false); reset(); }}>Done</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
