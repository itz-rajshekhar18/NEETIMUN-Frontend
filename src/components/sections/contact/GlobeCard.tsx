export function GlobeCard() {
  return (
    <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-border bg-cream-50 sm:rounded-3xl">
      {/* Google Maps embed — fills the card exactly */}
      <iframe
        src="https://maps.google.com/maps?q=12.9689139,77.7227639&output=embed&z=16"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="NEETI MUN Headquarters Location"
      />

      {/* HQ Live Operations badge — sits above the map */}
      <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1.5 text-[10px] font-medium tracking-wide text-navy-900/55 ring-1 ring-navy-900/[0.08]">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-500" />
        HQ Live Operations
      </span>
    </div>
  );
}
