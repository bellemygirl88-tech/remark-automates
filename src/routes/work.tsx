import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ghlUiVideo from "@/assets/portfolio/ghl-ui-1.mp4";
import ghlFunnelVideo from "@/assets/portfolio/ghl-funnel.mp4";
import ghlLeadCapture from "@/assets/portfolio/ghl-lead-capture.jpg";
import ghlChatWidget from "@/assets/portfolio/ghl-chat-widget.jpg";
import ghlInstagramDm from "@/assets/portfolio/ghl-instagram-dm.jpg";
import ghlWebform from "@/assets/portfolio/ghl-webform.jpg";
import ghlZapier from "@/assets/portfolio/ghl-zapier.jpg";
import zapierContent from "@/assets/portfolio/zapier-content-repurposing.jpg";
import zapierAsana from "@/assets/portfolio/zapier-asana-crm.jpg";
import zapierLeadEnrichment from "@/assets/portfolio/zapier-lead-enrichment.jpg";
import n8nFbAgent from "@/assets/portfolio/n8n-fb-ai-agent.jpg";
import n8nReceptionist from "@/assets/portfolio/n8n-ai-receptionist.jpg";
import n8nRag from "@/assets/portfolio/n8n-rag-pipeline.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Previous Works — Remark Antipala" },
      {
        name: "description",
        content:
          "Real automation builds in GoHighLevel, Zapier, and n8n — lead nurturing, CRM workflows, AI agents, RAG pipelines, and more.",
      },
      { property: "og:title", content: "Previous Works — Remark Antipala" },
      {
        property: "og:description",
        content:
          "GoHighLevel, Zapier, and n8n automation projects delivered for clients.",
      },
      { property: "og:image", content: n8nReceptionist },
    ],
  }),
  component: WorkPage,
});

type Project = {
  image?: string;
  video?: string;
  category: "GoHighLevel" | "Zapier" | "n8n";
  title: string;
  metric: string;
  description: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    video: ghlUiVideo,
    category: "GoHighLevel",
    title: "GHL UI Build & Customization",
    metric: "Branded UI",
    description:
      "Custom GoHighLevel UI build — fully branded sub-account interface, navigation, dashboards, and white-labeled experience tailored to the client.",
    tags: ["GHL", "UI", "White-label", "Branding"],
  },
  {
    video: ghlFunnelVideo,
    category: "GoHighLevel",
    title: "GHL Funnel Design & Build",
    metric: "High-converting",
    description:
      "End-to-end GoHighLevel funnel — designed, built, and wired with forms, automations, and follow-up sequences for conversion.",
    tags: ["GHL", "Funnels", "Conversion", "Automation"],
  },
  {
    image: ghlLeadCapture,
    category: "GoHighLevel",
    title: "Lead Capture with Instant SMS Follow-up",
    metric: "<1 min response",
    description:
      "Triggers on new lead entry, tags and segments contacts, then fires SMS + email + voicemail with conditional branching for engagement vs. nurture paths.",
    tags: ["GHL", "SMS", "Email", "Branching"],
  },
  {
    image: ghlChatWidget,
    category: "GoHighLevel",
    title: "Inbound Lead Nurturing — Chat Widget",
    metric: "Auto-qualify",
    description:
      "Captures website chat leads, sends an instant reply, then qualifies with conditional logic. High-intent leads route to booking; the rest enter timed nurture.",
    tags: ["Chat Widget", "Qualification", "Booking"],
  },
  {
    image: ghlInstagramDm,
    category: "GoHighLevel",
    title: "Inbound Lead Nurturing — Instagram DM",
    metric: "DM automation",
    description:
      "Auto-replies to Instagram DMs, qualifies the lead through their responses, and branches into conversion or follow-up sequences with timed waits.",
    tags: ["Instagram", "DM", "Nurture"],
  },
  {
    image: ghlWebform,
    category: "GoHighLevel",
    title: "Web Form & Funnel Lead Nurturing",
    metric: "Form → CRM",
    description:
      "Captures funnel and form submissions, segments by source, and runs SMS/email follow-up with internal team notifications and task assignments.",
    tags: ["Funnels", "Forms", "Segmentation"],
  },
  {
    image: ghlZapier,
    category: "GoHighLevel",
    title: "Zapier-Sourced Lead Nurturing",
    metric: "Cross-tool sync",
    description:
      "Receives leads via Zapier into GHL, tags and processes them, then runs branching follow-ups — including team alerts for high-intent leads.",
    tags: ["Zapier", "GHL", "Webhooks"],
  },
  {
    image: zapierContent,
    category: "Zapier",
    title: "Content Repurposing Pipeline",
    metric: "1 file → 6 posts",
    description:
      "Drive upload triggers Zapier to transcribe audio/video, generate two blog posts via AI, then auto-create Instagram + LinkedIn posts. Filters and paths gate publishing; everything is logged to Sheets.",
    tags: ["Zapier", "OpenAI", "Drive", "Social"],
  },
  {
    image: zapierAsana,
    category: "Zapier",
    title: "Asana CRM — 5-Stage Automation",
    metric: "5 lifecycle paths",
    description:
      "Five stage-based paths in Asana: auto-create Drive folder + subtasks, escalating no-response follow-ups, weekly quote nudges, welcome emails with PDF, and post-sale recommendations.",
    tags: ["Asana", "Gmail", "Drive", "Paths"],
  },
  {
    image: zapierLeadEnrichment,
    category: "Zapier",
    title: "Automated Lead Enrichment & Scoring",
    metric: "Real-time alerts",
    description:
      "Webhook captures leads, enriches via Apollo, scores by company size, stores in Sheets, alerts the sales team in Telegram/Slack, and uses AI to draft a personalized Gmail outreach.",
    tags: ["Webhooks", "Apollo", "Telegram", "AI Email"],
  },
  {
    image: n8nFbAgent,
    category: "n8n",
    title: "Facebook Messenger AI Support Agent",
    metric: "24/7 support",
    description:
      "n8n-powered Microsoft support agent inside Facebook Messenger — handles password resets, account recovery, and login issues with step-by-step troubleshooting.",
    tags: ["n8n", "Messenger", "LLM", "Support"],
  },
  {
    image: n8nReceptionist,
    category: "n8n",
    title: "AI Receptionist + VAPI Appointment Setter",
    metric: "Voice → calendar",
    description:
      "VAPI captures calls; n8n parses transcripts, detects intent (book / reschedule / cancel), checks Google Calendar availability, writes to Airtable, and confirms — all hands-free.",
    tags: ["n8n", "VAPI", "Airtable", "Calendar"],
  },
  {
    image: n8nRag,
    category: "n8n",
    title: "Personal RAG Pipeline",
    metric: "Live knowledge base",
    description:
      "Drive files auto-embed into a Supabase Vector Store via Google Gemini embeddings. Updates re-index instantly. A chat agent retrieves and answers with grounded context.",
    tags: ["n8n", "Supabase", "Gemini", "RAG"],
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
            Real builds across GoHighLevel, Zapier, and n8n — lead capture,
            multi-channel nurture, AI agents, voice receptionists, and
            retrieval-augmented knowledge bases.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card
              key={p.title}
              className="glass gradient-border rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-card">
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
                <div className="absolute top-3 left-3">
                  <Badge className="gradient-brand text-white border-0">{p.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur border-brand-violet/40 text-brand-violet">
                    {p.metric}
                  </Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-xs border border-border bg-card/60"
                    >
                      {t}
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
