import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Workflow, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientLogo } from "@/components/GradientLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Remark Antipala — Automation, AI & Funnel Specialist" },
      {
        name: "description",
        content:
          "Results-driven Automation Specialist building AI agents, CRM workflows, funnels, and websites. Based in Cebu, working worldwide.",
      },
      { property: "og:title", content: "Remark Antipala — Automation & AI Specialist" },
      {
        property: "og:description",
        content:
          "Workflow automation, AI agents, CRM integration, and high-converting funnels.",
      },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "4+", label: "Years experience" },
  { value: "95%+", label: "CSAT maintained" },
  { value: "80%", label: "Manual work reduced" },
  { value: "<1 min", label: "Lead response time" },
];

const HIGHLIGHTS = [
  {
    icon: Workflow,
    title: "Automation that scales",
    desc: "Workflow systems with n8n, Zapier, Make — connected via APIs and webhooks.",
    to: "/services" as const,
  },
  {
    icon: Bot,
    title: "AI agents & chatbots",
    desc: "LLM-powered support and conversational agents with prompt engineering.",
    to: "/work" as const,
  },
  {
    icon: Zap,
    title: "Funnels that convert",
    desc: "GoHighLevel funnels, websites, and domain setup tuned for conversion.",
    to: "/services" as const,
  },
];

const TOOLS = [
  "n8n", "Zapier", "Make", "GoHighLevel", "OpenAI", "Airtable",
  "Xero", "Asana", "APIs", "Webhooks", "DNS", "Funnels",
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-70" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-brand-violet" />
            Available for new automation projects
          </div>
          <div className="mt-6">
            <GradientLogo size="xl" asLink={false} />
          </div>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
            Automation Specialist · AI & CRM Integration Expert · Funnel & Website Designer
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Lapu-Lapu City, Cebu, Philippines
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button size="lg" className="gradient-brand text-white border-0 hover:opacity-90 glow-violet">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/work">
              <Button size="lg" variant="outline" className="gradient-border bg-background/60 backdrop-blur">
                View my work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-6xl px-4 -mt-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <Card key={s.label} className="glass gradient-border rounded-2xl p-5">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-brand">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="container mx-auto max-w-6xl px-4 mt-24">
        <h2 className="text-3xl md:text-4xl font-bold">
          Building <span className="text-gradient-brand">automation systems</span> that work while you sleep.
        </h2>
        <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
          Results-driven Automation Specialist with expertise in workflow automation, AI systems,
          CRM integration, and funnel & website development. Skilled in building scalable solutions
          using n8n, Zapier, and GoHighLevel — powered by APIs, webhooks (HTTP/HTTPS), and advanced
          prompt engineering with LLM integration. Experienced in designing high-converting funnels,
          responsive websites, and seamless domain connections, ensuring optimized user experience
          and maximum conversion rates. With 4+ years at Concentrix, I bring strong troubleshooting,
          system reliability, and customer-focused solutions with 95%+ CSAT performance.
        </p>
      </section>

      {/* Highlights */}
      <section className="container mx-auto max-w-6xl px-4 mt-20">
        <div className="grid gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <Link key={h.title} to={h.to}>
              <Card className="glass gradient-border rounded-2xl p-6 h-full transition-transform hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl gradient-brand flex items-center justify-center text-white">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm text-brand-violet">
                  Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools marquee */}
      <section className="container mx-auto max-w-6xl px-4 mt-20">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Tools & technologies</div>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full text-sm border border-border bg-card/60 backdrop-blur hover:border-brand-violet transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-4 mt-24">
        <Card className="glass gradient-border rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold">
              Have a workflow you want to <span className="text-gradient-brand">automate?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Let's talk about your systems, funnels, or AI agent ideas. I usually reply within a day.
            </p>
            <Link to="/contact">
              <Button size="lg" className="mt-6 gradient-brand text-white border-0 hover:opacity-90 glow-violet">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </>
  );
}
