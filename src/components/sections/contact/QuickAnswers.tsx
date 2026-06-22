import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconCircle } from "@/components/ui/IconCircle";
import { quickAnswers } from "@/lib/data/contact";

export function QuickAnswers() {
  return (
    <section className="bg-cream-200/60 py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            title="Quick Answers"
            subtitle="Find immediate solutions to common diplomatic inquiries through our official resource repository."
            align="left"
          />
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm font-medium text-navy-900 hover:text-gold-600"
          >
            View All FAQ Resources
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {quickAnswers.map((item) => (
            <Card key={item.title} className="flex flex-col gap-4">
              <IconCircle>
                <item.icon size={20} />
              </IconCircle>
              <h3 className="font-display text-lg text-navy-900">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-auto flex items-center gap-2 text-sm font-medium text-gold-600"
              >
                {item.linkLabel}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
