import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react";
import { riads, whatsappLink, type Riad } from "../data/collection";
import { Eyebrow, Star8 } from "./Ornament";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons";
import { cn } from "../utils/cn";

function RiadPhoto({
  src,
  alt,
  name,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  name: string;
  className: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div className={cn(className, "pattern-zellige flex items-center justify-center bg-parchment text-terracotta/70")}>
        <div className="px-5 text-center">
          <Star8 className="mx-auto h-8 w-8" />
          <p className="mt-2 font-display text-lg text-ink/65">{name}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(className, "object-cover", imageClassName)}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export function RiadCollection({ onChoose }: { onChoose: (id: string) => void }) {
  const [activeRiad, setActiveRiad] = useState<Riad | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = activeRiad?.gallery[imageIndex];

  const closeModal = useCallback(() => setActiveRiad(null), []);
  const moveImage = useCallback(
    (direction: 1 | -1) => {
      if (!activeRiad) return;
      setImageIndex((current) => (current + direction + activeRiad.gallery.length) % activeRiad.gallery.length);
    },
    [activeRiad],
  );

  useEffect(() => {
    if (!activeRiad) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") moveImage(-1);
      if (event.key === "ArrowRight") moveImage(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeRiad, closeModal, moveImage]);

  const openRiad = (riad: Riad) => {
    setImageIndex(0);
    setActiveRiad(riad);
  };

  const requestRiad = () => {
    if (!activeRiad) return;
    const selectedId = activeRiad.id;
    closeModal();
    onChoose(selectedId);
  };

  return (
    <>
      <section id="riads" className="relative scroll-mt-24 overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_95%_10%,rgba(195,207,184,0.34),transparent_72%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow align="left">02 · The collection</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] font-light text-ink sm:text-5xl">
                Handpicked riads for{" "}
                <em className="font-normal text-terracotta-deep italic">extraordinary moments</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <p className="max-w-md leading-[1.85] text-ink/65">
              Moroccan heritage, thoughtful comfort, and distinctive settings for
              private gatherings. We will help you find the right place for your plans.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {riads.map((riad, index) => (
            <Reveal key={riad.id} delay={(index % 2) * 0.1}>
              <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 250, damping: 24 }} className="group">
                <button
                  type="button"
                  onClick={() => openRiad(riad)}
                  aria-label={`View ${riad.name} photo gallery`}
                  className="relative block w-full overflow-hidden bg-parchment text-left ring-1 ring-clay/20 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none"
                >
                  <RiadPhoto
                    src={riad.image}
                    alt={`${riad.name}, a curated private riad in Marrakech`}
                    name={riad.name}
                    className="aspect-square w-full"
                    imageClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.045]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.17em] text-sage-deep uppercase backdrop-blur-sm">
                    0{index + 1} · {riad.category}
                  </span>
                  <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-cream/92 px-3.5 py-2 text-[0.68rem] font-bold tracking-[0.13em] text-ink uppercase shadow-lg backdrop-blur-sm transition-colors group-hover:bg-terracotta group-hover:text-cream">
                    <Camera className="h-3.5 w-3.5" /> View gallery
                  </span>
                </button>

                <div className="pt-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl font-medium text-ink sm:text-[2rem]">{riad.name}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[0.73rem] font-bold tracking-[0.14em] text-sage-deep uppercase">
                        <MapPin className="h-3.5 w-3.5 text-terracotta" /> {riad.location}
                      </p>
                    </div>
                    <Star8 className="mt-1 h-4 w-4 shrink-0 text-terracotta/70" />
                  </div>
                  <p className="mt-4 max-w-2xl leading-[1.8] text-ink/65">{riad.description}</p>

                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-clay/35 pt-4">
                    {riad.highlights.map((highlight) => (
                      <li key={highlight} className="text-[0.78rem] font-semibold text-sage-deep">{highlight}</li>
                    ))}
                  </ul>

                  <p className="mt-4 text-[0.86rem] leading-relaxed text-ink/60">
                    <span className="font-bold text-terracotta-deep">Ideal for:</span> {riad.idealFor}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-3xl border-t border-clay/30 pt-5 text-center text-[0.84rem] leading-relaxed text-ink/55">
            All properties are potential venue options. Exclusive buyout availability,
            event authorization, accommodation limits, and rates are subject to
            individual confirmation.
          </p>
        </Reveal>
      </div>
    </section>

      {createPortal(
        <AnimatePresence>
        {activeRiad && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/75 p-3 backdrop-blur-md sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="riad-dialog-title"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-auto grid w-full max-w-6xl overflow-hidden rounded-[1.5rem] bg-cream shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] lg:grid-cols-[1.08fr_0.92fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative min-h-[290px] bg-moss sm:min-h-[420px] lg:min-h-[620px]">
                <RiadPhoto
                  src={activeImage.src}
                  alt={activeImage.alt}
                  name={activeRiad.name}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="transition-opacity duration-300"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close riad gallery"
                  className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-cream/55 bg-ink/30 text-cream backdrop-blur-sm transition-colors hover:bg-terracotta"
                >
                  <X className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => moveImage(-1)}
                  aria-label="Previous riad photo"
                  className="absolute top-1/2 left-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/50 bg-ink/30 text-cream backdrop-blur-sm transition-colors hover:bg-terracotta"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(1)}
                  aria-label="Next riad photo"
                  className="absolute top-1/2 right-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/50 bg-ink/30 text-cream backdrop-blur-sm transition-colors hover:bg-terracotta"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-cream">
                  <p className="max-w-sm font-display text-xl leading-snug italic sm:text-2xl">{activeImage.alt}</p>
                  <span className="shrink-0 rounded-full bg-ink/45 px-3 py-1.5 text-xs font-bold tracking-wider backdrop-blur-sm">
                    {String(imageIndex + 1).padStart(2, "0")} / {String(activeRiad.gallery.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex max-h-[min(80vh,760px)] flex-col overflow-y-auto p-6 sm:p-8 lg:p-10">
                <p className="text-[0.67rem] font-bold tracking-[0.22em] text-terracotta-deep uppercase">
                  {activeRiad.category} · {activeRiad.location}
                </p>
                <h2 id="riad-dialog-title" className="mt-3 font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                  {activeRiad.name}
                </h2>
                <p className="mt-4 leading-[1.85] text-ink/68">{activeRiad.description}</p>

                <ul className="mt-5 space-y-2.5 border-t border-dashed border-clay/35 pt-5">
                  {activeRiad.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-ink/75">
                      <Star8 className="mt-1 h-3 w-3 shrink-0 text-sage" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[0.86rem] leading-relaxed text-ink/60">
                  <span className="font-bold text-terracotta-deep">Ideal for:</span> {activeRiad.idealFor}
                </p>

                <div className="mt-6 grid grid-cols-5 gap-2.5" aria-label={`${activeRiad.name} gallery photos`}>
                  {activeRiad.gallery.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setImageIndex(index)}
                      aria-label={`Show photo ${index + 1}: ${photo.alt}`}
                      aria-pressed={imageIndex === index}
                      className={cn(
                        "overflow-hidden rounded-lg ring-offset-2 ring-offset-cream transition-all focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none",
                        imageIndex === index ? "ring-2 ring-terracotta" : "opacity-65 hover:opacity-100",
                      )}
                    >
                      <RiadPhoto
                        src={photo.src}
                        alt=""
                        name={activeRiad.name}
                        className="aspect-square w-full bg-parchment"
                        imageClassName="transition-transform duration-500 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                  <a
                    href={whatsappLink(`Hello, I am interested in planning an event at ${activeRiad.name}. Could you share more information?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f6a4a] px-5 py-3.5 text-[0.73rem] font-bold tracking-[0.13em] text-cream uppercase transition-colors hover:bg-[#175238]"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={requestRiad}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3.5 text-[0.73rem] font-bold tracking-[0.13em] text-cream uppercase transition-colors hover:bg-terracotta-deep"
                  >
                    <CalendarDays className="h-4 w-4" /> Request a reservation
                  </button>
                </div>
                <p className="mt-3 text-center text-[0.67rem] leading-relaxed text-ink/45">
                  Availability, private-event permissions, and capacity are confirmed individually.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}