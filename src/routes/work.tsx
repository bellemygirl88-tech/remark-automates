import { createFileRoute } from "@tanstack/react-router";
import { Mail, Home, MessageSquareCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Previous Works — Remark Antipala" },
      {
        name: "description",
        content:
          "Selected projects: cold email automation, real estate CRM and funnel, and an AI customer support agent built with LLMs.",
      },
      { property: "og:title", content: "Previous Works — Remark Antipala" },
      {
        property: "og:description",
        content:
          "A look at automation, CRM, funnel, and AI projects delivered for clients.",
      },
    ],
  }),
  component: WorkPage,
});

const PROJECTS = [
  {
    icon: Mail,
    title: "Automated Cold Email Outreach System",
    metric: "80% less manual work",
    bullets: [
      "Built multi-step workflows using Zapier and n8n",
      "Implemented lead scoring, tagging, and segmentation",
      "Automated responses and appointment booking",
      "Reduced manual workload by 80%",
    ],
    tags: ["Zapier", "n8n", "Lead scoring", "Booking"],
  },
  {
    icon: Home,
    title: "Real Estate CRM, Funnel & Website Automation",
    metric: "<1 min lead response",
    bullets: [
      "Designed high-converting funnels and responsive websites using GoHighLevel",
      "Configured domain connections and DNS settings for live deployment",
      "Integrated AI chatbot using prompt engineering for real-time engagement",
      "Automated SMS/email follow-ups and booking systems",
      "Improved lead response time to under 1 minute",
    ],
    tags: ["GoHighLevel", "Funnels", "DNS", "AI Chatbot", "SMS/Email"],
  },
  {
    icon: MessageSquareCode,
    title: "AI Customer Support Agent (LLM-Based)",
    metric: "Reduced support load",
    bullets: [
      "Developed AI-powered chatbot using OpenAI and LLM integration",
      "Connected systems via APIs and webhooks (HTTP/HTTPS)",
      "Integrated knowledge base for automated responses",
      "Reduced support workload and improved efficiency",
    ],
    tags: ["OpenAI", "LLM", "Webhooks", "Knowledge Base"],
  },
];

function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Selected work</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Previous <span className="text-gradient-brand">projects</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A handful of automation, CRM, and AI systems I've shipped end-to-end —
            from architecture to live deployment.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card
              key={p.title}
              className="glass gradient-border rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="h-11 w-11 rounded-xl gradient-brand flex items-center justify-center text-white">
                  <p.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="border-brand-violet/40 text-brand-violet">
                  {p.metric}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <ul className="mt-3 space-y-2 flex-1">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-xs border border-border bg-card/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
