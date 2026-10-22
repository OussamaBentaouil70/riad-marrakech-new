import { ArrowRight } from "lucide-react";
import { planningSteps } from "../data/collection";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

export function Planning() {
  return (
    <section id="approach" className="texture-linen relative scroll-mt-24 overflow-hidden bg-cream">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>05 · Bespoke event planning</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] font-light text-ink sm:text-5xl">
              From your first idea to{" "}
              <em className="font-normal text-terracotta-deep italic">the final detail</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 leading-[1.85] text-ink/65">
              Planning an event in Marrakech should feel as exciting as the occasion
              itself. We help coordinate the details, so you can enjoy the anticipation.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-x-9 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-5 right-[9%] left-[9%] hidden h-px bg-clay/35 lg:block" />
          {planningSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <article className="relative h-full border-t border-clay/40 pt-5 lg:border-t-0 lg:pt-0">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-clay/50 bg-cream font-display text-sm text-terracotta-deep lg:mb-7">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-snug font-medium text-ink lg:mt-0">{step.title}</h3>
                <p className="mt-3 leading-[1.8] text-ink/65">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 text-center">
            <a href="#contact" className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.76rem] font-bold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-terracotta-deep">
              Begin with an idea
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}