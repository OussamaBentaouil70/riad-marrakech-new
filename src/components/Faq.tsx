import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircleHeart, Plus } from "lucide-react";
import { faqs } from "../data/collection";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="texture-linen relative scroll-mt-24 overflow-hidden bg-parchment">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow align="left" tone="sage">06 · Before you plan</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-4xl leading-[1.12] font-light text-ink sm:text-[2.8rem]">
                  The details,{" "}
                  <em className="font-normal text-terracotta-deep italic">made clearer</em>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 leading-[1.85] text-ink/65">
                  A few helpful answers about private riad buyouts, celebrations,
                  overnight stays, and experiences around Marrakech.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9 rounded-[1.5rem] bg-sage-deep p-6 text-cream shadow-[0_24px_44px_-20px_rgba(49,68,58,0.6)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cream/12 text-dusk-soft">
                    <MessageCircleHeart className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium">Have a specific question?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/70">
                    Share your dates, guest count, and the kind of setting you have in mind.
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-4.5 py-2.5 text-[0.76rem] font-bold tracking-wide text-moss uppercase transition-colors hover:bg-dusk-soft"
                  >
                    Ask our team
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <Reveal key={faq.q} delay={index * 0.05}>
                  <div
                    className={cn(
                      "border-b border-dashed border-clay/40 transition-colors",
                      index === 0 && "border-t",
                      isOpen && "border-solid border-terracotta/40",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span className={cn("hidden font-display text-sm transition-colors sm:block", isOpen ? "text-terracotta-deep" : "text-clay")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("flex-1 font-display text-[1.3rem] leading-snug font-normal transition-colors sm:text-2xl", isOpen ? "text-terracotta-deep" : "text-ink group-hover:text-terracotta-deep")}>
                        {faq.q}
                      </span>
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-45 border-terracotta bg-terracotta text-cream" : "border-clay/50 text-ink/60 group-hover:border-terracotta group-hover:text-terracotta-deep")}>
                        <Plus className="h-4.5 w-4.5" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-0 leading-[1.9] text-ink/68 sm:pl-10">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}