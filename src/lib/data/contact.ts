import {
  Calendar,
  FileText,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const contactInfo = {
  address:
    "Global Governance Hub, Vasant Vihar, New Delhi, Delhi 110057, India",
  email: "secretariat@neetimun.org",
  phone: "+91 11 4059 9000",
  hours: "Monday – Friday · 9:00 – 18:00 IST",
  responseTime: "Within 24–48 hours",
  mapsHref: "https://maps.google.com/?q=Vasant+Vihar+New+Delhi",
};

/** Secondary quick-contact actions rendered as chips / buttons. */
export const quickActions = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    href: contactInfo.mapsHref,
  },
  {
    icon: LifeBuoy,
    label: "Support",
    href: "/contact",
  },
] as const;

export const inquiryCategories = [
  "General Inquiry",
  "Institutional Partnership",
  "Press & Media",
  "Delegate Support",
];

export const quickAnswers = [
  {
    icon: FileText,
    title: "Policy Documents",
    description:
      "Official resolutions and position paper guidelines for the upcoming session.",
    linkLabel: "Download Archive",
    href: "/committees",
  },
  {
    icon: Calendar,
    title: "Summit Schedule",
    description:
      "Key dates, session timings, and international delegation arrival windows.",
    linkLabel: "View Timeline",
    href: "/",
  },
  {
    icon: ShieldCheck,
    title: "Visa Support",
    description:
      "Institutional invitation letters and diplomatic visa coordination services.",
    linkLabel: "Check Requirements",
    href: "/contact",
  },
];
