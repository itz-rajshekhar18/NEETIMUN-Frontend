import { Button } from "@/components/ui/Button";
import { inquiryCategories } from "@/lib/data/contact";

const inputClasses =
  "rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-navy-900 focus:outline-none";

const labelClasses =
  "text-xs font-medium uppercase tracking-wide-label text-muted";

export function ContactForm() {
  return (
    <div className="rounded-3xl border border-border bg-cream-50 p-6 sm:p-10">
      <h2 className="font-display text-2xl text-navy-900">Direct Inquiry</h2>

      <form className="mt-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="full-name" className={labelClasses}>
              Full Name
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              placeholder="Ex. Hon. Jane Doe"
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClasses}>
              Diplomatic Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="official@organization.org"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className={labelClasses}>
            Inquiry Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className={inputClasses}
          >
            <option value="" disabled>
              Select Protocol Tier
            </option>
            {inquiryCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className={labelClasses}>
            Official Statement / Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Please provide a detailed formal inquiry..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <Button type="submit" className="self-start">
          Submit Formal Inquiry
        </Button>
      </form>
    </div>
  );
}
