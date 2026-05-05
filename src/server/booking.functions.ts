import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const CALENDAR_ID = "primary";
const TIMEZONE = "Asia/Manila";

function authHeaders() {
  const lovable = process.env.LOVABLE_API_KEY;
  const conn = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!lovable) throw new Error("LOVABLE_API_KEY is not configured");
  if (!conn) throw new Error("GOOGLE_CALENDAR_API_KEY is not configured");
  return {
    Authorization: `Bearer ${lovable}`,
    "X-Connection-Api-Key": conn,
    "Content-Type": "application/json",
  };
}

export const getBusySlots = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }).parse,
  )
  .handler(async ({ data }) => {
    // Build a UTC window covering the selected date in Asia/Manila (UTC+8)
    const timeMin = new Date(`${data.date}T00:00:00+08:00`).toISOString();
    const timeMax = new Date(`${data.date}T23:59:59+08:00`).toISOString();

    const res = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        timeMin,
        timeMax,
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("freeBusy failed", res.status, json);
      return { busy: [] as { start: string; end: string }[], error: "Could not load availability" };
    }
    const busy = json?.calendars?.[CALENDAR_ID]?.busy ?? [];
    return { busy, error: null as string | null };
  });

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().trim().min(1).max(100),
      email: z.string().trim().email().max(255),
      notes: z.string().trim().max(2000).optional().default(""),
      startISO: z.string().min(10),
      durationMinutes: z.number().int().min(15).max(180).default(30),
    }).parse,
  )
  .handler(async ({ data }) => {
    const start = new Date(data.startISO);
    if (isNaN(start.getTime())) throw new Error("Invalid start time");
    const end = new Date(start.getTime() + data.durationMinutes * 60_000);

    const event = {
      summary: `Booking: ${data.name}`,
      description: `Booked via website\n\nName: ${data.name}\nEmail: ${data.email}\n\nNotes:\n${data.notes || "(none)"}`,
      start: { dateTime: start.toISOString(), timeZone: TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: TIMEZONE },
      attendees: [{ email: data.email, displayName: data.name }],
      reminders: { useDefault: true },
    };

    const res = await fetch(
      `${GATEWAY_URL}/calendars/${encodeURIComponent(CALENDAR_ID)}/events?sendUpdates=all`,
      {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(event),
      },
    );
    const json = await res.json();
    if (!res.ok) {
      console.error("createEvent failed", res.status, json);
      throw new Error(`Could not create booking (${res.status})`);
    }
    return { id: json.id as string, htmlLink: json.htmlLink as string };
  });
