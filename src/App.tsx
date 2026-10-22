import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Buyouts } from "./components/Buyouts";
import { Contact } from "./components/Contact";
import { EventOccasions } from "./components/EventOccasions";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { Planning } from "./components/Planning";
import { RiadCollection } from "./components/RiadCollection";
import { UniqueExperiences } from "./components/UniqueExperiences";
import { WhatsAppIcon } from "./components/icons";
import { defaultEventInquiry, type EventInquiry, whatsappLink } from "./data/collection";
import { cn } from "./utils/cn";

export default function App() {
  const [inquiry, setInquiry] = useState<EventInquiry>(defaultEventInquiry);
  const [inquiryReference, setInquiryReference] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chooseRiad = (preferredRiad: string) => {
    setInquiry((current) => ({ ...current, preferredRiad }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitInquiry = () => {
    setInquiryReference(`RM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  };

  const resetInquiry = () => {
    setInquiryReference(null);
    setInquiry(defaultEventInquiry());
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Navbar />
      <main>
        <Hero
          inquiry={inquiry}
          onInquiryChange={setInquiry}
          reference={inquiryReference}
          onSubmitInquiry={submitInquiry}
          onResetInquiry={resetInquiry}
        />
        <Marquee />
        <Buyouts />
        <RiadCollection onChoose={chooseRiad} />
        <EventOccasions />
        <UniqueExperiences />
        <Planning />
        <Faq />
        <Contact
          inquiry={inquiry}
          onInquiryChange={setInquiry}
          reference={inquiryReference}
          onSubmitInquiry={submitInquiry}
          onResetInquiry={resetInquiry}
        />
      </main>
      <Footer />

      <a
        href={whatsappLink("Hello, I would like help planning a private event in Marrakech.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Start a WhatsApp inquiry"
        className="fixed right-5 bottom-24 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#1f6a4a] px-4.5 py-3.5 text-[0.72rem] font-bold tracking-[0.12em] text-cream uppercase shadow-[0_16px_32px_-12px_rgba(31,106,74,0.7)] transition-all hover:-translate-y-1 hover:bg-[#175238] sm:right-7 sm:px-5"
      >
        <WhatsAppIcon className="h-5 w-5" />
        WhatsApp
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={cn(
              "fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full",
              "bg-ink text-cream shadow-[0_16px_32px_-12px_rgba(44,38,32,0.6)] transition-colors hover:bg-terracotta-deep sm:right-7 sm:bottom-7",
            )}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}