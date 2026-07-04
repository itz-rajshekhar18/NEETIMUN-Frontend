import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { faq } from "@/lib/data/faq";

export function FAQSection() {
  return (
    <section id="faq" className="relative py-20">
      <SectionBackdrop variant="gold-bl" range={12} />
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="w-full max-w-2xl">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
}
