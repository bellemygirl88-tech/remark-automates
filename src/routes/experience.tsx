import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Trophy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Remark Antipala" },
      {
        name: "description",
        content:
          "4+ years as a Tier 2 Technical Support Specialist at Concentrix with 95%+ CSAT, plus automation and AI consulting.",
      },
      { property: "og:title", content: "Work Experience — Remark Antipala" },
      {
        property: "og:description",
        content:
          "Career history and key achievements in technical support, automation, and AI integration.",
      },
    ],
  }),
  component: ExperiencePage,
});

const RESPONSIBILITIES = [
  "Provided advanced troubleshooting for SaaS platforms and systems",
  "Supported Windows 11 and Microsoft Office environments",
  "Maintained 95%+ customer satisfaction (CSAT)",
  "Ensured SLA compliance and efficient ticket resolution",
  "Collaborated cross-functionally to improve workflows and system performance",
];

const ACHIEVEMENTS = [
  "Reduced manual processes by up to 80%",
  "Achieved <1 minute lead response time",
  "Maintained 95%+ CSAT in technical support",
  "Built high-converting funnels and automated systems",
];

function ExperiencePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Career</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Work <span className="text-gradient-brand">experience</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Years of customer-facing technical support combined with hands-on automation
            and AI integration work.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-3 md:left-5 top-2 bottom-2 w-px gradient-brand opacity-40" />

          <div className="relative">
            <div className="absolute -left-8 md:-left-12 top-2 h-6 w-6 rounded-full gradient-brand flex items-center justify-center text-white">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <Card className="glass gradient-border rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl md:text-2xl font-semibold">
                  Tier 2 Technical Support Specialist
                </h3>
                <span className="text-sm text-brand-violet font-medium">4+ years</span>
              </div>
              <div className="mt-1 text-muted-foreground">Concentrix</div>
              <ul className="mt-5 space-y-3">
                {RESPONSIBILITIES.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-brand-cyan mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 mt-20">
        <Card className="glass gradient-border rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center text-white">
              <Trophy className="h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Key achievements</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ACHIEVEMENTS.map((a) => (
              <div key={a} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border">
                <span className="mt-1 h-2 w-2 rounded-full gradient-brand shrink-0" />
                <span className="text-sm">{a}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
