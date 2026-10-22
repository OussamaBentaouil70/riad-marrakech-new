import { Star8 } from "./Ornament";

const phrases = [
  "Private riad buyouts",
  "Intimate weddings",
  "Bespoke event planning",
  "Celebrations made personal",
  "Marrakech experiences",
  "A riad entirely yours",
  "Private dinners under the stars",
  "Moments worth gathering for",
];

export function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <div className="relative overflow-hidden bg-sage-deep py-4" aria-hidden="true">
      <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="animate-marquee flex w-max items-center gap-10 pr-10 whitespace-nowrap">
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg font-light text-cream/90 italic sm:text-xl">{p}</span>
            <Star8 className="h-3.5 w-3.5 shrink-0 text-dusk" />
          </span>
        ))}
      </div>
    </div>
  );
}
