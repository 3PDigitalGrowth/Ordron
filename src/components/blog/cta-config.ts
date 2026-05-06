/**
 * Slot-based CTA configuration for the blog template.
 *
 * Per spec v2 §3a, the inline `<CTA>` component takes a single prop
 * (`slot`). The template owns 100% of the headline, body, button
 * label, form fields and destination URL for each slot. The agent
 * only picks the slot.
 *
 * This makes Ordron's CTA policy structural rather than editorial:
 * every conversion surface in the blog template can only resolve to
 * `/health-check` or `/scorecard`, with Ordron-approved labels.
 *
 * If a future post needs a different conversion shape, add a new
 * slot here, do not pass arbitrary copy through props.
 */

export type CtaSlot = "primary" | "secondary" | "inline-form";

export type CtaSlotConfig = {
  /** Optional caption rendered above the headline. */
  eyebrow?: string;
  /** Headline text shown inside the CTA block. */
  headline: string;
  /** Supporting copy under the headline. */
  body: string;
  /** Visible button label. */
  buttonLabel: string;
  /** Always one of the two Ordron-approved destinations. */
  href: "/health-check" | "/scorecard";
  /** `button` is a link-styled CTA, `form` includes an inline email field. */
  variant: "button" | "form";
  /** Inline form fields. Only used when `variant === "form"`. */
  formFields?: Array<{
    name: "email" | "name";
    label: string;
    placeholder: string;
    required: boolean;
  }>;
};

export const ctaSlots: Record<CtaSlot, CtaSlotConfig> = {
  primary: {
    eyebrow: "Next step",
    headline: "Book your Roadmap",
    body: "60 minutes. Written report. Yours to keep.",
    buttonLabel: "Book your Roadmap",
    href: "/health-check",
    variant: "button",
  },
  secondary: {
    eyebrow: "Quick win",
    headline: "Find your automation quick wins",
    body: "5-minute diagnostic. Instant results.",
    buttonLabel: "Find your automation quick wins",
    href: "/scorecard",
    variant: "button",
  },
  "inline-form": {
    eyebrow: "Take it further",
    headline: "Send me the Roadmap booking link",
    body: "Drop your work email. We will send the booking page and a short brief on how the Roadmap session runs.",
    buttonLabel: "Send the link",
    href: "/health-check",
    variant: "form",
    formFields: [
      {
        name: "email",
        label: "Work email",
        placeholder: "you@company.com.au",
        required: true,
      },
    ],
  },
};

export function getCtaSlot(slot: CtaSlot | string | undefined): CtaSlotConfig {
  if (slot && slot in ctaSlots) {
    return ctaSlots[slot as CtaSlot];
  }
  // Unknown slot strings degrade to the primary CTA rather than
  // crashing the build. Prevents a malformed agent commit from
  // taking the blog detail route down.
  return ctaSlots.primary;
}
