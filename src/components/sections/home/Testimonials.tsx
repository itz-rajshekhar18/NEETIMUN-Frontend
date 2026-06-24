import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { CardGrid, CardReveal, StaggerContainer, FadeUp } from "@/components/ui/motion";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream-200/60 py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Feedback"
          title="Why Delegates Love NEETI MUN"
        />
        <CardGrid className="grid grid-cols-1 gap-6 md:grid-cols-3" delayChildren={0.35}>
          {testimonials.map((testimonial) => (
            <CardReveal key={testimonial.name}>
              <Card className="flex h-full flex-col">
                <StaggerContainer className="flex h-full flex-col gap-4" stagger={0.15} delayChildren={0.3}>
                  <FadeUp viewportTrigger={false}>
                    <p className="text-sm leading-relaxed text-navy-900/80 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </FadeUp>
                  <FadeUp viewportTrigger={false} className="mt-auto">
                    <div className="flex items-center gap-3 border-t border-border pt-4">
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
                  </FadeUp>
                </StaggerContainer>
              </Card>
            </CardReveal>
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}
