import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CardGrid, CardReveal } from "@/components/ui/motion";
import { committees } from "@/lib/data/committees";

export function PortfoliosPreview() {
  return (
    <section id="portfolios" className="py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Portfolios"
            title="Council Portfolios"
            subtitle="Selected committees for the 2026 iteration."
            align="left"
          />
          <Link
            href="/committees"
            className="flex items-center gap-2 text-sm font-medium text-navy-900 hover:text-gold-600"
          >
            View All Portfolios
            <ArrowRight size={16} />
          </Link>
        </div>

        <CardGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" delayChildren={0.35}>
          {committees.map((committee) => (
            <CardReveal key={committee.tag}>
              <Card className="flex h-full flex-col gap-4">
                <Badge variant="outline">{committee.tag}</Badge>
                <h3 className="font-display text-lg text-navy-900">
                  {committee.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {committee.description}
                </p>
                <Link
                  href={committee.href}
                  className="mt-auto flex items-center gap-2 text-sm font-medium text-gold-600"
                >
                  Guide
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                  />
                </Link>
              </Card>
            </CardReveal>
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}
