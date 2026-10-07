import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { company } from "../../data/site";

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function Reveal({ children, delay = 0, y = 28, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, sub, light = false, center = true }: { eyebrow: string; title: string; sub?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <span className={`eyebrow ${light ? "!text-sky" : ""}`}><span className="h-px w-6 bg-current" />{eyebrow}</span>
      <h2 className={`mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-slate-600"}`}>{sub}</p>}
    </Reveal>
  );
}

export function Button({ children, onClick, variant = "primary", href, className = "", type = "button", disabled }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "light" | "outline"; href?: string; className?: string; type?: "button" | "submit"; disabled?: boolean }) {
  const styles = {
    primary: "bg-teal text-white shadow-lg shadow-teal/25 hover:bg-[#1a7878] hover:shadow-xl hover:shadow-teal/30",
    ghost: "bg-white/10 text-white ring-1 ring-white/30 backdrop-blur-md hover:bg-white/20",
    light: "bg-white text-navy shadow-lg hover:bg-mist",
    outline: "bg-white text-navy ring-1 ring-slate-200 hover:ring-teal hover:text-teal",
  }[variant];
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none ${styles} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} disabled={disabled}>{children}</button>;
}

export function Modal({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: ReactNode; label: string }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={label}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-mist text-navy transition hover:bg-slate-200 hover:rotate-90">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  if (company.logoSrc) return <img src={company.logoSrc} alt={`${company.name} logo`} className={compact ? "h-9" : "h-11"} />;
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl grad-anim shadow-md">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[11px] font-bold tracking-[0.18em] sm:text-xs ${light ? "text-white" : "text-navy"}`}>SAFE • RESPECTABLE</span>
        <span className={`block font-display text-[11px] font-bold tracking-[0.18em] sm:text-xs ${light ? "text-sky" : "text-teal"}`}>RELIABLE • SPEEDY</span>
      </span>
    </span>
  );
}
