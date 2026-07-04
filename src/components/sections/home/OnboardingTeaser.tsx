import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedStepper } from "@/components/ui/AnimatedStepper";
import { StaggerContainer, FadeUp } from "@/components/ui/motion";

const steps = ["Portfolio", "Information", "Payment"];

export function OnboardingTeaser() {
  return (
    <section id="registration-teaser" className="py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading eyebrow="Onboarding" title="Secure Your Seat" />
        <StaggerContainer className="flex w-full flex-col items-center gap-10" stagger={0.12} delayChildren={0.05}>
          <FadeUp viewportTrigger={false}>
            <Badge variant="default">Average completion time: Under 2 minutes</Badge>
          </FadeUp>

          {/* AnimatedStepper handles its own entrance sequence — no FadeUp wrapper */}
          <AnimatedStepper steps={steps} activeStep={0} className="mx-auto w-full max-w-lg" />

          <FadeUp viewportTrigger={false} className="w-full max-w-xl">
            <Card>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide-label text-muted">
                      Primary Committee Preference
                    </span>
                    <div className="rounded-lg border border-border bg-cream-100 px-4 py-3 text-sm text-navy-900/60">
                      Select Committee
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide-label text-muted">
                      Country Preference
                    </span>
                    <div className="rounded-lg border border-border bg-cream-100 px-4 py-3 text-sm text-navy-900/60">
                      e.g. France, Japan
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  Delegate allotment policy: allocations are based on prior MUN
                  experience and the quality of your application profile. Results
                  within 48 hours.
                </p>
                <Button href="/registration" className="self-start">
                  Continue to Personal Details
                </Button>
              </div>
            </Card>
          </FadeUp>
        </StaggerContainer>
      </Container>
    </section>
  );
}
