import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { roadmap } from "@/lib/data/roadmap";

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow="Schedule" title="Event Roadmap" />
        <Timeline items={roadmap} className="mx-auto max-w-3xl" />
      </Container>
    </section>
  );
}
