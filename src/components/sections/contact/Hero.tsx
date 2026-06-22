import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="bg-cream-100">
      <Container className="flex flex-col gap-6 py-24 sm:py-28">
        <span className="animate-fade-up flex items-center gap-3 text-xs font-medium uppercase tracking-wide-label text-gold-600 [animation-delay:0ms]">
          <span className="h-px w-8 bg-gold-500" />
          Institutional Liaison
        </span>
        <h1 className="animate-fade-up font-display max-w-2xl text-4xl leading-tight text-navy-900 [animation-delay:100ms] sm:text-5xl">
          Contact the Secretariat
        </h1>
        <p className="animate-fade-up max-w-2xl text-base leading-relaxed text-muted [animation-delay:200ms]">
          The NEETI MUN Secretariat maintains rigorous diplomatic protocols
          for all external communications. Whether you are an institutional
          observer, a prospective partner, or a delegate with procedural
          inquiries, our office is committed to providing authoritative
          guidance and support for global diplomacy.
        </p>
      </Container>
    </section>
  );
}
