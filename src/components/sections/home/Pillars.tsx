import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CardGrid, CardReveal } from "@/components/ui/motion";
import { pillars } from "@/lib/data/pillars";

export function Pillars() {
  return (
    <section id="pillars" className="bg-cream-200/60 py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Excellence"
          title="The Pillars of Neeti"
          align="left"
        />
        <CardGrid className="grid grid-cols-1 gap-6 md:grid-cols-3" delayChildren={0.35}>
          {pillars.map((pillar) => (
            <CardReveal key={pillar.title}>
              <FeatureCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                featured={pillar.featured}
                className="h-full"
              />
            </CardReveal>
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}
