import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff, Globe2, Landmark, Mic, Newspaper } from "lucide-react";

export type Committee = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  shortDescription: string;
  agenda: string | null;
  description: string[];
  portfolioTypes: string[];
  badges: string[];
  icon: LucideIcon;
  featured?: boolean;
  href: string;
};

export const committees: Committee[] = [
  {
    id: "black-budget-council",
    slug: "bbc",
    tag: "BBC",
    title: "Black Budget Council",
    shortDescription:
      "Step into the world of covert diplomacy, intelligence networks, and strategic decision-making.",
    agenda:
      "Addressing Escalating Intelligence Warfare, Proxy Conflicts, and the Role of Artificial Intelligence in Shaping the Future of Global Security",
    description: [
      "Step into the world of covert diplomacy, intelligence networks, and strategic decision-making. The Black Budget Council brings together key global actors to navigate the challenges posed by cyber warfare, espionage, proxy conflicts, and emerging technologies.",
    ],
    portfolioTypes: [
      "Heads of State",
      "National Security Advisors",
      "Intelligence Chiefs",
      "Strategic Policymakers",
      "International Security Representatives",
    ],
    badges: ["Intelligence", "Security", "AI"],
    icon: EyeOff,
    featured: true,
    href: "/committees",
  },
  {
    id: "world-summit-2040",
    slug: "ws-2040",
    tag: "WS 2040",
    title: "World Summit 2040",
    shortDescription:
      "The future is uncertain, and the decisions made today will define the world of tomorrow.",
    agenda:
      "Designing the International Order of 2040 in an Era of Technological Transformation, Climate Instability, and Multipolar Competition",
    description: [
      "The future is uncertain, and the decisions made today will define the world of tomorrow. Delegates will confront the challenges of climate change, technological disruption, resource competition, and shifting geopolitical power dynamics while shaping the global order of 2040.",
      "As NITI MUN's flagship Simulation Intelligence Committee, delegates will participate in an interactive geopolitical ecosystem featuring alliances, negotiations, resource management, and dynamic global developments.",
    ],
    portfolioTypes: [
      "National Leaders",
      "Ministers",
      "Regional Blocs",
      "International Organizations",
      "Emerging Powers",
    ],
    badges: ["Future", "Climate", "Technology"],
    icon: Globe2,
    featured: true,
    href: "/committees",
  },
  {
    id: "unodc",
    slug: "unodc",
    tag: "UNODC",
    title: "United Nations Office on Drugs and Crime",
    shortDescription:
      "In an increasingly interconnected world, criminal networks operate beyond borders.",
    agenda:
      "Combating the Convergence of Organized Crime, Cybercrime, and Terror Financing",
    description: [
      "In an increasingly interconnected world, criminal networks operate beyond borders. UNODC will focus on addressing cybercrime, illicit finance, trafficking networks, and transnational organized crime through international cooperation and policy innovation.",
    ],
    portfolioTypes: [
      "Member States",
      "International Investigative Agencies",
      "Law Enforcement Representatives",
      "Policy Experts",
      "Regulatory Bodies",
    ],
    badges: ["United Nations", "Cybercrime", "Policy"],
    icon: Eye,
    featured: false,
    href: "/committees",
  },
  {
    id: "aippm",
    slug: "aippm",
    tag: "AIPPM",
    title: "All India Political Parties Meet",
    shortDescription:
      "AIPPM offers delegates the opportunity to step into the shoes of India's most influential political leaders.",
    agenda:
      "Deliberation on Balancing Economic Growth, Social Justice, and National Security in India",
    description: [
      "AIPPM offers delegates the opportunity to step into the shoes of India's most influential political leaders. Through debate, negotiation, and political strategy, participants will address some of the country's most pressing policy challenges.",
    ],
    portfolioTypes: [
      "National Political Leaders",
      "Chief Ministers",
      "Cabinet Ministers",
      "Opposition Leaders",
      "Regional Party Representatives",
    ],
    badges: ["Politics", "India", "Governance"],
    icon: Landmark,
    featured: false,
    href: "/committees",
  },
  {
    id: "india-and-the-mic",
    slug: "iatm",
    tag: "IATM",
    title: "India and the Mic",
    shortDescription:
      "In an age of digital influence and instant communication, who truly controls the narrative?",
    agenda:
      "Who Shapes Public Discourse? Evaluating the Role of Comedy, Journalism, Social Media, Public Outrage, and Free Expression in Contemporary India",
    description: [
      "In an age of digital influence and instant communication, who truly controls the narrative? This committee explores the intersection of comedy, journalism, social media, and public accountability through dynamic and thought-provoking discussions.",
    ],
    portfolioTypes: [
      "Comedians",
      "Journalists",
      "Media Personalities",
      "Influencers",
      "Politicians",
      "Public Intellectuals",
      "Activists",
    ],
    badges: ["Media", "Journalism", "Public Discourse"],
    icon: Mic,
    featured: false,
    href: "/committees",
  },
  {
    id: "international-press",
    slug: "ip",
    tag: "IP",
    title: "International Press",
    shortDescription:
      "The International Press serves as the storytelling and information hub of NITI MUN.",
    agenda: null,
    description: [
      "The International Press serves as the storytelling and information hub of NITI MUN.",
      "Journalists will report on committee proceedings, investigate developments, conduct interviews, publish articles, and shape narratives as events unfold throughout the conference. Through timely reporting and critical analysis, delegates will experience the power of information in diplomacy and decision-making.",
    ],
    portfolioTypes: [],
    badges: ["Press", "Journalism", "Media"],
    icon: Newspaper,
    featured: false,
    href: "/committees",
  },
];
