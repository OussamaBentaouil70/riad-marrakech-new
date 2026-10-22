import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { eventOccasions } from "../data/collection";
import { Eyebrow } from "./Ornament";
import { PhotoLightbox, ZoomableImage, type ZoomPhoto } from "./PhotoLightbox";
import { Reveal } from "./Reveal";

export function EventOccasions() {
  const [zoomedPhoto, setZoomedPhoto] = useState<ZoomPhoto | null>(null);
  const closePhoto = useCallback(() => setZoomedPhoto(null), []);

  return (
    <section id="events" className="texture-linen relative scroll-mt-24 overflow-hidden bg-parchment">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow align="left" tone="sage">03 · Private events &amp; celebrations</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] font-light text-ink sm:text-5xl">
                Every occasion deserves an{" "}
                <em className="font-normal text-terracotta-deep italic">extraordinary setting</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <p className="max-w-md leading-[1.85] text-ink/65">
              From a romantic celebration for two to a gathering with friends and
              family, we shape the riad experience around your occasion, style, and expectations.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
          {eventOccasions.map((occasion, index) => (
            <Reveal key={occasion.title} delay={(index % 3) * 0.07}>
              <article className="group">
                <figure className="overflow-hidden bg-sand">
                  <ZoomableImage
                    photo={{ src: occasion.image, alt: occasion.imageAlt, title: occasion.title }}
                    onOpen={setZoomedPhoto}
                    className="aspect-square"
                    imageClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                </figure>
                <p className="mt-5 text-[0.65rem] font-bold tracking-[0.2em] text-terracotta-deep uppercase">
                  Celebration · {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[1.4rem] leading-snug font-medium text-ink transition-colors group-hover:text-terracotta-deep">
                  {occasion.title}
                </h3>
                <p className="mt-2 max-w-sm text-[0.91rem] leading-[1.8] text-ink/65">{occasion.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-clay/30 pt-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-medium text-ink">Have something different in mind?</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink/60">
                Tell us your idea. We will help design a bespoke experience that
                reflects your personality, occasion, and budget.
              </p>
            </div>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.73rem] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-terracotta-deep">
              Tell us your idea
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
      <PhotoLightbox photo={zoomedPhoto} onClose={closePhoto} />
    </section>
  );
}