import { type EventInquiry } from "../data/collection";
import { contactImage } from "../data/images";
import { Eyebrow, Star8Outline } from "./Ornament";
import { Reveal } from "./Reveal";
import { InquiryForm } from "./InquiryForm";

export function Contact({
  inquiry,
  onInquiryChange,
  reference,
  onSubmitInquiry,
  onResetInquiry,
}: {
  inquiry: EventInquiry;
  onInquiryChange: (inquiry: EventInquiry) => void;
  reference: string | null;
  onSubmitInquiry: () => void;
  onResetInquiry: () => void;
}) {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-moss text-cream">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={contactImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 58%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(49,68,58,0.95)_0%,rgba(49,68,58,0.9)_45%,rgba(49,68,58,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,68,58,0.55)_0%,rgba(49,68,58,0.25)_35%,rgba(49,68,58,0.6)_100%)]" />
      </div>
      <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.055]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_8%_0%,rgba(220,164,142,0.17),transparent_72%)]" />
      <Star8Outline className="pointer-events-none absolute -right-24 -bottom-28 h-96 w-96 text-cream/[0.045]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow align="left" tone="cream">07 · Begin your celebration</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light sm:text-5xl lg:text-[3.7rem]">
              Your Marrakech experience starts here.
              <br />
              <em className="font-normal text-dusk italic">One private riad. Endless unforgettable moments.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg leading-[1.9] text-cream/72">
              Whether you are dreaming of an intimate wedding, an exclusive birthday
              celebration, a romantic escape, or a bespoke private event, we are here
              to help bring your vision to life.
            </p>
            <p className="mt-4 max-w-lg leading-[1.9] text-cream/65">
              Tell us your occasion, preferred dates, and guest count. We will
              help you discover the right riad and shape a personal experience.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-7 border-l border-dusk/60 pl-4 text-[0.68rem] leading-relaxed font-bold tracking-[0.18em] text-dusk-soft uppercase">
              Private riad buyouts · Bespoke event planning · Marrakech experiences
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="w-full max-w-[680px] lg:ml-auto">
          <InquiryForm
            variant="contact"
            inquiry={inquiry}
            onChange={onInquiryChange}
            reference={reference}
            onSubmitInquiry={onSubmitInquiry}
            onResetInquiry={onResetInquiry}
          />
        </Reveal>
      </div>
    </section>
  );
}