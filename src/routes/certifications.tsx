import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import zapierImg from "@/assets/certs/zapier.png";
import semrushImg from "@/assets/certs/semrush.png";
import n8nAiImg from "@/assets/certs/n8n-ai.png";
import ghlImg from "@/assets/certs/ghl.png";
import makeImg from "@/assets/certs/make.png";
import n8nImg from "@/assets/certs/n8n.png";
import promptImg from "@/assets/certs/prompt.png";
import vaImg from "@/assets/certs/va.png";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Remark Antipala" },
      {
        name: "description",
        content:
          "Verified certifications in n8n, Zapier, Make.com, GoHighLevel, Prompt Engineering, Semrush AI Marketing, and Virtual Assistance.",
      },
      { property: "og:title", content: "Certifications — Remark Antipala" },
      {
        property: "og:description",
        content:
          "Real, verifiable training credentials across automation, AI, CRM, and digital marketing.",
      },
    ],
  }),
  component: CertificationsPage,
});

type Cert = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  skills: string[];
};

const CERTIFICATIONS: Cert[] = [
  {
    title: "AI Automation with n8n",
    issuer: "Technical Virtual Assistants PH",
    date: "April 26, 2026",
    image: n8nAiImg,
    skills: ["AI Agents", "Workflows", "APIs", "Triggers", "Branching"],
  },
  {
    title: "n8n — AI Automation Full Training",
    issuer: "Technical Virtual Assistants PH",
    date: "April 26, 2026",
    image: n8nImg,
    skills: ["n8n Server", "Nodes", "Looping", "AI Agents"],
  },
  {
    title: "No Code Automation with Zapier",
    issuer: "Technical Virtual Assistants PH",
    date: "April 14, 2026",
    image: zapierImg,
    skills: ["Triggers", "Formatter", "Paths", "Looping", "Webhooks", "AI by Zapier"],
  },
  {
    title: "No Code Automation with Make.com",
    issuer: "Technical Virtual Assistants PH",
    date: "April 17, 2026",
    image: makeImg,
    skills: ["Scenarios", "Filters", "Triggers", "Error Handling", "HTTP"],
  },
  {
    title: "HighLevel CRM (GoHighLevel) Full Training",
    issuer: "Technical Virtual Assistants PH",
    date: "May 2, 2026",
    image: ghlImg,
    skills: ["CRM", "Sales Funnels", "Website Builder", "Workflows", "AI Agents"],
  },
  {
    title: "Prompt Engineering",
    issuer: "Technical Virtual Assistants PH",
    date: "April 26, 2026",
    image: promptImg,
    skills: ["Prompt Design", "Practical Techniques", "Prompt Workflows"],
  },
  {
    title: "Become an AI-Powered Marketer",
    issuer: "Semrush Academy",
    date: "Valid until 22.12.2026",
    image: semrushImg,
    credentialId: "1c33e0b202",
    skills: ["AI Marketing", "SEO", "Content", "Strategy"],
  },
  {
    title: "Virtual Assistant Skills Training",
    issuer: "Inspired Filipino Freelancer (IFF)",
    date: "December 6, 2025",
    image: vaImg,
    skills: ["CRM", "Email Marketing", "Google Workspace", "Lead Research", "PM"],
  },
];

function CertificationsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Credentials</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Certifications & <span className="text-gradient-brand">training</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Verified training across the automation, AI, CRM, and marketing stack
            I use to deliver client systems end-to-end.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <Card
              key={c.title}
              className="reveal glass gradient-border rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 group"
            >
              <a
                href={c.image}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/3] overflow-hidden bg-muted"
                aria-label={`Open ${c.title} certificate`}
              >
                <img
                  src={c.image}
                  alt={`${c.title} certificate issued by ${c.issuer}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-background/80 backdrop-blur px-2 py-1 text-xs">
                  <ExternalLink className="h-3 w-3" /> View
                </div>
              </a>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-brand flex items-center justify-center text-white shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {c.date}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-tight">{c.title}</h3>
                <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-brand-violet">
                  <BadgeCheck className="h-4 w-4" /> {c.issuer}
                </div>
                {c.credentialId && (
                  <div className="mt-2 text-xs text-muted-foreground font-mono">
                    ID: {c.credentialId}
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-xs border border-border bg-card/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
