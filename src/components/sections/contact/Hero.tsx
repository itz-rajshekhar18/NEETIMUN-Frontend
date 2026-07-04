import { Container } from "@/components/ui/Container";
import { QuickActions } from "./QuickActions";

export function Hero() {
  return (
    <section className="bg-cream-100">
      <Container className="pt-10 pb-6 sm:pt-14 sm:pb-8">
        {/* Eyebrow */}
        <span className="animate-fade-up flex items-center gap-3 text-xs font-medium uppercase tracking-wide-label text-gold-600 [animation-delay:0ms]">
          <span className="h-px w-8 bg-gold-500" />
          Institutional Liaison
        </span>

        {/* Heading — more vertical air above it than below */}
        <h1 className="animate-fade-up mt-5 font-display text-4xl leading-[1.1] text-navy-900 [animation-delay:80ms] sm:text-5xl">
          Contact the Secretariat
        </h1>

        {/* Description — narrowed for optimal line length */}
        <p className="animate-fade-up mt-4 max-w-md text-base leading-relaxed text-muted [animation-delay:160ms]">
          The NEETI MUN Secretariat maintains rigorous diplomatic protocols for
          all external communications. Our office provides authoritative
          guidance and support for global diplomacy.
        </p>

        {/* Divider — visual pause before the action chips */}
        <div className="animate-fade-up mt-7 h-px max-w-md bg-border [animation-delay:240ms]" />

        {/* Quick-contact chips */}
        <QuickActions className="animate-fade-up mt-5 [animation-delay:320ms]" />
      </Container>
    </section>
  );
}
