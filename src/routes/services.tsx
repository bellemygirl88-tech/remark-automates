import { createFileRoute } from "@tanstack/react-router";
import {
  Workflow, Globe, Database, Bot, Webhook, Megaphone,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Remark Antipala" },
      {
        name: "description",
        content:
          "Workflow automation, funnel and website design, CRM setup, AI agents, API & webhook integrations, and lead generation systems.",
      },
      { property: "og:title", content: "Services — Remark Antipala" },
      {
        property: "og:description",
        content:
          "End-to-end automation, AI, CRM, and funnel services for growing businesses.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Workflow,
    title: "Workflow Automation & System Integration",
    desc: "Multi-step automations across your stack using n8n, Zapier, and Make — with monitoring and error handling baked in.",
  },
  {
    icon: Globe,
    title: "Funnel & Website Design + Domain Setup",
    desc: "High-converting funnels and responsive websites with full DNS and domain configuration for live deployment.",
  },
  {
    icon: Database,
    title: "CRM Setup, Migration & Optimization",
    desc: "GoHighLevel pipelines, SaaS mode, lead nurturing, and full CRM workflows tuned to your sales process.",
  },
  {
    icon: Bot,
    title: "AI Agent & Chatbot Development",
    desc: "Conversational AI, support agents, and LLM workflows powered by OpenAI and prompt engineering.",
  },
  {
    icon: Webhook,
    title: "API & Webhook Automation",
    desc: "HTTP/HTTPS integrations, custom webhooks, and data pipelines that keep every system in sync.",
  },
  {
    icon: Megaphone,
    title: "Marketing Automation & Lead Generation",
    desc: "Email/SMS sequences, lead scoring, segmentation, and appointment booking systems that fill your calendar.",
  },
];

const SKILL_GROUPS = [
  {
    title: "Automation & Integration",
    items: [
      "Workflow Automation (n8n, Zapier, Make)",
      "API Integration & Webhooks (HTTP/HTTPS)",
      "Data Automation & Process Optimization",
      "Error Handling, Debugging & Monitoring",
    ],
  },
  {
    title: "AI & LLM Technologies",
    items: [
      "Prompt Engineering & AI Workflow Design",
      "AI Agents & Conversational AI",
      "OpenAI / GPT Automation",
      "AI Chatbots & Support Automation",
    ],
  },
  {
    title: "CRM & Marketing Automation",
    items: [
      "GoHighLevel (Workflows, Pipelines, SaaS Mode)",
      "Lead Generation & Lead Nurturing",
      "Email & SMS Automation",
      "Customer Journey Automation",
    ],
  },
  {
    title: "Funnels, Websites & Systems",
    items: [
      "Sales Funnel Design & Optimization",
      "Landing Page & Website Development",
      "Domain Connection & DNS Configuration",
      "Conversion Rate Optimization (CRO)",
      "Appointment Booking Systems",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Airtable (Data Management)",
      "Xero (Accounting Automation)",
      "Asana (Task Automation)",
      "CRM Systems, Email Platforms, Funnel Builders",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">What I do</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Services <span className="text-gradient-brand">offered</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Practical, scalable systems that connect your tools, automate your busywork,
            and convert more leads into customers.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card
              key={s.title}
              className="glass gradient-border rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="h-11 w-11 rounded-xl gradient-brand flex items-center justify-center text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 mt-24">
        <h2 className="text-3xl md:text-4xl font-bold">
          Core <span className="text-gradient-brand">skills</span>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <Card key={g.title} className="glass gradient-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
