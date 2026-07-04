import type { Metadata } from "next";
import { Hero } from "@/components/sections/contact/Hero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { InstitutionalPresence } from "@/components/sections/contact/InstitutionalPresence";
import { GlobeCard } from "@/components/sections/contact/GlobeCard";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Contact | NEETI MUN 2026",
  description:
    "Reach the NEETI MUN Secretariat for institutional inquiries, partnerships, and delegate support.",
};

export default function ContactPage() {
  return (
    <>
      <Hero />

      {/*
       * Single section — 12-column grid.
       * Left  (7 cols): Contact Form in a light card.
       * Right (5 cols): Institutional Presence (dark) + Globe card (compact), stacked.
       */}
      <section className="bg-cream-100 pb-24 pt-4 sm:pb-32 sm:pt-6">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <FadeUp className="lg:col-span-7">
              <ContactForm />
            </FadeUp>

            <div className="flex h-full flex-col gap-5 lg:col-span-5">
              <FadeUp delay={0.1}>
                <InstitutionalPresence />
              </FadeUp>
              <FadeUp delay={0.2} className="flex-1">
                <GlobeCard />
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
