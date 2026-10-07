import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { navLinks, company } from "../../data/site";
import { Logo, scrollToId } from "../ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navLinks.map((n) => n.id);
      let cur = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 250 : 0); };
  const light = !scrolled && !open;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4 lg:py-6"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className={`flex items-center justify-between rounded-2xl px-4 transition-all duration-500 ${scrolled ? "bg-white/80 py-2.5 shadow-lg shadow-ink/5 ring-1 ring-slate-200/60 backdrop-blur-xl" : "py-2"}`} aria-label="Main">
            <button onClick={() => go("home")} aria-label="Go to top"><Logo light={light} /></button>
            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition ${light ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-navy"} ${active === l.id ? (light ? "!text-white" : "!text-navy") : ""}`}>
                    {l.label}
                    {active === l.id && <motion.span layoutId="navdot" className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${light ? "bg-sky" : "bg-teal"}`} />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <a href={company.phoneHref} className={`hidden h-11 w-11 place-items-center rounded-full transition md:grid ${light ? "text-white ring-1 ring-white/30 hover:bg-white/10" : "text-navy ring-1 ring-slate-200 hover:ring-teal"}`} aria-label="Call now"><Phone size={17} /></a>
              <button onClick={() => go("request")} className="hidden h-11 items-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition hover:-translate-y-0.5 hover:bg-[#1a7878] sm:inline-flex">
                Request a Ride <ArrowRight size={16} />
              </button>
              <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className={`relative grid h-11 w-11 place-items-center rounded-full xl:hidden ${light ? "text-white ring-1 ring-white/30" : "text-navy ring-1 ring-slate-200"}`}>
                <span className="relative block h-3.5 w-5">
                  <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li key={l.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <button onClick={() => go(l.id)} className={`flex w-full items-center justify-between border-b border-slate-100 py-4 font-display text-2xl font-semibold ${active === l.id ? "text-teal" : "text-navy"}`}>
                      {l.label} <ArrowRight size={18} className="text-slate-300" />
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3">
                <button onClick={() => go("request")} className="h-14 rounded-2xl bg-teal font-semibold text-white">Request a Ride</button>
                <a href={company.phoneHref} className="grid h-14 place-items-center rounded-2xl font-semibold text-navy ring-1 ring-slate-200">Call {company.phoneDisplay}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
