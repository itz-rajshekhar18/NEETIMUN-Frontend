import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Circle,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  Quote,
  ShieldCheck,
  User,
} from "lucide-react";
import type { Committee } from "@/lib/data/committees";
import { cn } from "@/lib/utils";
import { CheckField } from "./FormControls";
import { experienceLabel, type DelegateDetails } from "./types";

type Props = {
  committee: Committee | undefined;
  portfolio: string;
  details: DelegateDetails;
  confirmChecked: boolean;
  confirmError?: string;
  onConfirmChange: (checked: boolean) => void;
  /** Jump back to a specific step to edit (0 = committee, 1 = details). */
  onEdit: (step: number) => void;
};

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function EditAction({
  section,
  tone = "light",
  onClick,
}: {
  section: string;
  tone?: "light" | "dark";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Edit ${section}`}
      className={cn(
        "group/edit inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        tone === "dark"
          ? "border-cream-50/20 text-cream-50/80 hover:border-cream-50/40 hover:text-cream-50"
          : "border-border text-muted hover:border-gold-400/60 hover:bg-cream-100 hover:text-navy-900",
      )}
    >
      <Pencil className="size-3.5 transition-transform duration-200 group-hover/edit:-translate-y-px" />
      Edit
    </button>
  );
}

function OptionalValue({ value }: { value: string }) {
  if (!value.trim()) {
    return (
      <span className="inline-flex items-center rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide-label text-muted">
        Skipped
      </span>
    );
  }
  return <span className="text-sm text-navy-900">{value}</span>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-xs uppercase tracking-wide-label text-muted">
        {label}
      </dt>
      <dd className="leading-snug">
        <OptionalValue value={value} />
      </dd>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  section,
  onEdit,
  children,
}: {
  icon: LucideIcon;
  title: string;
  section: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="group rounded-2xl border border-border bg-cream-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400/40 hover:shadow-md hover:shadow-navy-900/5">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-navy-900/5 text-navy-900 transition-colors duration-200 group-hover:bg-gold-300/30 group-hover:text-gold-600">
            <Icon className="size-5" />
          </span>
          <h4 className="font-display text-base text-navy-900">{title}</h4>
        </div>
        <EditAction section={section} onClick={onEdit} />
      </header>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function SummaryStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-wide-label text-muted">
        {label}
      </span>
      {typeof value === "string" ? (
        <span
          className={cn(
            "text-sm font-medium",
            accent ? "text-gold-600" : "text-navy-900",
          )}
        >
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
}

function ChecklistItem({
  done,
  children,
}: {
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
          done ? "bg-emerald-500/10 text-emerald-600" : "bg-cream-200 text-muted",
        )}
      >
        {done ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Circle className="size-4" />
        )}
      </span>
      <span className={cn("text-sm", done ? "text-navy-900" : "text-muted")}>
        {children}
      </span>
    </li>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Review step                                                               */
/* -------------------------------------------------------------------------- */

export function ReviewStep({
  committee,
  portfolio,
  details,
  confirmChecked,
  confirmError,
  onConfirmChange,
  onEdit,
}: Props) {
  const CommitteeIcon = committee?.icon;
  const requiresPortfolio = (committee?.portfolioTypes.length ?? 0) > 0;

  const checklist = {
    committee: Boolean(committee),
    portfolio: Boolean(portfolio) || !requiresPortfolio,
    personal: Boolean(
      details.fullName.trim() &&
        details.email.trim() &&
        details.phone.trim() &&
        details.institution.trim(),
    ),
    declaration: details.declaration,
  };

  return (
    <div className="flex animate-fade-up flex-col gap-6">
      {/* Hero committee card */}
      <div className="overflow-hidden rounded-3xl border border-navy-800 bg-navy-900 text-cream-50 shadow-lg shadow-navy-900/20">
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
          <div className="flex items-start gap-4 sm:gap-5">
            {CommitteeIcon ? (
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-cream-50/10 text-gold-400 ring-1 ring-cream-50/15">
                <CommitteeIcon aria-hidden="true" className="size-7" />
              </span>
            ) : null}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide-label text-gold-400">
                {committee?.tag ?? "Committee"} · Committee
              </span>
              <h3 className="font-display text-2xl leading-tight text-cream-50">
                {committee?.title ?? "Not selected"}
              </h3>
              {committee?.agenda ? (
                <p className="max-w-xl text-sm leading-relaxed text-cream-50/70">
                  {committee.agenda}
                </p>
              ) : null}
            </div>
          </div>
          <EditAction
            section="committee selection"
            tone="dark"
            onClick={() => onEdit(0)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-cream-50/10 px-6 py-4 sm:px-8">
          <span className="text-xs uppercase tracking-wide-label text-cream-50/50">
            Portfolio
          </span>
          {portfolio ? (
            <span className="inline-flex items-center rounded-full border border-gold-400/40 bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-300">
              {portfolio}
            </span>
          ) : (
            <span className="text-sm italic text-cream-50/50">
              Not required for this committee
            </span>
          )}
        </div>
      </div>

      {/* Application Summary */}
      <section className="rounded-2xl border border-border bg-cream-50 p-6">
        <header className="flex items-center gap-2">
          <BadgeCheck aria-hidden="true" className="size-4 text-gold-600" />
          <h4 className="text-xs font-medium uppercase tracking-wide-label text-muted">
            Application Summary
          </h4>
        </header>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          <SummaryStat label="Committee" value={committee?.tag ?? "—"} />
          <SummaryStat
            label="Portfolio"
            value={portfolio || "Not required"}
            accent={Boolean(portfolio)}
          />
          <SummaryStat
            label="Conference Experience"
            value={
              experienceLabel(details.munExperience) ? (
                experienceLabel(details.munExperience)
              ) : (
                <OptionalValue value="" />
              )
            }
          />
          <SummaryStat
            label="Country"
            value={details.country || <OptionalValue value="" />}
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide-label text-muted">
              Application Status
            </span>
            <StatusPill>Ready to Submit</StatusPill>
          </div>
        </dl>
      </section>

      {/* Detail summary cards */}
      <SummaryCard
        icon={User}
        title="Personal Information"
        section="personal information"
        onEdit={() => onEdit(1)}
      >
        <Row label="Full Name" value={details.fullName} />
        <Row label="Email" value={details.email} />
        <Row label="Phone Number" value={details.phone} />
        <Row label="Institution" value={details.institution} />
        <Row label="City" value={details.city} />
        <Row label="Country" value={details.country} />
      </SummaryCard>

      <SummaryCard
        icon={GraduationCap}
        title="Academic Information"
        section="academic information"
        onEdit={() => onEdit(1)}
      >
        <Row label="Current Year / Grade" value={details.yearGrade} />
        <Row label="Course / Stream" value={details.courseStream} />
      </SummaryCard>

      <SummaryCard
        icon={Award}
        title="Experience & Preferences"
        section="experience and preferences"
        onEdit={() => onEdit(1)}
      >
        <Row
          label="Previous MUN Experience"
          value={experienceLabel(details.munExperience)}
        />
        <Row label="Dietary Preference" value={details.dietary} />
        <Row label="Accessibility Requirements" value={details.accessibility} />
      </SummaryCard>

      <SummaryCard
        icon={Phone}
        title="Emergency Contact"
        section="emergency contact"
        onEdit={() => onEdit(1)}
      >
        <Row label="Name" value={details.emergencyName} />
        <Row label="Relationship" value={details.emergencyRelationship} />
        <Row label="Phone Number" value={details.emergencyPhone} />
      </SummaryCard>

      {/* Committee motivation — highlighted */}
      <section className="rounded-2xl border border-gold-400/40 bg-gold-300/10 p-6 sm:p-7">
        <header className="flex items-center gap-2 text-gold-600">
          <Quote aria-hidden="true" className="size-4" />
          <h4 className="text-xs font-medium uppercase tracking-wide-label">
            Committee Motivation
          </h4>
        </header>
        {details.motivation.trim() ? (
          <p className="mt-4 font-display text-lg leading-relaxed text-navy-900">
            {details.motivation}
          </p>
        ) : (
          <p className="mt-3 text-sm italic text-muted">
            No motivation shared — this field was optional.
          </p>
        )}
      </section>

      {/* Completion checklist */}
      <section className="rounded-2xl border border-border bg-cream-50 p-6">
        <header className="flex items-center gap-2">
          <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-600" />
          <h4 className="text-xs font-medium uppercase tracking-wide-label text-muted">
            Completion Checklist
          </h4>
        </header>
        <ul className="mt-4 flex flex-col gap-3">
          <ChecklistItem done={checklist.committee}>
            Committee selected
          </ChecklistItem>
          <ChecklistItem done={checklist.portfolio}>
            Portfolio selected
          </ChecklistItem>
          <ChecklistItem done={checklist.personal}>
            Personal information complete
          </ChecklistItem>
          <ChecklistItem done={checklist.declaration}>
            Declaration accepted
          </ChecklistItem>
        </ul>
      </section>

      {/* Allocation notice */}
      <div className="flex items-start gap-4 rounded-2xl border border-border bg-cream-100 p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/5 text-navy-900">
          <ShieldCheck aria-hidden="true" className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-navy-900">
            Committee allocation is final
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Please review your application carefully. Committee allocation cannot
            be modified after submission.
          </p>
        </div>
      </div>

      {/* Required confirmation */}
      <div className="rounded-2xl border border-border bg-cream-50 p-5">
        <CheckField
          id="review-confirm"
          checked={confirmChecked}
          onChange={onConfirmChange}
          error={confirmError}
        >
          I have reviewed my application and confirm that all details are
          correct.
        </CheckField>
      </div>

      {/* Application status panel */}
      <div className="rounded-2xl border border-border bg-cream-50 p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 aria-hidden="true" className="size-5" />
          </span>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-navy-900">
              Ready for submission
            </p>
            <p className="text-xs text-muted">
              All required information is complete.
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-muted">
          <Mail aria-hidden="true" className="size-4 shrink-0" />
          <p className="text-xs leading-relaxed">
            A confirmation email will be sent instantly after submission.
          </p>
        </div>
      </div>
    </div>
  );
}
