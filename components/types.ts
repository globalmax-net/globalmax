export interface Service {
  code: string;
  name: string;
  tagline: string;
  statValue: string;
  statLabel: string;
  colorClass: string;
}

export const SERVICES: Service[] = [
  {
    code: "VIS",
    name: "Visa Consultancy",
    tagline: "End-to-end support across all visa categories, from eligibility checks to pre-departure guidance.",
    statValue: "2000+",
    statLabel: "visa services delivered",
    colorClass: "bg-gm-maroon",
  },
  {
    code: "EDU",
    name: "Student & Education Guidance",
    tagline: "Counselling on study destinations, admissions, interview prep, and scholarship guidance.",
    statValue: "Global",
    statLabel: "study destinations",
    colorClass: "bg-gm-green",
  },
  {
    code: "TIX",
    name: "Airline Ticketing",
    tagline: "Domestic and international ticketing, itinerary planning, and rebooking assistance.",
    statValue: "24/7",
    statLabel: "travel coordination",
    colorClass: "bg-gm-maroon",
  },
  {
    code: "MKT",
    name: "Digital Marketing",
    tagline: "Social media management, content creation, SEO, and promotional campaigns.",
    statValue: "Full",
    statLabel: "funnel campaigns",
    colorClass: "bg-gm-green",
  },
  {
    code: "MED",
    name: "Media — Vettri TV",
    tagline: "Local and regional news, sponsored content, and digital advertising packages.",
    statValue: "Regional",
    statLabel: "broadcast network",
    colorClass: "bg-gm-maroon",
  },
  {
    code: "RE",
    name: "Real Estate Services",
    tagline: "Local property guidance connecting clients with vetted sellers and developers.",
    statValue: "Local",
    statLabel: "property network",
    colorClass: "bg-gm-green",
  },
];

export interface UpcomingPlatform {
  name: string;
  description: string;
}

export const UPCOMING: UpcomingPlatform[] = [
  {
    name: "Job Portal",
    description: "An online employment platform connecting employers and job seekers across sectors.",
  },
  {
    name: "Matrimonial Platform",
    description: "Matchmaking that combines traditional values with modern, privacy-focused, multilingual technology.",
  },
];
