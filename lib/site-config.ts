import type { ComponentType } from "react"
import {
  Brain,
  Briefcase,
  CreditCard,
  Cpu,
  FolderGit2,
  House,
  Layers,
  Mail,
  CalendarCheck,
  Grid3x3,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  SquareTerminal,
  Trophy,
  WandSparkles,
  type LucideIcon,
} from "lucide-react"
import AmazonwebservicesPlainWordmark from "devicons-react/icons/AmazonwebservicesPlainWordmark"
import AzureOriginal from "devicons-react/icons/AzureOriginal"
import CsharpOriginal from "devicons-react/icons/CsharpOriginal"
import DartOriginal from "devicons-react/icons/DartOriginal"
import DjangoPlain from "devicons-react/icons/DjangoPlain"
import DockerOriginal from "devicons-react/icons/DockerOriginal"
import DotNetPlain from "devicons-react/icons/DotNetPlain"
import ExpressOriginal from "devicons-react/icons/ExpressOriginal"
import FirebaseOriginal from "devicons-react/icons/FirebaseOriginal"
import FlutterOriginal from "devicons-react/icons/FlutterOriginal"
import GithubactionsOriginal from "devicons-react/icons/GithubactionsOriginal"
import HtmxPlain from "devicons-react/icons/HtmxPlain"
import JavaOriginal from "devicons-react/icons/JavaOriginal"
import JavascriptOriginal from "devicons-react/icons/JavascriptOriginal"
import JestPlain from "devicons-react/icons/JestPlain"
import MicrosoftsqlserverPlain from "devicons-react/icons/MicrosoftsqlserverPlain"
import MysqlOriginal from "devicons-react/icons/MysqlOriginal"
import NextjsPlain from "devicons-react/icons/NextjsPlain"
import NodejsPlainWordmark from "devicons-react/icons/NodejsPlainWordmark"
import OpenapiPlain from "devicons-react/icons/OpenapiPlain"
import PostgresqlOriginal from "devicons-react/icons/PostgresqlOriginal"
import PostmanOriginal from "devicons-react/icons/PostmanOriginal"
import PythonOriginal from "devicons-react/icons/PythonOriginal"
import ReactOriginal from "devicons-react/icons/ReactOriginal"
import RedisOriginal from "devicons-react/icons/RedisOriginal"
import SocketioOriginal from "devicons-react/icons/SocketioOriginal"
import SupabaseOriginal from "devicons-react/icons/SupabaseOriginal"
import TailwindcssOriginal from "devicons-react/icons/TailwindcssOriginal"
import TypescriptOriginal from "devicons-react/icons/TypescriptOriginal"
import VercelOriginal from "devicons-react/icons/VercelOriginal"
import VitestOriginal from "devicons-react/icons/VitestOriginal"
import VuejsOriginal from "devicons-react/icons/VuejsOriginal"

export type MarqueeIconComponent = ComponentType<{
  className?: string
  size?: number | string
  fill?: string
  strokeWidth?: number
}>

export type MarqueeIcon = {
  icon: MarqueeIconComponent
  label: string
  /** Text color: tints the tile and colors `mono` and outline icons. */
  className: string
  /** "brand" keeps the logo's own colors, "mono" recolors it with `className`, "outline" is a Lucide fallback. */
  variant: "brand" | "mono" | "outline"
  /** Wordmark logos only fill a thin strip of their square viewBox, so they render larger. */
  wordmark?: boolean
}

export type MarqueeRow = {
  icons: MarqueeIcon[]
  duration: string
  reverse?: boolean
}

export const siteConfig = {
  name: "Robert Stewart",
  role: "Full-Stack Software Engineer",
  heroLayout: "overlay" as "overlay" | "stacked",
  headline: "I build production systems end to end, from mobile to cloud.",
  description:
    "Multi-tenant apps shipped to the App Store and Google Play, with real-time backends, AWS infrastructure, and AI features built into live products.",
  resumeHref: "/Resume.pdf",
  sections: [
    { label: "Home", href: "#top", icon: House },
    { label: "Stack", href: "#stack", icon: Layers },
    { label: "Projects", href: "#projects", icon: FolderGit2 },
    { label: "Experience", href: "#experience", icon: Briefcase },
    { label: "Contact", href: "#contact", icon: Mail },
  ],
  marquee: {
    heading: "Tools I build with every day.",
    description:
      "Flutter and React on the front, Node.js and AWS behind it, AI wired into the middle.",
    cta: { label: "View my resume", href: "/Resume.pdf" },
  },
  projects: {
    heading: "Things I've shipped.",
    description:
      "Production apps, platforms, and demos, from App Store releases to multi-tenant APIs.",
  },
  reviews: {
    heading: "What students say.",
    description:
      "Feedback from my time as a CIS peer tutor at Bellevue University, mentoring 100+ students.",
  },
  experience: {
    heading: "Where I've worked.",
    description:
      "Shipping production software, teaching it, and studying the data behind it.",
  },
  footer: {
    heading: "Let's build something.",
    videoText: "LET'S BUILD",
    email: "rms.dev@outlook.com",
    links: [
      { label: "GitHub", href: "https://github.com/rs691" },
      { label: "LinkedIn", href: "https://linkedin.com/in/robert-stewart-m" },
      { label: "Portfolio", href: "https://robert-stewart.dev" },
    ],
  },
}

