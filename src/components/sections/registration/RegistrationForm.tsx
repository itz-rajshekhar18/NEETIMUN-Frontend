"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { PortfolioSelect } from "@/components/ui/PortfolioSelect";
import { cn } from "@/lib/utils";
import { committees } from "@/lib/data/committees";
import { ApiError } from "@/lib/api/client";
import { submitRegistration } from "@/lib/api/registrations";
import { DelegateDetailsStep } from "./DelegateDetailsStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessState } from "./SuccessState";
import {
  emptyDelegateDetails,
  experienceLabel,
  validateDelegateDetails,
  type DelegateDetails,
  type DetailErrors,
} from "./types";

/** Backend validation-error field names that map onto a DelegateDetails key. */
const backendFieldToDetailField: Partial<Record<string, keyof DelegateDetails>> = {
  fullName: "fullName",
  email: "email",
  phone: "phone",
  institution: "institution",
  motivation: "motivation",
  emergencyContactPhone: "emergencyPhone",
  declarationAccepted: "declaration",
};

const steps = ["Committees", "Details", "Confirm"];

const stepHeadings = [
  "Choose Committee Preference",
  "Delegate Details",
  "Review & Confirm",
];

export function RegistrationForm({
  initialCommitteeSlug,
}: {
  initialCommitteeSlug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  // Step 1 — committee & portfolio. The URL is the source of truth for the
  // selected committee, keyed by slug.
  const [selected, setSelected] = useState(
    () => initialCommitteeSlug || committees[0]?.slug || "",
  );
  const [portfolio, setPortfolio] = useState("");
  const [portfolioError, setPortfolioError] = useState(false);

  // Step 2 — delegate details
  const [details, setDetails] = useState<DelegateDetails>(emptyDelegateDetails);
  const [detailErrors, setDetailErrors] = useState<DetailErrors>({});

  // Step 3 — final confirmation
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const selectedCommittee = committees.find(
    (committee) => committee.slug === selected,
  );
  const portfolioOptions = selectedCommittee?.portfolioTypes ?? [];
  const hasPortfolios = portfolioOptions.length > 0;

  // Always open the Registration page at the top (hero) on a fresh load,
  // overriding the browser's scroll restoration on reload / direct open.
  // Runs once on mount only — never on step changes, edits, or URL syncs,
  // so in-page scrolling is left untouched.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleCommitteeChange(slug: string) {
    setSelected(slug);
    // Never keep a portfolio that belongs to a different committee.
    setPortfolio("");
    setPortfolioError(false);
    // Keep the URL shareable and in sync — no scroll reset, no reload.
    router.replace(`${pathname}?committee=${slug}`, { scroll: false });
  }

  function handlePortfolioChange(value: string) {
    setPortfolio(value);
    if (value) setPortfolioError(false);
  }

  function handleCommitteeContinue() {
    if (hasPortfolios && !portfolio) {
      setPortfolioError(true);
      return;
    }
    setPortfolioError(false);
    setStep(1);
  }

  function updateDetail<K extends keyof DelegateDetails>(
    field: K,
    value: DelegateDetails[K],
  ) {
    setDetails((prev) => ({ ...prev, [field]: value }));
    setDetailErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev,
    );
  }

  function handleDetailsContinue() {
    const errors = validateDelegateDetails(details);
    if (Object.keys(errors).length > 0) {
      setDetailErrors(errors);
      return;
    }
    setDetailErrors({});
    setStep(2);
  }

  function handleConfirmChange(checked: boolean) {
    setConfirmChecked(checked);
    if (checked) setConfirmError(false);
  }

  async function handleSubmit() {
    if (!confirmChecked) {
      setConfirmError(true);
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const munExperience = details.munExperience;
      const registration = await submitRegistration({
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        institution: details.institution,
        gradeOrYear: details.yearGrade,
        committeePreference1: selectedCommittee?.tag ?? "",
        portfolio,
        city: details.city,
        country: details.country,
        courseStream: details.courseStream,
        motivation: details.motivation,
        priorMunExperience: munExperience !== "" && munExperience !== "first",
        experienceDetails: experienceLabel(munExperience),
        dietaryRestrictions: details.dietary,
        emergencyContactName: details.emergencyName,
        emergencyContactPhone: details.emergencyPhone,
        emergencyContactRelationship: details.emergencyRelationship,
        accessibilityNeeds: details.accessibility,
        declarationAccepted: details.declaration && confirmChecked,
      });
      setRegistrationId(
        `NM26-${registration.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`,
      );
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.code === "duplicate_email") {
        setDetailErrors((prev) => ({
          ...prev,
          email: "This email address is already registered.",
        }));
        setStep(1);
        setSubmitError(
          "This email address is already registered. Please review your details.",
        );
      } else if (
        error instanceof ApiError &&
        error.code === "validation_failed" &&
        error.fields
      ) {
        const mapped: DetailErrors = {};
        for (const [field, message] of Object.entries(error.fields)) {
          const detailField = backendFieldToDetailField[field];
          if (detailField) mapped[detailField] = message;
        }
        if (Object.keys(mapped).length > 0) {
          setDetailErrors((prev) => ({ ...prev, ...mapped }));
          setStep(1);
        }
        setSubmitError(error.message);
      } else {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-cream-50/60 p-6 sm:p-10">
      <Stepper steps={steps} activeStep={submitted ? steps.length : step} />

      {submitted ? (
        <div className="mt-10">
          <SuccessState registrationId={registrationId} />
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-8">
          <h2 className="font-display text-2xl text-navy-900">
            {stepHeadings[step]}
          </h2>

          {step === 0 && (
            <>
              <fieldset className="m-0 border-0 p-0">
                <legend className="sr-only">Choose Committee Preference</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {committees.map((committee) => {
                    const isSelected = selected === committee.slug;
                    return (
                      <label
                        key={committee.slug}
                        className={cn(
                          "flex cursor-pointer flex-col gap-1.5 rounded-2xl border p-5 text-left transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2 focus-within:ring-offset-cream-50",
                          isSelected
                            ? "border-navy-900 bg-cream-200/70 shadow-md shadow-navy-900/5"
                            : "border-border bg-cream-50 hover:border-gold-400/40",
                        )}
                      >
                        <input
                          type="radio"
                          name="committee-preference"
                          value={committee.slug}
                          checked={isSelected}
                          onChange={() => handleCommitteeChange(committee.slug)}
                          className="sr-only"
                        />
                        <span className="text-xs font-medium uppercase tracking-wide-label text-gold-600">
                          {committee.tag}
                        </span>
                        <span className="font-display text-base leading-snug text-navy-900">
                          {committee.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolio-preference">
                  Portfolio Preference
                </Label>
                <PortfolioSelect
                  id="portfolio-preference"
                  options={portfolioOptions}
                  value={portfolio}
                  onChange={handlePortfolioChange}
                  disabled={!selectedCommittee || !hasPortfolios}
                  disabledPlaceholder={
                    selectedCommittee && !hasPortfolios
                      ? "No portfolios for this committee"
                      : "Select a committee first"
                  }
                  invalid={portfolioError}
                  aria-describedby={
                    portfolioError ? "portfolio-error" : "portfolio-help"
                  }
                />
                {portfolioError ? (
                  <p
                    id="portfolio-error"
                    role="alert"
                    className="text-xs text-red-500"
                  >
                    Please select your preferred portfolio.
                  </p>
                ) : (
                  <p id="portfolio-help" className="text-xs text-muted">
                    Portfolio availability depends on committee allocation.
                  </p>
                )}
              </div>

              <div className="flex justify-end border-t border-border pt-6">
                <Button type="button" onClick={handleCommitteeContinue}>
                  Next Step &rarr;
                </Button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <DelegateDetailsStep
                details={details}
                errors={detailErrors}
                onChange={updateDetail}
              />

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(0)}
                >
                  &larr; Back
                </Button>
                <Button type="button" onClick={handleDetailsContinue}>
                  Continue &rarr;
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <ReviewStep
                committee={selectedCommittee}
                portfolio={portfolio}
                details={details}
                confirmChecked={confirmChecked}
                confirmError={
                  confirmError
                    ? "Please confirm your details before submitting."
                    : undefined
                }
                onConfirmChange={handleConfirmChange}
                onEdit={setStep}
              />

              <div className="flex flex-col gap-4 border-t border-border pt-6">
                {submitError ? (
                  <p
                    role="alert"
                    className="text-sm text-red-500"
                  >
                    {submitError}
                  </p>
                ) : null}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    className="disabled:pointer-events-none disabled:opacity-60"
                  >
                    &larr; Back to Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="disabled:pointer-events-none disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting…" : "Submit Application"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
