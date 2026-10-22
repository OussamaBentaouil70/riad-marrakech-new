import { cn } from "../utils/cn";

/** Eight-pointed khatam star, the geometric heart of zellige design. */
export function Star8({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      <rect x="27" y="27" width="46" height="46" />
      <rect x="27" y="27" width="46" height="46" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="9" fill="var(--color-cream)" />
    </svg>
  );
}

/** Outlined variant for watermarks and large decorations. */
export function Star8Outline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="24" y="24" width="52" height="52" />
      <rect x="24" y="24" width="52" height="52" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="12" />
      <circle cx="50" cy="50" r="46" strokeDasharray="2 5" />
    </svg>
  );
}

/** Small eyebrow used above section headings: line — star — label — star — line */
export function Eyebrow({
  children,
  tone = "terracotta",
  align = "center",
  className,
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "sage" | "cream";
  align?: "center" | "left";
  className?: string;
}) {
  const tones = {
    terracotta: "text-terracotta-deep",
    sage: "text-sage-deep",
    cream: "text-dusk-soft",
  } as const;
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.28em] uppercase",
        tones[tone],
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {align === "center" && <span className="h-px w-8 bg-current opacity-40" />}
      <Star8 className="h-3 w-3 shrink-0" />
      <span>{children}</span>
      <Star8 className="h-3 w-3 shrink-0" />
      <span className="h-px w-8 bg-current opacity-40" />
    </div>
  );
}

/** A scalloped arch divider that sits on a section boundary. */
export function ArchDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-10 w-full sm:h-14", flip && "rotate-180", className)}
      fill="currentColor"
    >
      <path d="M0,56 L0,34 Q60,34 60,20 Q60,0 90,0 Q120,0 120,20 Q120,34 180,34 L1260,34 Q1320,34 1320,20 Q1320,0 1350,0 Q1380,0 1380,20 Q1380,34 1440,34 L1440,56 Z" />
    </svg>
  );
}
