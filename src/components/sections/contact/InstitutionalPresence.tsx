import { Globe, Mail, MapPin, Phone, Users } from "lucide-react";
import { IconCircle } from "@/components/ui/IconCircle";
import { contactInfo } from "@/lib/data/contact";

export function InstitutionalPresence() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-3xl bg-navy-950 p-8 text-cream-50">
        <h3 className="font-display text-xl">Institutional Presence</h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
                Headquarters
              </span>
              <span className="text-sm text-cream-200/80">
                {contactInfo.address}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 shrink-0 text-gold-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
                Direct Channel
              </span>
              <span className="text-sm text-cream-200/80">
                {contactInfo.email}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 shrink-0 text-gold-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
                Liaison Office
              </span>
              <span className="text-sm text-cream-200/80">
                {contactInfo.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-48 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cream-200 to-border">
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream-50 px-4 py-1.5 text-xs font-medium text-navy-900 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-gold-500" />
          HQ Live Operations
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-cream-50 p-6">
        <span className="text-xs font-medium uppercase tracking-wide-label text-muted">
          Global Diplomatic Network
        </span>
        <div className="flex items-center gap-3">
          <IconCircle>
            <Globe size={18} />
          </IconCircle>
          <IconCircle>
            <Users size={18} />
          </IconCircle>
          <IconCircle>
            <MapPin size={18} />
          </IconCircle>
        </div>
      </div>
    </div>
  );
}
