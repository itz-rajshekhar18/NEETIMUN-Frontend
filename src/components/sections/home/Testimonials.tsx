import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { CardGrid, CardReveal, StaggerContainer, FadeUp } from "@/components/ui/motion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const centerIndex = Math.floor(testimonials.length / 2);

  return (
    <section id="testimonials" className="relative bg-cream-200/60 py-20">
      <SectionBackdrop variant="gold-tr" range={14} />
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Feedback"
          title="Why Delegates Love NEETI MUN"
        />
        <CardGrid className="grid grid-cols-1 gap-6 md:grid-cols-3" delayChildren={0.35}>
          {testimonials.map((testimonial, index) => {
            const isCenter = index === centerIndex;
            return (
              <CardReveal key={testimonial.name}>
                {/* Focus mode: center card is full, side cards subtly recede (md+ only) */}
                <div
                  className={cn(
                    "h-full transition-all duration-500 ease-out",
                    !isCenter &&
                      "md:opacity-[0.82] md:scale-[0.97] md:hover:opacity-100 md:hover:scale-100",
                  )}
                >
                  <Card className="flex h-full flex-col">
                    <StaggerContainer
                      className="flex h-full flex-col gap-4"
                      stagger={0.15}
                      delayChildren={0.3}
                    >
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
                </div>
              </CardReveal>
            );
          })}
        </CardGrid>
      </Container>
    </section>
  );
}
