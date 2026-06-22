import type { Metadata } from "next";
import { Hero } from "@/components/sections/contact/Hero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { InstitutionalPresence } from "@/components/sections/contact/InstitutionalPresence";
import { QuickAnswers } from "@/components/sections/contact/QuickAnswers";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact | NEETI MUN 2026",
  description:
    "Reach the NEETI MUN Secretariat for institutional inquiries, partnerships, and delegate support.",
};

export default function ContactPage() {
  return (
    <>
      <Hero />
      <section className="pb-24">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <InstitutionalPresence />
        </Container>
      </section>
      <QuickAnswers />
    </>
  );
}
