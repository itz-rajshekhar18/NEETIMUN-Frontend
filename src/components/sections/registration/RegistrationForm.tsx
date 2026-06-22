"use client";

import { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import { committees } from "@/lib/data/committees";

const steps = ["Committees", "Details", "Confirm"];

export function RegistrationForm() {
  const [selected, setSelected] = useState(committees[0]?.tag ?? "");
  const [country, setCountry] = useState("");

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-cream-50/60 p-6 sm:p-10">
      <Stepper steps={steps} activeStep={0} />

      <div className="mt-10 flex flex-col gap-8">
        <h2 className="font-display text-2xl text-navy-900">
          Choose Committee Preference
        </h2>

        <fieldset className="m-0 border-0 p-0">
          <legend className="sr-only">Choose Committee Preference</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {committees.map((committee) => {
              const isSelected = selected === committee.tag;
              return (
                <label
                  key={committee.tag}
                  className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-2xl border p-5 text-left transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2 focus-within:ring-offset-cream-50",
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
                    onChange={() => setSelected(committee.tag)}
                    className="sr-only"
                  />
                  <span className="font-display text-lg text-navy-900">
                    {committee.tag}
                  </span>
                  <span className="text-sm text-muted">{committee.title}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <Label htmlFor="country-preference">Country Preference</Label>
          <Input
            id="country-preference"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            placeholder="e.g. United Kingdom, India, France"
          />
          <p className="text-xs text-muted">
            Mention up to three countries separated by commas.
          </p>
        </div>

        <div className="flex justify-end border-t border-border pt-6">
          <Button type="button">Next Step &rarr;</Button>
        </div>
      </div>
    </div>
  );
}
