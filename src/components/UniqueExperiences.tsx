import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { marrakechExperiences } from "../data/collection";
import { Eyebrow, Star8Outline } from "./Ornament";
import { PhotoLightbox, ZoomableImage, type ZoomPhoto } from "./PhotoLightbox";
import { Reveal } from "./Reveal";

export function UniqueExperiences() {
  const [zoomedPhoto, setZoomedPhoto] = useState<ZoomPhoto | null>(null);
  const closePhoto = useCallback(() => setZoomedPhoto(null), []);

  return (
    <section id="experiences" className="relative scroll-mt-24 overflow-hidden bg-indigo-deep text-cream">
      <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.055]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_90%_5%,rgba(220,164,142,0.16),transparent_72%)]" />
      <Star8Outline className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 text-cream/[0.055]" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow align="left" tone="cream">04 · Unique experiences in Marrakech</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[1.1] font-light sm:text-5xl lg:text-[3.65rem]">
                Beyond the riad. Discover{" "}
                <em className="font-normal text-dusk italic">the magic of Morocco.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4">
            <p className="leading-[1.85] text-cream/70">
              Your private riad is just the beginning. Enrich your stay with
              handpicked experiences that bring together culture, adventure, and
              thoughtful hospitality.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
          {marrakechExperiences.map((experience, index) => (
            <Reveal key={experience.title} delay={(index % 3) * 0.07}>
              <article className="group">
                <figure className="overflow-hidden bg-cream/10">
                  <ZoomableImage
                    photo={{ src: experience.image, alt: experience.imageAlt, title: experience.title }}
                    onOpen={setZoomedPhoto}
                    className="aspect-square"
                    imageClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                </figure>
                <p className="mt-5 text-[0.65rem] font-bold tracking-[0.2em] text-dusk uppercase">
                  Marrakech · {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[1.35rem] leading-snug font-medium text-cream transition-colors group-hover:text-dusk-soft">
                  {experience.title}
                </h3>
                <p className="mt-2 max-w-sm text-[0.91rem] leading-[1.8] text-cream/65">{experience.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-5 border-t border-cream/20 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">Create your own Marrakech experience</h3>
              <p className="mt-2 leading-[1.8] text-cream/65">
                Combine your favourite activities into a personal itinerary — from a
                restorative morning to a day of adventure followed by a private riad dinner.
              </p>
            </div>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-[0.73rem] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-terracotta-deep">
              Build your itinerary
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
      <PhotoLightbox photo={zoomedPhoto} onClose={closePhoto} />
    </section>
  );
}