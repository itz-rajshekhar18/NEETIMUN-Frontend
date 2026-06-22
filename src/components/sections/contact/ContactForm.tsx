import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { inquiryCategories } from "@/lib/data/contact";

export function ContactForm() {
  return (
    <div className="rounded-3xl border border-border bg-cream-50 p-6 sm:p-10">
      <h2 className="font-display text-2xl text-navy-900">Direct Inquiry</h2>

      <form className="mt-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              name="full-name"
              type="text"
              placeholder="Ex. Hon. Jane Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Diplomatic Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="official@organization.org"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Inquiry Category</Label>
          <Select id="category" name="category" defaultValue="">
            <option value="" disabled>
              Select Protocol Tier
            </option>
            {inquiryCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Official Statement / Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Please provide a detailed formal inquiry..."
          />
        </div>

        <Button type="submit" className="self-start">
          Submit Formal Inquiry
        </Button>
      </form>
    </div>
  );
}
