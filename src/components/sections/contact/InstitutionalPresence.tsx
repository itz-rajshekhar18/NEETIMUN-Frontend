import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone, Timer } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      {/* Label row — small icon inline with uppercase text */}
      <div className="mb-1 flex items-center gap-1.5">
        <Icon size={11} className="text-gold-400/80" aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-wide-label text-gold-400/80">
          {label}
        </span>
      </div>
      {/* Value */}
      <p className="text-sm leading-relaxed text-cream-100/90">{value}</p>
    </div>
  );
}

export function InstitutionalPresence() {
  return (
    <div className="rounded-2xl bg-navy-900 p-6 sm:rounded-3xl sm:p-7">
      {/* Heading */}
      <h2 className="mb-5 font-display text-xl text-cream-50 sm:text-2xl">
        Institutional Presence
      </h2>

      {/* Info items — tight dividers on dark surface */}
      <div className="divide-y divide-cream-50/[0.08]">
        <InfoItem icon={MapPin} label="Headquarters"      value={contactInfo.address} />
        <InfoItem icon={Mail}   label="Direct Channel"    value={contactInfo.email} />
        <InfoItem icon={Phone}  label="Liaison Office"    value={contactInfo.phone} />
        <InfoItem icon={Timer}  label="Expected Response" value={contactInfo.responseTime} />
      </div>
    </div>
  );
}
