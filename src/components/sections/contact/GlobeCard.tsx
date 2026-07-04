export function GlobeCard() {
  return (
    <div className="relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-border bg-cream-50 sm:rounded-3xl">
      {/* Premium header — sits above the embedded map */}
      <div className="px-5 pb-5 pt-5">
        <span className="text-[10px] font-semibold uppercase tracking-wide-label text-gold-600">
          Campus Location
        </span>
        <h3 className="mt-1.5 font-display text-lg leading-tight text-navy-900">
          Polaris School of Technology
        </h3>
        <p className="mt-1 text-xs text-muted">Whitefield, Bengaluru</p>
      </div>

      {/* Map — fills remaining card height */}
      <div className="relative flex-1">
        <iframe
          src="https://maps.google.com/maps?q=12.9689139,77.7227639&output=embed&z=16"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Polaris School of Technology Location"
        />

        {/* HQ Live Operations badge — floats above the map */}
        <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1.5 text-[10px] font-medium tracking-wide text-navy-900/55 ring-1 ring-navy-900/[0.08]">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-500" />
          HQ Live Operations
        </span>
      </div>
    </div>
  );
}
