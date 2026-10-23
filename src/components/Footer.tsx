import { ArrowRight, MapPin } from "lucide-react";
import { navLinks, riads } from "../data/collection";
import { Star8 } from "./Ornament";
import { logos } from "../data/images";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.045]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_44%_34%_at_50%_0%,rgba(220,164,142,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-9 sm:px-8 sm:pt-24">
        <div className="grid gap-12 border-b border-cream/12 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
<a href="#top" className="inline-flex items-center gap-3">
            <img
              src={logos.brand}
              alt="Riad Marrakech"
              className="h-16 w-auto brightness-0 invert"
            />
          </a>
            <p className="mt-5 max-w-sm leading-[1.85] text-cream/58">
              A considered collection of private riads, thoughtful event planning,
              and distinctive ways to experience Marrakech.
            </p>
            <a href="#contact" className="group mt-7 inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] text-dusk uppercase transition-colors hover:text-cream">
              Bring us your occasion
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <nav className="lg:col-span-3">
            <h3 className="text-[0.68rem] font-bold tracking-[0.28em] text-dusk uppercase">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.92rem] text-cream/62 transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-[0.92rem] font-semibold text-dusk transition-colors hover:text-cream">Start planning</a>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-4">
            <h3 className="text-[0.68rem] font-bold tracking-[0.28em] text-dusk uppercase">The riad collection</h3>
            <ul className="mt-5 space-y-3">
              {riads.map((riad) => (
                <li key={riad.id}>
                  <a href="#riads" className="group inline-flex items-center gap-2 text-[0.92rem] text-cream/62 transition-colors hover:text-cream">
                    <MapPin className="h-3.5 w-3.5 text-terracotta/80 transition-colors group-hover:text-dusk" />
                    {riad.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-7 text-xs text-cream/42 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Riad Marrakech · Private riads, events &amp; experiences</p>
          <p className="flex items-center gap-2">
            <Star8 className="h-3 w-3 shrink-0 text-terracotta/80" />
            Availability, event permissions, capacity, and rates are confirmed with each venue.
          </p>
          <a href="#top" className="shrink-0 font-semibold tracking-[0.16em] text-cream/60 uppercase transition-colors hover:text-dusk">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}