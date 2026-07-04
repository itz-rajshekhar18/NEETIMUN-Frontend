import type { LucideIcon } from "lucide-react";
import { Clock, Inbox, MessageSquare, ShieldCheck } from "lucide-react";

const steps: { id: string; icon: LucideIcon; title: string; body: string }[] =
  [
    {
      id: "01",
      icon: Inbox,
      title: "Inquiry Received",
      body: "Your submission is registered and acknowledged immediately upon receipt.",
    },
    {
      id: "02",
      icon: Clock,
      title: "Secretariat Review",
      body: "A designated officer evaluates your inquiry against diplomatic protocol within 24 hours.",
    },
    {
      id: "03",
      icon: MessageSquare,
      title: "Formal Response",
      body: "A personalised response is issued to your registered email address within 48 hours.",
    },
  ];

export function ProcessPanel() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-cream-50 p-7 shadow-sm shadow-navy-900/[0.04] sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide-label text-gold-600">
          Inquiry Process
        </span>
        <h3 className="font-display text-xl text-navy-900">What to Expect</h3>
        <p className="text-sm leading-relaxed text-muted">
          Every submission follows a structured diplomatic review cycle.
        </p>
      </div>

      <div className="mt-6 h-px w-full bg-border" />

      {/* Timeline steps */}
      <div className="mt-6 flex flex-col">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.id} className="flex gap-4">
              {/* Left rail: icon + vertical connector */}
              <div className="flex flex-col items-center">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.06] text-navy-900">
                  <step.icon size={15} />
                </span>
                {!isLast && (
                  <span className="my-1.5 w-px flex-1 bg-border" />
                )}
              </div>

              {/* Right content */}
              <div className={isLast ? "pb-0" : "pb-5"}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-wide-label text-gold-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-semibold text-navy-900">
                    {step.title}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confidentiality notice — pinned to card bottom via mt-auto */}
      <div className="mt-auto flex items-start gap-3 rounded-2xl border border-border bg-cream-100 p-4 pt-6">
        <ShieldCheck
          size={14}
          className="mt-0.5 shrink-0 text-gold-600"
          aria-hidden="true"
        />
        <p className="text-xs leading-relaxed text-muted">
          All communications are handled with full confidentiality in
          accordance with established diplomatic protocol.
        </p>
      </div>
    </div>
  );
}
