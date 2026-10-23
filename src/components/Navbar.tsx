import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, whatsappLink } from "../data/collection";
import { logos } from "../data/images";
import { WhatsAppIcon } from "./icons";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/92 shadow-[0_1px_0_rgba(176,141,100,0.28),0_12px_32px_-18px_rgba(44,38,32,0.25)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-5 transition-all duration-500 sm:gap-6 sm:px-7 lg:px-10",
            scrolled ? "py-3" : "py-4.5",
          )}
        >
          {/* Wordmark */}
          <a href="#top" className="group flex shrink-0 items-center gap-3">
            <img
              src={logos.brand}
              alt="Riad Marrakech"
              className={cn(
                "h-14 w-auto transition-all duration-500",
                scrolled ? "filter-none" : "brightness-0 invert"
              )}
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 whitespace-nowrap xl:flex xl:gap-7">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-[0.71rem] font-semibold tracking-[0.1em] uppercase transition-colors",
                    isActive
                      ? scrolled
                        ? "text-terracotta-deep"
                        : "text-dusk-soft"
                      : scrolled
                        ? "text-ink/70 hover:text-ink"
                        : "text-cream/80 hover:text-dusk-soft",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 bg-terracotta transition-all duration-300",
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-60",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap sm:gap-3">
            <a
              href={whatsappLink("Hello, I would like help planning a private event in Marrakech.")}
              target="_blank"
              rel="noreferrer"
              aria-label="Message us on WhatsApp"
              className="hidden items-center gap-2 rounded-full bg-[#1f6a4a] px-4.5 py-2.5 text-[0.74rem] font-bold tracking-[0.12em] text-cream uppercase transition-all duration-300 hover:bg-[#175238] hover:shadow-[0_10px_24px_-10px_rgba(31,106,74,0.7)] lg:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="#contact"
              className={cn(
                "hidden rounded-full px-4.5 py-2.5 text-[0.74rem] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-terracotta-deep hover:shadow-[0_10px_24px_-10px_rgba(158,79,45,0.7)] sm:block sm:px-6 sm:text-[0.78rem]",
                scrolled ? "bg-ink text-cream" : "bg-cream text-ink",
              )}
            >
              Plan your event
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors xl:hidden",
                scrolled ? "border-clay/40 text-ink hover:bg-parchment" : "border-cream/40 text-cream hover:bg-cream/10",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-moss text-cream"
          >
            <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.07]" />
            <div className="relative flex items-center justify-between px-5 py-5 sm:px-8">
              <img
                src={logos.brand}
                alt="Riad Marrakech"
                className="h-14 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 transition-colors hover:bg-cream/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="py-2 font-display text-4xl font-light text-cream/90 transition-colors hover:text-dusk"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.55 }}
                className="mt-8 rounded-full bg-terracotta px-9 py-3.5 text-sm font-bold tracking-[0.16em] uppercase transition-colors hover:bg-terracotta-deep"
              >
                Start planning your event
              </motion.a>
              <motion.a
                href={whatsappLink("Hello, I would like help planning a private event in Marrakech.")}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.55 }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1f6a4a] px-7 py-3 text-[0.78rem] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-[#175238]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </motion.a>
              <p className="mt-10 font-arabic text-2xl text-dusk/80">أهلاً وسهلاً</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-cream/50 uppercase">You are most welcome</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
