import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Linkedin, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Remark Antipala" },
      {
        name: "description",
        content:
          "Get in touch with Remark Antipala. Phone +63 924-464-0194, email gojoswcollab@gmail.com, based in Lapu-Lapu City, Cebu.",
      },
      { property: "og:title", content: "Contact Remark Antipala" },
      {
        property: "og:description",
        content:
          "Reach out for automation, AI, CRM, or funnel projects.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+63 924-464-0194",
    href: "tel:+639244640194",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+63 977-272-7335",
    href: "https://wa.me/639772727335",
  },
  {
    icon: Mail,
    label: "Email",
    value: "gojoswcollab@gmail.com",
    href: "mailto:gojoswcollab@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "remark-antipala",
    href: "https://www.linkedin.com/in/remark-antipala-00b806355",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Remark Antipala",
    href: "https://www.facebook.com/share/1FwsP7RFCz/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lapu-Lapu City, Cebu, Philippines",
    href: null,
  },
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { name, email, subject, message } = result.data;
      const body = `From: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message)}`;
      const mailto = `mailto:gojoswcollab@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;
      toast.success("Opening your email app — your message is ready to send.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Couldn't open your email app. Please email gojoswcollab@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Let's talk</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Get in <span className="text-gradient-brand">touch</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Tell me about your project, your stack, or the workflow you want to automate.
            I usually reply within a day.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_INFO.map((c) => {
              const inner = (
                <Card className="glass gradient-border rounded-2xl p-5 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="h-11 w-11 rounded-xl gradient-brand flex items-center justify-center text-white shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 font-medium">{c.value}</div>
                  </div>
                </Card>
              );
              const isExternal = c.href?.startsWith("http");
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          <Card className="lg:col-span-3 glass gradient-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold">Send me a message</h2>
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" className="mt-1.5" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1.5" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="What's this about?" className="mt-1.5" />
                {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={6} className="mt-1.5" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full gradient-brand text-white border-0 hover:opacity-90 glow-violet"
              >
                {submitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  <>Send message <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