export const marqueeRows: MarqueeRow[] = [
  {
    duration: "30s",
    icons: [
      { icon: TypescriptOriginal, label: "TypeScript", className: "text-blue-500", variant: "brand" },
      { icon: JavascriptOriginal, label: "JavaScript", className: "text-yellow-400", variant: "brand" },
      { icon: PythonOriginal, label: "Python", className: "text-sky-500", variant: "brand" },
      { icon: DartOriginal, label: "Dart", className: "text-cyan-500", variant: "brand" },
      { icon: JavaOriginal, label: "Java", className: "text-red-500", variant: "brand" },
      { icon: CsharpOriginal, label: "C#", className: "text-violet-500", variant: "brand" },
      { icon: ReactOriginal, label: "React", className: "text-cyan-400", variant: "brand" },
      { icon: NextjsPlain, label: "Next.js", className: "text-foreground", variant: "mono" },
      { icon: FlutterOriginal, label: "Flutter", className: "text-sky-400", variant: "brand" },
      { icon: VuejsOriginal, label: "Vue.js", className: "text-emerald-500", variant: "brand" },
      { icon: HtmxPlain, label: "HTMX", className: "text-blue-500", variant: "mono" },
      { icon: TailwindcssOriginal, label: "Tailwind CSS", className: "text-cyan-400", variant: "brand" },
    ],
  },
  {
    duration: "50s",
    reverse: true,
    icons: [
      { icon: NodejsPlainWordmark, label: "Node.js", className: "text-green-500", variant: "mono", wordmark: true },
      { icon: ExpressOriginal, label: "Express", className: "text-foreground", variant: "mono" },
      { icon: DjangoPlain, label: "Django", className: "text-emerald-500", variant: "mono" },
      { icon: DotNetPlain, label: "ASP.NET / Blazor", className: "text-violet-400", variant: "mono" },
      { icon: SocketioOriginal, label: "Socket.IO", className: "text-foreground", variant: "mono" },
      { icon: PostgresqlOriginal, label: "PostgreSQL", className: "text-blue-400", variant: "brand" },
      { icon: MysqlOriginal, label: "MySQL", className: "text-sky-500", variant: "mono" },
      { icon: MicrosoftsqlserverPlain, label: "SQL Server", className: "text-red-500", variant: "mono" },
      { icon: RedisOriginal, label: "Redis", className: "text-red-500", variant: "brand" },
      { icon: SupabaseOriginal, label: "Supabase", className: "text-emerald-400", variant: "brand" },
      { icon: FirebaseOriginal, label: "Firebase", className: "text-amber-500", variant: "brand" },
      { icon: CreditCard, label: "Stripe", className: "text-indigo-400", variant: "outline" },
    ],
  },
  {
    duration: "36s",
    icons: [
      { icon: AmazonwebservicesPlainWordmark, label: "AWS", className: "text-orange-400", variant: "mono", wordmark: true },
      { icon: AzureOriginal, label: "Azure", className: "text-sky-500", variant: "brand" },
      { icon: DockerOriginal, label: "Docker", className: "text-blue-500", variant: "brand" },
      { icon: GithubactionsOriginal, label: "GitHub Actions", className: "text-blue-500", variant: "brand" },
      { icon: VercelOriginal, label: "Vercel", className: "text-foreground", variant: "mono" },
      { icon: Sparkles, label: "Gemini API", className: "text-blue-400", variant: "outline" },
      { icon: Cpu, label: "Groq", className: "text-orange-500", variant: "outline" },
      { icon: WandSparkles, label: "Genkit", className: "text-amber-500", variant: "outline" },
      { icon: Brain, label: "pgvector RAG", className: "text-purple-500", variant: "outline" },
      { icon: JestPlain, label: "Jest", className: "text-rose-500", variant: "mono" },
      { icon: VitestOriginal, label: "Vitest", className: "text-yellow-500", variant: "brand" },
      { icon: PostmanOriginal, label: "Postman", className: "text-orange-500", variant: "brand" },
      { icon: OpenapiPlain, label: "OpenAPI", className: "text-lime-500", variant: "mono" },
    ],
  },
]

