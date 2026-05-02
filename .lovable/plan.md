# Remark Antipala — Portfolio Website

A bold, futuristic single-domain portfolio with a vibrant gradient aesthetic that fits the AI / automation niche. Multi-route structure for SEO, with dark mode as default and a working theme toggle.

## Site Structure (separate routes)

- `/` — Home (hero + summary + highlights of every section)
- `/services` — Services Offered
- `/experience` — Work Experience
- `/work` — Previous Works / Projects
- `/testimonials` — Client Testimonials
- `/contact` — Contact info + working contact form

Shared header (with "Remark Antipala" wordmark logo + nav + theme toggle) and footer across all pages.

## Visual Direction — Bold Gradient / Futuristic

- **Palette**: deep navy/black base, vibrant violet → cyan → magenta gradient accents
- **Logo**: "Remark Antipala" rendered as an animated gradient wordmark (no image asset needed)
- **Hero**: large display heading, animated gradient blob/aurora background, subtle grid overlay, glowing CTA buttons
- **Cards**: glassmorphism (frosted blur + gradient border), subtle hover glow
- **Typography**: large bold display font for headings, clean sans for body
- **Motion**: fade-in-on-scroll, gradient shimmer on logo, hover lift on cards, animated mesh gradient in hero
- **Light mode**: same gradient accents on a soft off-white base — keeps the brand identity in both themes

## Page Contents

**Home (`/`)**
- Hero: name as gradient logo, role tagline ("Automation Specialist | AI & CRM Integration Expert | Funnel & Website Designer"), location, CTAs → Contact / View Work
- Professional summary block
- Stats strip: 4+ yrs experience · 95%+ CSAT · 80% workload reduction · <1 min lead response
- Teaser cards linking to Services, Work, Testimonials
- Tools & Technologies marquee strip

**Services (`/services`)**
6 service cards with icons:
- Workflow Automation & System Integration
- Funnel & Website Design + Domain Setup
- CRM Setup, Migration & Optimization
- AI Agent & Chatbot Development
- API & Webhook Automation (HTTP/HTTPS)
- Marketing Automation & Lead Generation Systems

Plus a "Core Skills" grouped grid (Automation & Integration · AI & LLM · CRM & Marketing · Funnels & Systems · Tools).

**Experience (`/experience`)**
Vertical timeline:
- Tier 2 Technical Support Specialist — Concentrix (4+ years) with all bullet points
- Key Achievements callout block

**Work (`/work`)**
3 project cards (expandable detail):
- Automated Cold Email Outreach System
- Real Estate CRM, Funnel & Website Automation
- AI Customer Support Agent (LLM-Based)
Each with bullets, outcome metric badge, and tools-used tags.

**Testimonials (`/testimonials`)**
3 realistic placeholder testimonials in glass cards (clearly editable — names like "Sarah M., Real Estate Coach", "James L., SaaS Founder", "Maria R., Marketing Agency Owner") with a note in the page that they're sample testimonials to be replaced.

**Contact (`/contact`)**
- Contact info cards: phone (+63 924-464-0194, click-to-call), email (gojoswcollab@gmail.com, mailto), location (Lapu-Lapu City, Cebu, Philippines)
- Working contact form: Name, Email, Subject, Message — sends to your inbox
- Form has client + server-side Zod validation, success toast, loading state

## Theme Toggle (Dark Mode Default)

- Sun/moon icon button in the header on every page
- Click toggles between dark and light; choice persists in `localStorage`
- Page loads in dark mode by default, with no flash of wrong theme on first paint
- All sections, cards, gradients, and the form adapt cleanly to both themes

## Technical Details

- TanStack Start file-based routes under `src/routes/` (`index.tsx`, `services.tsx`, `experience.tsx`, `work.tsx`, `testimonials.tsx`, `contact.tsx`); shared `Header`/`Footer`/`ThemeToggle`/`GradientLogo` components in `src/components/`
- Each route defines its own `head()` with unique title, description, og:title, og:description for SEO/sharing
- Theme: `ThemeProvider` (context) + inline pre-hydration script in `__root.tsx` to set `.dark` class from localStorage before paint (prevents flash); default = dark
- Styling: Tailwind v4 via `src/styles.css`, extended with vibrant gradient tokens (violet/cyan/magenta) for both `:root` and `.dark`; uses existing shadcn `button`, `card`, `input`, `textarea`, `label`, `sonner` components
- Contact form: react-hook-form + Zod schema (name 1–100, email valid ≤255, subject 1–150, message 1–2000, all trimmed)
- Email sending: requires Lovable Cloud + an email sender domain. After plan approval, Cloud will be enabled and a domain setup dialog shown; the form will POST to a server route that enqueues a transactional email to gojoswcollab@gmail.com with the submission. While DNS verifies, submissions are queued and sent automatically once verified.
- Animations: CSS-only (gradient shimmer, mesh blob keyframes) + `tw-animate-css` for fade/slide on scroll
- Responsive down to mobile (stacked nav becomes a hamburger sheet on small screens)
