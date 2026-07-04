"use client";

import { useEffect, useRef, useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { PortfolioSelect } from "@/components/ui/PortfolioSelect";
import { cn } from "@/lib/utils";
import { committees } from "@/lib/data/committees";
import { DelegateDetailsStep } from "./DelegateDetailsStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessState } from "./SuccessState";
import {
  emptyDelegateDetails,
  generateReferenceId,
  validateDelegateDetails,
  type DelegateDetails,
  type DetailErrors,
} from "./types";

const steps = ["Committees", "Details", "Confirm"];

const stepHeadings = [
  "Choose Committee Preference",
  "Delegate Details",
  "Review & Confirm",
];

export function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Step 1 — committee & portfolio
  const [selected, setSelected] = useState(committees[0]?.tag ?? "");
  const [portfolio, setPortfolio] = useState("");
  const [portfolioError, setPortfolioError] = useState(false);

  // Step 2 — delegate details
  const [details, setDetails] = useState<DelegateDetails>(emptyDelegateDetails);
  const [detailErrors, setDetailErrors] = useState<DetailErrors>({});

  // Step 3 — final confirmation
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const selectedCommittee = committees.find(
    (committee) => committee.tag === selected,
  );
  const portfolioOptions = selectedCommittee?.portfolioTypes ?? [];
  const hasPortfolios = portfolioOptions.length > 0;

  // Scroll the card into view when the active step changes.
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, submitted]);

  function handleCommitteeChange(tag: string) {
    setSelected(tag);
    // Never keep a portfolio that belongs to a different committee.
    setPortfolio("");
    setPortfolioError(false);
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

  function handleSubmit() {
    if (!confirmChecked) {
      setConfirmError(true);
      return;
    }
    setReferenceId(generateReferenceId());
    setSubmitted(true);
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-3xl scroll-mt-24 rounded-3xl border border-border bg-cream-50/60 p-6 sm:p-10"
    >
      <Stepper steps={steps} activeStep={submitted ? steps.length : step} />

      {submitted ? (
        <div className="mt-10">
          <SuccessState referenceId={referenceId} />
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
                    const isSelected = selected === committee.tag;
                    return (
                      <label
                        key={committee.tag}
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
                          value={committee.tag}
                          checked={isSelected}
                          onChange={() => handleCommitteeChange(committee.tag)}
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

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  &larr; Back to Edit
                </Button>
                <Button type="button" onClick={handleSubmit}>
                  Submit Application
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
