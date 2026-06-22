import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-cream-200/60 py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Feedback"
          title="Why Delegates Love NEETI MUN"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-navy-900/80 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <Avatar
                  name={testimonial.name}
                  size="sm"
                  className="transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-navy-900">
                    {testimonial.name}
                  </span>
                  <span className="text-xs uppercase tracking-wide-label text-muted">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
