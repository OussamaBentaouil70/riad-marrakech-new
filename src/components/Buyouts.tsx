import { ArrowRight } from "lucide-react";
import { buyoutBenefits } from "../data/collection";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

export function Buyouts() {
  return (
    <section id="buyouts" className="texture-linen relative scroll-mt-24 overflow-hidden bg-parchment">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow align="left" tone="sage">01 · Exclusive riad buyouts</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] font-light text-ink sm:text-5xl lg:text-[3.6rem]">
                A riad entirely <em className="font-normal text-terracotta-deep italic">yours</em>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-2xl leading-[1.9] text-ink/70">
                Why share your special occasion when you can have an entire riad to
                yourself? A private buyout turns a beautiful Moroccan property into
                your own retreat, with room to gather and make the details your own.
              </p>
              <p className="mt-4 max-w-2xl leading-[1.9] text-ink/65">
                Whether you are planning a one-night celebration or a multi-day stay,
                we help match the property to your occasion and shape the experience
                around your preferences.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:col-span-5">
            <figure className="arch relative mx-auto max-w-[430px] overflow-hidden shadow-[0_34px_64px_-28px_rgba(44,38,32,0.4)] ring-1 ring-clay/25 lg:ml-auto">
              <img
                src="https://images.pexels.com/photos/38891222/pexels-photo-38891222.jpeg?auto=compress&cs=tinysrgb&w=1100"
                alt="Sunlit Marrakech riad courtyard with draped fabric and traditional tilework"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="dappled pointer-events-none absolute inset-0" />
            </figure>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {buyoutBenefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <article className="group h-full border-t border-clay/45 pt-6 pb-6">
                <figure className="mb-5 overflow-hidden bg-sand ring-1 ring-clay/20">
                  <img
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                </figure>
                <p className="font-display text-sm text-terracotta-deep">0{index + 1}</p>
                <h3 className="mt-3 font-display text-[1.45rem] font-medium text-ink">{benefit.title}</h3>
                <p className="mt-2.5 max-w-xs text-[0.94rem] leading-[1.8] text-ink/65">{benefit.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-5 flex flex-col justify-between gap-5 border-t border-clay/30 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-3xl text-sm leading-relaxed text-ink/55">
              Exclusive use, event permissions, included spaces, guest capacity, and
              minimum stays are confirmed individually for each property.
            </p>
            <a href="#riads" className="group inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] text-terracotta-deep uppercase">
              Find your setting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}