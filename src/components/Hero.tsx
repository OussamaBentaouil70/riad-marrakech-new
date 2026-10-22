import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { type EventInquiry } from "../data/collection";
import { heroImage } from "../data/images";
import { InquiryForm } from "./InquiryForm";
import { Star8 } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "8%"]);

  return (
    <section ref={ref} id="top" className="relative isolate min-h-svh overflow-hidden bg-moss text-cream">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <img
          src={heroImage}
          alt="A sunlit riad courtyard with a pool, carved arches, and traditional Moroccan tilework"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 52%" }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,42,34,0.88)_0%,rgba(29,42,34,0.78)_35%,rgba(29,42,34,0.58)_68%,rgba(29,42,34,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,42,34,0.42)_0%,transparent_24%,transparent_72%,rgba(29,42,34,0.34)_100%)]" />
      <div className="dappled animate-drift pointer-events-none absolute inset-0 opacity-55" />
      <div className="pattern-zellige-light pointer-events-none absolute inset-0 opacity-[0.055]" />

      <div className="relative z-10 mx-auto grid min-h-svh max-w-7xl content-center items-center gap-10 px-5 pt-28 pb-12 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 lg:pt-32 lg:pb-14 xl:gap-16">
        <div className="max-w-xl py-2 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="font-display text-2xl tracking-wide text-dusk-soft sm:text-3xl">
              Riad Marrakech
            </p>
            <p className="mt-3 flex items-center gap-3 text-[0.67rem] font-bold tracking-[0.24em] text-cream/75 uppercase">
              <Star8 className="h-3.5 w-3.5 shrink-0 text-terracotta" />
              A curated collection of private riads
            </p>

            <h1 className="mt-7 font-display text-[2.75rem] leading-[1.05] font-light text-cream sm:text-5xl lg:text-[3.8rem] xl:text-[4.15rem]">
              Your private riad in Marrakech.
              <br />
              <em className="font-normal text-dusk italic">Your celebration, your way.</em>
            </h1>

            <p className="mt-6 max-w-lg text-[0.96rem] leading-[1.85] text-cream/80 sm:text-base">
              From intimate weddings and milestone celebrations to romantic proposals,
              wellness retreats, and exclusive gatherings, we create unforgettable
              experiences in some of the city's most charming boutique properties.
            </p>
            <p className="mt-4 max-w-lg text-[0.94rem] leading-[1.85] text-cream/70">
              Enjoy the freedom of a private riad buyout, with beautiful accommodation,
              atmospheric courtyards, rooftop terraces, and thoughtful personal service.
            </p>

            <p className="mt-4 text-[0.67rem] font-bold tracking-[0.16em] text-cream/75 uppercase">
              Exclusive riad buyouts · Private events · Bespoke experiences
            </p>

            <p className="mt-6 font-display text-xl text-dusk-soft italic sm:text-2xl">
              One exclusive setting. Endless possibilities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#inquiry"
                className="group flex items-center gap-2.5 rounded-full bg-terracotta px-6 py-3.5 text-[0.76rem] font-bold tracking-[0.14em] text-cream uppercase transition-all hover:bg-terracotta-deep hover:shadow-[0_14px_28px_-10px_rgba(158,79,45,0.75)]"
              >
                Request a tailored quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#riads"
                className="group flex items-center gap-2 rounded-full border border-cream/35 px-5 py-3 text-[0.76rem] font-bold tracking-[0.14em] text-cream/90 uppercase transition-colors hover:border-dusk-soft hover:text-dusk-soft"
              >
                Explore the riads
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.16, ease }}
          className="w-full max-w-[660px] lg:ml-auto"
        >
          <InquiryForm
            variant="hero"
            inquiry={inquiry}
            onChange={onInquiryChange}
            reference={reference}
            onSubmitInquiry={onSubmitInquiry}
            onResetInquiry={onResetInquiry}
          />
        </motion.div>
      </div>
    </section>
  );
}