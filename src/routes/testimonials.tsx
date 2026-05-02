import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Remark Antipala" },
      {
        name: "description",
        content:
          "What clients say about working with Remark Antipala on automation, CRM, and AI integration projects.",
      },
      { property: "og:title", content: "Testimonials — Remark Antipala" },
      {
        property: "og:description",
        content:
          "Client feedback on automation, AI, and funnel projects.",
      },
    ],
  }),
  component: TestimonialsPage,
});

const TESTIMONIALS = [
  {
    quote:
      "Remark rebuilt our entire lead pipeline in GoHighLevel and connected it to our website forms. We went from following up in hours to under a minute. Bookings doubled in the first month.",
    name: "Sarah M.",
    role: "Real Estate Coach",
  },
  {
    quote:
      "The AI support agent he built handles 70% of our incoming questions on its own. Set up was quick and his prompt engineering work is genuinely good — the bot sounds like one of our own team.",
    name: "James L.",
    role: "SaaS Founder",
  },
  {
    quote:
      "He took our messy Zapier setup, rebuilt it in n8n, and connected Airtable, GHL and our email tool cleanly. Reliable, communicative, and clearly thinks about systems the way an engineer does.",
    name: "Maria R.",
    role: "Marketing Agency Owner",
  },
];

function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Kind words</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Client <span className="text-gradient-brand">testimonials</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A few words from the people I've built systems for. Sample testimonials shown — easy to swap with real client quotes whenever you're ready.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="glass gradient-border rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1"
            >
              <Quote className="h-7 w-7 text-brand-violet" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90 flex-1">
                "{t.quote}"
              </p>
              <div className="mt-5 flex items-center gap-1 text-brand-magenta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
