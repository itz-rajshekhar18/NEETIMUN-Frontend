import { Calendar, FileText, ShieldCheck } from "lucide-react";

export const contactInfo = {
  address:
    "Global Governance Hub, Vasant Vihar, New Delhi, Delhi 110057, India",
  email: "secretariat@neetimun.org",
  phone: "+91 11 4059 9000",
};

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