export type Project = {
  title: string
  description: string
  stack: string[]
  status: string
  icon: LucideIcon
  /** Which animation plays in the project's bento card. */
  visual: "checkins" | "bingo" | "tenants" | "storefront" | "api" | "calendar"
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: "YourOpoly",
    description:
      "Community rewards platform connecting players with local businesses through geo-validated QR check-ins, points, promotions, and live leaderboards.",
    stack: ["Flutter", "Node.js", "MySQL", "AWS ECS", "Redis", "Socket.IO", "Gemini API"],
    status: "App Store · Google Play",
    icon: Trophy,
    visual: "checkins",
  },
  {
    title: "Good Life Bingo",
    description:
      "Map-based scavenger-hunt app with multi-session play, QR objectives, and a live board that patches in real time, plus push notifications and deep links for re-engagement.",
    stack: ["Flutter", "Node.js", "MySQL", "Redis", "Socket.IO"],
    status: "Mobile",
    icon: Grid3x3,
    visual: "bingo",
  },
  {
    title: "Multi-Product Admin Platform",
    description:
      "Central console for permissions, content, and platform operations across tenant products, with org-scoped RBAC enforced at the API layer.",
    stack: ["Node.js", "React", "Next.js", "MySQL", "AWS"],
    status: "Internal platform",
    icon: LayoutDashboard,
    visual: "tenants",
  },
  {
    title: "E-Commerce Application",
    description:
      "Supabase Auth, Postgres RLS, Stripe Checkout, and AI design and admin copilots with pgvector RAG, gated by contract evals in CI.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Stripe", "Vercel AI SDK"],
    status: "Live demo",
    icon: ShoppingBag,
    visual: "storefront",
  },
  {
    title: "Multi-Tenant Task Board API",
    description:
      "REST API that enforces tenant isolation at the ORM layer with EF Core global query filters, deployed to Azure by GitHub Actions.",
    stack: ["C#", "ASP.NET Core", "JWT", "Azure", "GitHub Actions"],
    status: "Live demo · GitHub",
    icon: SquareTerminal,
    visual: "api",
  },
  {
    title: "Django Reservation System",
    description:
      "Booking app with transaction-safe conflict resolution and automated email confirmations.",
    stack: ["Django", "HTMX", "Python", "SQLite"],
    status: "Live demo",
    icon: CalendarCheck,
    visual: "calendar",
  },
]

const techAliases: Record<string, string> = {
  "AWS ECS": "AWS",
  "ASP.NET Core": "ASP.NET / Blazor",
}

export function techIcon(name: string): MarqueeIcon | undefined {
  const label = techAliases[name] ?? name
  for (const row of marqueeRows) {
    const match = row.icons.find((icon) => icon.label === label)
    if (match) return match
  }
}

export type Stat = {
  value: number
  suffix?: string
  label: string
  countDown?: boolean
}

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Automated backend tests" },
  { value: 0, suffix: "%", label: "Error rate at 25 concurrent users", countDown: true },
  { value: 100, suffix: "+", label: "Students mentored" },
  { value: 2, label: "Apps live in the stores" },
]

export type Experience = {
  role: string
  company: string
  location: string
  period: string
  points: string[]
}

export const experience: Experience[] = [
  {
    role: "Full-Stack Software Engineer",
    company: "NE Innovation Labs",
    location: "Omaha, NE",
    period: "Dec 2025 – Present",
    points: [
      "Architected cross-platform Flutter apps with JWT/OAuth, deep links, and QR entry flows on a shared mobile foundation.",
      "Built a multi-tenant Node.js backend with Socket.IO real-time delivery and 100+ automated tests.",
      "Migrated a Firebase prototype to AWS (ECS Fargate, RDS, ElastiCache, S3/CloudFront) and automated releases with GitHub Actions.",
    ],
  },
  {
    role: "CIS Peer Tutor",
    company: "Bellevue University",
    location: "Bellevue, NE",
    period: "Dec 2023 – Apr 2026",
    points: [
      "Mentored 100+ students in Python, JavaScript, database design, and software engineering.",
      "Ran code reviews on clean code, test-driven development, and system design fundamentals.",
    ],
  },
  {
    role: "Junior Web Developer / IT Support",
    company: "Pierson Wireless",
    location: "Omaha, NE",
    period: "Oct 2022 – Nov 2023",
    points: [
      "Built internal C# / Blazor apps on SQL Server, deployed through Azure CI/CD.",
      "Launched a cost estimation tool that cut manual quoting work by 40%.",
    ],
  },
]

export const education = [
  { degree: "M.S. Data Science", school: "Bellevue University", date: "June 2028" },
  { degree: "B.S. Software Development", school: "Bellevue University", date: "June 2025" },
]

export type Review = {
  quote: string
  name: string
  context: string
}

// TODO: replace with the real tutoring reviews.
export const reviews: Review[] = [
  {
    quote: "Paste the first review here.",
    name: "Student name",
    context: "CIS student, Bellevue University",
  },
  {
    quote: "Paste the second review here.",
    name: "Student name",
    context: "CIS student, Bellevue University",
  },
  {
    quote: "Paste the third review here.",
    name: "Student name",
    context: "CIS student, Bellevue University",
  },
  {
    quote: "Paste the fourth review here.",
    name: "Student name",
    context: "CIS student, Bellevue University",
  },
]
