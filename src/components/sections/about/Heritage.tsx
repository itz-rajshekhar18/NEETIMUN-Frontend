import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import { heritageStats } from "@/lib/data/heritage";

export function Heritage() {
  return (
    <section className="bg-cream-200/60 py-24">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Our Heritage"
            title="A Tradition of Diplomacy"
            subtitle="For decades, we have fostered an environment where academic rigor meets empathetic negotiation. Our conference stands as a beacon for those who wish to navigate the complexities of international relations."
            align="left"
          />
          <div className="grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-6">
            {heritageStats.map((stat) => (
              <StatBlock
                key={stat.label}
                value={stat.value}
                label={stat.label}
                tone="light"
                size="sm"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-80 rounded-2xl border border-gold-400/20 bg-gradient-to-br from-navy-800 to-navy-950 sm:h-96" />
          <div className="mx-6 -mt-10 rounded-xl bg-cream-50 p-6 shadow-xl shadow-navy-900/10 sm:mx-0 sm:-mt-12 sm:ml-10 sm:max-w-xs">
            <p className="font-display text-lg text-navy-900 italic">
              &ldquo;History is a guide for those who seek to lead.&rdquo;
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
