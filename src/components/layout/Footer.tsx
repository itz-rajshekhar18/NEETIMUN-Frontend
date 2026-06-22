import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/data/nav-links";
import { contactInfo } from "@/lib/data/contact";

const resourceLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-200">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="NEETI MUN" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-base tracking-wide text-cream-50">
              NEETI MUN
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-cream-200/70">
            Empowering the next generation of global leaders through rigorous
            institutional simulation and diplomatic excellence.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
            Explore
          </h3>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream-200/80 transition-colors hover:text-cream-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
            Resources
          </h3>
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream-200/80 transition-colors hover:text-cream-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
            Secretariat
          </h3>
          <div className="flex items-start gap-2 text-sm text-cream-200/80">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>{contactInfo.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-cream-200/80">
            <Mail size={16} className="shrink-0" />
            <span>{contactInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-cream-200/80">
            <Phone size={16} className="shrink-0" />
            <span>{contactInfo.phone}</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-cream-50/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} NEETI MUN. All rights reserved.</p>
          <p>Policy · Power · Perspective</p>
        </Container>
      </div>
    </footer>
  );
}
