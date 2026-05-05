import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { getBusySlots, createBooking } from "@/server/booking.functions";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a call — Remark Antipala" },
      { name: "description", content: "Schedule a 30-minute discovery call. Times shown in Asia/Manila." },
    ],
  }),
  component: BookPage,
});

const SLOT_MIN = 30;
const DAY_START = 9; // 9am
const DAY_END = 18; // 6pm
const TZ = "Asia/Manila";

function buildSlots(dateStr: string): Date[] {
  const slots: Date[] = [];
  for (let h = DAY_START; h < DAY_END; h++) {
    for (let m = 0; m < 60; m += SLOT_MIN) {
      slots.push(new Date(`${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+08:00`));
    }
  }
  return slots;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  notes: z.string().trim().max(2000).optional(),
});

function BookPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [busy, setBusy] = useState<{ start: string; end: string }[]>([]);
  const [loadingBusy, setLoadingBusy] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<{ when: string; link?: string } | null>(null);

  const dateStr = date ? format(date, "yyyy-MM-dd") : "";

  useEffect(() => {
    if (!dateStr) return;
    setLoadingBusy(true);
    setSelected(null);
    getBusySlots({ data: { date: dateStr } })
      .then((r) => setBusy(r.busy ?? []))
      .catch(() => toast.error("Couldn't load availability."))
      .finally(() => setLoadingBusy(false));
  }, [dateStr]);

  const slots = useMemo(() => (dateStr ? buildSlots(dateStr) : []), [dateStr]);

  const isBusy = (slot: Date) => {
    const s = slot.getTime();
    const e = s + SLOT_MIN * 60_000;
    return busy.some((b) => {
      const bs = new Date(b.start).getTime();
      const be = new Date(b.end).getTime();
      return s < be && e > bs;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!selected) {
      toast.error("Please pick a time slot.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    });
    if (!parsed.success) {
      const f: Record<string, string> = {};
      for (const i of parsed.error.issues) if (!f[i.path[0] as string]) f[i.path[0] as string] = i.message;
      setErrors(f);
      return;
    }

    setSubmitting(true);
    try {
      const res = await createBooking({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          notes: parsed.data.notes ?? "",
          startISO: selected.toISOString(),
          durationMinutes: SLOT_MIN,
        },
      });
      setConfirmed({
        when: new Intl.DateTimeFormat("en-PH", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: TZ,
        }).format(selected),
        link: res.htmlLink,
      });
      toast.success("Booked! Check your inbox for the calendar invite.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 pt-20 pb-10">
          <div className="text-xs uppercase tracking-widest text-brand-violet">Book a call</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">
            Schedule a <span className="text-gradient-brand">discovery call</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            30-minute slots, Monday–Sunday, {DAY_START}:00 – {DAY_END}:00 Asia/Manila. You'll get a Google Calendar
            invite right after booking.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-20">
        {confirmed ? (
          <Card className="glass gradient-border rounded-2xl p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-brand-violet" />
            <h2 className="mt-4 text-2xl font-semibold">You're booked!</h2>
            <p className="mt-2 text-muted-foreground">{confirmed.when}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A calendar invite was sent to your email.
            </p>
            {confirmed.link && (
              <a
                href={confirmed.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-brand-violet underline"
              >
                View on Google Calendar
              </a>
            )}
            <div className="mt-6">
              <Button variant="outline" onClick={() => setConfirmed(null)}>Book another</Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-2 glass gradient-border rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarIcon className="h-4 w-4 text-brand-violet" /> Pick a date
              </div>
              <div className="mt-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return d < today;
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            </Card>

            <Card className="lg:col-span-3 glass gradient-border rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-brand-violet" /> Pick a time {date && `(${format(date, "PPP")})`}
              </div>
              {!date ? (
                <p className="mt-4 text-sm text-muted-foreground">Select a date to see available slots.</p>
              ) : loadingBusy ? (
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading availability…
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((s) => {
                    const past = s.getTime() < Date.now();
                    const taken = isBusy(s);
                    const disabled = past || taken;
                    const isSelected = selected?.getTime() === s.getTime();
                    return (
                      <button
                        key={s.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelected(s)}
                        className={cn(
                          "rounded-md border px-3 py-2 text-sm transition-colors",
                          disabled && "opacity-40 cursor-not-allowed line-through",
                          !disabled && !isSelected && "hover:bg-accent",
                          isSelected && "gradient-brand text-white border-transparent",
                        )}
                      >
                        {new Intl.DateTimeFormat("en-PH", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: TZ,
                        }).format(s)}
                      </button>
                    );
                  })}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-6 space-y-4 border-t border-border pt-6" noValidate>
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
                  <Label htmlFor="notes">What would you like to discuss? (optional)</Label>
                  <Textarea id="notes" name="notes" rows={4} className="mt-1.5" placeholder="A few sentences about your project..." />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || !selected}
                  className="w-full gradient-brand text-white border-0 hover:opacity-90 glow-violet"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking…</>
                  ) : (
                    <>Confirm booking</>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        )}
      </section>
    </>
  );
}
