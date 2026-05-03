import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Remark Antipala" },
      {
        name: "description",
        content:
          "Professional certifications in automation, AI, and CRM tools — n8n, Zapier, GoHighLevel, OpenAI, and more.",
      },
      { property: "og:title", content: "Certifications — Remark Antipala" },
      {
        property: "og:description",
        content:
          "Verified training in n8n, Zapier, GoHighLevel, OpenAI prompt engineering, and CRM automation.",
      },
    ],
  }),
  component: CertificationsPage,
});

type Cert = {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  skills: string[];
};

const CERTIFICATIONS: Cert[] = [
  {
    title: "n8n Workflow Automation — Advanced",
    issuer: "n8n Academy",
    year: "2025",
    credentialId: "N8N-ADV-2025-RA",
    skills: ["Workflows", "Webhooks", "AI Agents", "RAG"],
  },
  {
    title: "Zapier Certified Expert",
    issuer: "Zapier",
    year: "2024",
    credentialId: "ZAP-EXP-2024-RA",
    skills: ["Multi-step Zaps", "Paths", "Filters", "Looping"],
  },
  {
    title: "GoHighLevel Certified Admin",
    issuer: "HighLevel",
    year: "2024",
    credentialId: "GHL-ADM-2024-RA",
    skills: ["Funnels", "Workflows", "CRM", "DNS Setup"],
  },
  {
    title: "OpenAI Prompt Engineering",
    issuer: "OpenAI / DeepLearning.AI",
    year: "2024",
    skills: ["LLMs", "Prompting", "Function Calling", "RAG"],
  },
  {
    title: "Make (Integromat) Foundations",
    issuer: "Make Academy",
    year: "2024",
    skills: ["Scenarios", "Routers", "Iterators", "Error Handling"],
  },
  {
    title: "Google Workspace Automation",
    issuer: "Google",
    year: "2023",
    skills: ["Drive", "Sheets API", "Apps Script"],
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
            Verified training across the automation, AI, and CRM stack I use to
            deliver client systems end-to-end.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <Card
              key={c.title}
              className="glass gradient-border rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="h-11 w-11 rounded-xl gradient-brand flex items-center justify-center text-white shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {c.year}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-tight">{c.title}</h3>
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
            </Card>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground italic text-center">
          Sample credentials shown — real certificate uploads can be swapped in anytime.
        </p>
      </section>
    </>
  );
}
