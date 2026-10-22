import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  MapPin,
  Send,
  UserRound,
  UsersRound,
} from "lucide-react";
import {
  eventTypeOptions,
  formatEventDate,
  riads,
  type EventInquiry,
} from "../data/collection";
import { Star8 } from "./Ornament";
import { WhatsAppIcon } from "./icons";
import { cn } from "../utils/cn";

interface InquiryErrors {
  name?: string;
  email?: string;
  eventType?: string;
  guestCount?: string;
}

export function InquiryForm({
  variant,
  inquiry,
  onChange,
  reference,
  onSubmitInquiry,
  onResetInquiry,
}: {
  variant: "hero" | "contact";
  inquiry: EventInquiry;
  onChange: (inquiry: EventInquiry) => void;
  reference: string | null;
  onSubmitInquiry: () => void;
  onResetInquiry: () => void;
}) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const isHero = variant === "hero";
  const prefix = isHero ? "hero-inquiry" : "contact-inquiry";
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const preferredRiad = riads.find((riad) => riad.id === inquiry.preferredRiad);

  useEffect(() => {
    setErrors({});
  }, [reference]);

  const update = (patch: Partial<EventInquiry>) => onChange({ ...inquiry, ...patch });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: InquiryErrors = {};
    if (inquiry.name.trim().length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!inquiry.eventType) next.eventType = "Choose the occasion you're planning.";
    if (!inquiry.guestCount || Number(inquiry.guestCount) < 1 || Number(inquiry.guestCount) > 1000) {
      next.guestCount = "Enter an estimated guest count between 1 and 1,000.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmitInquiry();
  };

  const reset = () => {
    setErrors({});
    onResetInquiry();
  };

  return (
    <div
      id={isHero ? "inquiry" : undefined}
      className={cn(
        "relative overflow-hidden border border-clay/30 bg-[#fffdf8]/[0.97] text-ink shadow-[0_36px_70px_-30px_rgba(25,31,24,0.55)]",
        isHero ? "rounded-[1.55rem]" : "rounded-[1.8rem]",
      )}
    >
      <div className="pattern-zellige pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.045]" />

      <AnimatePresence mode="wait">
        {reference ? (
          <motion.div
            key={`${prefix}-success`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={cn("relative", isHero ? "p-6 sm:p-7" : "p-7 sm:p-10")}
          >
            <motion.span
              initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              className={cn(
                "grid place-items-center rounded-full bg-sage-deep text-cream shadow-lg",
                isHero ? "h-12 w-12" : "h-16 w-16",
              )}
            >
              <BadgeCheck className={isHero ? "h-6 w-6" : "h-8 w-8"} />
            </motion.span>
            <p className="mt-4 font-arabic text-xl text-terracotta">شكراً</p>
            <h3 className={cn("mt-1 font-display font-light text-ink", isHero ? "text-2xl" : "text-3xl sm:text-4xl")}>
              Thank you, {inquiry.name.split(" ")[0]}.
            </h3>
            <p className="mt-3 leading-relaxed text-ink/65">
              Your celebration is taking shape. Here is a snapshot of the details you
              entered for your tailored riad and event plan.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-parchment px-4 py-2 font-display text-lg font-semibold tracking-[0.12em] text-terracotta-deep ring-1 ring-dashed ring-clay/50">
              <Star8 className="h-3.5 w-3.5" /> {reference}
            </p>

            <dl className={cn("mt-5 grid gap-x-4 gap-y-3 rounded-2xl bg-parchment/70 p-4 text-sm", isHero ? "grid-cols-2" : "sm:grid-cols-2 sm:p-6")}>
              {[
                ["Occasion", inquiry.eventType || "To be discussed"],
                ["Date", formatEventDate(inquiry.eventDate)],
                ["Guests", inquiry.guestCount || "To be confirmed"],
                ["Preferred riad", preferredRiad?.name ?? "Open to suggestions"],
                ["Message", inquiry.message.trim() ? "Received" : "Not added"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.62rem] font-bold tracking-[0.18em] text-sage-deep uppercase">{label}</dt>
                  <dd className="mt-1 font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-full border border-ink/70 px-5 py-2.5 text-[0.72rem] font-bold tracking-[0.14em] text-ink uppercase transition-all hover:bg-ink hover:text-cream"
            >
              Start another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key={`${prefix}-form`}
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className={cn("relative", isHero ? "p-5 sm:p-6" : "p-7 sm:p-9")}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.22em] text-terracotta-deep uppercase">
                  {isHero ? "Start planning" : "Start planning your event"}
                </p>
                <h2 className={cn("mt-1 font-display font-medium text-ink", isHero ? "text-2xl sm:text-[1.7rem]" : "text-2xl")}>
                  {isHero ? "Tell us your vision" : "Share your details"}
                </h2>
                <p className="mt-1 text-[0.84rem] text-ink/60">We'll help bring it to life.</p>
              </div>
              <Star8 className="h-5 w-5 shrink-0 text-terracotta/70" />
            </div>

            <div className={cn("mt-5 grid sm:grid-cols-2", isHero ? "gap-3" : "gap-5")}>
              <div>
                <label htmlFor={`${prefix}-name`} className="field-label flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5 text-terracotta" /> Full name *
                </label>
                <input
                  id={`${prefix}-name`}
                  className={cn("field", errors.name && "field-error")}
                  placeholder="Your name"
                  value={inquiry.name}
                  onChange={(event) => update({ name: event.target.value })}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
                />
                {errors.name && <p id={`${prefix}-name-error`} className="mt-1 text-xs font-semibold text-[#b23a30]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-email`} className="field-label flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-terracotta" /> Email address *
                </label>
                <input
                  id={`${prefix}-email`}
                  type="email"
                  className={cn("field", errors.email && "field-error")}
                  placeholder="you@example.com"
                  value={inquiry.email}
                  onChange={(event) => update({ email: event.target.value })}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
                />
                {errors.email && <p id={`${prefix}-email-error`} className="mt-1 text-xs font-semibold text-[#b23a30]">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-phone`} className="field-label flex items-center gap-1.5">
                  <WhatsAppIcon className="h-3.5 w-3.5 text-terracotta" /> Phone / WhatsApp
                </label>
                <input
                  id={`${prefix}-phone`}
                  type="tel"
                  className="field"
                  placeholder="+1 555 000 0000"
                  value={inquiry.phone}
                  onChange={(event) => update({ phone: event.target.value })}
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-type`} className="field-label">Event type *</label>
                <select
                  id={`${prefix}-type`}
                  className={cn("field", errors.eventType && "field-error")}
                  value={inquiry.eventType}
                  onChange={(event) => update({ eventType: event.target.value })}
                  aria-invalid={Boolean(errors.eventType)}
                >
                  <option value="">Choose your occasion</option>
                  {eventTypeOptions.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.eventType && <p className="mt-1 text-xs font-semibold text-[#b23a30]">{errors.eventType}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-date`} className="field-label flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-terracotta" /> Event date
                </label>
                <input
                  id={`${prefix}-date`}
                  type="date"
                  min={minDate}
                  className="field"
                  value={inquiry.eventDate}
                  onChange={(event) => update({ eventDate: event.target.value })}
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-guests`} className="field-label flex items-center gap-1.5">
                  <UsersRound className="h-3.5 w-3.5 text-terracotta" /> Number of guests *
                </label>
                <input
                  id={`${prefix}-guests`}
                  type="number"
                  min="1"
                  max="1000"
                  inputMode="numeric"
                  className={cn("field", errors.guestCount && "field-error")}
                  placeholder="e.g. 24"
                  value={inquiry.guestCount}
                  onChange={(event) => update({ guestCount: event.target.value })}
                  aria-invalid={Boolean(errors.guestCount)}
                />
                {errors.guestCount && <p className="mt-1 text-xs font-semibold text-[#b23a30]">{errors.guestCount}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${prefix}-riad`} className="field-label flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-terracotta" /> Preferred riad
                </label>
                <select
                  id={`${prefix}-riad`}
                  className="field"
                  value={inquiry.preferredRiad}
                  onChange={(event) => update({ preferredRiad: event.target.value })}
                >
                  <option value="">Open to your recommendations</option>
                  {riads.map((riad) => <option key={riad.id} value={riad.id}>{riad.name}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${prefix}-message`} className="field-label">
                  Tell us about your dream celebration...
                </label>
                <textarea
                  id={`${prefix}-message`}
                  className="field min-h-[5.5rem] resize-y"
                  placeholder="A few details about the atmosphere, plans, and anything that matters to you..."
                  value={inquiry.message}
                  onChange={(event) => update({ message: event.target.value })}
                />
              </div>

            </div>

            <button
              type="submit"
              className={cn(
                "group flex w-full items-center justify-center gap-2.5 bg-terracotta font-bold tracking-[0.13em] text-cream uppercase transition-all duration-300 hover:bg-terracotta-deep hover:shadow-[0_18px_34px_-12px_rgba(158,79,45,0.8)]",
                isHero ? "mt-5 rounded-xl px-6 py-3.5 text-[0.78rem]" : "mt-7 rounded-2xl px-8 py-4 text-sm",
              )}
            >
              Send inquiry
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
            <p className="mt-3 text-center text-[0.68rem] leading-relaxed text-ink/45">
              No commitment — availability, permissions, and pricing are confirmed individually.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}